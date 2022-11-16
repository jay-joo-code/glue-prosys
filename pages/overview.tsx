import PageContainer from "components/glue/PageContainer"
import OverviewItem from "components/overviews/OverviewItem"
import ProsysNavHeader from "components/ProsysNavHeader"

const Overview = () => {
  return (
    <PageContainer variant="mobile-only">
      <ProsysNavHeader />
      <OverviewItem date={new Date()} />
    </PageContainer>
  )
}

export default Overview
