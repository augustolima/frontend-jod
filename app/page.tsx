'use client';

import { AppShell, Burger, Group, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import classes from './App.module.css';
import { NavbarSimple } from '@/components/Navbar/Navbar';

export default function HomePage() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
      className={classes.app}
    >
      <AppShell.Header className={classes.header}>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          {/* TODO: Add profile, messages and alerts icons */}
        </Group>
      </AppShell.Header>
      <AppShell.Navbar withBorder={false} className={classes.navbar}>
        <Group p="xl" justify="center">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Image src="/jod-logo.svg" height="90" width="60" />
        </Group>
        <NavbarSimple />
      </AppShell.Navbar>
      <AppShell.Main>Hello World</AppShell.Main>
    </AppShell>
  );
}
