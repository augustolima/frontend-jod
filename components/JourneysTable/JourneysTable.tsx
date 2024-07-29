'use client';

import { IconChevronDown, IconChevronUp, IconSelector } from '@tabler/icons-react';
import { Badge, Center, Group, ScrollArea, Table, Text, UnstyledButton } from '@mantine/core';
import { useState } from 'react';

import Link from 'next/link';
import classes from './JourneysTable.module.css';

function getSortIcon(sortBy: string | null, reverseSortDirection: boolean) {
  if (sortBy === 'name') {
    return reverseSortDirection ? IconChevronUp : IconChevronDown;
  }
  return IconSelector;
}

const statuses: { [key: string]: string } = {
  active: 'Ativo',
  inactive: 'Inativo',
};

const formatDate = (value: string) => {
  const date = new Date(value);
  return new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(date);
};

export default function JourneysTable({ data }: { data: any[] }) {
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: string) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
  };

  const Icon = getSortIcon(sortBy, reverseSortDirection);

  return (
    <ScrollArea>
      <Table
        striped
        withTableBorder
        highlightOnHover
        verticalSpacing="lg"
        className={classes.table}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              <UnstyledButton onClick={() => setSorting('name')}>
                <Group justify="space-between" wrap="nowrap" gap="xs">
                  <Text fw={700}>JORNADA</Text>
                  <Center>
                    <Icon size={16} stroke={1.5} />
                  </Center>
                </Group>
              </UnstyledButton>
            </Table.Th>
            <Table.Th>
              <Text fw={700}>ETAPAS</Text>
            </Table.Th>
            <Table.Th>
              <Text fw={700}>PESSOAS NA JORNADA</Text>
            </Table.Th>
            <Table.Th>
              <Text fw={700}>STATUS</Text>
            </Table.Th>
            <Table.Th>
              <Text fw={700}>CRIADO EM</Text>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((journey) => (
            <Table.Tr key={journey.id}>
              <Table.Td>
                <Link href={`/jornadas/${journey.id}`}>
                  <Text fw={500}>{journey.name ?? 'Nome da Jornada'}</Text>
                </Link>
              </Table.Td>
              <Table.Td>
                <Link href={`/jornadas/${journey.id}`}>
                  <Text fw={500}>{journey.status === 'inactive' ? '--' : journey.steps}</Text>
                </Link>
              </Table.Td>
              <Table.Td>
                <Link href={`/jornadas/${journey.id}`}>
                  <Text fw={500}>
                    {journey.status === 'inactive' ? '--' : journey.peopleEnrolled}
                  </Text>
                </Link>
              </Table.Td>
              <Table.Td>
                <Link href={`/jornadas/${journey.id}`}>
                  <Badge
                    radius="xs"
                    classNames={{ root: classes.badge }}
                    className={classes[journey.status]}
                  >
                    {statuses[journey.status]}
                  </Badge>
                </Link>
              </Table.Td>
              <Table.Td>
                <Link href={`/jornadas/${journey.id}`}>
                  <Text fw={500}>{formatDate(journey.createdAt)}</Text>
                </Link>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
