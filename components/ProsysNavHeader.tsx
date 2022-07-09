import React from "react"
import NavHeader from "./glue/NavHeader"
import AlignHorizontalLeftOutlinedIcon from "@mui/icons-material/AlignHorizontalLeftOutlined"
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined"
import { Container } from "@mantine/core"

const ProsysNavHeader = () => {
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
    <Container mb="sm">
      <NavHeader navs={navs} />
    </Container>
  )
}

export default ProsysNavHeader
