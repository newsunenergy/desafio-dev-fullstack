import React, { ReactElement, useContext } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { SimulationContext } from '../context'
export { FormContent } from './content'

export function Form({ children }: Props) {
  const { handleSubmit } = useContext(SimulationContext)

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetch('/api/simulate', {
      method: 'POST',
      body: JSON.stringify(data),
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
  telefone: number
  files: object[]
}
