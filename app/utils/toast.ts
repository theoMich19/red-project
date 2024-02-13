import { ToastPosition, Zoom, toast } from "react-toastify";

export const sendToast = ({
  type,
  message,
  position = "top-right",
  duration = 5000,
}: {
  type: "success" | "error" | "info" | "warn";
  message: string;
  position?: ToastPosition;
  duration?: number;
}) => {
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
