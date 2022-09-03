import React from 'react';
import { Control, Controller, FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { TextInputProps } from 'react-native'
import { Input } from '../Input';
import { Container, Error } from './styles';

interface Props extends TextInputProps {
  control: Control,
  name: string,
  error: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
}

export function InputForm({ error, name, control, ...rest }: Props) {
  return (
    <Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            onChangeText={onChange}
            value={value}
            {...rest}
          />
        )}
      />
      {!!error && <Error>{error}</Error>}
    </Container>
  );
}
