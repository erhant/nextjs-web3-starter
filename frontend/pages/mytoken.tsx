import {NextPage} from 'next';
import {MyERC20__factory, MyERC20 as MyERC20Contract} from '../types/typechain/';
import {useEffect, useState} from 'react';
import Layout from '../components/layout';
import {Button, Text, Group, Title, Box, TextInput, NumberInput} from '@mantine/core';
import {notify, notifyError, notifyTransaction, notifyTransactionUpdate} from '../utils/notify';
import {BigNumber, ethers} from 'ethers';
import getContractAddress from '../constants/addresses';
import {formatUnits, parseUnits} from 'ethers/lib/utils';
import {truncateAddress} from '../utils/utility';
import {useSigner, useNetwork, useAccount} from 'wagmi';

const MyERC20ContractPage: NextPage = () => {
  const {data} = useSigner();
  const {chain} = useNetwork();
  const {address} = useAccount();
  const [contract, setContract] = useState<MyERC20Contract>();
  // contract view states
  const [tokenInfo, setTokenInfo] = useState<{totalSupply: number; name: string; symbol: string; decimals: number}>({
    totalSupply: 0,
    name: '',
    symbol: '',
    decimals: 18,
  });
  const [balance, setBalance] = useState(0);
  // interactions
  const [tokenAmount, setTokenAmount] = useState(0);
  const [targetAddress, setTargetAddress] = useState('');

  // wallet related effects
  useEffect(() => {
    if (data && chain) {
      try {
        const contractAddress = getContractAddress('MyERC20', chain.id); // get chain id here
        // TODO: add deployment check here
        notify('Contract Connected', 'Connected to ' + truncateAddress(contractAddress), 'success');
        setContract(MyERC20__factory.connect(contractAddress, data));
      } catch (e: any) {
        notifyError(e, 'Contract Not Found', false);
      }
    }

    return () => {
      setContract(undefined);
    };
  }, [data, chain]);

  // contract related effects
  useEffect(() => {
    if (!contract) return;
    Promise.all([contract.totalSupply(), contract.name(), contract.symbol(), contract.decimals()])
      .then(results => {
        let [totalSupply, name, symbol, decimals] = results;
        setTokenInfo({
          totalSupply: Number(formatUnits(totalSupply, decimals)),
          name,
          symbol,
          decimals,
        });
      })
      .catch(e => notifyError(e, 'error retrieving tokenInfo'));
  }, [contract]);

  // account & token related effects
  useEffect(() => {
    if (!contract || !address) return;

    // get initial balance of this address
    contract.balanceOf(address).then(
      balance => setBalance(Number(formatUnits(balance, tokenInfo.decimals))),
      e => notifyError(e, 'balanceOf')
    );

    // @todo: events are getting too much, we just want to subscribe to them from the point of login
    const listenTransfer: ethers.providers.Listener = (from: string, to: string, value: BigNumber) => {
      if (from == address) {
        notify(
          'Transfer',
          `Sent ${formatUnits(value, tokenInfo.decimals)} ${tokenInfo.symbol} to ${truncateAddress(to)}`,
          'info'
        );
      } else if (to == address) {
        notify(
          'Transfer',
          `Received ${formatUnits(value, tokenInfo.decimals)} ${tokenInfo.symbol} to ${truncateAddress(from)}`,
          'info'
        );
      }

      // update balance
      contract.balanceOf(address).then(
        balance => setBalance(Number(formatUnits(balance, tokenInfo.decimals))),
        e => notifyError(e, 'balanceOf')
      );
    };
    const listenApproval: ethers.providers.Listener = (owner: string, spender: string, value: BigNumber) => {
      notify(
        'Approval',
        `${truncateAddress(owner)} gave ${formatUnits(value, tokenInfo.decimals)} ${tokenInfo.symbol} allowance.`,
        'info'
      );
    };

    contract.on(contract.filters.Transfer(address, null), listenTransfer);
    contract.on(contract.filters.Transfer(null, address), listenTransfer);
    contract.on(contract.filters.Approval(null, address), listenApproval);

    return () => {
      contract.off(contract.filters.Transfer(address, null), listenTransfer);
      contract.off(contract.filters.Transfer(null, address), listenTransfer);
      contract.off(contract.filters.Approval(null, address), listenApproval);
    };
  }, [contract, address, tokenInfo]);

  const handleSend = async () => {
    if (contract) {
      try {
        const tx = await contract.transfer(targetAddress, parseUnits(tokenAmount.toString(), tokenInfo.decimals));
        const nid = notifyTransaction(tx);
        try {
          await tx.wait();
          notifyTransactionUpdate(nid, `Sent ${tokenAmount} ${tokenInfo.symbol}!`, 'success');
        } catch (e: any) {
          notifyTransactionUpdate(nid, `Failed transfer.`, 'error');
          notifyError(e);
        }
      } catch (e: any) {
        notifyError(e);
      }
    }
  };

  const handleReceive = async () => {
    if (contract && address) {
      try {
        const tx = await contract.transferFrom(
          targetAddress,
          address,
          parseUnits(tokenAmount.toString(), tokenInfo.decimals)
        );
        const nid = notifyTransaction(tx);

        try {
          await tx.wait();
          notifyTransactionUpdate(nid, `Received ${tokenAmount} tokens!`, 'success');
        } catch (e: any) {
          notifyTransactionUpdate(nid, `Failed transferFrom.`, 'error');
          notifyError(e);
        }
      } catch (e: any) {
        notifyError(e);
      }
    }
  };
  const handleApprove = async () => {
    if (contract) {
      try {
        const tx = await contract.approve(targetAddress, parseUnits(tokenAmount.toString(), tokenInfo.decimals));
        const nid = notifyTransaction(tx);
        try {
          await tx.wait();
          notifyTransactionUpdate(
            nid,
            `Approved ${truncateAddress(targetAddress)} for ${tokenAmount} tokens!`,
            'success'
          );
        } catch (e: any) {
          notifyTransactionUpdate(nid, `Failed approve.`, 'error');
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
          {/* welcome message */}
          <Box my="xl" mx="auto" sx={{textAlign: 'center', width: '70%'}}>
            <Title>An ERC-20 Token Contract</Title>
            <Text>
              You can send tokens to an address, receive tokens from an address (if they have given you allowance), or
              give allowance to someone. You can also see your balance.
            </Text>
          </Box>

          {/* balance and token info */}
          <Box my="xl">
            <Text size="xl" sx={{textAlign: 'center'}}>
              <b>{tokenInfo.name} Balance:</b> {balance + ' ' + tokenInfo.symbol}
              <br />
              <b>Total Supply:</b> {tokenInfo.totalSupply + ' ' + tokenInfo.symbol}
            </Text>
          </Box>

          {/* interactions */}
          <Group position="center">
            <TextInput
              value={targetAddress}
              placeholder="paste address here"
              onChange={e =>
                (e.currentTarget.value == '' || ethers.utils.isAddress(e.currentTarget.value)) &&
                setTargetAddress(e.currentTarget.value)
              }
              label="Target Address"
            />
            <NumberInput
              value={tokenAmount}
              onChange={val => val && setTokenAmount(val)}
              label="Token Amount"
              min={0}
              max={tokenInfo.totalSupply}
            />
          </Group>
          <Group my="xl" position="center">
            <Button onClick={handleSend} color="secondary">
              Transfer To
            </Button>
            <Button onClick={handleReceive} color="secondary">
              Transfer From
            </Button>
            <Button onClick={handleApprove} color="primary">
              Approve
            </Button>
          </Group>
        </>
      ) : (
        <Title p="xl">Please connect your wallet first.</Title>
      )}
    </Layout>
  );
};

export default MyERC20ContractPage;
