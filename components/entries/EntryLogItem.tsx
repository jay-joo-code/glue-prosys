import { Input } from "@mantine/core"
import { useDebouncedValue } from "@mantine/hooks"
import { EntryLog } from "@prisma/client"
import dateAndTime from "date-and-time"
import useFocus from "hooks/glue/useFocus"
import api from "lib/glue/api"
import { useEffect, useState } from "react"
import { useSWRConfig } from "swr"
import { getEntryLogString, parseEntryLogString } from "util/entries"
import { getEntryLogListQuery } from "./EntryLogList"

interface IEntryLogItemProps {
  idx: number
  date: Date
  entryLog: EntryLog
  isFocused: boolean
  setFocusIdx: React.Dispatch<React.SetStateAction<number>>
  maxIdx: number
}

const EntryLogItem = ({
  idx,
  date,
  entryLog,
  isFocused,
  setFocusIdx,
  maxIdx,
}: IEntryLogItemProps) => {
  const [value, setValue] = useState<string>(getEntryLogString(entryLog))
  const { mutate } = useSWRConfig()
  const [debouncedValue] = useDebouncedValue(value, 500)
  const { ref, focus } = useFocus()

  useEffect(() => {
    if (debouncedValue && debouncedValue !== getEntryLogString(entryLog)) {
      api.put(
        `/glue/entry-logs/${entryLog?.id}`,
        parseEntryLogString(debouncedValue)
      )
      mutate(getEntryLogListQuery(date))
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
    await api.delete(`/glue/entry-logs/${entryLog?.id}`)
    mutate(getEntryLogListQuery(date))
  }

  const handleChange = (event) => {
    setValue(event?.target?.value)
  }

  const handleKeyDown = async (event) => {
    if (event.key === "Enter" || event.key === "ArrowDown") {
      if (idx == maxIdx) {
        await api.post("/glue/entry-logs", {
          dateString: dateAndTime.format(date, "YYYY-MM-DD"),
        })

        mutate(getEntryLogListQuery(date))
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

export default EntryLogItem
