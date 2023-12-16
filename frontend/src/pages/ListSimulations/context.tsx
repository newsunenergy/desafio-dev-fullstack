import React, { ReactElement, createContext } from 'react'
import { useSearchParams } from 'react-router-dom'

export const SimulationsContext = createContext<ContextValue>({})

export function ProvideSimulationsContext({
    children,
}: ProvideSimulationsContextProps) {
    const [searchParams, setSearchParams] = useSearchParams()

    function changeOrder(orderBy: string) {
        let orderDirection = searchParams.get('orderDirection') || 'asc'

        if (orderBy != searchParams.get('orderBy')) {
            orderDirection = 'asc'
        } else {
            orderDirection = orderDirection == 'asc' ? 'desc' : 'asc'
        }

        searchParams.set('orderBy', orderBy)
        searchParams.set('orderDirection', orderDirection)
        setSearchParams(searchParams)
    }

    function changeLeadId(leadId: string) {
        searchParams.set('leadId', leadId)
        setSearchParams(searchParams)
    }

    function resetFilter() {
        setSearchParams({})
    }

    return (
        <SimulationsContext.Provider
            value={{
                changeLeadId,
                searchParams,
                changeOrder,
                resetFilter,
            }}
        >
            {children}
        </SimulationsContext.Provider>
    )
}

type ProvideSimulationsContextProps = {
    children: ReactElement
}

type ContextValue = {
    searchParams?: URLSearchParams
    changeOrder?: (orderBy: string) => void
    changeLeadId?: (leadId: string) => void
    resetFilter?: () => void
}
