type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string
  variant?: "primary" | "secondary" | "error"
}

const ContentButton = ({ text, variant = "primary", ...props }: Props) => {
  const variantClass = {
    primary: "bg-green-500 hover:bg-green-700",
    secondary: "border-2 border-green-500 hover:border-green-700",
    error: "bg-red-500 hover:bg-red-700",
  }

  return (
    <button
      className={"px-4 py-2 text-sm font-bold text-white uppercase rounded-lg " + variantClass[variant]}
      {...props}
    >
      {text}
    </button>
  )
}

export default ContentButton
