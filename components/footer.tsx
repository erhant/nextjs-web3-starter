import { Anchor, Box, Text } from "@mantine/core"

const Footer = () => {
  return (
    <Box component="footer" my="md" py="md" sx={{ textAlign: "center", borderTop: "1px solid lightgray" }}>
      <Text>
        Made with &hearts; by <Anchor href="https://github.com/erhant">erhant</Anchor>
      </Text>
    </Box>
  )
}

export default Footer
