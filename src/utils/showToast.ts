import { toast } from "react-toastify"


export const showToast = (message: string, type: "success" | "error" | "warning"| "info" = "info") => {
   toast[type](message, {
    position: "top-center",
    autoClose: 3000,
    theme: "colored",
    closeOnClick: true,
    hideProgressBar: false,
    draggable: true,
    pauseOnHover: true
   })
}