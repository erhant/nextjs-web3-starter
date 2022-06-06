import { NextPage } from "next"
import { useWalletContext } from "../context/wallet.context"
import { MyToken__factory, MyToken as MyTokenContract } from "../types/typechain/"
import { useEffect, useState } from "react"
import Layout from "../components/layout"
import { Button, Text, Group, Title, Box, TextInput, NumberInput } from "@mantine/core"
import { notify, genericErrorNotify, genericTransactionNotify, updateTransactionNotify } from "../utils/notify"
import { BigNumber, ethers } from "ethers"
import getContractAddress from "../constants/contractAddresses"
import contractConstants from "../constants/contractConstants"
import { formatUnits, parseUnits } from "ethers/lib/utils"
import { truncateAddress } from "../utils/utility"

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

  const updateBalance = () => {
    contract?.balanceOf(wallet!.address).then(
      (balance) => setBalance(Number(formatUnits(balance, decimals))),
      (e) => genericErrorNotify(e, "balanceOf")
    )
  }

  useEffect(() => {
    if (wallet) {
      try {
        const contractAddress = getContractAddress(contractConstants.MyToken.contractName, wallet.chainId)
        notify("Contract Connected", "Connected to " + truncateAddress(contractAddress), "success")
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

    updateBalance()

    // @todo: events are getting too much, we just want to subscribe to them from the point of login

    contract.on(contract.filters.Transfer(wallet.address, null), listenTransfer)
    contract.on(contract.filters.Transfer(null, wallet.address), listenTransfer)
    contract.on(contract.filters.Approval(null, wallet.address), listenApproval)

    return () => {
      contract.off(contract.filters.Transfer(wallet.address, null), listenTransfer)
      contract.off(contract.filters.Transfer(null, wallet.address), listenTransfer)
      contract.off(contract.filters.Approval(null, wallet.address), listenApproval)
    }
  }, [contract, wallet])

  const listenTransfer: ethers.providers.Listener = (from: string, to: string, value: BigNumber) => {
    // if (from == wallet?.address) {
    //   notify("Transfer", `You have sent ${formatUnits(value, decimals)} ${symbol} to ${truncateAddress(to)}`, "info")
    // } else if (to == wallet?.address) {
    //   notify(
    //     "Transfer",
    //     `You have received ${formatUnits(value, decimals)} ${symbol} to ${truncateAddress(from)}`,
    //     "info"
    //   )
    // }

    updateBalance()
  }
  const listenApproval: ethers.providers.Listener = (owner: string, spender: string, value: BigNumber) => {
    // notify(
    //   "Allowance",
    //   `You have been given allowance of ${formatUnits(value, decimals)} tokens by ${truncateAddress(owner)}`,
    //   "info"
    // )
  }

  const handleSend = async () => {
    if (contract) {
      try {
        const tx = await contract.transfer(targetAddress, parseUnits(tokenAmount.toString(), decimals))
        const nid = genericTransactionNotify(tx)
        try {
          await tx.wait()
          updateTransactionNotify(nid, `Sent ${tokenAmount} tokens!`, "success")
        } catch (e: any) {
          updateTransactionNotify(nid, `Failed transfer.`, "error")
          genericErrorNotify(e)
        }

        updateBalance()
      } catch (e: any) {
        genericErrorNotify(e)
      }
    }
  }

  const handleReceive = async () => {
    if (contract) {
      try {
        const tx = await contract.transferFrom(
          targetAddress,
          wallet!.address,
          parseUnits(tokenAmount.toString(), decimals)
        )
        const nid = genericTransactionNotify(tx)

        try {
          await tx.wait()
          updateTransactionNotify(nid, `Received ${tokenAmount} tokens!`, "success")
        } catch (e: any) {
          updateTransactionNotify(nid, `Failed transferFrom.`, "error")
          genericErrorNotify(e)
        }

        updateBalance()
      } catch (e: any) {
        genericErrorNotify(e)
      }
    }
  }
  const handleApprove = async () => {
    if (contract) {
      try {
        const tx = await contract.approve(targetAddress, parseUnits(tokenAmount.toString(), decimals))
        const nid = genericTransactionNotify(tx)
        try {
          await tx.wait()
          updateTransactionNotify(
            nid,
            `Approved ${truncateAddress(targetAddress)} for ${tokenAmount} tokens!`,
            "success"
          )
        } catch (e: any) {
          updateTransactionNotify(nid, `Failed approve.`, "error")
          genericErrorNotify(e)
        }
      } catch (e: any) {
        genericErrorNotify(e)
      }
    }
  }

  return (
    <Layout>
      {contract ? (
        <>
          {/* welcome message */}
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
