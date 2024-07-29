'use client';

import csx from 'clsx';
import { useEffect, useState } from 'react';
import {
  ActionIcon,
  Button,
  Divider,
  Group,
  Menu,
  ScrollArea,
  SegmentedControl,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { IconCheck, IconDots, IconPencil, IconPlus } from '@tabler/icons-react';
import { useClickOutside, useInputState } from '@mantine/hooks';
import { reorderRows, reorderColumns } from '@/utils/reorder';

import classes from './NewBoard.module.css';

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

const DEFAULT_COLUMN_TITLE = { id: 0, value: '' };

export default function NewBoardPage() {
  // Title handlers
  const [journeyTitle, setJourneyTitle] = useInputState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Column Header handlers
  const [openedId, setOpenedId] = useState(0);

  // Active/Inactive status
  const [status, setStatus] = useState('inactive');

  // Global data
  const [data, setData] = useState<any[]>(columns);

  // Column title handlers
  const [columnEditTitle, setColumnEditTitle] = useState(DEFAULT_COLUMN_TITLE);
  const refColumnTitle = useClickOutside(() => {
    // TODO: Integrate with backend
    setColumnEditTitle(DEFAULT_COLUMN_TITLE);
  });
  const handleEditColumnTitle = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    // TODO: Update title on backend
    if (event.key === 'Enter' || event.code === 'Enter') {
      setData((prevState) => {
        const newState = prevState.map((item) => {
          if (item.id === columnEditTitle.id) {
            return { ...item, name: columnEditTitle.value || null };
          }

          return item;
        });

        return newState;
      });
      setColumnEditTitle(DEFAULT_COLUMN_TITLE);
    }
  };

  const handleColumnTitleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setColumnEditTitle({ id: Number(event.currentTarget.dataset.id), value: event.target.value });
  };
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

  // useEffect(() => {
  //   if (!isEditingTitle) {
  //     console.log('Title changed to:', journeyTitle);
  //   }
  // }, [isEditingTitle]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Group gap={12} wrap="nowrap">
          {isEditingTitle ? (
            <TextInput
              className={classes.title}
              placeholder={journeyTitle?.length === 0 ? 'Título da Jornada' : ''}
              autoFocus
              value={journeyTitle}
              onChange={setJourneyTitle}
              onKeyUp={handleInputSubmit}
            />
          ) : (
            <Text className={classes.title}>{journeyTitle || 'Título da Jornada'}</Text>
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
              root: csx(classes.status, { [classes.inactive]: status === 'inactive' }),
              control: csx(classes.control, { [classes.inactive]: status === 'inactive' }),
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
                <div
                  className={csx(classes.header, {
                    [classes.active]: columnEditTitle.id === column.id,
                  })}
                >
                  {/* TODO: Make this a component */}
                  {columnEditTitle.id !== column.id ? (
                    <Text
                      truncate
                      className={csx(classes.title, {
                        [classes.placeholder]: !column.name,
                      })}
                      onClick={() =>
                        setColumnEditTitle({ id: column.id, value: column.name ?? '' })
                      }
                    >
                      {column.name ?? `Nome da etapa ${index + 1}`}{' '}
                      {column.data.length > 0 ? `(${column.data.length})` : ''}
                    </Text>
                  ) : (
                    <TextInput
                      ref={refColumnTitle}
                      autoFocus
                      variant="unstyled"
                      wrapperProps={{ className: classes.inputWrapper }}
                      value={columnEditTitle.value}
                      data-id={column.id}
                      onChange={handleColumnTitleChange}
                      onKeyUp={handleEditColumnTitle}
                    />
                  )}
                  {/* TODO: Transform into component */}
                  {columnEditTitle.id !== column.id && (
                    <Menu
                      position="bottom-end"
                      opened={openedId === column.id}
                      onChange={(opened) => setOpenedId(opened ? column.id : 0)}
                    >
                      <Menu.Target>
                        <ActionIcon
                          className={csx(classes.settings, {
                            [classes.menuOpened]: openedId === column.id,
                          })}
                        >
                          <IconDots stroke={3} size={16} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown className={classes.dropdown}>
                        <Menu.Item className={classes.menuItem}>Clonar</Menu.Item>
                        <Menu.Item className={classes.menuItem}>Excluir</Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  )}
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
            <div className={classes.column}>
              <Button
                className={classes.add}
                leftSection={<IconPlus stroke={4} size={12} />}
                size="md"
              >
                Nova Etapa
              </Button>
            </div>
          </div>
        </DragDropContext>
      </ScrollArea>
    </div>
  );
}
