import { Notification as _Notification } from "@mantine/core"

// TODO: use this within functions

type Props = {
  title: string
  message: string
}
const Notification = ({ title, message }: Props) => {
  return (
    <_Notification title={title} sx={{ position: "fixed", bottom: "2em", right: "2em" }}>
      {message}
    </_Notification>
  )
}

export default Notification
