import { Card, Container, Text, useMantineTheme } from "@mantine/core"
import React from "react"
import EntryLogList from "./EntryLogList"

interface IEntryLogCardProps {
  date: Date
}

const EntryLogCard = ({ date }: IEntryLogCardProps) => {
  const theme = useMantineTheme()

  return (
    <Card>
      <Text size="sm" weight={700} color={theme.colors?.text[1]} mb="md">
        Entry log
      </Text>
      <EntryLogList date={date} />
    </Card>
  )
}

export default EntryLogCard
