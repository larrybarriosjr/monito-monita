type Props = {
  text: string
}

const ContentHeader = ({ text }: Props) => {
  return <h3 className="text-lg text-white">{text}</h3>
}

export default ContentHeader
