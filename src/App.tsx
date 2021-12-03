import MainWrapper from "components/MainWrapper"
import Title from "components/Title"
import Login from "login/Login"
import { Route, Routes } from "react-router"

const App = () => {
  return (
    <MainWrapper>
      <Title />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/members" element={<div />} />
        <Route path="/members/:name" element={<div />} />
      </Routes>
    </MainWrapper>
  )
}

export default App
