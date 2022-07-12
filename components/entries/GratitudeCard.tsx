import { Card, Text, useMantineTheme } from "@mantine/core"
import GratitudeList from "./GratitudeList"

interface IGratitudeCardProps {
  date: Date
}

const GratitudeCard = ({ date }: IGratitudeCardProps) => {
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

export default GratitudeCard
