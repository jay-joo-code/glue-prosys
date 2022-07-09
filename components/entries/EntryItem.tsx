import { Card, Text } from "@mantine/core"
import React from "react"

interface IEntryItemProps {}

const EntryItem = ({}: IEntryItemProps) => {
  return (
    <Card>
      <Text size="sm" weight={500} color="text">
        Time Log
      </Text>
    </Card>
  )
}

export default EntryItem
