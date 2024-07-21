'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import {
  Input,
  UnstyledButton,
  Button,
  ActionIcon,
  // TODO: Implement table data
  // TableData,
} from '@mantine/core';
import { IconUserCircle, IconFilterPlus, IconSearch } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

import { PatientsTable } from '@/components/PatientsTable/PatientsTable';

import { NewModal } from './_components/NewModal';
import { FilterDrawer } from './_components/FilterDrawer';
import classes from './Patients.module.css';

const patients = [
  {
    name: 'Maria da Silva',
    city: 'Chapecó/SC',
    phone: '(49) 3026-4702',
    doctor: {
      name: 'Dr. House',
      avatar: null,
    },
    appointment: 'checkup',
    segment: 'Neurologia',
    stage: 'Agendamento',
  },
  {
    name: 'Paulo Roberto Filho',
    city: 'Chapecó/SC',
    phone: '(49) 98835-1779',
    doctor: {
      name: 'Dr. House',
      avatar: null,
    },
    appointment: 'checkup',
    segment: 'Dermatologia',
    stage: 'Atendimento',
  },
  {
    name: 'Leandro Machado',
    city: 'Chapecó/SC',
    phone: '(49) 98802-1844',
    doctor: {
      name: 'Dr. House',
      avatar: null,
    },
    appointment: 'emergency',
    segment: 'Psiquiatria',
    stage: 'Procedimento',
  },
  {
    name: 'Renata Campos',
    city: 'Chapecó/SC',
    phone: '(49) 99994-7605',
    doctor: {
      name: 'Dr. House',
      avatar: '',
    },
    appointment: 'emergency',
    segment: 'Cardiologia',
    stage: 'Procedimento',
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

const archived: any[] = [];

const TABS = ['patients', 'archived'];

export default function PatientsPage() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [isModalOpen, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [isFilterOpen, { open: openFilter, close: closeFilter }] = useDisclosure(false);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.tabs}>
            <UnstyledButton
              className={clsx(classes.tab, { [classes.active]: activeTab === TABS[0] })}
              onClick={() => setActiveTab(TABS[0])}
            >
              Pacientes ({patients.length})
            </UnstyledButton>
            <UnstyledButton
              className={clsx(classes.tab, { [classes.active]: activeTab === TABS[1] })}
              onClick={() => setActiveTab(TABS[1])}
            >
              Arquivados
            </UnstyledButton>
          </div>
          <div className={classes.control}>
            <Input
              placeholder="Buscar"
              variant="unstyled"
              rightSection={<IconSearch />}
              className={classes.search}
              classNames={{ section: classes.icon }}
            />
            <ActionIcon size="lg" className={classes.filter} onClick={openFilter}>
              <IconFilterPlus />
            </ActionIcon>
            <Button
              size="compact-lg"
              leftSection={<IconUserCircle />}
              className={classes.new}
              onClick={openModal}
            >
              Novo
            </Button>
          </div>
        </div>
        <div className={classes.content}>
          <PatientsTable data={activeTab === TABS[0] ? patients : archived} />
        </div>
      </div>
      <NewModal isModalOpen={isModalOpen} closeModal={closeModal} />
      <FilterDrawer isFilterOpen={isFilterOpen} closeFilter={closeFilter} />
    </>
  );
}
