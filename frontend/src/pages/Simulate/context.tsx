import React, { ReactElement, createContext } from 'react'
import {
  Control,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from 'react-hook-form'
import { Inputs } from './Form'

export const SimulationContext = createContext<ContextValue>({})

export function ProvideSimulationContext({
  children,
}: ProvideSimulationContextProps) {
  const { register, handleSubmit, control } = useForm<Inputs>({
    mode: 'onSubmit',
  })

  return (
    <SimulationContext.Provider
      value={{
        register,
        handleSubmit,
        control,
      }}
    >
      {children}
    </SimulationContext.Provider>
  )
}

type ProvideSimulationContextProps = {
  children: ReactElement
}

type ContextValue = {
  register?: UseFormRegister<Inputs>
  handleSubmit?: UseFormHandleSubmit<Inputs>
  control?: Control<Inputs>
}
