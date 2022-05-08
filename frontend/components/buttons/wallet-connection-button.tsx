import { Button } from "@mantine/core"
import { FC } from "react"
import { useWeb3Context } from "../../context/web3.context"

const WalletConnectionButton: FC = () => {
  const { disconnectWallet, connectWallet, wallet } = useWeb3Context()

  return (
    <Button
      onClick={() => (wallet ? disconnectWallet() : connectWallet())}
      variant="gradient"
      gradient={{ from: "secondary", to: "primary", deg: 42 }}
    >
      {wallet ? "Disconnect" : "Connect"}
    </Button>
  )
}

export default WalletConnectionButton
