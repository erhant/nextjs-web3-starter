import { createContext, ReactChild, useContext, useState, useEffect } from "react"
import Web3Modal from "web3modal"
import { ethers } from "ethers"
import { BaseProvider } from "@ethersproject/providers"
import { hexToDecimal } from "../utils"

type Web3ContextType = {
  active: boolean
  setActive: (isActive: boolean) => void
  network: ethers.providers.Network | undefined
  setNetwork: (network: ethers.providers.Network) => void
  chainId: number | undefined
  setChainId: (id: number) => void
  library: ethers.providers.Web3Provider | undefined
  setLibrary: (library: ethers.providers.Web3Provider) => void
  account: string | undefined
  setAccount: (acc: string) => void
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
}

const Web3Context = createContext<Web3ContextType>({
  // see if the wallet is active or not
  active: false,
  setActive: (active: boolean) => {},
  // network
  network: undefined,
  setNetwork: (network: ethers.providers.Network) => {},
  // chainId
  chainId: undefined,
  setChainId: (id: number) => {},
  // library (used to request methods)
  library: undefined,
  setLibrary: (library: ethers.providers.Web3Provider) => {},
  // account (has the walletID)
  account: undefined,
  setAccount: (acc: string) => {},
  // connect wallet
  connectWallet: async () => {},
  // disconnect wallet, resets most states above
  disconnectWallet: () => {},
})

// wrapper for _app.tsx
export const Web3ContextWrapper = ({ children }: { children: ReactChild }) => {
  const [web3Modal, setWeb3Modal] = useState<Web3Modal>()
  const [provider, setProvider] = useState<BaseProvider>()
  const [library, setLibrary] = useState<ethers.providers.Web3Provider>()
  const [account, setAccount] = useState<string>()
  const [network, setNetwork] = useState<ethers.providers.Network>()
  const [chainId, setChainId] = useState<number>()
  const [active, setActive] = useState<boolean>(false)

  // set the Web3Modal on first load
  useEffect(() => {
    // opt: give providers
    setWeb3Modal(new Web3Modal())
  }, [])

  const connectWallet = async () => {
    if (!web3Modal) return
    try {
      const provider = await web3Modal.connect()
      const library = new ethers.providers.Web3Provider(
        provider,
        "any" // important! https://github.com/NoahZinsmeister/web3-react/issues/127
      )
      const accounts = await library.listAccounts()
      const network = await library.getNetwork()

      setProvider(provider)
      setLibrary(library)

      // TODO: is this safe?
      if (accounts) setAccount(accounts[0])
      setNetwork(network)
      setChainId(network.chainId)

      setActive(true)
    } catch (error) {
      // TODO: better error handle
      console.error(error)
    }
  }

  const disconnectWallet = () => {
    if (!web3Modal) return
    try {
      web3Modal.clearCachedProvider()
      setAccount("")
      setNetwork(undefined)
      setActive(false)
    } catch (error) {
      // TODO: better error handle
      console.error(error)
    }
  }

  // Check if the network is correct
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("accountsChanged", accounts)
        if (accounts) setAccount(accounts[0])
      }

      const handleChainChanged = (chainId: number) => {
        setChainId(hexToDecimal(chainId))
      }

      const handleDisconnect = () => {
        console.log("wallet disconnect")
        disconnectWallet()
      }

      // attach listeners
      provider.on("accountsChanged", handleAccountsChanged)
      provider.on("chainChanged", handleChainChanged)
      provider.on("disconnect", handleDisconnect)

      // remove listeners on unmount
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged)
          provider.removeListener("chainChanged", handleChainChanged)
          provider.removeListener("disconnect", handleDisconnect)
        }
      }
    }
  }, [provider])

  return (
    <Web3Context.Provider
      value={{
        active,
        setActive,
        network,
        setNetwork,
        chainId,
        setChainId,
        library,
        setLibrary,
        account,
        setAccount,
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
