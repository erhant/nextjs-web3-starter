import { showNotification } from "@mantine/notifications"
import { X, InfoCircle, Check } from "tabler-icons-react"

const ICONSIZE = 18
const notify = (title: string, message: string, variant: "error" | "info" | "success") => {
  let icon = undefined
  if (variant === "error") icon = <X size={ICONSIZE} />
  if (variant === "info") icon = <InfoCircle size={ICONSIZE} />
  if (variant === "success") icon = <Check size={ICONSIZE} />

  let color = undefined
  if (variant === "error") color = "red"
  if (variant === "info") color = "yellow"
  if (variant === "success") color = "green"
  showNotification({
    title: title,
    message: message,
    icon: icon,
    color: color,
  })
}

export default notify
