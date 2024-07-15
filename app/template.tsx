'use client';

import { IconBellFilled, IconMessageCircleFilled } from '@tabler/icons-react';
import { AppShell, Avatar, Burger, Group, Image, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { NavbarSimple } from '@/components/Navbar/Navbar';

import classes from './App.module.css';

export default function Template({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{ width: 256, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
      className={classes.app}
    >
      <AppShell.Header className={classes.header}>
        <div className={classes.wrapper}>
          <Group h="100%">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            {/* TODO: Create breadcrumb */}
            <Text className={classes.welcome}>Bem-vindo(a)!</Text>
          </Group>
          <Group justify="end">
            <IconMessageCircleFilled className={classes.icon} />
            <IconBellFilled className={classes.icon} />
            {/* TODO: Add click to open dropdown */}
            <UnstyledButton>
              <Avatar size="md" radius="xl" src="https://i.pravatar.cc/300" />
            </UnstyledButton>
          </Group>
        </div>
      </AppShell.Header>
      <AppShell.Navbar withBorder={false} className={classes.navbar}>
        <Group p="xl" justify="center">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Image src="/jod-logo.svg" height="90" width="60" />
        </Group>
        <NavbarSimple />
      </AppShell.Navbar>
      <AppShell.Main h="100%">{children}</AppShell.Main>
    </AppShell>
  );
}
