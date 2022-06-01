import { NextPage } from "next"
import { useWalletContext } from "../context/wallet.context"
import { MyToken__factory, MyToken as MyTokenContract } from "../types/typechain/"
import { useEffect, useState } from "react"
import Layout from "../components/layout"
import { Button, Text, Group, Title, Box, TextInput, NumberInput } from "@mantine/core"
import { notify, genericErrorNotify, genericTransactionNotify } from "../utils/notify"
import { ethers } from "ethers"
import getContractAddress from "../constants/contractAddresses"
import contractConstants from "../constants/contractConstants"
import { formatUnits, parseUnits } from "ethers/lib/utils"
import { truncateAccount } from "../utils"

const MyTokenContractPage: NextPage = () => {
  const { wallet } = useWalletContext()
  const [contract, setContract] = useState<MyTokenContract>()
  // contract view states
  const [totalSupply, setTotalSupply] = useState(0)
  const [balance, setBalance] = useState(0)
  const [name, setName] = useState("")
  const [symbol, setSymbol] = useState("")
  const [decimals, setDecimals] = useState(18)
  // interactions
  const [tokenAmount, setTokenAmount] = useState(0)
  const [targetAddress, setTargetAddress] = useState("")

  useEffect(() => {
    if (wallet) {
      try {
        const contractAddress = getContractAddress(contractConstants.MyToken.contractName, wallet.chainId)
        notify("Contract Connected", "Connected to " + contractAddress, "success")
        setContract(MyToken__factory.connect(contractAddress, wallet.library.getSigner(wallet.address)))
      } catch (e: any) {
        genericErrorNotify(e, "Contract Not Found", false)
      }
    }

    return () => {
      setContract(undefined)
    }
  }, [wallet])

  useEffect(() => {
    if (contract == undefined) return

    // get total supply
    contract.totalSupply().then(
      (totalSupply) => setTotalSupply(Number(formatUnits(totalSupply, decimals))),
      (e) => genericErrorNotify(e, "totalSupply")
    )

    // get token name
    contract.name().then(
      (name) => setName(name),
      (e) => genericErrorNotify(e, "name")
    )

    // get token symbol
    contract.symbol().then(
      (symbol) => setSymbol(symbol),
      (e) => genericErrorNotify(e, "symbol")
    )

    // get token decimals
    contract.decimals().then(
      (decimals) => setDecimals(decimals),
      (e) => genericErrorNotify(e, "decimals")
    )
  }, [contract])

  useEffect(() => {
    if (contract == undefined || wallet == undefined) return

    // get your initial balance
    contract.balanceOf(wallet.address).then(
      (balance) => setBalance(Number(formatUnits(balance, decimals))),
      (e) => genericErrorNotify(e, "balanceOf")
    )

    // contract.on(contract.filters.Transfer(), f)
    // contract.on(contract.filters.Approval(), f)

    return () => {
      // contract.off(contract.filters.Transfer(), f)
      // contract.off(contract.filters.Approval(), f)
    }
  }, [contract, wallet])

  const handleSend = async () => {
    if (contract) {
      try {
        const tx = await contract.transfer(targetAddress, parseUnits(tokenAmount.toString(), decimals))
        genericTransactionNotify(tx)
        await tx.wait()
        notify("Transaction", `Sent ${tokenAmount} tokens!`, "success")
      } catch (e: any) {
        genericErrorNotify(e)
      }
    }
  }
  const handleReceive = async () => {
    if (contract) {
      try {
        const tx = await contract.transferFrom(targetAddress, wallet!.address, tokenAmount)
        genericTransactionNotify(tx)
        await tx.wait()
        notify("Transaction", `Received ${tokenAmount} tokens!`, "success")
      } catch (e: any) {
        genericErrorNotify(e)
      }
    }
  }
  const handleApprove = async () => {
    if (contract) {
      try {
        const tx = await contract.approve(targetAddress, tokenAmount)
        genericTransactionNotify(tx)
        await tx.wait()
        notify("Transaction", `Approved ${truncateAccount(targetAddress)} for ${tokenAmount} tokens!`, "success")
      } catch (e: any) {
        genericErrorNotify(e)
      }
    }
  }

  return (
    <Layout>
      {contract ? (
        <>
          {/* welcome */}
          <Box my="xl" mx="auto" sx={{ textAlign: "center", width: "70%" }}>
            <Title>An ERC-20 Token Contract</Title>
            <Text>
              You can send tokens to an address, receive tokens from an address (if they have given you allowance), or
              give allowance to someone. You can also see your balance.
            </Text>
          </Box>

          {/* balance and token info */}
          <Box my="xl">
            <Text size="xl" sx={{ textAlign: "center" }}>
              <b>{name} Balance:</b> {balance + " " + symbol}
              <br />
              <b>Total Supply:</b> {totalSupply + " " + symbol}
            </Text>
          </Box>

          {/* interactions */}
          <Group position="center">
            <TextInput
              value={targetAddress}
              placeholder="paste address here"
              onChange={(e) =>
                (e.currentTarget.value == "" || ethers.utils.isAddress(e.currentTarget.value)) &&
                setTargetAddress(e.currentTarget.value)
              }
              label="Target Address"
            />
            <NumberInput
              value={tokenAmount}
              onChange={(val) => val && setTokenAmount(val)}
              label="Token Amount"
              min={0}
              max={totalSupply}
            />
          </Group>

          <Group my="xl" position="center">
            <Button onClick={handleSend} color="secondary">
              Transfer To
            </Button>
            <Button onClick={handleReceive} color="secondary">
              Transfer From
            </Button>
            <Button onClick={handleApprove} color="primary">
              Approve
            </Button>
          </Group>
        </>
      ) : (
        <Title p="xl">Please connect your wallet first.</Title>
      )}
    </Layout>
  )
}

export default MyTokenContractPage
