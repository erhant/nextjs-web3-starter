import { createContext, ReactChild, useContext, useState, useEffect } from "react"
import Web3Modal from "web3modal"
import { ethers } from "ethers"

type Web3ContextType = {
  active: boolean
  setActive: (isActive: boolean) => void
  network: ethers.providers.Network | undefined
  setNetwork: (network: ethers.providers.Network) => void
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
  setActive: (isActive: boolean) => {},
  // network (also has chainID)
  network: undefined,
  setNetwork: (network: ethers.providers.Network) => {},
  // library (used to request methods)
  library: undefined,
  setLibrary: (library: ethers.providers.Web3Provider) => {},
  // account (has the walletID)
  account: undefined,
  setAccount: (acc: string) => {},
  // connect wallet
  connectWallet: async () => {},
  // disconnect wallet, resets most states above
  disconnectWallet: async () => {},
})

// wrapper for _app.tsx
export const Web3ContextWrapper = ({ children }: { children: ReactChild }) => {
  const [web3Modal, setWeb3Modal] = useState<Web3Modal>()
  const [provider, setProvider] = useState()
  const [library, setLibrary] = useState<ethers.providers.Web3Provider>()
  const [account, setAccount] = useState<string>()
  const [network, setNetwork] = useState<ethers.providers.Network>()
  const [active, setActive] = useState<boolean>(false)

  // set the Web3Modal on first load
  useEffect(() => {
    // opt: give providers
    setWeb3Modal(new Web3Modal())
  }, [])

  // connect the injected wallet (prompts user)
  const connectWallet = async () => {
    if (!web3Modal) return
    try {
      const provider = await web3Modal.connect()
      const library = new ethers.providers.Web3Provider(provider)
      const accounts = await library.listAccounts()
      const network = await library.getNetwork()

      setProvider(provider)
      setLibrary(library)

      // TODO: is this safe?
      if (accounts) setAccount(accounts[0])
      setNetwork(network)

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

  return (
    <Web3Context.Provider
      value={{
        active,
        setActive,
        network,
        setNetwork,
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
