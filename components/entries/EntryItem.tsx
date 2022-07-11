import { Card, Stack, Text } from "@mantine/core"
import React from "react"
import EntryLogCard from "./EntryLogCard"
import GratitudeCard from "./GratitudeCard"

interface IEntryItemProps {}

const EntryItem = ({}: IEntryItemProps) => {
  return (
    <Stack>
      <EntryLogCard />
      <GratitudeCard />
    </Stack>
  )
}

export default EntryItem
