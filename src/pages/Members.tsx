import { getAllMembers } from "api"
import ContentButton from "components/ContentButton"
import ContentHeader from "components/ContentHeader"
import ContentWrapper from "components/ContentWrapper"
import { useAppDispatch, useAppSelector } from "hooks/redux"
import React, { useEffect } from "react"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import { setMemberList } from "redux/membersSlice"

const MembersList = () => {
  const navigate = useNavigate()
  const memberList = useAppSelector(state => state.members.data)
  const dispatch = useAppDispatch()

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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate("/members/" + e.currentTarget.textContent)
  }

  return (
    <ContentWrapper>
      <ContentHeader text="Check the wishlists" />
      <div className="grid grid-cols-2 gap-4 my-2">
        {memberList.map((member, idx) => (
          <ContentButton key={idx} type="button" text={member} onClick={handleClick} />
        ))}
      </div>
    </ContentWrapper>
  )
}

export default MembersList