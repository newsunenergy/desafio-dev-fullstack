import React, { ReactElement, createContext } from 'react'
import {
    Control,
    FormState,
    UseFormHandleSubmit,
    UseFormRegister,
    useForm,
} from 'react-hook-form'
import { Inputs } from './Form'

export const SimulationContext = createContext<ContextValue>({})

export function ProvideSimulationContext({
    children,
}: ProvideSimulationContextProps) {
    const { register, handleSubmit, control, formState } = useForm<Inputs>({
        mode: 'onChange',
    })

    return (
        <SimulationContext.Provider
            value={{
                register,
                handleSubmit,
                control,
                formState,
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
    formState?: FormState<Inputs>
    handleSubmit?: UseFormHandleSubmit<Inputs>
    control?: Control<Inputs>
}
