import ContentButton from "components/ContentButton"
import ContentHeader from "components/ContentHeader"
import ContentInput from "components/ContentInput"
import ContentWrapper from "components/ContentWrapper"
import { Form, Formik } from "formik"
import { useParams } from "react-router"
import * as Yup from "yup"

interface IWishlistForm {
  wishlist: string
}

const LoginSchema: Yup.SchemaOf<IWishlistForm> = Yup.object().shape({
  wishlist: Yup.string().required("This input is required to proceed."),
})

const Wishlists = () => {
  const params = useParams()

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
          <ContentButton text="Add wishlist" />
        </ContentWrapper>
        <ContentWrapper>
          <ContentHeader text={params.name + "'s Current Wishlist"} />
        </ContentWrapper>
      </Form>
    </Formik>
  )
}

export default Wishlists
