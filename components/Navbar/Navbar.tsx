import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ScrollArea, NavLink } from '@mantine/core';
import {
  IconChartCandle,
  IconUserCircle,
  IconCalendarEvent,
  IconArrowsSplit2,
  IconReportSearch,
} from '@tabler/icons-react';

import classes from './Navbar.module.css';

const menuOptions = [
  { label: 'Dashboard', icon: IconChartCandle, link: '/' },
  {
    label: 'Pacientes',
    icon: IconUserCircle,
    link: '/pacientes',
  },
  {
    label: 'Agenda',
    icon: IconCalendarEvent,
    link: '/agenda',
  },
  { label: 'Jornadas', icon: IconArrowsSplit2, link: '/jornadas' },
  { label: 'Relatórios', icon: IconReportSearch, link: '/relatorios' },
];

export function NavbarSimple() {
  const pathname = usePathname();

  // TODO: Add filter by user role
  const links = menuOptions.map((item) => (
    <NavLink
      component={Link}
      active={pathname === item.link}
      classNames={{ root: classes.link, label: classes.label }}
      href={item.link}
      key={item.label}
      leftSection={<item.icon size="1.25rem" stroke={1.5} color="var(--nl-color)" />}
      label={item.label}
    />
  ));

  return <ScrollArea>{links}</ScrollArea>;
}
