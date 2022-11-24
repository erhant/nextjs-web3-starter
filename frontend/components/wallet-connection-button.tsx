import {Button} from '@mantine/core';
import {FC} from 'react';
// import {useWalletContext} from '../context/wallet.context';
import {useAccount, useConnect, useDisconnect, chain} from 'wagmi';
import {MetaMaskConnector} from 'wagmi/connectors/metaMask';

const WalletConnectionButton: FC = () => {
  // const {disconnectWallet, connectWallet, wallet} = useWalletContext();
  const {address, isConnected} = useAccount();
  const {connect, connectors} = useConnect();
  const {disconnect} = useDisconnect();

  return (
    <Button
      onClick={() => (isConnected ? disconnect() : connect({connector: connectors[0]}))}
      variant="gradient"
      gradient={{from: 'secondary', to: 'primary', deg: 42}}
    >
      {isConnected ? 'Disconnect' : 'Connect'}
    </Button>
  );
};

export default WalletConnectionButton;
