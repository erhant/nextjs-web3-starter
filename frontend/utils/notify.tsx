import { showNotification } from "@mantine/notifications"
import { ContractTransaction } from "ethers"
import { ReactNode } from "react"
import { X, InfoCircle, Check } from "tabler-icons-react"

const ICONSIZE = 18

/**
 * Create a notification with animation. Uses @mantine/notifications within.
 * @param {ReactNode} title notification title, appears at the top
 * @param {ReactNode} message notification body
 * @param {'error' | 'info' | 'success'} variant adjust styling
 */
export const notify = (
  title: ReactNode,
  message: ReactNode,
  variant: "error" | "info" | "success",
  loading: boolean = false
) => {
  if (variant == "error") console.log(message)
  showNotification({
    title,
    message,
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
    sx: {
      width: "min(90vw,400px)",
    },
    loading,
  })
}

/**
 * A generic error message notifier. Parses the error in the given object.
 * If error has data property, and data has message property, we use that.
 * else if error has message property, we use that.
 * else we say "Unknown Error",
 *
 * @param {any} error object caught during try-catch
 * @param {ReactNode} title optional title
 */
export const genericErrorNotify = (error: any, title: ReactNode = "Error", log: boolean = true) => {
  // extract message
  const message = ""
  // call notify
  notify(title, message, "error")
  // log to console optionally
  if (log) {
    console.log(title)
    console.log(error)
  }
}

/**
 * A generic transaction notifier. It tells you that the transaction is waiting to be mined.
 * @param {ContractTransaction} tx transaction object
 */
export const genericTransactionNotify = (tx: ContractTransaction) => {
  notify("Transaction Submitted", `Waiting ${tx.hash} to be mined`, "info", true)
}
