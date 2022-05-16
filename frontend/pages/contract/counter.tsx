import { NextPage } from "next"
import { useWeb3Context } from "../../context/web3.context"
import { Counter__factory, Counter as CounterType } from "../../types/typechain/"
import { useEffect, useState } from "react"
import Layout from "../../components/layout"
import { Button, Text, Group, Title, Box } from "@mantine/core"
import getNetwork from "../../constants/networks"
import notify from "../../utils/notify"
import { ArrowUpCircle, ArrowDownCircle, Refresh } from "tabler-icons-react"
import { BigNumber, ethers } from "ethers"

// Contract deployment address(es)
const CONTRACT_ADDRESS: Readonly<{ [network: string]: string }> = {
  localhost: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
}

const CounterContract: NextPage = () => {
  // wallet and contract
  const { wallet } = useWeb3Context()
  const [contract, setContract] = useState<CounterType>()
  // contract view states
  const [count, setCount] = useState(0)

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
    } else {
      if (contract) setContract(undefined)
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

      // events
      contract.on(ethers.utils.id("CountedTo(uint256)"), listenCountedTo)
    }

    return () => {
      if (contract) {
        contract.off(ethers.utils.id("CountedTo(uint256)"), listenCountedTo)
      }
    }
  }, [contract])

  const listenCountedTo = (newCount: BigNumber) => {
    notify("Event Listened", "CountedTo event returned " + newCount.toNumber(), "info")
    setCount(newCount.toNumber())
  }
  // Refresh the count (alternative to events)
  const handleRefresh = async () => {
    if (contract) {
      try {
        const count = await contract.getCount()
        setCount(count.toNumber())
      } catch (err: any) {
        notify("Error", err.data.message, "error")
      }
    }
  }

  // Increment counter
  const handleCountUp = async () => {
    if (contract) {
      try {
        const tx = await contract.countUp()
        notify("Transaction", tx.hash, "info")
        await tx.wait()
        notify("Transaction", "Counted up!", "success")
      } catch (err: any) {
        notify("Error", err.data.message, "error")
      }
    }
  }

  // Decrement counter
  const handleCountDown = async () => {
    if (contract) {
      try {
        const tx = await contract.countDown()
        notify("Transaction", tx.hash, "info")
        await tx.wait()
        notify("Transaction", "Counted down!", "success")
      } catch (err: any) {
        console.log(err)
        notify("Error", err.data.message, "error")
      }
    }
  }
  return (
    <Layout>
      {contract ? (
        <>
          <Box my="xl" mx="auto" sx={{ textAlign: "center", width: "70%" }}>
            <Title>A Simple Counter Contract</Title>
            <Text>
              The contract simply stores one 256-bit unsigned integer in it. You can increment and decrement this
              counter, each of which is a transaction. If the count goes below 0, the transaction is rejected. The
              counting event is subscribed automatically, but there is also a refresh button as an example.
            </Text>
          </Box>
          <Box my="xl">
            <Text size="xl" sx={{ textAlign: "center" }}>
              <b>Count:</b> {count}
            </Text>
          </Box>

          <Group my="xl" position="center">
            <Button onClick={handleCountUp} color="secondary">
              <ArrowUpCircle />
            </Button>
            <Button onClick={handleCountDown} color="secondary">
              <ArrowDownCircle />
            </Button>
            <Button onClick={handleRefresh}>
              <Refresh />
            </Button>
          </Group>
        </>
      ) : (
        <Title p="xl">Please connect your wallet first.</Title>
      )}
    </Layout>
  )
}

export default CounterContract
