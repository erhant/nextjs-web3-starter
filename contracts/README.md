# Contracts

I have modified the starter kit of [rhlsthrm](https://github.com/rhlsthrm/typescript-solidity-dev-starter-kit) for my project. See the original [README](./LEGACY.md).

1. Write your contract under [contracts](./contracts/).
2. Compile it via `npx hardhat compile`.
3. Test the contract using `npx hardhat test`.
4. Deploy the compiled contract.
   - Use `npx hardhat run ./scripts/deploy-greeter.js`.
   - Or start local network via `npx hardhat node` and then deploy with `npx hardhat run ./scripts/deploy-greeter.js --network localhost` ([see more](https://hardhat.org/getting-started/#connecting-a-wallet-or-dapp-to-hardhat-network))
5. It is now ready to be used on the frontend!
