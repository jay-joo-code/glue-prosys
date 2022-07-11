import { Card, Container, Stack, Text, useMantineTheme } from "@mantine/core"
import React from "react"
import { getMonday, getSunday } from "util/glue/dates"
import dateAndTime from "date-and-time"
import EntryLogOverviewCard from "./EntryLogOverviewCard"

interface IOverviewItemProps {
  date: Date
}

const OverviewItem = ({ date }: IOverviewItemProps) => {
  const theme = useMantineTheme()
  const monday = getMonday(date)
  const sunday = getSunday(date)
  const mondayString = dateAndTime.format(monday, "MMM DD")
  const sundayString = dateAndTime.format(sunday, "MMM DD")

  return (
    <Stack mt="lg">
      <Text ml="xs" size="lg" weight={700} color={theme.colors["text-blue"][2]}>
        {mondayString} - {sundayString}
      </Text>
      <EntryLogOverviewCard date={date} />
    </Stack>
  )
}

export default OverviewItem
