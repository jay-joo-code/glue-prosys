import { Stack, Text, Title, useMantineTheme } from "@mantine/core"
import dateAndTime from "date-and-time"
import EntryLogCard from "./EntryLogCard"
import GratitudeCard from "./GratitudeCard"

interface IEntryItemProps {
  date: Date
}

const EntryItem = ({ date }: IEntryItemProps) => {
  const theme = useMantineTheme()

  return (
    <Stack mt="lg">
      <Text ml="xs" size="lg" weight={500} color={theme.colors["text-blue"][2]}>
        {dateAndTime.format(date, "MMM DD ddd")}
      </Text>
      <EntryLogCard date={date} />
      <GratitudeCard date={date} />
    </Stack>
  )
}

export default EntryItem
