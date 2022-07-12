import { Card, Container, Text, useMantineTheme } from "@mantine/core"
import Flex from "components/glue/Flex"
import useSWR from "swr"

interface IWeekOverviewCardProps {
  cardTitle: string
  data?: any
}

const WeekOverviewCard = ({ data, cardTitle }: IWeekOverviewCardProps) => {
  const theme = useMantineTheme()

  return (
    <Card>
      <Text size="sm" weight={700} color={theme.colors["text-blue"][1]} mb="md">
        {cardTitle}
      </Text>
      {data?.map(({ category }) => (
        <Container key={category} mb="xs">
          <Text size="sm" color={theme.colors["text-blue"][4]}>
            {category}
          </Text>
        </Container>
      ))}
    </Card>
  )
}

export default WeekOverviewCard
