import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

const MainWrapper = ({ children }: Props) => {
  return (
    <div className="flex flex-col w-screen h-screen pt-16 bg-gray-900 place-items-center">{children}</div>
  )
}

export default MainWrapper
