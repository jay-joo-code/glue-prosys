import { Container } from "@mantine/core"
import EntryItem from "components/entries/EntryItem"
import PageContainer from "components/glue/PageContainer"
import ProsysNavHeader from "components/ProsysNavHeader"
import { useState } from "react"
import InfiniteScrollComponent from "react-infinite-scroll-component"
import Skeleton from "react-loading-skeleton"

const Index = () => {
  const [dates, setDates] = useState<Date[]>([new Date()])

  const next = () => {
    setDates((dates) => {
      const yesterday = new Date()
      yesterday.setDate(dates[dates?.length - 1].getDate() - 1)
      return [...dates, yesterday]
    })
  }

  return (
    <PageContainer variant="mobile-only">
      <ProsysNavHeader />
      <InfiniteScrollComponent
        dataLength={dates?.length}
        next={next}
        hasMore={true} // there will always be a previous day
        loader={
          <Container py="xl">
            {[...Array(3)].map((e, i) => (
              <Skeleton key={i} height={200} style={{ marginBottom: `12px` }} />
            ))}
          </Container>
        }
      >
        {dates?.map((date) => (
          <EntryItem key={date?.toString()} date={date} />
        ))}
      </InfiniteScrollComponent>
    </PageContainer>
  )
}

export default Index
