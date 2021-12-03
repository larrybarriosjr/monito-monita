import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

const MainWrapper = ({ children }: Props) => {
  return (
    <div className="flex flex-col w-screen min-h-screen px-8 pt-12 bg-gray-900 place-items-center">
      {children}
    </div>
  )
}

export default MainWrapper
