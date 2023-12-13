import React, { ReactElement, useContext } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { SimulationContext } from '../context'
import { useToast } from '@chakra-ui/react'
export { FormContent } from './content'

export function Form({ children }: Props) {
  const { handleSubmit } = useContext(SimulationContext)
  const toast = useToast()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'multipart/form-data')

    const formData = new FormData()
    formData.append('nomeCompleto', data.nomeCompleto)
    formData.append('email', data.email)
    formData.append('telefone', data.telefone)

    const fileInput = document.querySelector('#files_input')
    console.log(fileInput.files[0])

    // TODO ajustar formdata
    formdata.append('files', fileInput.files[0], 'CONTA-5.pdf')
    // for (let file of fileInput.files) {
    // }

    fetch('http://localhost:9900/api/simulate', {
      method: 'POST',
      body: formData,
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error || !data.message) {
          return
        }

        const errorMessages = Array.isArray(data.message)
          ? data.message
          : [data.message]

        for (let errorMessage of errorMessages) {
          toast({
            title: 'Erro na simulação',
            description: errorMessage,
            duration: 5_000,
            isClosable: true,
            status: 'error',
            position: 'top',
            containerStyle: {
              width: '90%',
              maxWidth: '450px',
            },
          })
        }
      })
  }

  return <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
}

type Props = {
  children: ReactElement[]
}

export type Inputs = {
  nomeCompleto: string
  email: string
  telefone: string
  files: File[]
}
