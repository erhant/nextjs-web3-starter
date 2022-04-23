import { Text, Stack } from "@mantine/core"
import { useWeb3Context } from "../context/web3.context"

function truncateAccount(acc: string): string {
  return acc.slice(0, 5) + "..." + acc.slice(-3)
}

const WalletInfo = () => {
  const { account, network, active } = useWeb3Context()
  if (active) {
    return (
      <Stack sx={{ textAlign: "center" }} my="lg">
        <Text>
          <b>Wallet</b>: {account}
        </Text>
        <Text>
          <b>Chain ID</b>: {network?.chainId}{" "}
        </Text>
        <Text>
          <b>Network</b>: {network?.name}{" "}
        </Text>
      </Stack>
    )
  } else {
    return <Text>Please connect your wallet first.</Text>
  }
}

export default WalletInfo
