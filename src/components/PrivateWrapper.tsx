import { Navigate, Outlet } from "react-router"
import { useReadLocalStorage } from "usehooks-ts"

const PrivateWrapper = () => {
  const memberName = useReadLocalStorage("member")
  const isLoggedIn = memberName || typeof memberName === "string"

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />
}

export default PrivateWrapper
