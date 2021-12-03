type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string
}

const ContentButton = ({ text, ...props }: Props) => {
  return (
    <button
      className="px-4 py-2 text-sm font-bold text-white uppercase bg-green-500 rounded-lg hover:bg-green-700"
      {...props}
    >
      {text}
    </button>
  )
}

export default ContentButton
