import { Button } from "@mantine/core"
import { useWeb3Context } from "../context/web3.context"

const WalletConnectionButton = () => {
  const { disconnectWallet, connectWallet, active } = useWeb3Context()

  return (
    <Button
      onClick={() => (active ? disconnectWallet() : connectWallet())}
      variant="gradient"
      gradient={{ from: "secondary", to: "primary", deg: 42 }}
    >
      {active ? "Disconnect" : "Connect"}
    </Button>
  )
}

export default WalletConnectionButton
