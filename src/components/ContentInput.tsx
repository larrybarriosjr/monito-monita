import { FieldHookConfig, useField } from "formik"

type Props = FieldHookConfig<string>

const ContentInput = (props: Props) => {
  const [field, meta] = useField(props)

  return (
    <div>
      <input {...field} className="px-4 py-2 rounded-lg" />
      <p className="h-4 pt-2 text-xs font-bold text-center text-red-500">
        {meta.touched && meta.error ? meta.error : null}
      </p>
    </div>
  )
}

export default ContentInput
