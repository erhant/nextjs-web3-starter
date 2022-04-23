import { Button, useMantineColorScheme } from "@mantine/core"

const ThemeToggleButton = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return <Button onClick={() => toggleColorScheme()}>{colorScheme === "dark" ? "Lights on" : "Lights off"}</Button>
}

export default ThemeToggleButton
