import { Box, Button, Divider, Heading, Input, useMediaQuery } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { decodePDFBill } from "../../services/decode-pdf-bill"
import { DecodedBill } from "../../models/DecodedBill"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { existentLeadError, existentUnitsError, registerLead } from "../../services/register-lead"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { InfoBox } from "../../components/InfoBox"
import { FormControlComponent } from "../../components/FormControl"

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
  const navigate = useNavigate()


  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event?.target.files) return
    setFile(event.target.files[0])
  }

  useEffect(() => {
    if(file) decodePDFBill(file).then((res) => {
      if(res.invoice.length !== 12) return toast.error('A conta inserida não possui a quantidade de registros de consumo dos últimos 12 meses')
      setDecodedFiles([...decodedFiles, res])
      return;
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])

  const handleRemoveDecodedFile = (fileToRemove: DecodedBill) => {
    const files = decodedFiles
    const filesWithoutFileToRemove = files.filter((file) => file !== fileToRemove)
    setDecodedFiles(filesWithoutFileToRemove)
  }

  const onSubmit = async (val: FormType) => {
    if(!decodedFiles.length) return toast.error('Faça o upload de pelo menos uma conta')
      const res = await registerLead({ ...val, unidades: decodedFiles.map((file) => ({
        codigoDaUnidadeConsumidora: file.unit_key,
        enquadramento: file.chargingModel,
        modeloFasico: file.phaseModel,
        historicoDeConsumoEmKWH: file.invoice.map((unit) => ({
          consumoForaPontaEmKWH: unit.consumo_fp,
          mesDoConsumo: unit.consumo_date
        })),
        consumoEmReais: file.valor
      })) 
    })
    if (res === 200) return toast.success('Simulação criada com sucesso')
    if (res.toString().includes(existentUnitsError)) 
      return toast.error('Uma ou mais das contas adicionadas já foram cadastradas')
    if (res.toString().includes(existentLeadError)) 
      return toast.error(`Já existe um lead cadastrado com o email ${val.email}`)
    return toast.error(res.toString())
  }

  const [isSmallerThan400] = useMediaQuery('(max-width: 400px)')

  return (
    <Box>
      <Box padding="25px" display="flex" justifyContent="space-between" flexDir={isSmallerThan400 ? 'column' : 'row'} alignItems="center">
        <Heading paddingBottom={0} size="xl">Crie uma simulação</Heading>
        <div>
          <Button margin="0 15px" onClick={() => navigate('/')} colorScheme="blue">Voltar</Button>
          <Button onClick={handleSubmit(onSubmit)} colorScheme="blue">Registrar simulação</Button>
        </div>
      </Box>
      <Box margin="25px" padding="30px 40px" backgroundColor="#fff" display="flex" minHeight="150px" justifyContent="space-between" flexDir="column" borderRadius={6}>
        <Heading size="md">Insira suas informações</Heading>
        <form>
          <Box display="flex" justifyContent="space-between" minHeight={isSmallerThan400 ? '150px' : '0'} flexDir={isSmallerThan400 ? 'column' : 'row'}>
          <FormControlComponent maxW={isSmallerThan400 ? '100%' : '30%'} placeholder="Nome" errors={errors} name="name" errorMessage="Insira um nome."  register={register} />
          <FormControlComponent maxW={isSmallerThan400 ? '100%' : '30%'} placeholder="E-mail" errors={errors} name="email" errorMessage="Insira um E-mail." register={register} />
          <FormControlComponent maxW={isSmallerThan400 ? '100%' : '30%'} placeholder="Phone" errors={errors} name="phone" errorMessage="Insira um telefone." register={register} />
        </Box>
        </form> 
      </Box>
      <Box margin="25px" padding={isSmallerThan400 ? "20px" :"30px 40px"} backgroundColor="#fff" display="flex" minHeight="150px" justifyContent="space-between" flexDir="column" borderRadius={6}>
        <Box marginBottom="20px" display="flex" justifyContent="space-between" flexDir={isSmallerThan400 ? 'column' : 'row'}>
          <Heading size={isSmallerThan400 ? 'sm' :"md"}>Informações decodificadas da conta</Heading>
          <Button marginTop={isSmallerThan400 ? 3 : 0} onClick={() => hiddenFileInput.current?.click()} colorScheme="blue">Adicionar conta</Button>
          <Input style={{display: 'none'}} ref={hiddenFileInput} maxW="30%" type="file" placeholder="Anexar conta" onChange={handleUploadFile} />
       </Box>
        <Box display="flex" flexWrap="wrap" justifyContent="space-between">
          {decodedFiles.map((decodedFile,idx) => (
            <>
            <Box display="flex" justifyContent="space-between" width="100%">
                <Heading size="md">
                  Conta {idx + 1}
                </Heading>
                <Button onClick={() => handleRemoveDecodedFile(decodedFile)} colorScheme="red">Remover conta</Button>
            </Box>
              <Box width="100%" display="flex" flexWrap="wrap" justifyContent="space-between" margin="15px 0">
                <InfoBox width={isSmallerThan400 ? '50%' : undefined} smallScreen={isSmallerThan400} info={decodedFile?.unit_key ?? 'Sem arquivo'} title="Código da unidade consumidora"/>
                <InfoBox width={isSmallerThan400 ? '50%' : undefined} smallScreen={isSmallerThan400} info={decodedFile?.chargingModel ?? 'Sem arquivo'} title="Enquadramento" />
                <InfoBox width={isSmallerThan400 ? '50%' : undefined} smallScreen={isSmallerThan400} info={decodedFile?.phaseModel ?? 'Sem Arquivo'} title="Modelo Fásico" />
                <InfoBox width={isSmallerThan400 ? '50%' : undefined} smallScreen={isSmallerThan400} info={'R$' + decodedFile?.valor.toLocaleString('pt-BR', {currency: 'BRL'}) ?? 'Sem Arquivo'} title="Valor" />
              </Box>
              {decodedFile?.invoice?.map((invoice) => (
                <InfoBox 
                  smallScreen={isSmallerThan400}
                  marginTop={5} 
                  key={invoice.consumo_fp} 
                  width={isSmallerThan400 ? '50%' : "33%"} 
                  info={String(invoice.consumo_fp)} 
                  title={`Consumo fora ponta em KWH em ${format(new Date(invoice.consumo_date), 'dd/MM/yyyy')}:`} 
                />
              ))}
              <Divider margin="10px"/>
            </>
          ))
            }
        </Box>
      </Box>
    </Box>
  )
}