export function truncateAccount(acc: string): string {
  return acc.slice(0, 5) + "..." + acc.slice(-3)
}

export function decimalToHex(num: number) {
  return "0x" + num.toString(16)
}

export function hexToDecimal(hex: number) {
  return parseInt(hex.toString(), 16)
}
