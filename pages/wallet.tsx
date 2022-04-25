import { Text, Stack, Title, Group, Card, Divider, Image } from "@mantine/core"
import { BigNumber } from "ethers"
import { formatEther } from "ethers/lib/utils"
import { NextPage } from "next/types"
import Layout from "../components/layout"
import { useEffect, useState } from "react"
import { useWeb3Context } from "../context/web3.context"
import getNetwork, { NetworkInfoType, unknownNetwork } from "../constants/networks"
import { truncateAccount } from "../utils"

const Wallet: NextPage = () => {
  const { account, chainId, active, library } = useWeb3Context()
  const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0))
  const [network, setNetwork] = useState<NetworkInfoType>(unknownNetwork)

  useEffect(() => {
    if (active && account !== undefined && library !== undefined) {
      library.getBalance(account).then((val) => setBalance(val))
      setNetwork(getNetwork(chainId!))
    } else {
      setBalance(BigNumber.from(0))
      setNetwork(unknownNetwork)
    }
  }, [account, active, chainId, library])

  return (
    <Layout>
      {active ? (
        <Card shadow="sm" p="lg" sx={{ width: "30vw", margin: "auto" }}>
          <Card.Section my="sm">
            <Title sx={{ textAlign: "center" }}>Wallet Details</Title>
          </Card.Section>

          <Divider my="lg" />

          <Group position="apart">
            <Stack>
              {/* Network Details */}
              <Title order={2}>Network</Title>
              <Text size="xl">{network.chainName}</Text>
              <Text color="dimmed">Chain ID: {chainId}</Text>

              {/* Wallet Details */}
              <Title order={2} mt="md">
                Wallet ID
              </Title>
              <Text component="code">{truncateAccount(account!)}</Text>

              {/* Balance */}
              <Title order={2} mt="md">
                Balance
              </Title>
              <Text component="code">{formatEther(balance) + " " + network.nativeCurrency.symbol}</Text>
            </Stack>
            <Image src={network.iconURL} alt="network icon" m="md" width={150} height={200} fit="contain" />
          </Group>
        </Card>
      ) : (
        <Title sx={{ textAlign: "center" }} my="xl">
          Please connect your wallet!
        </Title>
      )}
    </Layout>
  )
}

export default Wallet
