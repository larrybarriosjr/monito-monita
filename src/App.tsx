import { Route, Routes } from "react-router"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<div />} />
      <Route path="/members" element={<div />} />
      <Route path="/members/:name" element={<div />} />
    </Routes>
  )
}

export default App
