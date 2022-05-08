import { Container } from "@mantine/core"
import { FC, ReactChild } from "react"
import Footer from "./footer"
import Header from "./header"
import styles from "../styles/layout.module.scss"

const Layout: FC<{
  children: ReactChild
}> = ({ children }) => {
  return (
    <div className={styles["layout"]}>
      <Header />
      <Container>{children}</Container>
      <div style={{ flexGrow: 1 }} />
      <Footer />
    </div>
  )
}

export default Layout
