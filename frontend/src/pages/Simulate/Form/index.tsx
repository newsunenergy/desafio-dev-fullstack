import React, { ReactElement, useContext } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { SimulationContext } from '../context'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { uploadToMagicPdf } from '../../../helpers/upload/magic-pdf'
export { FormContent } from './content'

export function Form({ children }: Props) {
    const { handleSubmit } = useContext(SimulationContext)
    const toast = useToast()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'multipart/form-data')

        const magicPdfUpload = await uploadToMagicPdf(data.files, toast)

        delete data.files
        const response = await axios
            .post('/api/simulate', {
                ...data,
                informacoesDaFatura: magicPdfUpload,
            })
            .catch(() => ({
                data: {
                    message: 'Não foi possível processar a simulação',
                    error: true,
                },
            }))

        const simulationResponse = response.data

        if (!simulationResponse.message) {
            return
        }

        const responseMessages = Array.isArray(simulationResponse.message)
            ? simulationResponse.message
            : [simulationResponse.message]

        for (let message of responseMessages) {
            toast({
                description: message,
                status: simulationResponse.error ? 'error' : 'success',
            })
        }
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
