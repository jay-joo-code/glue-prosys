import { Card, Text, useMantineTheme } from "@mantine/core"
import EntryCardList from "./EntryCardList"

interface IEntryCardProps {
  date: Date
  variant: "gratitude" | "achievement"
}

const EntryCard = ({ date, variant }: IEntryCardProps) => {
  const theme = useMantineTheme()

  return (
    <Card>
      <Text size="sm" weight={700} color={theme.colors["text-blue"][1]} mb="md">
        {variant === "gratitude" ? "Gratitudes" : "Achievements"}
      </Text>
      <EntryCardList date={date} variant={variant} />
    </Card>
  )
}

export default EntryCard
