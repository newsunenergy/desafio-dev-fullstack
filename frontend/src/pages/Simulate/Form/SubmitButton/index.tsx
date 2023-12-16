import React, { useContext } from 'react'
import { SimulationContext } from '../../context'
import { Button, CircularProgress } from '@chakra-ui/react'

export function Submit() {
    const {
        formState: { isValid, isSubmitting },
    } = useContext(SimulationContext)

    return (
        <Button
            type="submit"
            isDisabled={!isValid || isSubmitting}
            colorScheme="green"
            width={'100px'}
        >
            {isSubmitting ? (
                <CircularProgress isIndeterminate size={'20px'} />
            ) : (
                'Enviar'
            )}
        </Button>
    )
}
