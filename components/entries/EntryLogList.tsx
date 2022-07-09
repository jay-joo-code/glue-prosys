import { Container } from "@mantine/core"
import api from "lib/glue/api"
import React, { useEffect } from "react"

const EntryLogList = () => {
  const createEntryLog = async () => {
    api.post("/entry-logs", {
      startTime: "1300",
      endTime: "1400",
      category: "game",
      desc: "league",
    })
  }

  useEffect(() => {
    createEntryLog()
  }, [])

  return <Container>EntryLogList</Container>
}

export default EntryLogList
