import { ethers } from "hardhat"
import chai from "chai"
import chaiAsPromised from "chai-as-promised"
//@ts-ignore // the objects here are created by typechain
import { Counter__factory, Counter } from "../../frontend/types/typechain"
import { Signer } from "ethers"
import contractConstants from "../../frontend/constants/contractConstants"

chai.use(chaiAsPromised)
const { expect } = chai

describe(contractConstants.Counter.contractName, () => {
  let counterContract: Counter
  let owner: Signer
  let signers: Signer[]

  beforeEach(async () => {
    ;[owner, ...signers] = await ethers.getSigners()

    const counterFactory = (await ethers.getContractFactory(
      contractConstants.Counter.contractName,
      owner
    )) as Counter__factory
    counterContract = await counterFactory.deploy()
    await counterContract.deployed()
  })

  describe("deployment", async () => {
    expect(await counterContract.getCount()).to.eq(0)
    expect(counterContract.address).to.properAddress
  })

  describe("count up", async () => {
    it("should count up", async () => {
      await counterContract.countUp()
      let count = await counterContract.getCount()
      expect(count).to.eq(1)
    })
  })

  describe("count down", async () => {
    it("should count down", async () => {
      await counterContract.countUp()

      await counterContract.countDown()
      const count = await counterContract.getCount()
      expect(count).to.eq(0)
    })
  })

  it("should fail due to underflow exception", () => {
    return expect(counterContract.countDown()).to.eventually.be.rejectedWith(
      Error,
      "VM Exception while processing transaction: reverted with panic code 0x11 (Arithmetic operation underflowed or overflowed outside of an unchecked block)"
    )
  })
})
