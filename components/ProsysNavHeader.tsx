import React from "react"
import NavHeader from "./glue/NavHeader"
import AlignHorizontalLeftOutlinedIcon from "@mui/icons-material/AlignHorizontalLeftOutlined"
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined"

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
  return <NavHeader navs={navs} />
}

export default ProsysNavHeader
