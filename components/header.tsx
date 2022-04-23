import { Box, Text } from "@mantine/core"

const Header = () => {
  return (
    <Box component="header" my="md" py="md" sx={{ textAlign: "center", borderBottom: "1px solid lightgray" }}>
      <Text sx={{ textAlign: "center" }}>Header</Text>
    </Box>
  )
}

export default Header
