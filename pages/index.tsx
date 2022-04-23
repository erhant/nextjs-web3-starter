import type { NextPage } from "next"
import Layout from "../components/layout"
import { Box, Group } from "@mantine/core"
import ThemeToggleButton from "../components/theme-toggle-button"
import Web3Button from "../components/web3-button"
import WalletInfo from "../components/wallet-info"

const Home: NextPage = () => {
  return (
    <Layout>
      <>
        {/* for the sake of example, we have a theme toggling button and web3 connector*/}
        <Group position="center">
          <ThemeToggleButton />
          <Web3Button />
        </Group>
        <Box my="md">
          <WalletInfo />
        </Box>
      </>
    </Layout>
  )
}

export default Home
