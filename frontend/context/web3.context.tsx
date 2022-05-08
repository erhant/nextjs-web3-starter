import { createContext, ReactChild, useContext, useState, useEffect, FC } from "react"
import Web3Modal from "web3modal"
import { ethers } from "ethers"
import { BaseProvider } from "@ethersproject/providers"
import { hexToDecimal, truncateAccount } from "../utils"
import notify from "../utils/notify"

type WalletType = {
  network: ethers.providers.Network // Current network
  provider: BaseProvider // Provider
  chainId: number // Current chain ID (decimal)
  library: ethers.providers.Web3Provider
  address: string // Address of this wallet (i.e. account)
}
type Web3ContextType = {
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  wallet: WalletType | undefined
}

const Web3Context = createContext<Web3ContextType>({
  connectWallet: async () => {},
  disconnectWallet: () => {},
  wallet: undefined,
})

// wrapper for _app.tsx
export const Web3ContextWrapper: FC<{ children: ReactChild }> = ({ children }) => {
  const [web3Modal, setWeb3Modal] = useState<Web3Modal>()
  const [wallet, setWallet] = useState<WalletType>()

  // set the Web3Modal on first load
  useEffect(() => {
    // opt: give providers
    setWeb3Modal(new Web3Modal())

    return () => {
      setWeb3Modal(undefined)
    }
  }, [])

  /**
   * Wallet connector function. Retrieves the provider from Web3Modal, and then populates the web3 context.t
   */
  const connectWallet = async () => {
    try {
      const provider = await web3Modal!.connect()
      const library = new ethers.providers.Web3Provider(
        provider,
        "any" // important for switching networks! https://github.com/NoahZinsmeister/web3-react/issues/127
      )
      const accounts = await library.listAccounts()
      const network = await library.getNetwork()
      if (accounts) {
        setWallet({
          provider,
          library,
          network,
          address: accounts[0], // always get the first account (topmost),
          chainId: network.chainId,
        })
      } else {
        notify("Error", "Could not find any accounts!", "error")
      }
    } catch (error) {
      notify("Error", "Could not connect wallet properly!", "error")
      console.log(error)
    }
  }

  /**
   * Wallet disconnection. Sets the context wallet to be undefined.
   */
  const disconnectWallet = () => {
    try {
      web3Modal!.clearCachedProvider()
      setWallet(undefined)
    } catch (error) {
      notify("Error", "Could not disconnect wallet properly!", "error")
    }
  }

  // Check if the network is correct
  useEffect(() => {
    if (wallet && wallet.provider.on) {
      // Run when account changes
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts) {
          setWallet((w) => ({ ...w!, address: accounts[0] }))
          notify(
            "Account Change",
            `${truncateAccount(wallet.address)} changed to ${truncateAccount(accounts[0])}.`,
            "info"
          )
        } else {
          notify("Error", "Could not find any accounts!", "error")
        }
      }

      // Network chain changed
      const handleChainChanged = (chainId: number) => {
        setWallet((w) => ({ ...w!, chainId: hexToDecimal(chainId) }))
        notify("Network Change", "You have changed to chain " + hexToDecimal(chainId), "success")
      }

      // Wallet is disconnected from the injected provider
      const handleDisconnect = () => {
        setWallet(undefined)
        notify("Wallet Disconnect", "You have disconnected your wallet.", "success")
      }

      // attach listeners
      wallet.provider.on("accountsChanged", handleAccountsChanged)
      wallet.provider.on("chainChanged", handleChainChanged)
      wallet.provider.on("disconnect", handleDisconnect)

      // remove listeners on unmount
      return () => {
        if (wallet.provider.removeListener) {
          wallet.provider.removeListener("accountsChanged", handleAccountsChanged)
          wallet.provider.removeListener("chainChanged", handleChainChanged)
          wallet.provider.removeListener("disconnect", handleDisconnect)
        }
      }
    }
  }, [wallet])

  return (
    <Web3Context.Provider
      value={{
        wallet,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

// custom hook
export function useWeb3Context() {
  return useContext(Web3Context)
}
