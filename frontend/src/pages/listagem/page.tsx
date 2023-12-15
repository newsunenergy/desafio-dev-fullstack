import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

interface Consumo {
    id: string;
    consumoForaPontaEmKWH: string;
    mesDoConsumo: string;
    unidadeCodigo: string;
}

interface Unidade {
    codigoDaUnidadeConsumidora: string;
    modeloFasico: string;
    enquadramento: string;
    leadId: string;
    historicoDeConsumoEmKWH: Consumo[];
}

interface LeadDTO {
    id: string;
    nomeCompleto: string;
    email: string;
    telefone: string;
    unidades: Unidade[];
}
export function ListagemPage() {
    const { onClose } = useDisclosure()
    const [leads, setLeads] = useState<LeadDTO[]>([])
    const [selectedLead, setSelectedLead] = useState<LeadDTO | null>()
    useEffect(function () {
        axios.get('http://localhost:3000/listagem').then((response) => {
            setLeads(response.data)
        })
    }, [])
    return (
        <Box width='full'>
            <Heading>Listagem de Leads</Heading>
            <Table width='full'>
                <Thead>
                    <Tr>
                        <Th>Nome Completo</Th>
                        <Th>Email</Th>
                        <Th>Telefone</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {leads.map(lead => (
                        <Tr>
                            <Td>{lead.nomeCompleto}</Td>
                            <Td>{lead.email}</Td>
                            <Td>{lead.telefone}</Td>
                            <Td><Button onClick={() => {
                                setSelectedLead(lead)
                            }}
                                variant="outline">Ver mais</Button></Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <Modal isOpen={Boolean(selectedLead)} size={"full"} onClose={() => {
                setSelectedLead(null)
                onClose()
            }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Detalhes</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Card mb="5">
                            <CardHeader>
                                <Heading size='md'>Dados do Cliente</Heading>
                            </CardHeader>
                            <CardBody>
                                <Flex>
                                    {selectedLead?.nomeCompleto}
                                </Flex>

                                <Flex>
                                    Email: {selectedLead?.email}
                                </Flex>

                                <Flex>
                                    Telefone: {selectedLead?.telefone}
                                </Flex>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardHeader>
                                <Heading size='md'>Dados da Unidade</Heading>
                            </CardHeader>
                            <CardBody>
                                {selectedLead?.unidades.map(unidade => {
                                    return (
                                        <Card>
                                            <CardHeader mb={0}>
                                                <Heading size='md'>Código: {unidade.codigoDaUnidadeConsumidora}</Heading>
                                            </CardHeader>
                                            <CardBody>
                                                <p>Código da unidade: {unidade.codigoDaUnidadeConsumidora}</p>
                                                <p>Tipo de enquadramento: {unidade.enquadramento}</p>
                                                <p>Modelo Fásico: {unidade.modeloFasico}</p>
                                                <p>Histórico de Consumo:</p>
                                                <Flex gap={0} flexWrap={"wrap"}>
                                                    {unidade.historicoDeConsumoEmKWH.map((consumo) => {
                                                        const date = new Date(consumo.mesDoConsumo).toLocaleDateString()
                                                        return (
                                                            <Box width="16.2%">
                                                                <p>{date}: {consumo.consumoForaPontaEmKWH} KWH</p>
                                                            </Box>
                                                        )
                                                    })}
                                                </Flex>
                                            </CardBody>
                                        </Card>
                                    )
                                })}

                            </CardBody>
                        </Card>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => {
                            setSelectedLead(null)
                            onClose()
                        }}>
                            Fechar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}