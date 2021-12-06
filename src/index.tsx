import { StrictMode } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import App from "./App"
import "./index.css"

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer
        theme="colored"
        position="top-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
      />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("root"),
)
