import { getAllMembers } from "api/members"
import { useAppDispatch, useAppSelector } from "hooks/redux"
import { useEffect } from "react"
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
        dispatch(setMemberList(res))
      } catch (error) {
        navigate("/")
        toast.error("Something went wrong.")
      }
    }
    fetchData()
  }, [dispatch, navigate])

  return (
    <div>
      {memberList.map((member, idx) => (
        <div key={idx}>{member}</div>
      ))}
    </div>
  )
}

export default MembersList
