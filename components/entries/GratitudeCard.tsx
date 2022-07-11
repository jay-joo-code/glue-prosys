import { Card, Text, useMantineTheme } from "@mantine/core"
import GratitudeList from "./GratitudeList"

interface IEntryLogCardProps {}

const EntryLogCard = ({}: IEntryLogCardProps) => {
  const theme = useMantineTheme()

  return (
    <Card>
      <Text size="sm" weight={700} color={theme.colors["text-blue"][1]} mb="md">
        Gratitudes
      </Text>
      <GratitudeList />
    </Card>
  )
}

export default EntryLogCard
