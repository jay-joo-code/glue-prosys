import { Card, Text, useMantineTheme } from "@mantine/core"
import GratitudeList from "./GratitudeList"

interface IEntryLogCardProps {
  date: Date
}

const EntryLogCard = ({ date }: IEntryLogCardProps) => {
  const theme = useMantineTheme()

  return (
    <Card>
      <Text size="sm" weight={700} color={theme.colors["text-blue"][1]} mb="md">
        Gratitudes
      </Text>
      <GratitudeList date={date} />
    </Card>
  )
}

export default EntryLogCard
