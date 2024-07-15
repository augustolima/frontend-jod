'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import {
  Button,
  Group,
  Input,
  InputBase,
  Menu,
  Modal,
  Select,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconUserCircle, IconFilterPlus, IconSearch } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

import { IMaskInput } from 'react-imask';
import { PatientsTable } from '@/components/PatientsTable/PatientsTable';

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

const archived: any[] = [];

const TABS = ['patients', 'archived'];

function validateCPF(cpf: string): string | null {
  // Remove all non-numeric characters
  cpf = cpf.replace(/[^\d]/g, '');

  // Check if the CPF has 11 digits or if it is a repeated sequence
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return 'CPF inválido';
  }

  // Helper function to calculate the check digits
  function calculateCheckDigit(cpfDigits: string, factor: number): number {
    let sum = 0;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < cpfDigits.length; i++) {
      // eslint-disable-next-line no-plusplus
      sum += parseInt(cpfDigits[i], 10) * factor--;
      if (factor < 2) factor = 9;
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }

  // Check the first and second check digits
  const checkDigit1 = calculateCheckDigit(cpf.substring(0, 9), 10);
  const checkDigit2 = calculateCheckDigit(cpf.substring(0, 10), 11);

  // Return true if the check digits are valid
  const isValid = checkDigit1 === parseInt(cpf[9], 10) && checkDigit2 === parseInt(cpf[10], 10);

  if (isValid) {
    return null;
  }

  return 'CPF inválido';
}

export default function PatientsPage() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      cpf: '',
      maritalStatus: null,
      phone: '',
      email: '',
      cep: '',
      city: '',
      address: '',
    },

    validate: {
      email: (value) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'E-mail inválido'),
      cpf: validateCPF,
    },
  });

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
            <Menu>
              <Menu.Target>
                <Button size="compact-lg" className={classes.filter}>
                  <IconFilterPlus />
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>Filter 1</Menu.Item>
                <Menu.Item>Filter 2</Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <Button
              size="compact-lg"
              leftSection={<IconUserCircle />}
              className={classes.new}
              onClick={open}
            >
              Novo
            </Button>
          </div>
        </div>
        <div className={classes.content}>
          <PatientsTable data={activeTab === TABS[0] ? patients : archived} />
        </div>
      </div>
      <Modal.Root opened={opened} onClose={close} centered size="lg">
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header className={classes.modalHeader}>
            <IconUserCircle className={classes.icon} />
            <Modal.Title className={classes.title}>Novo Paciente</Modal.Title>
          </Modal.Header>
          <Modal.Body className={classes.modalBody}>
            <form
              onSubmit={form.onSubmit((values) => console.log(values))}
              className={classes.form}
            >
              <TextInput
                label="Nome"
                placeholder="Digite aqui"
                key={form.key('name')}
                {...form.getInputProps('name')}
                size="md"
                className={classes.input}
              />
              <Group grow>
                <InputBase
                  label="CPF"
                  placeholder="000.000.000-00"
                  component={IMaskInput}
                  mask="000.000.000-00"
                  unmask
                  key={form.key('cpf')}
                  {...form.getInputProps('cpf')}
                  size="md"
                  className={classes.input}
                />
                <Select
                  label="Estado civil"
                  placeholder="Selecione"
                  data={[
                    'Solteiro(a)',
                    'Casado(a)',
                    'União estável',
                    'Companheiro(a)',
                    'Divorciado(a)',
                    'Viúvo(a)',
                    'Separado(a)',
                  ]}
                  key={form.key('maritalStatus')}
                  {...form.getInputProps('maritalStatus')}
                  size="md"
                  className={classes.input}
                />
              </Group>
              <Group grow>
                <InputBase
                  label="Telefone"
                  placeholder="(00) 00000-0000"
                  component={IMaskInput}
                  mask="(00) 00000-0000"
                  key={form.key('phone')}
                  {...form.getInputProps('phone')}
                  size="md"
                  className={classes.input}
                />
                <TextInput
                  label="E-mail"
                  placeholder="Ex. fulano@gmail.com"
                  key={form.key('email')}
                  {...form.getInputProps('email')}
                  size="md"
                  className={classes.input}
                />
              </Group>
              <Group grow>
                {/* TODO: Integrate with ViaCEP? */}
                <InputBase
                  label="CEP"
                  placeholder="00000-000"
                  component={IMaskInput}
                  mask="00000-000"
                  key={form.key('cep')}
                  {...form.getInputProps('cep')}
                  size="md"
                  className={classes.input}
                />
                <TextInput
                  label="Cidade/UF"
                  placeholder="Digite o CEP"
                  disabled
                  key={form.key('city')}
                  {...form.getInputProps('city')}
                  size="md"
                  className={classes.input}
                />
              </Group>
              <TextInput
                label="Endereço"
                placeholder="Digite o CEP"
                disabled
                key={form.key('address')}
                {...form.getInputProps('address')}
                size="md"
                className={classes.input}
              />
              <Group justify="flex-end" gap="xs">
                <Button onClick={close}>Cancelar</Button>
                <Button type="submit">Salvar</Button>
              </Group>
            </form>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
