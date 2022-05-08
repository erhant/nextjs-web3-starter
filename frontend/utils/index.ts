import { BigNumber } from "ethers"

export function truncateAccount(acc: string): string {
  if (acc !== "") return acc.slice(0, 5) + "..." + acc.slice(-3)
  else return ""
}

export function decimalToHex(num: number) {
  return "0x" + num.toString(16)
}

export function hexToDecimal(hex: number) {
  return parseInt(hex.toString(), 16)
}

export function blockTimestampToDate(timestamp: number): Date {
  return new Date(timestamp * 1000) // converts to ms, and then to number
}

export function blockBigTimestampToDate(timestamp: BigNumber): Date {
  return new Date(timestamp.mul(1000).toNumber()) // converts to ms, and then to number
}

export function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}
