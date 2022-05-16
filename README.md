# NextJS + TypeScript + Web3 Starter

This repository has both the frontend, and the contracts.

- [Frontend](./frontend/) is using NextJS + TypeScript. It uses MantineUI, but also supports SASS for further styling.
- [Contracts](./contracts/) is using HardHat + TypeScript. Furthermore, TypeChain is used to generate interfaces for the contracts.

## Usage

Here is the workflow you should follow for **development**:

1. Write your contract, compile it with `npx hardhat compile`.
2. On a separate terminal, start a node with `npx hardhat node`.
3. Deploy the compiled contract to your localhost with `npx hardhat run ./scripts/<your script> --network localhost`.
4. Write the contract address in your frontend code, and run the app with `npm run dev`.
5. You are ready to interact with the contract!

To connect the localhost from MetaMask, change the chainId of localhost to be `31337`. You can then import one of the public accounts (with known private keys) to your MetaMask, and interact with the contract using the ETH there.

If your get internal errors from MetaMask (such as _different block number_ or _nonce too high_) reset your account from `Settings > Advanced > Reset Account`. This will make the wallet use local hardhat info instead of the cached one.

## Examples

An example of Counter contract is provided. See the page [here](./frontend/pages/contract/counter.tsx) and contract [here](./contracts/contracts/Counter.sol).
