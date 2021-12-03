import { useField } from "formik"

const LoginInput = () => {
  const [field, meta] = useField({ name: "password", type: "text", required: true })

  return (
    <div>
      <input {...field} className="px-4 py-2 rounded-lg border-primary" />
      <p className="h-4 pt-2 text-xs font-bold text-center text-red-500">
        {meta.touched && meta.error ? meta.error : null}
      </p>
    </div>
  )
}

export default LoginInput
