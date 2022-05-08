import type { NextPage } from "next"
import Layout from "../components/layout"
import { List, Text, Title, Anchor } from "@mantine/core"

const Home: NextPage = () => {
  return (
    <Layout>
      <>
        <Title order={1} sx={{ textAlign: "center" }}>
          Welcome.
        </Title>
        <Text my="sm">This is a frontend starter repository that uses:</Text>
        <List>
          <List.Item>
            <Anchor href="https://nextjs.org/">NextJS</Anchor>
          </List.Item>
          <List.Item>
            <Anchor href="https://www.typescriptlang.org/">TypeScript</Anchor>
          </List.Item>
          <List.Item>
            <Anchor href="https://mantine.dev/">MantineUI</Anchor>
          </List.Item>
          <List.Item>
            <Anchor href="https://tabler-icons-react.vercel.app/">Tabler React Icons</Anchor>
          </List.Item>
          <List.Item>
            <Anchor href="https://github.com/Web3Modal/web3modal">Web3Modal</Anchor>
          </List.Item>
          <List.Item>
            <Anchor href="https://docs.ethers.io/v5/">Ethers</Anchor>
          </List.Item>
        </List>
        <Text my="sm">
          You can connect via injected wallet (e.g. <Anchor href="https://metamask.io/">MetaMask</Anchor>) and this will
          enable access to your wallet via a custom context. You can then use this context to interact with Web3. For
          starters, click on the wallet icon to see your wallet details. To change the wallet connection logic, change
          `context/web3.context.tsx`.
        </Text>
        <Text my="sm">
          The template also has a premade layout component, and supports dark/light theme. To change theme, click on the
          sun icon on the top right.
        </Text>
        <Title>
          <Anchor href="contract/counter">Counter Contract</Anchor>
        </Title>
      </>
    </Layout>
  )
}

export default Home
