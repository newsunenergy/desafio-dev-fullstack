import { FormControl, FormErrorMessage, Input, InputProps } from "@chakra-ui/react"
import { FieldErrors, UseFormRegister } from "react-hook-form"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type T = any

interface FormControlProps extends Pick<InputProps, 'placeholder' | 'maxW'> {
  register: UseFormRegister<T>
  errors?: FieldErrors<T>
  errorMessage?: string
  name: string
}

export const FormControlComponent = ({ register, errors, placeholder, errorMessage, name, maxW }: FormControlProps) => {
  return (
    <FormControl maxW={maxW} isInvalid={!!errors?.[name]}>
      <Input {...register(name, { required: true })} placeholder={placeholder} />
      {errors && errors[name] ? <FormErrorMessage>{errorMessage}</FormErrorMessage> : null}
    </FormControl>
  )
}