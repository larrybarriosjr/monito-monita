import { login } from "api"
import ContentButton from "components/ContentButton"
import ContentHeader from "components/ContentHeader"
import ContentInput from "components/ContentInput"
import ContentWrapper from "components/ContentWrapper"
import { Form, Formik } from "formik"
import { useAppDispatch, useAppSelector } from "hooks/redux"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import { LOGIN_STATUS, setStatus } from "redux/authSlice"
import { useLocalStorage } from "usehooks-ts"
import * as Yup from "yup"

interface ILoginForm {
  password: string
}

const LoginSchema: Yup.SchemaOf<ILoginForm> = Yup.object().shape({
  password: Yup.string().required("This input is required to proceed."),
})

const Login = () => {
  const navigate = useNavigate()
  const loginStatus = useAppSelector(state => state.auth.status)
  const dispatch = useAppDispatch()
  const [member, setMember] = useLocalStorage("member", "")

  useEffect(() => {
    if (member && typeof member === "string") {
      navigate("/members")
    }
  }, [member, navigate])

  useEffect(() => {
    if (loginStatus === LOGIN_STATUS.ERROR) {
      dispatch(setStatus(LOGIN_STATUS.IDLE))
      toast.error("Wrong password.")
    }
    if (loginStatus === LOGIN_STATUS.SUCCESS) {
      dispatch(setStatus(LOGIN_STATUS.IDLE))
      toast.success("You got it!")
    }
  }, [dispatch, loginStatus])

  const handleSubmit = async (values: ILoginForm) => {
    try {
      const result = await login(values.password)
      setMember(result)
      dispatch(setStatus(LOGIN_STATUS.SUCCESS))
      navigate("/members", { replace: true })
    } catch (error) {
      dispatch(setStatus(LOGIN_STATUS.ERROR))
    }
  }

  return (
    <Formik initialValues={{ password: "" }} validationSchema={LoginSchema} onSubmit={handleSubmit}>
      <Form autoComplete="off" className="mt-60">
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
