import { getWishlists, updateWishlists } from "api"
import ContentButton from "components/ContentButton"
import ContentHeader from "components/ContentHeader"
import ContentInput from "components/ContentInput"
import ContentItem from "components/ContentItem"
import ContentWrapper from "components/ContentWrapper"
import { Form, Formik, FormikHelpers } from "formik"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { toast } from "react-toastify"
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
  const [wishlists, setWishlists] = useState<string[]>([])
  const [fetching, setFetching] = useState(false)
  const memberName = useReadLocalStorage("member")

  const noWishlist =
    params.name === memberName ? "You have no wishlist. Add now." : params.name + " has no wishlist yet."
  const currentWishlist =
    params.name === memberName ? "Your Current Wishlist" : params.name + "'s Current Wishlist"

  const handleSuccess = (action?: "add" | "remove") => (res: string[]) => {
    if (action) {
      const done = { add: "added", remove: "removed" }
      toast.success(`Wishlist ${done[action]}.`)
    }

    setFetching(false)
    setWishlists(res)
  }

  const handleError = () => {
    setFetching(false)
    toast.error("Something went wrong.")
  }

  useEffect(() => {
    if (params.name) {
      setFetching(true)
      getWishlists(params.name).then(handleSuccess()).catch(handleError)
    }

    return () => {
      setFetching(false)
      setWishlists([])
    }
  }, [params.name])

  const handleSubmit = async (values: IWishlistForm, { resetForm }: FormikHelpers<IWishlistForm>) => {
    const wishlist = values.wishlist.toLowerCase()
    const wishlistExists = wishlists.map(x => x.toLowerCase()).includes(wishlist)

    if (wishlistExists) {
      toast.error("Already exists.")
      return
    }

    if (params.name) {
      resetForm()
      setFetching(true)
      updateWishlists({ name: params.name, wishlist: [values.wishlist, ...wishlists] })
        .then(handleSuccess("add"))
        .catch(handleError)
    }
  }

  const handleDelete = (wishlist: string) => () => {
    if (params.name) {
      setFetching(true)
      updateWishlists({
        name: params.name,
        wishlist: wishlists.filter(x => x !== wishlist),
      })
        .then(handleSuccess("remove"))
        .catch(handleError)
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
          {fetching ? (
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
