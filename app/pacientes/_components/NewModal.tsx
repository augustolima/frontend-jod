'use client';

import { IMaskInput } from 'react-imask';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { Group, InputBase, Modal, Select, TextInput, Button } from '@mantine/core';
import { IconUserCircle } from '@tabler/icons-react';

import { useState } from 'react';
import classes from './NewModal.module.css';

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

interface NewModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

export function NewModal({ isModalOpen, closeModal }: NewModalProps) {
  const [isAddressDisabled, setAddressDisabled] = useState(true);
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
      name: isNotEmpty('Nome obrigatório'),
      email: isEmail('Email inválido'),
      cpf: validateCPF,
    },

    transformValues: (values) => ({
      ...values,
      cep: values.cep.replace(/[^\d]/g, ''),
    }),
  });

  const handleClose = () => {
    form.reset();
    closeModal();
  };

  form.watch('cep', async ({ previousValue, value }) => {
    if (value.length === 9) {
      const res = await fetch(`/api/zipcode?code=${value.replace(/[^\d]/g, '')}`);

      if (res.status >= 400) {
        form.setFieldError('cep', 'CEP inválido');
        return;
      }

      const data = await res.json();
      form.setValues({
        city: `${data.data.localidade}/${data.data.uf}`,
        address: `${data.data.logradouro}, ${data.data.bairro}`,
      });
      setAddressDisabled(false);
    }

    if (previousValue.length === 9 && value.length < 9) {
      form.setValues({ city: '', address: '' });
      setAddressDisabled(true);
    }
  });

  return (
    <Modal.Root opened={isModalOpen} onClose={closeModal} centered size="lg">
      <Modal.Overlay className={classes.overlay} />
      <Modal.Content>
        <Modal.Header className={classes.modalHeader}>
          <IconUserCircle className={classes.icon} />
          <Modal.Title className={classes.title}>Novo Paciente</Modal.Title>
        </Modal.Header>
        <Modal.Body className={classes.modalBody}>
          <form
            // TODO: Add onSubmit handler
            onSubmit={form.onSubmit((values) => console.log(values))}
            className={classes.form}
          >
            <TextInput
              withAsterisk
              label="Nome"
              placeholder="Digite aqui"
              key={form.key('name')}
              {...form.getInputProps('name')}
              size="md"
              className={classes.input}
            />
            <Group grow>
              <InputBase
                withAsterisk
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
                withAsterisk
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
                withAsterisk
                label="Telefone"
                placeholder="(00) 00000-0000"
                component={IMaskInput}
                // TODO: Make first number optional
                mask="(00) [0]0000-0000"
                key={form.key('phone')}
                {...form.getInputProps('phone')}
                size="md"
                className={classes.input}
              />
              <TextInput
                withAsterisk
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
                withAsterisk
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
                withAsterisk
                label="Cidade/UF"
                placeholder="Digite o CEP"
                disabled={isAddressDisabled}
                key={form.key('city')}
                {...form.getInputProps('city')}
                size="md"
                className={classes.input}
              />
            </Group>
            <TextInput
              withAsterisk
              label="Endereço"
              placeholder="Digite o CEP"
              disabled={isAddressDisabled}
              key={form.key('address')}
              {...form.getInputProps('address')}
              size="md"
              className={classes.input}
            />
            <Group justify="flex-end" gap="xs">
              <Button onClick={handleClose} size="md" className={classes.cancel}>
                Cancelar
              </Button>
              <Button type="submit" size="md" className={classes.save}>
                Salvar
              </Button>
            </Group>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
