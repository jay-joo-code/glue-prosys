import { Card, Container, Stack, Text, useMantineTheme } from "@mantine/core"
import React from "react"
import { getMonday, getSunday } from "util/glue/dates"
import dateAndTime from "date-and-time"
import EntryLogOverviewCard from "./EntryLogOverviewCard"
import useSWR from "swr"
import WeekOverviewCard from "./WeekOverviewCard"

interface IOverviewItemProps {
  date: Date
}

const OverviewItem = ({ date }: IOverviewItemProps) => {
  const theme = useMantineTheme()
  const monday = getMonday(date)
  const sunday = getSunday(date)
  const mondayString = dateAndTime.format(monday, "MMM DD")
  const sundayString = dateAndTime.format(sunday, "MMM DD")

  const { data: overviews } = useSWR([
    "/overview",
    {
      date,
    },
  ])

  return (
    <Stack mt="lg">
      <Text ml="xs" size="lg" weight={700} color={theme.colors["text-blue"][2]}>
        {mondayString} - {sundayString}
      </Text>
      <EntryLogOverviewCard entryLogOverview={overviews?.entryLogOverview} />
      {/* <WeekOverviewCard cardTitle="Gratitudes" /> */}
    </Stack>
  )
}

export default OverviewItem
