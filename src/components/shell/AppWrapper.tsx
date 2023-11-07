import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Stack} from '@mantine/core';
import { ReactNode } from 'react';
import { Navbar } from '../navbar/Navbar';
import { motion } from "framer-motion";
import { useAuth } from '../auth/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import { isExpired } from "react-jwt";


interface ShellProps {
  children: ReactNode;
}

function isValidToken(token: string){

  if(token == null) return false;
  if(isExpired(token)) return false;

  return true;

}

function AppWrapper(props: ShellProps) {

  const [opened, { toggle }] = useDisclosure();
  const { token } = useAuth();
  const location = useLocation();


  if (!isValidToken(token)) {
      return <Navigate to="/auth/login" replace state={{from: location}}/>;
  }
  
  return (

    <AppShell
        navbar={{ width: 80, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        padding="md">

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

export default AppWrapper;
