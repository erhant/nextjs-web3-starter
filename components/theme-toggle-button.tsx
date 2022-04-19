import { Button, useMantineColorScheme } from "@mantine/core"

const ThemeToggleButton = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <Button onClick={() => toggleColorScheme()}>{colorScheme === "dark" ? "Use Light Theme" : "Use Dark Theme"}</Button>
  )
}

export default ThemeToggleButton
