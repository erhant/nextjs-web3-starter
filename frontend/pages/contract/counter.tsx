import { NextPage } from "next"
import { useWeb3Context } from "../../context/web3.context"
import { Counter__factory, Counter as CounterType } from "../../types/typechain/"
import { useEffect, useState } from "react"
import Layout from "../../components/layout"
import { Button, Text, Group, Title } from "@mantine/core"
import getNetwork from "../../constants/networks"
import notify from "../../utils/notify"
import { ArrowUpCircle, ArrowDownCircle } from "tabler-icons-react"

// Contract deployment address
const CONTRACT_ADDRESS: Readonly<{ [network: string]: string }> = {
  localhost: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
}

const CounterContract: NextPage = () => {
  // wallet and contract
  const { wallet } = useWeb3Context()
  const [contract, setContract] = useState<CounterType>()
  // contract view states
  const [count, setCount] = useState<number>(0)

  // load contract on first load
  useEffect(() => {
    if (wallet) {
      const network = getNetwork(wallet.chainId)
      if (!(network.chainName in CONTRACT_ADDRESS)) {
        notify("Contract Not Found", "This contract is not in the network: " + network.chainName, "error")
      } else {
        if (contract) setContract(undefined)
        setContract(
          Counter__factory.connect(CONTRACT_ADDRESS[network.chainName], wallet.library.getSigner(wallet.address))
        )
        notify("Contract Connected", "Connected to " + CONTRACT_ADDRESS[network.chainName], "success")
      }
    }
  }, [wallet])

  // on contract load
  useEffect(() => {
    if (contract) {
      // initial gets
      contract.getCount().then(
        (count) => setCount(count.toNumber()),
        (err) => notify("getCount", err.message, "error")
      )

      // event subscriptions
      // TODO
    }

    return () => {
      if (contract) {
        contract.removeAllListeners()
      }
    }
  }, [contract])

  // Refresh the count (alternative to events)
  const handleRefresh = async () => {
    if (contract) {
      const count = await contract.getCount()
      setCount(count.toNumber())
    }
  }

  // Increment counter
  const handleCountUp = async () => {
    if (contract) {
      const tx = await contract.countUp()
      notify("Transaction", tx.hash, "info")
      await tx.wait()
      notify("Transaction", "Counted up!", "success")
    }
  }

  // Decrement counter
  const handleCountDown = async () => {
    if (contract) {
      const tx = await contract.countDown()
      notify("Transaction", tx.hash, "info")
      await tx.wait()
      notify("Transaction", "Counted down!", "success")
    }
  }
  return (
    <Layout>
      {contract ? (
        <Group my="xl">
          <Text component="pre" inline>
            {count}
          </Text>
          <Button onClick={handleCountUp}>
            <ArrowUpCircle />
          </Button>
          <Button onClick={handleCountDown}>
            <ArrowDownCircle />
          </Button>
          <Button onClick={handleRefresh}>R</Button>
        </Group>
      ) : (
        <Title p="xl">Please connect your wallet first.</Title>
      )}
    </Layout>
  )
}

export default CounterContract
