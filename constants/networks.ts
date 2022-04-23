const chainIDs: number[] = [
  1, // Ethereum Mainnet (ETH)
  3, // Ropsten Testnet (ETH)
  4, // Rinkeby Testnet (ETH)
  5, // Goerli Testnet (ETH)
  42, // Kovan Testnet (ETH)
  56, // Binance Smart Chain Mainnet (BNB)
  137, // Polygon Mainnet (MATIC)
  250, // Fantom Opera (FTM)
  1284, // Moonbeam (GLMR)
  1285, // Moonriver (MOVR)
  43114, // Avalanche C-Chain (AVAX)
]

export default chainIDs

// TODO: add chains above like this one below (hex)
export const networkParams: {
  [key: string]: {
    chainId: string // hexadecimal
    rpcUrls: string[]
    chainName: string
    nativeCurrency: {
      name: string
      decimals: number
      symbol: string
    }
    blockExplorerUrls: string[]
    iconUrls: string[]
  }
} = {
  "0x63564c40": {
    chainId: "0x63564c40",
    rpcUrls: ["https://api.harmony.one"],
    chainName: "Harmony Mainnet",
    nativeCurrency: { name: "ONE", decimals: 18, symbol: "ONE" },
    blockExplorerUrls: ["https://explorer.harmony.one"],
    iconUrls: ["https://harmonynews.one/wp-content/uploads/2019/11/slfdjs.png"],
  },
  "0xa4ec": {
    chainId: "0xa4ec",
    rpcUrls: ["https://forno.celo.org"],
    chainName: "Celo Mainnet",
    nativeCurrency: { name: "CELO", decimals: 18, symbol: "CELO" },
    blockExplorerUrls: ["https://explorer.celo.org"],
    iconUrls: ["https://celo.org/images/marketplace-icons/icon-celo-CELO-color-f.svg"],
  },
}
