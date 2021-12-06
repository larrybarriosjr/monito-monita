import { login } from "api"
import ContentButton from "components/ContentButton"
import ContentHeader from "components/ContentHeader"
import ContentInput from "components/ContentInput"
import ContentWrapper from "components/ContentWrapper"
import { Form, Formik } from "formik"
import { Navigate } from "react-router"
import { toast } from "react-toastify"
import { useLocalStorage } from "usehooks-ts"
import * as Yup from "yup"

interface ILoginForm {
  password: string
}

const LoginSchema: Yup.SchemaOf<ILoginForm> = Yup.object().shape({
  password: Yup.string().required("This input is required to proceed."),
})

const Login = () => {
  const [memberName, setMemberName] = useLocalStorage("member", "")

  const handleSubmit = async (values: ILoginForm) => {
    try {
      const result = await login(values.password)
      toast.success(`You got it, ${result}!`)
      setMemberName(result)
    } catch (error) {
      toast.error("Wrong password.")
    }
  }

  if (memberName && typeof memberName === "string") {
    return <Navigate to="/members" replace />
  }

  return (
    <Formik initialValues={{ password: "" }} validationSchema={LoginSchema} onSubmit={handleSubmit}>
      <Form autoComplete="off" className="mt-auto mb-10">
        <ContentWrapper>
          <ContentHeader text="What is the password?" />
          <ContentInput name="password" type="text" required />
          <ContentButton type="submit" text="Proceed" />
        </ContentWrapper>
      </Form>
    </Formik>
  )
}

export default Login
