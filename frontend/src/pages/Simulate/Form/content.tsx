import React, { useContext } from 'react'
import InputMask from 'react-input-mask'

import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { File } from './File'
import { SimulationContext } from '../context'

export function FormContent() {
  const { register } = useContext(SimulationContext)

  return (
    <>
      <FormControl isRequired>
        <FormLabel>Nome completo</FormLabel>
        <Input type="text" {...register('nomeCompleto')} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input type="email" {...register('email')} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Telefone</FormLabel>
        <Input
          as={InputMask}
          mask="+55 (99) 999999999"
          maskChar=""
          type="text"
          {...register('telefone')}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Selecione as contas</FormLabel>
        <File />
      </FormControl>
    </>
  )
}
