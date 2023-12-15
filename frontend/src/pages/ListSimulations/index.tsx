import React, { useEffect, useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Heading,
    Container,
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Tfoot,
} from '@chakra-ui/react'
import { Link } from '../../components/Link'
import axios from 'axios'

export default function Simulate() {
    const urlParams = new URLSearchParams(document.location.search)
    const url = '/api/simulations'
    const [data, setData] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    function fetchData({
        orderBy,
        orderDirection,
        leadId,
    }: FetchDataParams = {}) {
        const params: Params = {}

        urlParams.forEach((value, key) => {
            params[key] = value
        })

        if (orderBy) {
            params.orderBy = orderBy
        }

        if (orderDirection) {
            params.orderDirection = orderDirection
        }

        axios
            .get(leadId ? url + `/${leadId}` : url, {
                params,
            })
            .then((response) => {
                setData(response.data)
            })
    }

    return (
        <Container
            minW={{
                sm: 'full',
                md: '4xl',
            }}
            height={'100vh'}
            display={'flex'}
            alignItems={'center'}
        >
            <Card>
                <CardHeader>
                    <Heading size="lg">Simulações realizadas</Heading>
                    <Link to="/simular">Realizar uma nova simulação</Link>
                </CardHeader>
                <CardBody>
                    <TableContainer>
                        <Table variant="striped">
                            <Thead>
                                <Tr>
                                    <Th>Nome completo</Th>
                                    <Th>E-mail</Th>
                                    <Th>Unidade consumidora</Th>
                                    <Th>Enquadramento</Th>
                                    <Th>Modelo Fásico</Th>
                                    <Th isNumeric>Valor</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data &&
                                    data.map((row) => (
                                        <Tr key={row.id}>
                                            <Td>{row.Lead?.nomeCompleto}</Td>
                                            <Td>{row.Lead?.email}</Td>
                                            <Td>
                                                {row.codigoDaUnidadeConsumidora}
                                            </Td>
                                            <Td>{row.enquadramento}</Td>
                                            <Td>{row.modeloFasico}</Td>
                                            <Td isNumeric>
                                                {row.consumoEmReais}
                                            </Td>
                                        </Tr>
                                    ))}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th>Nome completo</Th>
                                    <Th>E-mail</Th>
                                    <Th>Unidade consumidora</Th>
                                    <Th>Enquadramento</Th>
                                    <Th>Modelo Fásico</Th>
                                    <Th isNumeric>Valor</Th>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                </CardBody>
            </Card>
        </Container>
    )
}

type Params = {
    [key: string]: string
}

type FetchDataParams = {
    leadId?: string
    orderBy?: string
    orderDirection?: string
}
