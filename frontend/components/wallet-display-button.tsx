import {Popover, ActionIcon, Title, Group, Stack, Text, Image} from '@mantine/core';
import {BigNumber} from 'ethers';
import {formatEther} from 'ethers/lib/utils';
import {useState, useEffect, FC} from 'react';
import {IconWallet} from '@tabler/icons';
// import getNetwork, {unknownNetwork} from '../constants/networks';
// import {useWalletContext} from '../context/wallet.context';
import {truncateAddress} from '../utils/utility';
import {useBalance, useAccount} from 'wagmi';

const WalletDisplayButton: FC = () => {
  // const {wallet} = useWalletContext();
  const {address, isConnected, connector} = useAccount();
  const {data} = useBalance({
    address,
  });

  const [opened, setOpened] = useState(false);

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <ActionIcon disabled={!isConnected} onClick={() => setOpened(o => !o)}>
          <IconWallet size="1.2em" />
        </ActionIcon>
      }
      width="min(90vw,500px)"
      position="bottom"
      withArrow
      withCloseButton
    >
      {isConnected && connector && address ? (
        <Group position="apart">
          <Stack>
            {/* Network Details */}
            <Title order={2}>Network</Title>
            <Text size="xl">{connector.name}</Text>
            {/* <Text color="dimmed">Chain ID: {wallet.chainId}</Text> */}

            {/* Wallet Details */}
            <Title order={2} mt="md">
              Wallet ID
            </Title>
            <Text>{truncateAddress(address)}</Text>

            {/* Balance */}
            <Title order={2} mt="md">
              Balance
            </Title>
            <Text>{data?.formatted}</Text>
          </Stack>
        </Group>
      ) : (
        <Title p="lg">Wallet not connected.</Title>
      )}
    </Popover>
  );
};

export default WalletDisplayButton;
