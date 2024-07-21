import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { UnstyledButton, Text, ActionIcon, Group, Avatar } from '@mantine/core';
import { IconCircleCheck, IconDots, IconPlus } from '@tabler/icons-react';
import csx from 'clsx';

import { useHover } from '@mantine/hooks';
import Link from 'next/link';
import classes from './TaskList.module.css';

type InnerListProps = {
  data: any[]; // Replace 'any[]' with the actual type of 'data'
};

type TaskProps = {
  data: {
    id: string;
    name: string;
    date: string;
    user: {
      avatar: string;
    };
  };
  isDragging: boolean;
};

const formatDate = (date: string) => {
  const [year, month, day] = date.split('-').map(Number);
  const newDate = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat('pt-BR').format(newDate);
};

const Task = ({ data, isDragging }: TaskProps) => {
  const { hovered, ref } = useHover();

  return (
    <div
      ref={ref}
      className={csx(classes.task, {
        [classes.dragging]: isDragging,
      })}
    >
      {hovered && (
        <ActionIcon
          className={classes.actions}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            // TODO: Implement this action
            console.log('Clicked', data.id);
          }}
        >
          <IconDots stroke={3} size={16} />
        </ActionIcon>
      )}
      <Link href={`/jornadas/${data.id}/editar`} className={classes.link}>
        <div className={classes.container}>
          <div className={classes.header}>
            <div className={classes.border} />
            <Text className={classes.title}>{data.name}</Text>
          </div>
          <div className={classes.content}>Data: {formatDate(data.date)}</div>
          <Group wrap="nowrap" justify="space-between" className={classes.footer}>
            <Group wrap="nowrap" gap={8}>
              <IconCircleCheck size={16} stroke={2} />
              <Text className={classes.text}>0/1</Text>
            </Group>
            <Avatar size={24} radius="xl" src={data.user.avatar} />
          </Group>
        </div>
      </Link>
    </div>
  );
};

const TaskList = React.memo((props: InnerListProps) => {
  if (props.data.length === 0) {
    // TODO: Create a card in the column
    return (
      <UnstyledButton className={classes.add}>
        <IconPlus stroke={4} size={30} />
        <Text className={classes.text}>Nova tarefa</Text>
      </UnstyledButton>
    );
  }

  return props.data.map((item, index) => (
    <Draggable key={item.id} draggableId={String(item.id)} index={index}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Task data={item} isDragging={snapshot.isDragging} />
        </div>
      )}
    </Draggable>
  ));
});

export default TaskList;
