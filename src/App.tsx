import MainHeader from "components/MainHeader"
import MainWrapper from "components/MainWrapper"
import Login from "pages/Login"
import Members from "pages/Members"
import { Route, Routes } from "react-router"

const App = () => {
  return (
    <MainWrapper>
      <MainHeader />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/members" element={<Members />} />
        <Route path="/members/:name" element={<div />} />
      </Routes>
    </MainWrapper>
  )
}

export default App
