import { Input } from "@mantine/core"
import { useDebouncedValue } from "@mantine/hooks"
import { Achievement, Gratitude } from "@prisma/client"
import dateAndTime from "date-and-time"
import useFocus from "hooks/glue/useFocus"
import api from "lib/glue/api"
import { useEffect, useState } from "react"
import { useSWRConfig } from "swr"
import { getEntryCardListQuery } from "./EntryCardList"

interface IEntryCardItemProps {
  idx: number
  date: Date
  variant: "gratitude" | "achievement"
  item: Gratitude | Achievement
  isFocused: boolean
  setFocusIdx: React.Dispatch<React.SetStateAction<number>>
  maxIdx: number
}

const EntryCardItem = ({
  idx,
  date,
  variant,
  item,
  isFocused,
  setFocusIdx,
  maxIdx,
}: IEntryCardItemProps) => {
  const [value, setValue] = useState<string>(item?.title)
  const { mutate } = useSWRConfig()
  const [debouncedValue] = useDebouncedValue(value, 800)
  const { ref, focus } = useFocus()
  const endpoint = variant === "gratitude" ? "gratitudes" : "achievements"

  useEffect(() => {
    if (debouncedValue && debouncedValue !== item?.title) {
      api.put(`/glue/${endpoint}/${item?.id}`, { title: debouncedValue })
      mutate(getEntryCardListQuery(date, variant))
    }
  }, [debouncedValue])

  useEffect(() => {
    if (isFocused) {
      focus()
    } else {
      if (idx !== maxIdx && value?.length === 0) {
        deleteItem()
      }
    }
  }, [isFocused])

  const deleteItem = async () => {
    await api.delete(`/glue/${endpoint}/${item?.id}`)
    mutate(getEntryCardListQuery(date, variant))
  }

  const handleChange = (event) => {
    setValue(event?.target?.value)
  }

  const handleKeyDown = async (event) => {
    if (event.key === "Enter" || event.key === "ArrowDown") {
      if (idx == maxIdx) {
        await api.post(`/glue/${endpoint}`, {
          dateString: dateAndTime.format(date, "YYYY-MM-DD"),
        })

        mutate(getEntryCardListQuery(date, variant))
        setFocusIdx((idx) => idx + 1)
      } else {
        setFocusIdx((idx) => idx + 1)
      }
    } else if (event.key === "ArrowUp") {
      setFocusIdx((idx) => (idx - 1 < 0 ? 0 : idx - 1))
    } else if (
      (event.key === "Backspace" || event.key === "Delete") &&
      value?.length === 0
    ) {
      await deleteItem()
      setFocusIdx((idx) => (idx - 1 < 0 ? 0 : idx - 1))
    }
  }

  const handleFocus = () => {
    setFocusIdx(idx)
  }

  return (
    <Input
      ref={ref}
      variant="unstyled"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      py="0"
      size="md"
      sx={(theme) => ({
        "& input": {
          lineHeight: 1.8,
          minHeight: "unset",
          height: "unset",
        },
      })}
    />
  )
}

export default EntryCardItem
