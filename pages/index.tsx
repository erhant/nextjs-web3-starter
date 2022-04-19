import type { NextPage } from "next"
import Layout from "../components/layout"
import { Group } from "@mantine/core"
import ThemeToggleButton from "../components/theme-toggle-button"

const Home: NextPage = () => {
  return (
    <Layout>
      <Group>
        <ThemeToggleButton />
      </Group>
    </Layout>
  )
}

export default Home
