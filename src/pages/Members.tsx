import { getAllMembers } from "api"
import ContentButton from "components/ContentButton"
import ContentHeader from "components/ContentHeader"
import ContentWrapper from "components/ContentWrapper"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts"

const MembersList = () => {
  const navigate = useNavigate()
  const memberName = useReadLocalStorage("member")
  const [memberList, setMemberList] = useLocalStorage("memberList", [])

  const memberHeader = memberList.length
    ? `Hi, ${memberName}. Please check the wishlists.`
    : "Fetching members..."

  useEffect(() => {
    if (!memberList.length) {
      getAllMembers()
        .then(res => setMemberList(res.sort()))
        .catch(() => {
          toast.error("Something went wrong.")
          navigate("/")
        })
    }
  }, [memberList.length, navigate, setMemberList])

  const handleClick = (member: string) => () => {
    navigate("/members/" + member)
  }

  return (
    <ContentWrapper>
      <ContentHeader text={memberHeader} />
      <div className="grid grid-cols-2 gap-4 my-2">
        {memberList.map((member, idx) => (
          <ContentButton key={idx} type="button" text={member} onClick={handleClick(member)} />
        ))}
      </div>
    </ContentWrapper>
  )
}

export default MembersList
