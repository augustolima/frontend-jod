import {
  IconChartCandle,
  IconUserCircle,
  IconCalendarEvent,
  IconArrowsSplit2,
  IconReportSearch,
} from '@tabler/icons-react';

const MENU_OPTIONS = [
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

export { MENU_OPTIONS };
