import { Container } from "@mantine/core"
import date from "date-and-time"
import api from "lib/glue/api"
import { useEffect, useState } from "react"
import useSWR from "swr"
import GratitudeItem from "./GratitudeItem"

export const gratitudeListQuery = [
  `/glue/gratitude`,
  {
    where: {
      dateString: date.format(new Date(), "YYYY-MM-DD"),
    },
    orderBy: {
      createdAt: "asc",
    },
  },
]

const GratitudeList = () => {
  const { data: gratitudes, mutate } = useSWR(gratitudeListQuery)
  const [focusIdx, setFocusIdx] = useState<number>(0)

  const createGratitude = async () => {
    await api.post("/glue/gratitudes", {
      dateString: date.format(new Date(), "YYYY-MM-DD"),
    })

    mutate()
  }

  useEffect(() => {
    if (gratitudes?.length === 0) {
      createGratitude()
    }
  }, [gratitudes])

  return (
    <Container>
      {gratitudes?.map((gratitude, idx) => (
        <GratitudeItem
          key={gratitude?.id}
          idx={idx}
          gratitude={gratitude}
          isFocused={idx === focusIdx}
          setFocusIdx={setFocusIdx}
          maxIdx={gratitudes?.length - 1}
        />
      ))}
    </Container>
  )
}

export default GratitudeList
