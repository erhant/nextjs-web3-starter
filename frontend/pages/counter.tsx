import {NextPage} from 'next';
// import {useWalletContext} from '../context/wallet.context';
import {Counter__factory, Counter as CounterContract} from '../types/typechain/';
import {useEffect, useState} from 'react';
import Layout from '../components/layout';
import {Text, Group, Title, Box, ActionIcon} from '@mantine/core';
import {notify, notifyError, notifyTransaction, notifyTransactionUpdate} from '../utils/notify';
import {IconRefresh, IconArrowUpCircle, IconArrowDownCircle} from '@tabler/icons';
import getContractAddress from '../constants/addresses';
import {truncateAddress} from '../utils/utility';
import {useAccount, useSigner} from 'wagmi';

const CounterContractPage: NextPage = () => {
  const {data} = useSigner();
  const [contract, setContract] = useState<CounterContract>();
  // contract view states
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (data) {
      try {
        const contractAddress = getContractAddress('Counter', 31337); // todo: give chain id dynamically here
        // TODO: add deployment check here
        notify('Contract Connected', 'Connected to ' + truncateAddress(contractAddress), 'success');
        setContract(Counter__factory.connect(contractAddress, data));
      } catch (e: any) {
        notifyError(e, 'Contract Not Found', false);
      }
    }

    return () => {
      setContract(undefined);
    };
  }, [data]);

  // on contract load
  useEffect(() => {
    if (contract == undefined) return;

    // get current count
    contract.getCount().then(
      count => setCount(count.toNumber()),
      e => notifyError(e, 'getCount')
    );

    // subscribe to events
    contract.on(contract.filters.CountedTo(), newCount => {
      notify('Event Listened', 'CountedTo event returned ' + newCount.toNumber(), 'info');
      setCount(newCount.toNumber());
    });

    return () => {
      // unsubscribe from events
      contract.removeAllListeners();
    };
  }, [contract]);

  // refresh the count (alternative to events)
  const handleRefresh = async () => {
    if (contract) {
      try {
        const count = await contract.getCount();
        setCount(count.toNumber());
      } catch (e: any) {
        notifyError(e);
      }
    }
  };

  // increment counter
  const handleCountUp = async () => {
    if (contract) {
      try {
        const tx = await contract.countUp();
        const nid = notifyTransaction(tx);
        try {
          await tx.wait();
          notifyTransactionUpdate(nid, 'Counted up!', 'success');
        } catch (e: any) {
          notifyTransactionUpdate(nid, 'Failed countUp.', 'error');
          notifyError(e);
        }
      } catch (e: any) {
        notifyError(e);
      }
    }
  };

  // decrement counter
  const handleCountDown = async () => {
    if (contract) {
      try {
        const tx = await contract.countDown();
        const nid = notifyTransaction(tx);
        try {
          await tx.wait();
          notifyTransactionUpdate(nid, 'Counted down!', 'success');
        } catch (e: any) {
          notifyTransactionUpdate(nid, 'Failed countDown.', 'error');
          notifyError(e);
        }
      } catch (e: any) {
        notifyError(e);
      }
    }
  };

  return (
    <Layout>
      {contract ? (
        <>
          <Box my="xl" mx="auto" sx={{textAlign: 'center', width: '70%'}}>
            <Title>A Simple Counter Contract</Title>
            <Text>
              The contract simply stores one 256-bit unsigned integer in it. You can increment and decrement this
              counter, each of which is a transaction. If the count goes below 0, the transaction is rejected. The
              counting event is subscribed automatically, but there is also a refresh button as an example.
            </Text>
          </Box>
          <Box my="xl">
            <Text size="xl" sx={{textAlign: 'center'}}>
              <b>Count:</b> {count}
            </Text>
          </Box>

          <Group my="xl" position="center">
            <ActionIcon onClick={handleCountUp} color="secondary">
              <IconArrowUpCircle />
            </ActionIcon>
            <ActionIcon onClick={handleCountDown} color="secondary">
              <IconArrowDownCircle />
            </ActionIcon>
            <ActionIcon onClick={handleRefresh}>
              <IconRefresh />
            </ActionIcon>
          </Group>
        </>
      ) : (
        <Title p="xl">Please connect your wallet first.</Title>
      )}
    </Layout>
  );
};

export default CounterContractPage;
