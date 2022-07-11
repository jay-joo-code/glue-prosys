import { Container } from "@mantine/core"
import { useFocusWithin } from "@mantine/hooks"
import dateAndTime from "date-and-time"
import api from "lib/glue/api"
import { useEffect, useState } from "react"
import useSWR from "swr"
import EntryLogItem from "./EntryLogItem"

export const getEntryLogListQuery = (date: Date) => [
  `/glue/entry-logs`,
  {
    where: {
      dateString: dateAndTime.format(date, "YYYY-MM-DD"),
    },
    orderBy: {
      createdAt: "asc",
    },
  },
]

interface IEntryLogListProps {
  date: Date
}

const EntryLogList = ({ date }: IEntryLogListProps) => {
  const { data: entryLogs, mutate } = useSWR(getEntryLogListQuery(date))
  const [focusIdx, setFocusIdx] = useState<number>(0)
  const { ref, focused } = useFocusWithin()

  const createEntryLog = async () => {
    await api.post("/glue/entry-logs", {
      dateString: dateAndTime.format(date, "YYYY-MM-DD"),
    })

    mutate()
  }

  useEffect(() => {
    if (entryLogs?.length === 0) {
      createEntryLog()
    }
  }, [entryLogs])

  return (
    <Container ref={ref}>
      {entryLogs?.map((entryLog, idx) => (
        <EntryLogItem
          key={entryLog?.id}
          idx={idx}
          date={date}
          entryLog={entryLog}
          isFocused={focused && idx === focusIdx}
          setFocusIdx={setFocusIdx}
          maxIdx={entryLogs?.length - 1}
        />
      ))}
    </Container>
  )
}

export default EntryLogList
