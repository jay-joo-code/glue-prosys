import { Container } from "@mantine/core"
import { useFocusWithin } from "@mantine/hooks"
import dateAndTime from "date-and-time"
import api from "lib/glue/api"
import { useEffect, useState } from "react"
import useSWR from "swr"
import EntryCardItem from "./EntryCardItem"

export const getEntryCardListQuery = (
  date: Date,
  variant: "gratitude" | "achievement"
) => [
  `/glue/${variant === "gratitude" ? "gratitudes" : "achievements"}`,
  {
    where: {
      dateString: dateAndTime.format(date, "YYYY-MM-DD"),
    },
    orderBy: {
      createdAt: "asc",
    },
  },
]

interface IEntryCardListProps {
  date: Date
  variant: "gratitude" | "achievement"
}

const EntryCardList = ({ date, variant }: IEntryCardListProps) => {
  const { data: items, mutate } = useSWR(getEntryCardListQuery(date, variant))
  const [focusIdx, setFocusIdx] = useState<number>(0)
  const { ref, focused } = useFocusWithin()

  const createEntryCardItem = async () => {
    await api.post(
      `/glue/${variant === "gratitude" ? "gratitudes" : "achievements"}`,
      {
        dateString: dateAndTime.format(date, "YYYY-MM-DD"),
      }
    )

    mutate()
  }

  useEffect(() => {
    if (items?.length === 0) {
      createEntryCardItem()
    }
  }, [items])

  return (
    <Container ref={ref}>
      {items?.map((item, idx) => (
        <EntryCardItem
          key={item?.id}
          idx={idx}
          date={date}
          variant={variant}
          item={item}
          isFocused={focused && idx === focusIdx}
          setFocusIdx={setFocusIdx}
          maxIdx={items?.length - 1}
        />
      ))}
    </Container>
  )
}

export default EntryCardList
