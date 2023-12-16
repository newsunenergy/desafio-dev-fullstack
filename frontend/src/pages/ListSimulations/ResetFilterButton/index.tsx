import React, { useContext } from 'react'
import { Button } from '@chakra-ui/react'
import { SimulationsContext } from '../context'

export function ResetFilterButton() {
    const { searchParams, resetFilter } = useContext(SimulationsContext)

    if (searchParams.size == 0) {
        return null
    }

    return <Button onClick={resetFilter}>Resetar filtros</Button>
}
