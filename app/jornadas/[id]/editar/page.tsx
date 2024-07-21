'use client';

import { Paper } from '@mantine/core';

import classes from './EditTask.module.css';

export default function EditTaskPage() {
  return (
    <div className={classes.container}>
      <Paper className={classes.edit}>Editar</Paper>
      <Paper className={classes.add}>Adicionar tarefa</Paper>
      <Paper className={classes.tasks}>Tasks</Paper>
    </div>
  );
}
