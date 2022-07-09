import { Container } from "@mantine/core"
import date from "date-and-time"
import { useState } from "react"
import useSWR from "swr"
import EntryLogItem from "./EntryLogItem"

const EntryLogList = () => {
  const { data: entryLogs } = useSWR(
    `/entry-logs?dateString=${date.format(new Date(), "YYYY-MM-DD")}`
  )
  const [focusIdx, setFocusIdx] = useState<number>(0)

  console.log("focusIdx", focusIdx)

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
