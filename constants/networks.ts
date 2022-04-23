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

// TODO: add chains above like this one below (hex)
const networks: {
  [chainId: string]: {
    chainName: string
    nativeCurrency: {
      name: string
      decimals: number
      symbol: string
    }
  }
} = {
  // Ethereum Mainnet
  "1": {
    chainName: "Ethereum Mainnet",
    nativeCurrency: { name: "ETH", decimals: 18, symbol: "ETH" },
  },
  // Binance Smart Chain
  "56": {
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: { name: "BNB", decimals: 18, symbol: "BNB" },
  },
  // Avalanche C-Chain
  "43114": {
    chainName: "Avalanche C-Chain",
    nativeCurrency: { name: "AVAX", decimals: 18, symbol: "AVAX" },
  },
  // Fantom Opera
  "250": {
    chainName: "Fantom Opera",
    nativeCurrency: { name: "FTM", decimals: 18, symbol: "FTM" },
  },
  // Polygon Mainnet
  "137": {
    chainName: "Polygon Mainnet",
    nativeCurrency: { name: "MATIC", decimals: 18, symbol: "MATIC" },
  },
  // Moonriver
  "1285": {
    chainName: "Moonriver",
    nativeCurrency: { name: "MOVR", decimals: 18, symbol: "MOVR" },
  },
  // Moonbeam
  "1284": {
    chainName: "Moonbeam",
    nativeCurrency: { name: "GLMR", decimals: 18, symbol: "GLMR" },
  },
}

export default networks
