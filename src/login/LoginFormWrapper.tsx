import { Form, Formik } from "formik"
import { ReactNode } from "react"
import * as Yup from "yup"

interface ILoginForm {
  password: string
}

const LoginSchema: Yup.SchemaOf<ILoginForm> = Yup.object().shape({
  password: Yup.string().required("This input is required to proceed."),
})

type Props = {
  children: ReactNode
}

const LoginFormWrapper = ({ children }: Props) => {
  const handleSubmit = (values: ILoginForm) => {
    console.log(values)
  }

  return (
    <Formik initialValues={{ password: "" }} validationSchema={LoginSchema} onSubmit={handleSubmit}>
      <Form autoComplete="off" className="flex flex-col gap-2 my-40 place-items-center">
        {children}
      </Form>
    </Formik>
  )
}

export default LoginFormWrapper
