import { login } from "api/auth"
import ContentHeader from "components/ContentHeader"
import ContentWrapper from "components/ContentWrapper"
import { Form, Formik } from "formik"
import { useAppDispatch, useAppSelector } from "hooks/redux"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import { LOGIN_STATUS, setStatus } from "redux/loginSlice"
import * as Yup from "yup"
import LoginButton from "./LoginButton"
import LoginInput from "./LoginInput"

interface ILoginForm {
  password: string
}

const LoginSchema: Yup.SchemaOf<ILoginForm> = Yup.object().shape({
  password: Yup.string().required("This input is required to proceed."),
})

const Login = () => {
  const navigate = useNavigate()
  const loginStatus = useAppSelector(state => state.login.status)
  const dispatch = useAppDispatch()

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
      const res = await login(values.password)
      if (res.data.year === new Date().getFullYear()) {
        dispatch(setStatus(LOGIN_STATUS.SUCCESS))
        navigate("/members")
      }
    } catch (error) {
      dispatch(setStatus(LOGIN_STATUS.ERROR))
    }
  }

  return (
    <Formik initialValues={{ password: "" }} validationSchema={LoginSchema} onSubmit={handleSubmit}>
      <Form autoComplete="off" className="mt-60">
        <ContentWrapper>
          <ContentHeader text="What is the password?" />
          <LoginInput />
          <LoginButton />
        </ContentWrapper>
      </Form>
    </Formik>
  )
}

export default Login
