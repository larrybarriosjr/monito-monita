import { addWishlists, getWishlists } from "api"
import ContentButton from "components/ContentButton"
import ContentHeader from "components/ContentHeader"
import ContentInput from "components/ContentInput"
import ContentWrapper from "components/ContentWrapper"
import { Form, Formik } from "formik"
import { useAppDispatch, useAppSelector } from "hooks/redux"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { toast } from "react-toastify"
import { REQUEST_STATUS, setWishLists, setWishListStatus } from "redux/wishlistsSlice"
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
  const wishlistStatus = useAppSelector(state => state.wishlists.status)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setWishListStatus(REQUEST_STATUS.FETCHING))
      try {
        if (params.name) {
          const res = await getWishlists(params.name)
          dispatch(setWishLists(res))
          dispatch(setWishListStatus(REQUEST_STATUS.SUCCESS))
        }
      } catch (error) {
        navigate("/members")
        toast.error("Something went wrong.")
        dispatch(setWishListStatus(REQUEST_STATUS.ERROR))
      }
    }
    fetchData()
    return () => {
      dispatch(setWishLists([]))
      dispatch(setWishListStatus(REQUEST_STATUS.IDLE))
    }
  }, [dispatch, navigate, params.name])

  const handleSubmit = async (values: IWishlistForm) => {
    if (wishlists.map(x => x.toLowerCase()).includes(values.wishlist.toLowerCase())) {
      toast.error("Already exists.")
      return
    }
    dispatch(setWishListStatus(REQUEST_STATUS.FETCHING))
    try {
      if (params.name) {
        const res = await addWishlists({ name: params.name, wishlist: [values.wishlist, ...wishlists] })
        dispatch(setWishLists(res))
        dispatch(setWishListStatus(REQUEST_STATUS.SUCCESS))
      }
    } catch (error) {
      console.log(error)
      dispatch(setWishListStatus(REQUEST_STATUS.ERROR))
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
          {wishlistStatus === REQUEST_STATUS.FETCHING ? (
            <ContentHeader text="Fetching Wishlist..." />
          ) : wishlists.length ? (
            <ContentHeader text={params.name + "'s Current Wishlist"} />
          ) : (
            <ContentHeader text={params.name + " has no wishlist."} />
          )}
          {wishlists.map((wishlist, idx) => (
            <div key={idx}>{wishlist}</div>
          ))}
        </ContentWrapper>
      </Form>
    </Formik>
  )
}

export default Wishlists
