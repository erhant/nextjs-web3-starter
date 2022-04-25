import type { MantineThemeOverride } from "@mantine/core"

// theme colors must be a 10-tuple string of colors
type ThemeColor = [string, string, string, string, string, string, string, string, string, string]

// your primary color
const primary: ThemeColor = [
  "#F3F0FF",
  "#E5DBFF",
  "#D0BFFF",
  "#B197FC",
  "#9775FA",
  "#845EF7",
  "#7950F2",
  "#7048E8",
  "#6741D9",
  "#5F3DC4",
]
// your secondary color
const secondary: ThemeColor = [
  "#FFF4E6",
  "#FFE8CC",
  "#FFD8A8",
  "#FFC078",
  "#FFA94D",
  "#FF922B",
  "#FD7E14",
  "#F76707",
  "#E8590C",
  "#D9480F",
]
const yourMantineTheme: MantineThemeOverride = {
  colors: {
    primary,
    secondary,
  },
  fontFamily:
    "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
  fontFamilyMonospace: "Courier New, Courier, monospace",
  primaryColor: "primary",
}

export default yourMantineTheme
