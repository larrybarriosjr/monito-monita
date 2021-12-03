import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

const ContentWrapper = ({ children }: Props) => {
  return <div className="flex flex-col gap-2 place-items-center">{children}</div>
}

export default ContentWrapper
