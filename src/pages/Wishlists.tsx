import { getWishlists, updateWishlists } from "api"
import ContentButton from "components/ContentButton"
import ContentHeader from "components/ContentHeader"
import ContentInput from "components/ContentInput"
import ContentItem from "components/ContentItem"
import ContentWrapper from "components/ContentWrapper"
import { Form, Formik, FormikHelpers } from "formik"
import { useAppDispatch, useAppSelector } from "hooks/redux"
import React, { useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { toast } from "react-toastify"
import { REQUEST_STATUS, setWishLists, setWishListStatus } from "redux/wishlistsSlice"
import { useReadLocalStorage } from "usehooks-ts"
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
  const dispatch = useAppDispatch()
  const wishlists = useAppSelector(state => state.wishlists.data)
  const wishlistStatus = useAppSelector(state => state.wishlists.status)
  const memberName = useReadLocalStorage("member")

  const noWishlist =
    params.name === memberName ? "You have no wishlist. Add now." : params.name + " has no wishlist yet."
  const currentWishlist =
    params.name === memberName ? "Your Current Wishlist" : params.name + "'s Current Wishlist"

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

  const handleSubmit = async (values: IWishlistForm, { resetForm }: FormikHelpers<IWishlistForm>) => {
    if (wishlists.map(x => x.toLowerCase()).includes(values.wishlist.toLowerCase())) {
      toast.error("Already exists.")
      return
    }
    resetForm()
    dispatch(setWishListStatus(REQUEST_STATUS.FETCHING))
    try {
      if (params.name) {
        const res = await updateWishlists({ name: params.name, wishlist: [values.wishlist, ...wishlists] })
        dispatch(setWishLists(res))
        dispatch(setWishListStatus(REQUEST_STATUS.SUCCESS))
        toast.success("Wishlist added.")
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong.")
      dispatch(setWishListStatus(REQUEST_STATUS.ERROR))
    }
  }

  const handleDelete = (wishlist: string) => async () => {
    dispatch(setWishListStatus(REQUEST_STATUS.FETCHING))
    try {
      if (params.name) {
        const res = await updateWishlists({
          name: params.name,
          wishlist: wishlists.filter(x => x !== wishlist),
        })
        dispatch(setWishLists(res))
        dispatch(setWishListStatus(REQUEST_STATUS.SUCCESS))
        toast.success("Wishlist removedd.")
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong.")
      dispatch(setWishListStatus(REQUEST_STATUS.ERROR))
    }
  }

  return (
    <Formik initialValues={{ wishlist: "" }} validationSchema={LoginSchema} onSubmit={handleSubmit}>
      <Form autoComplete="off">
        <ContentWrapper>
          <ContentHeader text="Budget: ₱500" />
        </ContentWrapper>
        {params.name === memberName ? (
          <ContentWrapper>
            <ContentInput name="wishlist" type="text" required />
            <ContentButton type="submit" text="Add wishlist" />
          </ContentWrapper>
        ) : null}
        <ContentWrapper>
          {wishlistStatus === REQUEST_STATUS.FETCHING ? (
            <ContentHeader text="Fetching Wishlist..." />
          ) : wishlists.length ? (
            <ContentHeader text={currentWishlist} />
          ) : (
            <ContentHeader text={noWishlist} />
          )}
          {wishlists.length
            ? wishlists.map((wishlist, idx) => (
                <ContentItem
                  key={idx}
                  item={wishlist}
                  canDelete={params.name === memberName}
                  onDelete={handleDelete(wishlist)}
                />
              ))
            : null}
        </ContentWrapper>
        <ContentWrapper>
          <ContentButton
            type="button"
            variant="secondary"
            text="Go Back"
            onClick={() => navigate("/members")}
          />
        </ContentWrapper>
      </Form>
    </Formik>
  )
}

export default Wishlists
