import { getWishlists } from "api"
import ContentButton from "components/ContentButton"
import ContentHeader from "components/ContentHeader"
import ContentInput from "components/ContentInput"
import ContentWrapper from "components/ContentWrapper"
import { Form, Formik } from "formik"
import { useAppDispatch, useAppSelector } from "hooks/redux"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { toast } from "react-toastify"
import { setWishLists } from "redux/wishlistsSlice"
import * as Yup from "yup"

interface IWishlistForm {
  wishlist: string
}

const LoginSchema: Yup.SchemaOf<IWishlistForm> = Yup.object().shape({
  wishlist: Yup.string().required("This input is required to proceed."),
})

const Wishlists = () => {
  const params = useParams()
  const navigate = useNavigate()
  const wishlists = useAppSelector(state => state.wishlists.data)
  const dispatch = useAppDispatch()

  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true)
      try {
        if (params.name) {
          const res = await getWishlists(params.name)
          dispatch(setWishLists(res))
        }
      } catch (error) {
        navigate("/members")
        toast.error("Something went wrong.")
      }
    }
    fetchData()
  }, [dispatch, navigate, params.name])

  useEffect(() => {
    setFetching(false)
  }, [wishlists])

  const handleSubmit = async (values: IWishlistForm) => {
    try {
      const res = await values.wishlist
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Formik initialValues={{ wishlist: "" }} validationSchema={LoginSchema} onSubmit={handleSubmit}>
      <Form autoComplete="off">
        <ContentWrapper>
          <ContentInput name="wishlist" type="text" required />
          <ContentButton type="submit" text="Add wishlist" />
        </ContentWrapper>
        <ContentWrapper>
          {fetching ? "Fetching wishlist." : null}
          {wishlists.length ? (
            <ContentHeader text={params.name + "'s Current Wishlist"} />
          ) : (
            <ContentHeader text={params.name + " has no wishlist."} />
          )}
        </ContentWrapper>
      </Form>
    </Formik>
  )
}

export default Wishlists
