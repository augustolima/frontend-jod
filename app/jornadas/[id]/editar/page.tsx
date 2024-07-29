'use client';

import 'dayjs/locale/pt-br';
import '@mantine/dates/styles.css';

import csx from 'clsx';
import { Button, Grid, Paper, Select, Stack, Text, Textarea, TextInput } from '@mantine/core';
import { DateInput, DatesProvider } from '@mantine/dates';
import {
  IconBrandWhatsapp,
  IconCalendarEvent,
  IconCircleCheck,
  IconNotes,
} from '@tabler/icons-react';

import classes from './EditTask.module.css';

export default function EditJourneyPage() {
  return (
    <div className={classes.container}>
      <Stack gap={8} className={classes.wrapper}>
        <Paper className={classes.editSection}>
          <div className={classes.header}>
            <Text className={classes.title}>Editar</Text>
          </div>
          <Stack gap={24} className={classes.body}>
            <form onSubmit={(values) => console.log(values)} className={classes.form}>
              <Grid>
                <Grid.Col span={8}>
                  <TextInput aria-label="Título" size="lg" placeholder="Título" />
                </Grid.Col>
                <Grid.Col span={4}>
                  <DatesProvider settings={{ locale: 'pt-br' }}>
                    <DateInput
                      aria-label="Data"
                      size="lg"
                      valueFormat="DD/MM/YYYY"
                      placeholder="DD/MM/YYYY"
                      rightSection={<IconCalendarEvent />}
                      firstDayOfWeek={0}
                      className={classes.input}
                      // onChange={handleFromDateChange}
                    />
                  </DatesProvider>
                </Grid.Col>
              </Grid>
              <Textarea
                aria-label="Descrição"
                size="lg"
                placeholder="Descrição"
                autosize
                minRows={5}
                maxRows={5}
              />
              <Button type="submit" className={classes.save} size="md">
                Salvar
              </Button>
            </form>
          </Stack>
        </Paper>
        <Paper className={classes.taskSection}>
          <div className={classes.header}>
            <Text className={classes.title}>Tarefas criadas</Text>
          </div>
          <div className={classes.body}>
            <div className={classes.timeline}>
              <div className={csx(classes.timelineItem, classes.whatsapp)}>
                <Paper className={classes.timelineContent} radius={2}>
                  <div className={classes.iconWrapper}>
                    <IconBrandWhatsapp />
                  </div>
                </Paper>
              </div>
              <div className={csx(classes.timelineItem, classes.contract)}>
                <Paper className={classes.timelineContent} radius={2}>
                  <div className={classes.iconWrapper}>
                    <IconNotes />
                  </div>
                </Paper>
              </div>
              <div className={csx(classes.timelineItem, classes.checklist)}>
                <Paper className={classes.timelineContent} radius={2}>
                  <div className={classes.iconWrapper}>
                    <IconCircleCheck />
                  </div>
                </Paper>
              </div>
            </div>
          </div>
        </Paper>
      </Stack>
      <Paper className={classes.addSection}>
        <div className={classes.header}>
          <Text className={classes.title}>Adicionar tarefa</Text>
        </div>
        <div className={classes.body}>
          <Select
            size="lg"
            label="Tipo"
            placeholder="Selecione"
            data={['WhatsApp', 'Checklist', 'Contrato']}
            searchable
            limit={5}
            nothingFoundMessage="Nenhum resultado..."
            classNames={{ label: classes.label }}
          />
        </div>
      </Paper>
    </div>
  );
}
