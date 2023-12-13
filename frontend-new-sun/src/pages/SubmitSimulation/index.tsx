import { Box, Button, Divider, FormControl, FormErrorMessage, Heading, Input, Text } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { decodePDFBill } from "../../services/decode-pdf-bill"
import { DecodedBill } from "../../models/DecodedBill"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { existentLeadError, existentUnitsError, registerLead } from "../../services/register-lead"
import { toast } from "react-toastify"

type FormType = {
  name: string
  email: string
  phone: string
}

export const SubmitSimulation = () => {
  
  const [file, setFile] = useState<File | null>(null)
  const [decodedFiles, setDecodedFiles] = useState<DecodedBill[]>([])
  const hiddenFileInput = useRef<HTMLInputElement>(null)
  const {register, handleSubmit, formState: { errors }} = useForm<FormType>()

  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event?.target.files) return
    setFile(event.target.files[0])
  }

  useEffect(() => {
    console.log('FILE UPLOADED', file)
    if(file) decodePDFBill(file).then((res) => {
      setDecodedFiles([...decodedFiles, res])
      return;
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])

  const onSubmit = async (val: FormType) => {
    console.log('VAAALUE', val)
    if(!decodedFiles.length) return toast.error('Faça o upload de pelo menos uma conta')
      const res = await registerLead({ ...val, unidades: decodedFiles.map((file) => ({
        codigoDaUnidadeConsumidora: file.unit_key,
        enquadramento: file.chargingModel,
        modeloFasico: file.phaseModel,
        historicoDeConsumoEmKWH: file.invoice.map((unit) => ({
          consumoForaPontaEmKWH: unit.consumo_fp,
          mesDoConsumo: unit.consumo_date
        }))
      })) 
    })
    if (res === 200) return toast.success('Simulação criada com sucesso')
    if (res.toString().includes(existentUnitsError)) 
      return toast.error('Uma ou mais das contas adicionadas já foram cadastradas')
    if (res.toString().includes(existentLeadError)) 
      return toast.error(`Já existe um lead cadastrado com o email ${val.email}`)
    return toast.error(res.toString())

  }

  return (
    <Box>
      <Box padding="25px" display="flex" justifyContent="space-between" alignItems="center">
        <Heading paddingBottom={0} size="xl">Crie uma simulação</Heading>
        <Button onClick={handleSubmit(onSubmit)} colorScheme="blue">Registrar simulação</Button>
      </Box>
      <Box margin="25px" padding="30px 40px" backgroundColor="#fff" display="flex" height="150px" justifyContent="space-between" flexDir="column" borderRadius={6}>
        <Heading size="md">Insira suas informações</Heading>
        <form>
        <Box display="flex" justifyContent="space-between">
          <FormControl maxW="30%" isInvalid={!!errors.name}>
              <Input {...register('name', { required: true })}  placeholder="Nome" />
              {errors.name ?  <FormErrorMessage>Insira um nome.</FormErrorMessage> : null}
          </FormControl>
          <FormControl maxW="30%" isInvalid={!!errors.email}>
            <Input {...register('email', { required: true })} placeholder="E-mail" />
            {errors.email ? <FormErrorMessage>Insira um E-mail.</FormErrorMessage> : null}
          </FormControl>
          <FormControl maxW="30%" isInvalid={!!errors.phone}>
            <Input {...register('phone', { required: true })} placeholder="Telefone" />
            {errors.phone ? <FormErrorMessage>Insira um telefone.</FormErrorMessage> : null}
          </FormControl>
        </Box>
        </form> 
      </Box>
      <Box margin="25px" padding="30px 40px" backgroundColor="#fff" display="flex" minHeight="150px" justifyContent="space-between" flexDir="column" borderRadius={6}>
       <Box marginBottom="20px" display="flex" justifyContent="space-between">
          <Heading size="md">Informações decodificadas da conta</Heading>
          <Button onClick={() => hiddenFileInput.current?.click()} colorScheme="blue">Adicionar conta</Button>
          <Input style={{display: 'none'}} ref={hiddenFileInput} maxW="30%" type="file" placeholder="Anexar conta" onChange={handleUploadFile} />
       </Box>
        <Box display="flex" flexWrap="wrap" justifyContent="space-between">
          {decodedFiles.map((decodedFile,idx) => (
            <span key={idx}>
              <Heading size="md">
                Conta {idx + 1}
              </Heading>
              <Box width="100%" display="flex" justifyContent="space-between" margin="15px 0">
                <Box width="33%">
                  <Heading size="sm">
                    Código da unidade consumidora
                  </Heading>
                  <Text>{decodedFile?.unit_key ?? 'Sem arquivo'}</Text>
                </Box>
                <Box width="33%">
                  <Heading size="sm">
                    Enquadramento
                  </Heading>
                  <Text>{decodedFile?.chargingModel ?? 'Sem arquivo'}</Text>
                </Box>
                <Box width="33%">
                  <Heading size="sm">
                    Modelo Fásico
                  </Heading> 
                  <Text>{decodedFile?.phaseModel ?? 'Sem Arquivo'}</Text>
                </Box>
              </Box>
              {decodedFile?.invoice?.map((invoice) => (
                <Box key={invoice.consumo_fp} width="33%" marginBottom={5}>
                  <Heading size="sm">
                    Consumo fora ponta em KWH em {format(new Date(invoice.consumo_date), 'dd/MM/yyyy')}:
                  </Heading>
                  <Text>{invoice.consumo_fp}</Text>
                </Box>
              ))}
              <Divider margin="10px"/>
            </span>
          ))
            }
        </Box>
      </Box>
    </Box>
  )
}