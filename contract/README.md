# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

# Usage Scenario

1. Write your contract under [contracts](./contracts/).
2. Compile it via `npx hardhat compile`.
3. Deploy the compiled contract.
   - Use `npx hardhat run ./scripts/deploy-greeter.js`.
   - Or start local network via `npx hardhat node` and then deploy with `npx hardhat run ./scripts/deploy-greeter.js --network localhost` ([see more](https://hardhat.org/getting-started/#connecting-a-wallet-or-dapp-to-hardhat-network))
4. Test the deployed contract via `npx hardhat test`.

By default, `hardhat` runs a local network to deploy the contract. To use this local network with a frontend, you can deploy via `npx hardhat run ./scripts/deploy-greeter.js`
