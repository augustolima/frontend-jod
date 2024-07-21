import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ScrollArea, NavLink } from '@mantine/core';

import { MENU_OPTIONS } from '@/utils/constants';

import classes from './Navbar.module.css';

export function NavbarSimple() {
  const pathname = usePathname();

  // TODO: Add filter by user role
  const links = MENU_OPTIONS.map((item) => (
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
