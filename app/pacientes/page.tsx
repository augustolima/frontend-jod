'use client';

import { IconChevronDown, IconChevronUp, IconSelector } from '@tabler/icons-react';
import {
  Avatar,
  Badge,
  Center,
  Group,
  ScrollArea,
  Table,
  Text,
  UnstyledButton,
  rem,
} from '@mantine/core';

import { useState } from 'react';
import classes from './Patients.module.css';

const appointments: { [key: string]: string } = {
  checkup: 'Checkup de rotina',
  emergency: 'Emergência',
};

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

function getSortIcon(sortBy: string | null, reverseSortDirection: boolean) {
  if (sortBy === 'name') {
    return reverseSortDirection ? IconChevronUp : IconChevronDown;
  }
  return IconSelector;
}

export default function PatientsPage() {
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: string) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
  };

  const Icon = getSortIcon(sortBy, reverseSortDirection);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.tabs}>TABS</div>
        <div className={classes.control}>Control</div>
      </div>
      <div className={classes.content}>
        <ScrollArea>
          <Table striped withTableBorder highlightOnHover verticalSpacing="md">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>
                  <UnstyledButton onClick={() => setSorting('name')}>
                    <Group justify="space-between">
                      <Text fw={700}>PACIENTE</Text>
                      <Center>
                        <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                      </Center>
                    </Group>
                  </UnstyledButton>
                </Table.Th>
                <Table.Th>
                  <Text fw={700}>CIDADE</Text>
                </Table.Th>
                <Table.Th>
                  <Text fw={700}>TELEFONE</Text>
                </Table.Th>
                <Table.Th>
                  <Text fw={700}>MÉDICO</Text>
                </Table.Th>
                <Table.Th>
                  <Text fw={700}>CONSULTA</Text>
                </Table.Th>
                <Table.Th>
                  <Text fw={700}>SEGMENTO</Text>
                </Table.Th>
                <Table.Th>
                  <Text fw={700}>ETAPA</Text>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {patients.map((patient) => (
                <Table.Tr key={patient.name}>
                  <Table.Td>
                    <Text fw={500}>{patient.name}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text fw={500}>{patient.city}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text fw={500}>{patient.phone}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Group wrap="nowrap" gap="xs">
                      <Avatar
                        size="sm"
                        radius="xl"
                        src={patient.doctor.avatar}
                        alt={patient.doctor.name}
                      />
                      <Text fw={500}>{patient.doctor.name}</Text>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      radius="xs"
                      classNames={{ root: classes.badge }}
                      className={classes[patient.appointment]}
                    >
                      {appointments[patient.appointment]}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Text fw={500}>{patient.segment}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text fw={500}>{patient.stage}</Text>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}
