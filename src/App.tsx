import MainHeader from "components/MainHeader"
import MainWrapper from "components/MainWrapper"
import PrivateWrapper from "components/PrivateWrapper"
import Login from "pages/Login"
import Members from "pages/Members"
import Wishlists from "pages/Wishlists"
import { Route, Routes } from "react-router"

const App = () => {
  return (
    <MainWrapper>
      <MainHeader />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/members" element={<PrivateWrapper />}>
          <Route index element={<Members />} />
          <Route path=":name" element={<Wishlists />} />
        </Route>
      </Routes>
    </MainWrapper>
  )
}

export default App
