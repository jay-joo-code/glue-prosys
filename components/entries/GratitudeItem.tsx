import { Input } from "@mantine/core"
import { useDebouncedValue } from "@mantine/hooks"
import { Gratitude } from "@prisma/client"
import date from "date-and-time"
import useFocus from "hooks/glue/useFocus"
import api from "lib/glue/api"
import { useEffect, useState } from "react"
import { useSWRConfig } from "swr"
import { parseEntryLogString } from "util/entries"
import { gratitudeListQuery } from "./GratitudeList"

interface IGratitudeItemProps {
  idx: number
  gratitude: Gratitude
  isFocused: boolean
  setFocusIdx: React.Dispatch<React.SetStateAction<number>>
  maxIdx: number
}

const GratitudeItem = ({
  idx,
  gratitude,
  isFocused,
  setFocusIdx,
  maxIdx,
}: IGratitudeItemProps) => {
  const [value, setValue] = useState<string>(gratitude?.title)
  const { mutate } = useSWRConfig()
  const [debouncedValue] = useDebouncedValue(value, 800)
  const { ref, focus } = useFocus()

  useEffect(() => {
    if (debouncedValue) {
      api.put(
        `/glue/gratitudes/${gratitude?.id}`,
        parseEntryLogString(debouncedValue)
      )
    }
  }, [debouncedValue])

  useEffect(() => {
    if (isFocused) {
      focus()
    } else {
      if (idx !== maxIdx && value?.length === 0) {
        deleteEntryLog()
      }
    }
  }, [isFocused])

  const deleteEntryLog = async () => {
    await api.delete(`/glue/gratitudes/${gratitude?.id}`)
    mutate(gratitudeListQuery)
  }

  const handleChange = (event) => {
    setValue(event?.target?.value)
  }

  const handleKeyDown = async (event) => {
    if (event.key === "Enter" || event.key === "ArrowDown") {
      if (idx == maxIdx) {
        await api.post("/glue/gratitudes", {
          dateString: date.format(new Date(), "YYYY-MM-DD"),
        })

        mutate(gratitudeListQuery)
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
      await deleteEntryLog()
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

export default GratitudeItem
