import React, { useContext } from 'react'
import InputMask from 'react-input-mask'

import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { File } from './File'
import { SimulationContext } from '../context'

export function FormContent() {
    const { register } = useContext(SimulationContext)

    return (
        <Box display="flex" flexDirection="column" gap="20px">
            <FormControl isRequired>
                <FormLabel>Nome completo:</FormLabel>
                <Input
                    type="text"
                    {...register('nomeCompleto', {
                        required: true,
                    })}
                />
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Email:</FormLabel>
                <Input
                    type="email"
                    {...register('email', {
                        required: true,
                    })}
                />
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Telefone:</FormLabel>
                <Input
                    as={InputMask}
                    mask="+55 (99) 999999999"
                    maskChar=""
                    type="text"
                    {...register('telefone', {
                        required: true,
                    })}
                />
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Selecione uma ou mais contas:</FormLabel>
                <File />
            </FormControl>
        </Box>
    )
}
