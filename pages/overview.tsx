import MobileContainer from "components/glue/MobileContainer"
import OverviewItem from "components/overviews/OverviewItem"
import ProsysNavHeader from "components/ProsysNavHeader"
import React from "react"

const Overview = () => {
  return (
    <MobileContainer>
      <ProsysNavHeader />
      <OverviewItem date={new Date()} />
    </MobileContainer>
  )
}

export default Overview
