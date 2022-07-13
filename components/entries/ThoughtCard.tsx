import { Card, Text, Textarea, useMantineTheme } from "@mantine/core"
import { useDebouncedValue } from "@mantine/hooks"
import api from "lib/glue/api"
import { memo, useEffect, useState } from "react"
import useSWR from "swr"
import { getDateString } from "util/entries"

interface IThoughtCardProps {
  date: Date
}

const ThoughtCard = ({ date }: IThoughtCardProps) => {
  const theme = useMantineTheme()
  const [value, setValue] = useState<string>("")
  const [debouncedValue] = useDebouncedValue(value, 500)

  const { data: thoughts, mutate: refetchThoughts } = useSWR([
    "/glue/thoughts",
    {
      where: {
        dateString: getDateString(date),
      },
    },
  ])

  const createThought = async () => {
    await api.post("/glue/thoughts", {
      dateString: getDateString(date),
    })

    refetchThoughts()
  }

  useEffect(() => {
    if (thoughts?.length === 0) {
      createThought()
    } else if (
      value?.length === 0 &&
      thoughts?.length > 0 &&
      thoughts[0]?.text
    ) {
      setValue(thoughts[0]?.text)
    }
  }, [thoughts])

  const handleChange = (event) => {
    setValue(event?.target?.value)
  }

  const updateThought = async () => {
    await api.put(`/glue/thoughts/${thoughts[0]?.id}`, { text: debouncedValue })
    refetchThoughts()
  }

  useEffect(() => {
    if (
      debouncedValue &&
      thoughts?.length > 0 &&
      debouncedValue !== thoughts[0]?.text
    ) {
      updateThought()
    }
  }, [debouncedValue, thoughts])

  return (
    <Card>
      <Text size="sm" weight={700} color={theme.colors["text-blue"][1]} mb="md">
        Thoughts
      </Text>
      <Textarea
        autosize
        variant="unstyled"
        value={value}
        onChange={handleChange}
        p="xs"
        sx={(theme) => ({
          background: theme.colors.gray[0],
          borderRadius: theme.radius.md,

          "& textarea": {
            padding: 0,
          },
        })}
      />
    </Card>
  )
}

export default memo(ThoughtCard)
