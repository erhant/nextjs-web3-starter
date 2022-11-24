import {AppProps} from 'next/app';
import {useState} from 'react';
import Head from 'next/head';
// global styles
import '../styles/globals.scss';
// mantine theming
import yourMantineTheme from '../themes/mantine';
import {MantineProvider, ColorScheme, ColorSchemeProvider} from '@mantine/core';

import {NotificationsProvider} from '@mantine/notifications';
// web3 connection
import {WagmiConfig, createClient, defaultChains, configureChains} from 'wagmi';
import {publicProvider} from 'wagmi/providers/public';
import {MetaMaskConnector} from 'wagmi/connectors/metaMask';

// create Wagmi client
const myChains = [
  // local hardhat
  {
    id: 31337,
    name: 'Hardhat Local',
    network: 'hardhat',
    nativeCurrency: {
      decimals: 18,
      name: 'Ethereum',
      symbol: 'ETH',
    },
    rpcUrls: {
      default: 'http://localhost:8545',
    },
    blockExplorers: {
      default: {name: '', url: ''},
    },
    testnet: true,
  },
  ...defaultChains,
];
const {chains, provider, webSocketProvider} = configureChains(myChains, [publicProvider()]);
const client = createClient({
  // autoConnect: true,
  connectors: [new MetaMaskConnector({chains})],
  provider,
  webSocketProvider,
});

export default function App(props: AppProps & {colorScheme: ColorScheme}) {
  const {Component, pageProps} = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    // NOTE: if you want to, set cookie here
  };

  return (
    <>
      <Head>
        <title>NextJS + Web3 Starter</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="description" content="A NextJS + Web3 starter template, supporting Hardhat with TypeScript." />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            ...yourMantineTheme,
            colorScheme,
            // you can change primaryColor w.r.t colorScheme here
          }}
        >
          <WagmiConfig client={client}>
            <NotificationsProvider>
              <Component {...pageProps} />
            </NotificationsProvider>
          </WagmiConfig>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
