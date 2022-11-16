import { Stack, Text, Title, useMantineTheme } from "@mantine/core"
import dateAndTime from "date-and-time"
import EntryLogCard from "./EntryLogCard"
import EntryCard from "./EntryCard"
import ThoughtCard from "./ThoughtCard"

interface IEntryItemProps {
  date: Date
}

const EntryItem = ({ date }: IEntryItemProps) => {
  const theme = useMantineTheme()

  return (
    <Stack mt="lg">
      <Text ml="xs" size="lg" weight={700} color={theme.colors?.text[2]}>
        {dateAndTime.format(date, "MMM DD ddd")}
      </Text>
      <EntryLogCard date={date} />
      <EntryCard date={date} variant="gratitude" />
      <EntryCard date={date} variant="achievement" />
      <ThoughtCard date={date} />
    </Stack>
  )
}

export default EntryItem
