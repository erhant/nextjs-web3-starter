# NextJS + TS + MantineUI + Web3 Starter

My Web3 frontend starter kit.

- [x] Supports SASS/SCSS.
- [x] Supports light/dark theme switching via Mantine Themes.
- [x] Mantine Theme override provided.
- [x] Web3 Injected Wallet integrated with a context provider.
- [x] Notifications via Mantine Notifications.
- [x] Uses TypeChain to type-check smart contracts

Build your contracts under [contract](./contract) folder with hardhat. The setup there has been taken from [here](https://github.com/rhlsthrm/typescript-solidity-dev-starter-kit).

## Usage

Just `npm install` and then follow NextJS instructions. Basically, `npm run dev` to start development on your localhost.

## Resources

- [Web3Modal demo](https://codesandbox.io/s/web3modal-demo-j43b10?file=/src/networks.js:0-695)
- [MantineUI + NextJS](https://mantine.dev/theming/next/)
- [Mantine Notifications](https://mantine.dev/others/notifications/)
- [Mantine Themes](https://mantine.dev/theming/mantine-provider/)

## Hardhat Usage

1. Write your contract under [contracts](./contracts/).
2. Compile it via `npx hardhat compile`.
3. Deploy the compiled contract.
   - Use `npx hardhat run ./scripts/deploy-greeter.js`.
   - Or start local network via `npx hardhat node` and then deploy with `npx hardhat run ./scripts/deploy-greeter.js --network localhost` ([see more](https://hardhat.org/getting-started/#connecting-a-wallet-or-dapp-to-hardhat-network))
4. Test the deployed contract via `npx hardhat test`.

By default, `hardhat` runs a local network to deploy the contract. To use this local network with a frontend, you can deploy via `npx hardhat run ./scripts/deploy-greeter.js`
