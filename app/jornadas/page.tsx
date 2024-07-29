'use client';

import { clsx } from 'clsx';
import {
  Input,
  Button,
  // TODO: Implement table data
  // TableData,
} from '@mantine/core';
import { IconSearch, IconArrowsSplit2 } from '@tabler/icons-react';

import Link from 'next/link';
import JourneysTable from '@/components/JourneysTable/JourneysTable';

import classes from './Journey.module.css';

const journeys = [
  {
    id: 1,
    name: 'Jornada de Agendamento',
    steps: 10,
    peopleEnrolled: 32,
    status: 'active',
    createdAt: '2023-06-22',
  },
  {
    id: 2,
    name: 'Jornada de Atendimento',
    steps: 8,
    peopleEnrolled: 80,
    status: 'active',
    createdAt: '2023-06-22',
  },
  {
    id: 3,
    name: null,
    steps: 12,
    peopleEnrolled: 10,
    status: 'active',
    createdAt: '2023-06-22',
  },
  {
    id: 4,
    name: null,
    steps: 0,
    peopleEnrolled: 0,
    status: 'inactive',
    createdAt: '2023-06-22',
  },
];

// TODO: Implement table data
// const tableData: TableData = {
//   caption: 'Some elements from periodic table',
//   head: ['Element position', 'Atomic mass', 'Symbol', 'Element name'],
//   body: [
//     [6, 12.011, 'C', 'Carbon'],
//     [7, 14.007, 'N', 'Nitrogen'],
//     [39, 88.906, 'Y', 'Yttrium'],
//     [56, 137.33, 'Ba', 'Barium'],
//     [58, 140.12, 'Ce', 'Cerium'],
//   ],
// };

export default function JourneyPage() {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.tabs}>
            <div className={clsx(classes.tab, classes.active)}>Jornadas ({journeys.length})</div>
          </div>
          <div className={classes.control}>
            <Input
              placeholder="Buscar"
              variant="unstyled"
              rightSection={<IconSearch size="16" />}
              className={classes.search}
              classNames={{ section: classes.icon }}
            />
            <Button
              component={Link}
              href="/jornadas/novo"
              size="compact-lg"
              leftSection={<IconArrowsSplit2 size="16" />}
              className={classes.new}
            >
              Nova
            </Button>
          </div>
        </div>
        <div className={classes.content}>
          <JourneysTable data={journeys} />
        </div>
      </div>
    </>
  );
}
