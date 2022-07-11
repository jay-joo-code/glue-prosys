import { Stack, Text, Title, useMantineTheme } from "@mantine/core"
import date from "date-and-time"
import EntryLogCard from "./EntryLogCard"
import GratitudeCard from "./GratitudeCard"

interface IEntryItemProps {}

const EntryItem = ({}: IEntryItemProps) => {
  const theme = useMantineTheme()

  return (
    <Stack>
      <Text ml="xs" size="lg" weight={500} color={theme.colors["text-blue"][2]}>
        {date.format(new Date(), "MMM DD ddd")}
      </Text>
      <EntryLogCard />
      <GratitudeCard />
    </Stack>
  )
}

export default EntryItem
