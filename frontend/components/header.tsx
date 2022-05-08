import { Box, Container, Text, Group } from "@mantine/core"
import ThemeToggleButton from "../components/theme-toggle-button"
import WalletConnectionButton from "./wallet-connection-button"
import Link from "next/link"
import WalletDisplayButton from "./wallet-display-button"

const Header = () => {
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
          <WalletDisplayButton />
          <ThemeToggleButton />
        </Group>
      </Container>
    </Box>
  )
}

export default Header
