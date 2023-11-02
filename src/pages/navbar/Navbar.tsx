import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Center, Tooltip, UnstyledButton, Stack, rem, Anchor} from '@mantine/core';
import {
  IconHome2,
  IconDashboard,
  IconLogout,
  IconPlus
} from '@tabler/icons-react';
import classes from './Navbar.module.css';
import logo from '../../logo.png'

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?(): void;
  path: string;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const linksData = [
  { icon: IconHome2, label: 'Meine Bilder', path: '/'},
  { icon: IconPlus, label: 'Hinzufügen', path: '/add'}
];

export function Navbar() {

  const [active, setActive] = useState(2);
  let navigate = useNavigate();
  let location = useLocation();
  

  const links = linksData.map((link, index) => {
    if(location.pathname == link.path){
      document.title = "PicHub | " + link.label;
    }
    
    return <NavbarLink
      {...link}
      key={link.label}
      active={location.pathname == link.path}
      onClick={() => {
        setActive(index);
        navigate(link.path);
      }}
    />
  });

  return (
    <nav className={classes.navbar}>
      <Center>
        <Anchor about='Home'>
          <img src={logo} width={50}/>
        </Anchor>
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconLogout} label="Logout" path='/logout' />
      </Stack>
    </nav>
  );
}