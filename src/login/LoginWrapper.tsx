import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

const LoginWrapper = ({ children }: Props) => {
  return (
    <form autoComplete="off" className="flex flex-col gap-2 my-40 place-items-center">
      {children}
    </form>
  )
}

export default LoginWrapper
