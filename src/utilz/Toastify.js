import Toastify from "toastify-js"
import "toastify-js/src/toastify.css"

export function showToast(message, type = "WalletPaused") {
  let bg = "linear-gradient(to right, #4f46e5, #9333ea)" 
  let cl = "white"
  if (type === "error") {
    bg = "linear-gradient(to right, #ef4444, #dc2626)" 
    cl = 'white'
  } else if (type === "warning") {
    cl = 'white'
    bg = "linear-gradient(to right, #f59e0b, #d97706)" 
  } else if (type === "success") {
    cl = 'white'
    bg = "linear-gradient(to right, #10b981, #059669)" 
  }else if(type === "WalletPaused"){
    bg = "#F9E7E6";
    cl = "black"
  }

  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    close: true,
    style: { background: bg, color: cl}
  }).showToast()
}

