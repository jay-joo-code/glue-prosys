import MobileContainer from "components/glue/MobileContainer"
import NavHeader from "components/glue/NavHeader"
import React from "react"
import AlignHorizontalLeftOutlinedIcon from "@mui/icons-material/AlignHorizontalLeftOutlined"
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined"

const Index = () => {
  const navs = [
    {
      label: "Entries",
      route: "/",
      icon: <AlignHorizontalLeftOutlinedIcon />,
    },
    {
      label: "Overview",
      route: "/overview",
      icon: <InsightsOutlinedIcon />,
    },
  ]
  return (
    <MobileContainer>
      <NavHeader navs={navs} />
    </MobileContainer>
  )
}

export default Index
