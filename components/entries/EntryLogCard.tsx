import { Card, Container, Text, useMantineTheme } from "@mantine/core"
import React from "react"
import EntryLogList from "./EntryLogList"

interface IEntryLogCardProps {}

const EntryLogCard = ({}: IEntryLogCardProps) => {
  const theme = useMantineTheme()

  return (
    <Card>
      <Text size="sm" weight={500} color={theme.colors["text-blue"][1]} mb="md">
        Time log
      </Text>
      <EntryLogList />
    </Card>
  )
}

export default EntryLogCard
