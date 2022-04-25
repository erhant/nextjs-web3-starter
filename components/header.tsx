import { Box, Container, Text, Group, Button } from "@mantine/core"
import ThemeToggleButton from "../components/theme-toggle-button"
import WalletConnectionButton from "./wallet-connection-button"
import { useWeb3Context } from "../context/web3.context"
import { Wallet } from "tabler-icons-react"
import Link from "next/link"

const Header = () => {
  const { active } = useWeb3Context()

  return (
    <Box component="header" py="md" sx={{ textAlign: "center", borderBottom: "1px solid lightgray" }}>
      <Container>
        <Group>
          <Text
            variant="gradient"
            gradient={{ from: "primary", to: "secondary", deg: 45 }}
            sx={{ fontSize: "1.5em", fontWeight: 800 }}
          >
            <Link href="/">Web3 Starter</Link>
          </Text>

          {/* pushes the succeeding contents to the right */}
          <span style={{ flexGrow: 1 }} />

          <WalletConnectionButton />

          <Link href="/wallet" passHref>
            <Button disabled={!active} variant="subtle" size="xs">
              <Wallet />
            </Button>
          </Link>

          <ThemeToggleButton />
        </Group>
      </Container>
    </Box>
  )
}

export default Header
