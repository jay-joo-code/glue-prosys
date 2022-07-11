import { Card, Container, Text, useMantineTheme } from "@mantine/core"
import Flex from "components/glue/Flex"
import useSWR from "swr"

interface IEntryLogOverviewCardProps {
  date: Date
}

const EntryLogOverviewCard = ({ date }: IEntryLogOverviewCardProps) => {
  const theme = useMantineTheme()
  const { data: entryLogOverview } = useSWR([
    "/overview",
    {
      date,
    },
  ])

  return (
    <Card>
      <Text size="sm" weight={700} color={theme.colors["text-blue"][1]} mb="md">
        Entry log
      </Text>
      {entryLogOverview?.map(({ category, hours }) => (
        <Container key={category} mb="xs">
          <Text size="sm" color={theme.colors["text-blue"][4]}>
            {category}
          </Text>
          <Flex align="center" spacing="xs">
            <Container
              sx={(theme) => ({
                height: "11px",
                minWidth: "16px",
                borderRadius: "8px",
                background: theme.colors?.brand[4],
                width: `${(hours / entryLogOverview[0]?.hours) * 100 - 15}%`,
              })}
            />
            <Text size="sm" weight={500} color={theme.colors["text-blue"][2]}>
              {hours}
            </Text>
          </Flex>
        </Container>
      ))}
    </Card>
  )
}

export default EntryLogOverviewCard
