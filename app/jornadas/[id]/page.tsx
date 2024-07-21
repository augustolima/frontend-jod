'use client';

import csx from 'clsx';
import { useEffect, useState } from 'react';
import {
  ActionIcon,
  Button,
  Divider,
  Group,
  ScrollArea,
  SegmentedControl,
  Text,
  TextInput,
} from '@mantine/core';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { IconCheck, IconDots, IconPencil, IconPlus } from '@tabler/icons-react';
import { useInputState } from '@mantine/hooks';
import { reorderRows, reorderColumns } from '@/utils/reorder';

import classes from './Board.module.css';

import TaskList from '../_components/TaskList';

type User = {
  id: number;
  name: string;
  avatar: string;
};

type Task = {
  id: number;
  name: string;
  description: string;
  status: string;
  date: string;
  user: User;
};

type Column = {
  id: number;
  name: string | null;
  data: Task[];
};

const columns: Column[] = [
  {
    id: 1,
    name: 'Atendimento via WhatsApp',
    data: [
      {
        id: 1,
        name: 'Confirmação de consulta',
        description: 'Descrição da tarefa 1',
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        user: {
          id: 1,
          name: 'Usuário 1',
          avatar: 'https://i.pravatar.cc/300',
        },
      },
      {
        id: 2,
        name: 'Mensagem 1 - Pedido dos dados do sistema',
        description: 'Descrição da tarefa 2',
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        user: {
          id: 2,
          name: 'Usuário 2',
          avatar: 'https://i.pravatar.cc/300',
        },
      },
      {
        id: 3,
        name: 'Mensagem 2 - Lembrete 1 semana - orientações',
        description: 'Descrição da tarefa 3',
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        user: {
          id: 3,
          name: 'Usuário 3',
          avatar: 'https://i.pravatar.cc/300',
        },
      },
      {
        id: 4,
        name: 'Mensagem 3 - confirmação um dia antes',
        description: 'Descrição da tarefa 4',
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        user: {
          id: 4,
          name: 'Usuário 3',
          avatar: 'https://i.pravatar.cc/300',
        },
      },
    ],
  },
  {
    id: 2,
    name: 'Feedback do cliente',
    data: [
      {
        id: 5,
        name: 'Marcos de sucesso',
        description: 'Descrição da tarefa 4',
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        user: {
          id: 4,
          name: 'Usuário 4',
          avatar: 'https://i.pravatar.cc/300',
        },
      },
      {
        id: 6,
        name: 'Feedback',
        description: 'Descrição da tarefa 5',
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        user: {
          id: 5,
          name: 'Usuário 5',
          avatar: 'https://i.pravatar.cc/300',
        },
      },
    ],
  },
  { id: 3, name: null, data: [] },
];

export default function BoardPage() {
  // Title handlers
  const [journeyTitle, setJourneyTitle] = useInputState('Jornada de Agendamento');
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Active/Inactive status
  const [status, setStatus] = useState('active');

  // Global data
  const [data, setData] = useState(columns);
  // TODO: Set this once the data is updated on the server
  // TODO: Rollback to originalData if an error occurs
  // const [originalData, setOriginalData] = useState(columns);

  const onDragEnd = (result: DropResult): void => {
    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    // did not move anywhere - can bail early
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    // moving to same list
    if (source.droppableId === destination.droppableId) {
      const column = data.find((item) => item.id === Number(source.droppableId))!;
      const reordered = reorderRows(column.data, source.index, destination.index);
      setData((prevState) => {
        const newState = prevState.map((item) => {
          if (item.id === Number(source.droppableId)) {
            return { ...item, data: reordered };
          }

          return item;
        });

        return newState;
      });
    }

    // moving to different list
    if (source.droppableId !== destination.droppableId) {
      const { sourceData, destinationData } = reorderColumns(data, source, destination);

      setData((prevState) => {
        const newState = prevState.map((item) => {
          if (item.id === Number(source.droppableId)) {
            return { ...item, data: sourceData };
          }

          if (item.id === Number(destination.droppableId)) {
            return { ...item, data: destinationData };
          }

          return item;
        });

        return newState;
      });
    }
  };

  const handleInputSubmit = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter' || event.code === 'Enter') {
      setIsEditingTitle(false);
    }
  };

  const handleEditClick = (): void => {
    setIsEditingTitle((prevState) => !prevState);
  };

  useEffect(() => {
    // TODO: Send new title to server
    if (!isEditingTitle) {
      console.log('Title changed to:', journeyTitle);
    }
  }, [isEditingTitle]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Group gap={12} wrap="nowrap">
          {isEditingTitle ? (
            <TextInput
              autoFocus
              value={journeyTitle}
              onChange={setJourneyTitle}
              onKeyUp={handleInputSubmit}
            />
          ) : (
            <Text className={classes.title}>{journeyTitle}</Text>
          )}
          <ActionIcon radius="xl" className={classes.edit} onClick={handleEditClick}>
            {isEditingTitle ? (
              <IconCheck size={12} stroke={3} />
            ) : (
              <IconPencil size={12} stroke={3} />
            )}
          </ActionIcon>
        </Group>
        <Group wrap="nowrap" gap={4}>
          <SegmentedControl
            withItemsBorders={false}
            size="md"
            data={[
              { label: 'Inativo', value: 'inactive' },
              { label: 'Ativo', value: 'active' },
            ]}
            value={status}
            onChange={setStatus}
            classNames={{
              root: classes.status,
              control: classes.control,
              label: classes.label,
            }}
          />
          <Button size="md" className={classes.cancel}>
            Cancelar
          </Button>
          <Button size="md" className={classes.save}>
            Salvar
          </Button>
        </Group>
      </div>
      <Divider className={classes.divider} />
      <ScrollArea scrollbars="x" offsetScrollbars="x">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={classes.board}>
            {data.map((column, index) => (
              <div className={classes.column} key={column.id}>
                <div className={classes.header}>
                  <Text
                    truncate
                    className={csx(classes.title, {
                      [classes.placeholder]: !column.name,
                    })}
                  >
                    {column.name || `Nome da etapa ${index + 1}`}{' '}
                    {column.data.length > 0 ? `(${column.data.length})` : ''}
                  </Text>
                  <Group wrap="nowrap" gap={4}>
                    <ActionIcon className={classes.settings}>
                      <IconDots stroke={3} size={16} />
                    </ActionIcon>
                    <ActionIcon className={classes.add}>
                      <IconPlus stroke={3} size={16} />
                    </ActionIcon>
                  </Group>
                </div>
                <Droppable droppableId={String(column.id)}>
                  {(provided) => (
                    <div
                      className={classes.tasks}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <TaskList data={column.data} />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </ScrollArea>
    </div>
  );
}
