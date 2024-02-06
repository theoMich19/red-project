import { ToastPosition, Zoom, toast } from "react-toastify";

export const sendToast = (
  type: "success" | "error" | "info" | "warn",
  message: string,
  position: ToastPosition = "top-right",
  duration: number = 5000
) => {
  console.log("❤️❤️❤️❤️", type);
  if (type === "success") {
    toast.success(message, {
      position: position,
      autoClose: duration,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } else if (type === "error") {
    toast.error(message, {
      position: position,
      autoClose: duration,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } else {
    toast(message, {
      position: position,
      autoClose: duration,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};
