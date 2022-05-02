import { showNotification } from "@mantine/notifications"
import { ReactNode } from "react"
import { X, InfoCircle, Check } from "tabler-icons-react"

const ICONSIZE = 18

const notify = (title: ReactNode, message: ReactNode, variant: "error" | "info" | "success") => {
  showNotification({
    title: title,
    message: message,
    icon: {
      error: <X size={ICONSIZE} />,
      info: <InfoCircle size={ICONSIZE} />,
      success: <Check size={ICONSIZE} />,
    }[variant],
    color: {
      error: "red",
      info: "yellow",
      success: "green",
    }[variant],
  })
}

export default notify
