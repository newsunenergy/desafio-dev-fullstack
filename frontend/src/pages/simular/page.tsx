import { useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Container,
  SimpleGrid,
  Flex,
} from '@chakra-ui/react'
import axios from 'axios'
import { decodeAxiosError } from '../../utils/decode.axios.error'
import { useNavigate } from 'react-router-dom'

interface UserDTO {
  nome: string
  email: string
  telefone: string
  file: FileList
}
export function SimularPage() {
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting, },
  } = useForm<UserDTO>()

  async function onSubmit(values: UserDTO) {

    const url = "http://localhost:3000/simular"
    const formData = new FormData()
    formData.append('nomeCompleto', values.nome)
    formData.append('email', values.email)
    formData.append('telefone', values.telefone)
    formData.append('file', values.file[0])
    try {
      await axios.post(url, formData)
      navigate('/listagem')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError('file', {
        message: decodeAxiosError(e)
      })
    }
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.nome}>
          <FormLabel htmlFor='nome'>Nome completo</FormLabel>
          <Input
            id='nome'
            {...register('nome', {
              required: 'Nome é obrigatório',
            })}
          />
          <FormErrorMessage>
            {errors.nome && errors.nome.message}
          </FormErrorMessage>
        </FormControl>



        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor='email'>Endereço de Email</FormLabel>
          <Input
            id='email'
            {...register('email', {
              required: 'Email obrigatório!',
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.telefone}>
          <FormLabel htmlFor='telefone'>Telefone</FormLabel>
          <Input
            id='telefone'
            {...register('telefone', {
              required: 'Telefone obrigatório!',
            })}
          />
          <FormErrorMessage>
            {errors.telefone && errors.telefone.message}
          </FormErrorMessage>
        </FormControl>


        <FormControl isInvalid={!!errors.file}>
          <FormLabel htmlFor='file'>file</FormLabel>
          <Input
            id='file'
            type='file'
            {...register('file', {
              required: 'Arquivo obrigatório!',
            })}
          />
          <FormErrorMessage>
            {errors.file && errors.file.message}
          </FormErrorMessage>
        </FormControl>

        <Flex gap={50}>
          <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
            Enviar
          </Button>
          <Button mt={4} colorScheme='teal' onClick={() => { navigate('/') }}>Voltar</Button>
        </Flex>
      </form>
    </Container>
  )
}