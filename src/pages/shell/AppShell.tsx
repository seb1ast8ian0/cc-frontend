import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Stack} from '@mantine/core';
import { ReactNode } from 'react';
import { Navbar } from '../navbar/Navbar';

interface ShellProps {
  children: ReactNode;
}

function Shell(props: ShellProps) {

  const [opened, { toggle }] = useDisclosure();
  

  return (

      <AppShell
        navbar={{ width: 80, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        padding="md"
      >

        <AppShell.Navbar w={80} p="md">
          <Navbar></Navbar>
        </AppShell.Navbar>

        <AppShell.Main>

          <Stack align='flex-end'>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          </Stack>
          
          {props.children}

        </AppShell.Main>

      </AppShell>

    
  );
}

export default Shell;
