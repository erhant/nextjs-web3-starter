# NextJS + Web3 Starter

This is a frontend starter repository for decentralized application (dApp) development. It uses my [contract playground](https://github.com/erhant/contract-playground) code as a submodule. To retrieve those, you can:

```bash
git clone <this repo>
git submodule init
git submodule update
```

or you can clone this repo with `--recurse-submodules` option instead of the extra `submodule` steps.

## Usage

Here is the workflow you should follow for **development**:

1. Write your contract under the contract playground folder, which is a submodule specifically for writing contracts.
2. Compile with `yarn compile` or test with `yarn test`. To use the contract typings from here, run `migrate-types.sh` at the root directory.
3. This will allow you to access contract types and factories from frontend, without having the need to manually write any ABI-related code.
4. On a separate terminal, start a node with `npx hardhat node`, or equivalent `yarn node:start`.
5. Deploy the compiled contract to your localhost with `npx hardhat run --network localhost <your-script>`, or equivalent `yarn node:run <your-script>`.
6. Write the contract address in your frontend code, and run the app with `yarn run dev`.
7. You are ready to interact with the contract!

To connect to the localhost from MetaMask, change the chainId of localhost to be `31337`. You can then import one of the public accounts (with known private keys) to your MetaMask, and interact with the contract using the ETH there. If you get internal errors from MetaMask such as _different block number_ or _nonce too high_, reset your account from `Settings > Advanced > Reset Account`. This will make your injected wallet use local hardhat information instead of the cached one from your previous session.

## Deployment

Project is deployed via Vercel CLI from the root directory with `vercel .`. In the project settings, the root directory is shown to be `frontend` and the preset settings are set for NextJS. I prefer this as otherwise Typechain generated files wont be visible there, and if you try to compile stuff with Hardhat you will get an error for trying to use Hardhat non-locally.

## Formatting & Linting

- The frontend codes are formatted & linted with respect to [Google TypeScript Styleguide](https://google.github.io/styleguide/tsguide.html) using [GTS](https://github.com/google/gts).
- SCSS codes are formatted by [SCSS Formatter](https://marketplace.visualstudio.com/items?itemName=sibiraj-s.vscode-scss-formatter).
