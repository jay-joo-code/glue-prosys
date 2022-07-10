import { Container } from "@mantine/core"
import date from "date-and-time"
import api from "lib/glue/api"
import { useEffect, useState } from "react"
import useSWR from "swr"
import EntryLogItem from "./EntryLogItem"

export const entryLogListQuery = [
  `/glue/entry-logs`,
  {
    where: {
      dateString: date.format(new Date(), "YYYY-MM-DD"),
    },
    orderBy: {
      createdAt: "asc",
    },
  },
]

const EntryLogList = () => {
  const { data: entryLogs, mutate } = useSWR(entryLogListQuery)
  const [focusIdx, setFocusIdx] = useState<number>(0)

  const createEntryLog = async () => {
    await api.post("/glue/entry-logs", {
      dateString: date.format(new Date(), "YYYY-MM-DD"),
    })

    mutate()
  }

  useEffect(() => {
    if (entryLogs?.length === 0) {
      createEntryLog()
    }
  }, [entryLogs])

  return (
    <Container>
      {entryLogs?.map((entryLog, idx) => (
        <EntryLogItem
          key={entryLog?.id}
          idx={idx}
          entryLog={entryLog}
          isFocused={idx === focusIdx}
          setFocusIdx={setFocusIdx}
          maxIdx={entryLogs?.length - 1}
        />
      ))}
    </Container>
  )
}

export default EntryLogList
