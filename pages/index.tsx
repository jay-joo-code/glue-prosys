import EntryItem from "components/entries/EntryItem"
import MobileContainer from "components/glue/MobileContainer"
import ProsysNavHeader from "components/ProsysNavHeader"

const Index = () => {
  return (
    <MobileContainer>
      <ProsysNavHeader />
      <EntryItem />
    </MobileContainer>
  )
}

export default Index
