import ContentHeader from "components/ContentHeader"
import ContentWrapper from "../components/ContentWrapper"
import MembersList from "./MembersList"

const Members = () => {
  return (
    <ContentWrapper>
      <ContentHeader text="Check the wishlists" />
      <MembersList />
    </ContentWrapper>
  )
}

export default Members
