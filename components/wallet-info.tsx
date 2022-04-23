import { Text, Stack, Title } from "@mantine/core"
import { BigNumber } from "ethers"
import { formatEther } from "ethers/lib/utils"
import { useEffect, useState } from "react"
import { useWeb3Context } from "../context/web3.context"
import { truncateAccount } from "../utils"

const WalletInfo = () => {
  const { account, chainId, active, library } = useWeb3Context()
  const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0))

  useEffect(() => {
    if (active && account !== undefined && library !== undefined) {
      library.getBalance(account).then((val) => setBalance(val))
    }
  }, [chainId])

  if (active) {
    return (
      <Stack sx={{ textAlign: "center" }}>
        <Text>
          <b>Wallet</b>: {truncateAccount(account!)}
        </Text>
        <Text>
          <b>Chain ID</b>: {chainId}
        </Text>
        <Text>
          <b>Balance</b>: {formatEther(balance)}
        </Text>
      </Stack>
    )
  } else {
    return <Title sx={{ textAlign: "center" }}>Please connect your wallet first.</Title>
  }
}

export default WalletInfo
