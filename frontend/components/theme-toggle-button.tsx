import {ActionIcon, useMantineColorScheme} from '@mantine/core';
import {FC} from 'react';
// import {SunIcon, MoonIcon} from '@heroicons/react/24/solid';
import {IconSun, IconMoon} from '@tabler/icons';

const ICON_SIZE = 24;

const ThemeToggleButton: FC = () => {
  const {colorScheme, toggleColorScheme} = useMantineColorScheme();

  return (
    <ActionIcon onClick={() => toggleColorScheme()}>
      {colorScheme === 'dark' ? <IconSun size={ICON_SIZE} /> : <IconMoon size={ICON_SIZE} />}
    </ActionIcon>
  );
};

export default ThemeToggleButton;
