import { ethers } from "hardhat"
async function main() {
  const factory = await ethers.getContractFactory("Counter")

  // If we had constructor arguments, they would be passed into deploy()
  let contract = await factory.deploy()

  console.log(`Deploying the contract... (transaction: ${contract.deployTransaction.hash})`)

  await contract.deployed()

  console.log(`Contract is deployed at ${contract.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
