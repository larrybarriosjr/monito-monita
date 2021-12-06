import { getAllMembers } from "api"
import ContentButton from "components/ContentButton"
import ContentHeader from "components/ContentHeader"
import ContentWrapper from "components/ContentWrapper"
import { useAppDispatch, useAppSelector } from "hooks/redux"
import React, { useEffect } from "react"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import { setMemberList } from "redux/membersSlice"
import { useReadLocalStorage } from "usehooks-ts"

const MembersList = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const memberList = useAppSelector(state => state.members.data)
  const memberName = useReadLocalStorage("member")

  useEffect(() => {
    if (!memberName || typeof memberName !== "string") {
      navigate("/")
    }
  }, [memberName, navigate])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllMembers()
        dispatch(setMemberList(res.sort()))
      } catch (error) {
        navigate("/")
        toast.error("Something went wrong.")
      }
    }
    fetchData()
  }, [dispatch, navigate])

  const handleClick = (member: string) => () => {
    navigate("/members/" + member)
  }

  return (
    <ContentWrapper>
      <ContentHeader text={`Hi, ${memberName}. Please check the wishlists.`} />
      <div className="grid grid-cols-2 gap-4 my-2">
        {memberList.map((member, idx) => (
          <ContentButton key={idx} type="button" text={member} onClick={handleClick(member)} />
        ))}
      </div>
    </ContentWrapper>
  )
}

export default MembersList
