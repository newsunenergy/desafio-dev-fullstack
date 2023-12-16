import React, { ReactNode, useContext, useEffect, useState } from 'react'
import {
    Box,
    Table,
    TableColumnHeaderProps,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react'
import axios from 'axios'
import { SimulationsContext } from '../context'
import { FaArrowUpShortWide } from 'react-icons/fa6'
import { FaArrowUpWideShort } from 'react-icons/fa6'

export function CardTable() {
    const { searchParams, changeLeadId } = useContext(SimulationsContext)
    const url = '/api/simulations'
    const [data, setData] = useState([])

    useEffect(() => {
        fetchData()
    }, [searchParams])

    function fetchData() {
        const params: Params = {}

        searchParams.forEach((value, key) => {
            params[key] = value
        })

        axios
            .get(params.leadId ? url + `/${params.leadId}` : url, {
                params,
            })
            .then((response) => {
                setData(response.data)
            })
    }

    return (
        <TableContainer>
            <Table variant="striped">
                <Thead>
                    <Tr>
                        <OrderTh fieldName="lead.nomeCompleto">
                            Nome completo
                        </OrderTh>
                        <OrderTh fieldName="lead.email">E-mail</OrderTh>
                        <OrderTh fieldName="codigoDaUnidadeConsumidora">
                            Unidade consumidora
                        </OrderTh>
                        <OrderTh fieldName="enquadramento">
                            Enquadramento
                        </OrderTh>
                        <OrderTh fieldName="modeloFasico">
                            Modelo Fásico
                        </OrderTh>
                        <OrderTh fieldName="consumoEmReais" isNumeric>
                            Valor
                        </OrderTh>
                    </Tr>
                </Thead>
                <Tbody>
                    {data &&
                        data.map((row) => (
                            <Tr key={row.id}>
                                <ClickTd
                                    onClick={() => changeLeadId(row.lead?.id)}
                                >
                                    {row.lead?.nomeCompleto}
                                </ClickTd>
                                <ClickTd
                                    onClick={() => changeLeadId(row.lead?.id)}
                                >
                                    {row.lead?.email}
                                </ClickTd>
                                <Td>{row.codigoDaUnidadeConsumidora}</Td>
                                <Td>{row.enquadramento}</Td>
                                <Td>{row.modeloFasico}</Td>
                                <Td isNumeric>R$ {row.consumoEmReais}</Td>
                            </Tr>
                        ))}
                </Tbody>
                <Tfoot>
                    <Tr>
                        <OrderTh fieldName="lead.nomeCompleto">
                            Nome completo
                        </OrderTh>
                        <OrderTh fieldName="lead.email">E-mail</OrderTh>
                        <OrderTh fieldName="codigoDaUnidadeConsumidora">
                            Unidade consumidora
                        </OrderTh>
                        <OrderTh fieldName="enquadramento">
                            Enquadramento
                        </OrderTh>
                        <OrderTh fieldName="modeloFasico">
                            Modelo Fásico
                        </OrderTh>
                        <OrderTh fieldName="consumoEmReais" isNumeric>
                            Valor
                        </OrderTh>
                    </Tr>
                </Tfoot>
            </Table>
        </TableContainer>
    )
}

type Params = {
    [key: string]: string
}

function ClickTd({ children, onClick }: ClickTdProps) {
    return (
        <Td textDecoration={'underline'} cursor={'pointer'} onClick={onClick}>
            {children}
        </Td>
    )
}

type ClickTdProps = {
    children: ReactNode
    onClick: React.MouseEventHandler
}

function OrderTh({ children, fieldName, ...props }: OrderThProps) {
    const { changeOrder } = useContext(SimulationsContext)

    return (
        <Th
            onClick={() => {
                changeOrder(fieldName)
            }}
            {...props}
        >
            <Box
                background={'rgba(200,200,200,0.1)'}
                borderRadius={'1em'}
                padding={'1em'}
                cursor={'pointer'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                gap="1em"
            >
                {children} <ShowOrderIcon fieldName={fieldName} />
            </Box>
        </Th>
    )
}

function ShowOrderIcon({ fieldName }: ShowOrderIconProps) {
    const { searchParams } = useContext(SimulationsContext)

    if (searchParams.get('orderBy') != fieldName) return

    return searchParams.get('orderDirection') != 'asc' ? (
        <FaArrowUpShortWide />
    ) : (
        <FaArrowUpWideShort />
    )
}

type ShowOrderIconProps = {
    fieldName: string
}

type OrderThProps = {
    children: ReactNode
    fieldName: string
} & TableColumnHeaderProps
