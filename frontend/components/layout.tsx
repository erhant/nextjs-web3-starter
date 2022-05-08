import { AppShell, Container } from "@mantine/core"
import { ReactChild } from "react"
import Footer from "./footer"
import Header from "./header"

type Props = {
  children: ReactChild
}
const Layout = ({ children }: Props) => {
  return (
    <AppShell padding="md" header={<Header />} footer={<Footer />}>
      <Container>{children}</Container>
    </AppShell>
  )
}

export default Layout
