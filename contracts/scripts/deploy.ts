import { ethers } from "hardhat"
async function main() {
  const contracts: string[] = ["Counter"]
  for (const c of contracts) {
    console.log(`\n[${c} Contract]`)
    const factory = await ethers.getContractFactory(c)
    let contract = await factory.deploy() // pass constructor args here if needed
    console.log(`\tDeploying... (tx: ${contract.deployTransaction.hash})`)
    await contract.deployed()
    // remove last line
    process.stdout.moveCursor(0, -1)
    process.stdout.clearLine(1)
    console.log(`\t${c} Contract is deployed at ${contract.address}`)
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
