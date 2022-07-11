import { Container } from "@mantine/core"
import { useFocusWithin } from "@mantine/hooks"
import dateAndTime from "date-and-time"
import api from "lib/glue/api"
import { useEffect, useState } from "react"
import useSWR from "swr"
import GratitudeItem from "./GratitudeItem"

export const getGratitudeListQuery = (date: Date) => [
  `/glue/gratitudes`,
  {
    where: {
      dateString: dateAndTime.format(date, "YYYY-MM-DD"),
    },
    orderBy: {
      createdAt: "asc",
    },
  },
]

interface IGratitudeListProps {
  date: Date
}

const GratitudeList = ({ date }: IGratitudeListProps) => {
  const { data: gratitudes, mutate } = useSWR(getGratitudeListQuery(date))
  const [focusIdx, setFocusIdx] = useState<number>(0)
  const { ref, focused } = useFocusWithin()

  const createGratitude = async () => {
    await api.post("/glue/gratitudes", {
      dateString: dateAndTime.format(date, "YYYY-MM-DD"),
    })

    mutate()
  }

  useEffect(() => {
    if (gratitudes?.length === 0) {
      createGratitude()
    }
  }, [gratitudes])

  return (
    <Container ref={ref}>
      {gratitudes?.map((gratitude, idx) => (
        <GratitudeItem
          key={gratitude?.id}
          idx={idx}
          date={date}
          gratitude={gratitude}
          isFocused={focused && idx === focusIdx}
          setFocusIdx={setFocusIdx}
          maxIdx={gratitudes?.length - 1}
        />
      ))}
    </Container>
  )
}

export default GratitudeList
