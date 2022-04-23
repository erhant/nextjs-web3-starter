import { Button } from "@mantine/core"
import { useWeb3Context } from "../context/web3.context"

const Web3Button = () => {
  const { disconnectWallet, connectWallet, active } = useWeb3Context()

  return (
    <Button onClick={() => (active ? disconnectWallet() : connectWallet())}>
      {active ? "Disconnect" : "Connect Wallet"}
    </Button>
  )
}

export default Web3Button
