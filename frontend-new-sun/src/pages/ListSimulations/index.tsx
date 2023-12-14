import { useEffect, useState } from "react"
import { loadLeads } from "../../services/load-leads"
import { Box, Button, Divider, Heading, Input, Text, useMediaQuery } from "@chakra-ui/react"
import { format } from "date-fns"
import { LeadInfo } from "../../services/register-lead"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { InfoBox } from "../../components/InfoBox"

interface FormType {
  name?: string
  email?: string
  unitCode?: string
}

export const ListSimulations = () => {
  const { register, handleSubmit } = useForm<FormType>()
  const [leads, setLeads] = useState<LeadInfo[]>([])
  const navigate = useNavigate()
  
  const loadAndSetLead = async ({email, name, unitCode}: FormType) => {
    const val = await loadLeads({email, name, codigoDaUnidadeConsumidora: unitCode})
    setLeads(val)

  }

  useEffect(() => {
    loadAndSetLead({})
  }, [])

  const onSubmit = (formValue: FormType) => {
    loadAndSetLead(formValue)
  }

  const [isSmallerThan400] = useMediaQuery('(max-width: 400px)')
  
  return (
    <>
    <Box padding="25px" display="flex" justifyContent="space-between" alignItems="center">
      <Heading paddingBottom={0} size="xl">Listagem de simulações</Heading>
      <Button onClick={() => navigate('/')} colorScheme="blue">Voltar</Button>
    </Box>
      <Box margin="25px" padding="30px 40px" backgroundColor="#fff" display="flex" minH="150px" justifyContent="space-between" flexDir="column" borderRadius={6}>
        <Heading size="md">Buscar lead</Heading>
        <Box display="flex" justifyContent="space-between" minH={isSmallerThan400 ? '200px' : '0'} marginTop={isSmallerThan400 ? 3 : 0} flexDir={isSmallerThan400 ? 'column' : 'row'}>
          <Input w={isSmallerThan400 ? "10)%" : "30%"} {...register('name')} placeholder="Nome" />
          <Input w={isSmallerThan400 ? "10)%" : "30%"} {...register('email')} placeholder="Email" />
          <Input w={isSmallerThan400 ? "10)%" : "30%"} {...register('unitCode')} placeholder="Código da unidade consumidora" />
          <Button onClick={handleSubmit(onSubmit)} colorScheme="orange">Buscar</Button>
        </Box>
      </Box>
    {leads.map((lead) => (
      <Box>
        <Box margin="25px" padding="30px 40px" backgroundColor="#fff" display="flex" minH="150px" justifyContent="space-between" flexDir="column" borderRadius={6}>
          <Heading size="md">Informações do Lead</Heading>
          <Box display="flex" justifyContent="space-between" flexDir={isSmallerThan400 ? 'column' : 'row'} marginTop={isSmallerThan400 ? 3 : 0}>
            <Text>Nome: {lead.name}</Text>
            <Text>Email: {lead.email}</Text>
            <Text>Telefone: {lead.phone}</Text>
          </Box>
        </Box>
        <Box margin="25px" padding="30px 40px" backgroundColor="#fff" display="flex" minHeight="150px" justifyContent="space-between" flexDir="column" borderRadius={6}>
          <Box marginBottom="20px" display="flex" justifyContent="space-between">
            <Heading size="md">Informações da simulação</Heading>
          </Box>
          <Box display="flex" flexWrap="wrap" justifyContent="space-between">
            {lead.unidades.map((unit, idx) => (
              <>
                <Heading size="md">
                  Conta {idx + 1}
                </Heading>
                <Box width="100%" display="flex" flexWrap="wrap" justifyContent="space-between" margin="15px 0">
                  <InfoBox width={isSmallerThan400 ? '50%' : undefined} smallScreen={isSmallerThan400}  info={unit.codigoDaUnidadeConsumidora} title="Código da unidade consumidora" />
                  <InfoBox width={isSmallerThan400 ? '50%' : undefined} smallScreen={isSmallerThan400}  info={unit.enquadramento} title="Enquadramento" />
                  <InfoBox width={isSmallerThan400 ? '50%' : undefined} smallScreen={isSmallerThan400}  info={unit.modeloFasico} title="Modelo Fásico" />
                  <InfoBox width={isSmallerThan400 ? '50%' : undefined} smallScreen={isSmallerThan400}  info={'R$' + unit.consumoEmReais.toLocaleString('pt-BR', { currency: 'BRL' })} title="Valor" />
                </Box> 
                {unit?.historicoDeConsumoEmKWH?.map((invoice) => (
                   <InfoBox 
                    width={isSmallerThan400 ? '50%' : '33%'} 
                    smallScreen={isSmallerThan400}
                    marginTop={5} 
                    key={invoice.consumoForaPontaEmKWH} 
                    info={String(invoice.consumoForaPontaEmKWH)} 
                    title={`Consumo fora ponta em KWH em ${format(new Date(invoice.mesDoConsumo), 'dd/MM/yyyy')}:`} 
                  />
                ))}
                <Divider margin="10px" />
              </>
            ))
            }
          </Box>
        </Box>
      </Box>
    ))}
    </>
  )
} 