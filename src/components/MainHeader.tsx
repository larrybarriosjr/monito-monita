import logo from "logo.png"

const MainHeader = () => {
  return (
    <header className="text-center">
      <img src={logo} className="h-24 mx-auto" />
      <h1 className="text-3xl font-bold text-green-500">Barrios-Tamayo</h1>
      <h2 className="text-xl font-bold text-white uppercase">Monito Monita</h2>
    </header>
  )
}

export default MainHeader
