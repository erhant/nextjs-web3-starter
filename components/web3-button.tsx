import { Button } from "@mantine/core"
import { useWeb3Context } from "../context/web3.context"

const Web3Button = () => {
  const { disconnectWallet, connectWallet, account, network, active } = useWeb3Context()
  return (
    <Button
      onClick={() => {
        if (active) {
          disconnectWallet()
        } else {
          connectWallet()
        }
      }}
    >
      {active ? `Disconnect` : "Metamask"}
    </Button>
  )
}

export default Web3Button
