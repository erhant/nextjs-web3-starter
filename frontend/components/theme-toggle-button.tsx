import {Button, useMantineColorScheme} from '@mantine/core';
import {FC} from 'react';
import {SunIcon, MoonIcon} from '@heroicons/react/24/solid';

const ICON_SIZE = 24;
const ThemeToggleButton: FC = () => {
  const {colorScheme, toggleColorScheme} = useMantineColorScheme();

  return (
    <Button onClick={() => toggleColorScheme()} variant="subtle" size="xs">
      {colorScheme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
};

export default ThemeToggleButton;
