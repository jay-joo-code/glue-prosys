import { Input } from "@mantine/core"
import { useDebouncedValue, useFocusWithin } from "@mantine/hooks"
import { EntryLog } from "@prisma/client"
import date from "date-and-time"
import useFocus from "hooks/glue/useFocus"
import api from "lib/glue/api"
import { useEffect, useState } from "react"
import { useSWRConfig } from "swr"
import { getEntryLogString, parseEntryLogString } from "util/entries"

interface IEntryLogItemProps {
  idx: number
  entryLog: EntryLog
  isFocused: boolean
  setFocusIdx: React.Dispatch<React.SetStateAction<number>>
  maxIdx: number
}

const EntryLogItem = ({
  idx,
  entryLog,
  isFocused,
  setFocusIdx,
  maxIdx,
}: IEntryLogItemProps) => {
  const [value, setValue] = useState<string>(getEntryLogString(entryLog))
  const { mutate } = useSWRConfig()
  const [debouncedValue] = useDebouncedValue(value, 800)
  const { ref, focus } = useFocus()
  const { ref: containerRef, focused: isDetectedFocus } = useFocusWithin()

  useEffect(() => {
    if (debouncedValue) {
      api.put(
        `/entry-logs/${entryLog?.id}`,
        parseEntryLogString(debouncedValue)
      )
    }
  }, [debouncedValue])

  useEffect(() => {
    if (isFocused) {
      focus()
    }
  }, [isFocused])

  useEffect(() => {
    if (isDetectedFocus) {
      setFocusIdx(idx)
    }
  }, [isDetectedFocus])

  const handleChange = (event) => {
    setValue(event?.target?.value)
  }

  const handleKeyDown = async (event) => {
    if (event.key === "Enter" || event.key === "ArrowDown") {
      if (idx == maxIdx) {
        await api.post("/entry-logs", {
          dateString: date.format(new Date(), "YYYY-MM-DD"),
        })

        mutate(
          `/entry-logs?dateString=${date.format(new Date(), "YYYY-MM-DD")}`
        )
        setFocusIdx((idx) => idx + 1)
      } else {
        setFocusIdx((idx) => idx + 1)
      }
    } else if (event.key === "ArrowUp") {
      setFocusIdx((idx) => (idx - 1 < 0 ? 0 : idx - 1))
    }
  }

  return (
    <div ref={containerRef}>
      <Input
        ref={ref}
        variant="unstyled"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
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
    </div>
  )
}

export default EntryLogItem