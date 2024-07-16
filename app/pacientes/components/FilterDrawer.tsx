import 'dayjs/locale/pt-br';
import '@mantine/dates/styles.css';

import { clsx } from 'clsx';
import { Group, Select, Autocomplete, Button, Drawer, Stack, rem } from '@mantine/core';
import { DateInput, DatesProvider } from '@mantine/dates';
import { IconCalendarEvent } from '@tabler/icons-react';

import classes from './FilterDrawer.module.css';

interface FilterDrawerProps {
  isFilterOpen: boolean;
  closeFilter: () => void;
}

export function FilterDrawer({ isFilterOpen, closeFilter }: FilterDrawerProps) {
  return (
    <Drawer
      position="right"
      opened={isFilterOpen}
      onClose={closeFilter}
      withCloseButton={false}
      title="Filtrar resultados"
      className={classes.drawer}
      padding={rem(32)}
    >
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
              />
              {/* TODO: Handle minDate based on fromDate */}
              <DateInput
                label="Até"
                valueFormat="DD/MM/YYYY"
                placeholder="DD/MM/YYYY"
                rightSection={<IconCalendarEvent />}
                firstDayOfWeek={0}
                className={classes.input}
              />
            </Group>
          </DatesProvider>
        </Stack>
        <Group gap={4} className={classes.btnWrapper}>
          <Button onClick={closeFilter} size="md" className={clsx(classes.btn, classes.cancel)}>
            Cancelar
          </Button>
          <Button size="md" className={clsx(classes.btn, classes.filter)}>
            Filtrar
          </Button>
        </Group>
      </form>
    </Drawer>
  );
}
