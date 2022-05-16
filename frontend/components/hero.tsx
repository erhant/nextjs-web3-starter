import { FC, ReactNode } from "react"
import { Box, Group, Paper } from "@mantine/core"

const Hero: FC<{ left: ReactNode; right: ReactNode }> = ({ left, right }) => {
  return (
    <Box py={50} px={25}>
      <Group sx={{ width: "100%" }} position="apart">
        {left}
        {right}
      </Group>
    </Box>
  )
}

export default Hero
