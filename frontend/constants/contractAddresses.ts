import { ethers } from "ethers"
import contractConstants from "./contractConstants"

// write addresses here, or read them from environment
const contractAddresses: Readonly<{ [contractName: string]: { [chainId: number]: string | undefined } }> = {
  [contractConstants.Counter.contractName]: {
    31337: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  },
  [contractConstants.MyToken.contractName]: {
    31337: undefined,
  },
}

/**
 * Gets the contract address, with respect to the contract name and chainId.
 *
 * @param {string} contractName name of the contract you want to connect
 * @param {number} chainId chainId of the chain where the contract is deployed at (e.g. 31337)
 * @throws
 *  if contract name does not exist,
 *  if the chainId is not listed under the contract name,
 *  if the address is explicitly undefined,
 *  if the address format is invalid
 */
function getContractAddress(contractName: string, chainId: number): string {
  // check if contract name is in the list
  if (!(contractName in contractAddresses)) throw new Error("No such contract: " + contractName)

  // check if contract address is added
  if (!(chainId in contractAddresses[contractName])) throw new Error("Contract not in chainId: " + chainId)

  const addr = contractAddresses[contractName][chainId]

  // you might intentionally set address to undefined during development
  if (addr == undefined) throw new Error("Address not yet defined.")
  if (!ethers.utils.isAddress(addr)) throw new Error("Invalid address format.")

  return addr
}

export default getContractAddress
