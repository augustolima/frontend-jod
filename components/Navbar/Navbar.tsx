import { ScrollArea, NavLink } from '@mantine/core';
import {
  IconChartCandle,
  IconUserCircle,
  IconCalendarEvent,
  IconArrowsSplit2,
  IconReportSearch,
} from '@tabler/icons-react';
import { useState } from 'react';

import classes from './Navbar.module.css';

const menuOptions = [
  { label: 'Dashboard', icon: IconChartCandle, link: '/' },
  {
    label: 'Pacientes',
    icon: IconUserCircle,
    link: '/',
  },
  {
    label: 'Agenda',
    icon: IconCalendarEvent,
    link: '/',
  },
  { label: 'Jornadas', icon: IconArrowsSplit2, link: '/' },
  { label: 'Relatórios', icon: IconReportSearch, link: '/' },
];

export function NavbarSimple() {
  const [active, setActive] = useState(0);

  // TODO: Add filter by user role

  const links = menuOptions.map((item, index) => (
    <NavLink
      className={classes.link}
      data-active={index === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(index);
      }}
      leftSection={<item.icon size="1.25rem" stroke={1.5} color="var(--nl-color)" />}
      label={item.label}
      styles={{
        root: {
          '--nl-bg': '#18263F',
          '--nl-color': '#82CFF6',
          padding: '1rem',
        },
        label: {
          fontSize: 'var(--mantine-font-size-md)',
          fontWeight: '500',
          color: 'var(--nl-color)',
        },
      }}
    />
  ));

  return <ScrollArea>{links}</ScrollArea>;
}
