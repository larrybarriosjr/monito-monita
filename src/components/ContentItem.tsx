import Linkify from "linkify-react"
import ContentButton from "./ContentButton"

type Props<T> = {
  item: T
  canDelete: boolean
  onDelete: () => void
}

const ContentItem = <T,>({ item, canDelete, onDelete }: Props<T>) => {
  return (
    <div className="flex w-full gap-2">
      <Linkify
        tagName="a"
        className="w-full px-4 py-2 font-bold text-white bg-green-900 rounded-lg"
        options={{ target: "_blank", className: "underline text-green-300" }}
      >
        {item}
      </Linkify>
      {canDelete ? <ContentButton type="button" variant="error" text="×" onClick={onDelete} /> : null}
    </div>
  )
}

export default ContentItem
