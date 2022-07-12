import { Card, Text, Textarea, useMantineTheme } from "@mantine/core"
import { useState } from "react"
import useSWR from "swr"
import { getDateString } from "util/entries"
import GratitudeList from "./GratitudeList"

interface IThoughtCardProps {
  date: Date
}

const ThoughtCard = ({ date }: IThoughtCardProps) => {
  const theme = useMantineTheme()
  const [value, setValue] = useState<string>()

  const { data: thoughts } = useSWR([
    "/glue/thoughts",
    {
      where: {
        dateString: getDateString(new Date()),
      },
    },
  ])

  console.log("thoughts", thoughts)

  return (
    <Card>
      <Text size="sm" weight={700} color={theme.colors["text-blue"][1]} mb="md">
        Thoughts
      </Text>
      <Textarea />
    </Card>
  )
}

export default ThoughtCard
