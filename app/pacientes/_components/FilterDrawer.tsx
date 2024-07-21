import 'dayjs/locale/pt-br';
import '@mantine/dates/styles.css';

import { clsx } from 'clsx';
import { Group, Select, Autocomplete, Button, Drawer, Stack, rem } from '@mantine/core';
import { DateInput, DatesProvider } from '@mantine/dates';
import { IconCalendarEvent } from '@tabler/icons-react';

import { useState } from 'react';
import classes from './FilterDrawer.module.css';

interface FilterDrawerProps {
  isFilterOpen: boolean;
  closeFilter: () => void;
}

export function FilterDrawer({ isFilterOpen, closeFilter }: FilterDrawerProps) {
  const [fromDate, setFromDate] = useState<Date | undefined>();

  const handleFromDateChange = (value: Date | null) => {
    if (value) {
      setFromDate(value);
      return;
    }
    // it must be undefined due to DateInput prop definition
    setFromDate(undefined);
  };

  return (
    <Drawer.Root
      position="right"
      opened={isFilterOpen}
      onClose={closeFilter}
      className={classes.drawer}
      padding={rem(32)}
    >
      <Drawer.Overlay />
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title className={classes.title}>Filtrar resultados</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body className={classes.drawerBody} display="flex">
          {/* TODO: Implement onSubmit handler */}
          <form onSubmit={(values) => console.log(values)} className={classes.form}>
            <Stack>
              <Autocomplete
                label="Paciente"
                placeholder="Digite aqui"
                data={[]}
                limit={5}
                className={classes.input}
              />
              <Select
                label="Médico"
                placeholder="Selecione"
                nothingFoundMessage="Sem resultados..."
                data={[{ value: 'all', label: 'Todos' }]}
                defaultValue="all"
                limit={5}
                searchable
                className={classes.input}
              />
              <Group grow>
                <Select
                  label="Consulta"
                  data={[{ value: 'all', label: 'Todos' }]}
                  defaultValue="all"
                  allowDeselect={false}
                  className={classes.input}
                />
                <Select
                  label="Segmento"
                  data={[{ value: 'all', label: 'Todos' }]}
                  defaultValue="all"
                  allowDeselect={false}
                  className={classes.input}
                />
              </Group>
              <DatesProvider settings={{ locale: 'pt-br' }}>
                <Group grow>
                  <DateInput
                    label="De"
                    valueFormat="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    rightSection={<IconCalendarEvent />}
                    firstDayOfWeek={0}
                    className={classes.input}
                    onChange={handleFromDateChange}
                  />
                  <DateInput
                    label="Até"
                    valueFormat="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    rightSection={<IconCalendarEvent />}
                    firstDayOfWeek={0}
                    className={classes.input}
                    minDate={fromDate}
                  />
                </Group>
              </DatesProvider>
            </Stack>
            <Group gap={4} justify="end" className={classes.btnWrapper}>
              <Button onClick={closeFilter} size="md" className={clsx(classes.btn, classes.cancel)}>
                Cancelar
              </Button>
              <Button size="md" className={clsx(classes.btn, classes.filter)}>
                Filtrar
              </Button>
            </Group>
          </form>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}
