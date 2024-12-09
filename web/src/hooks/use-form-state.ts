// O React 19 redefine os formulários com componentes não controlados, o que impede, entre outras coisas, a exibição de mensagens de erro dinâmicas para os usuários.
// Este hook é uma solução alternativa que permite contornar esse problema e tem o mesmo funcionamento do hook useActionState() do React 19.
// @see:  https://github.com/facebook/react/issues/29034
import { useState, useTransition, type FormEvent } from 'react'

interface FormState {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

export function useFormState(
  action: (data: FormData) => Promise<FormState>,
  onSuccess: () => Promise<void> | void,

  initialState?: FormState
) {
  const [isPending, startTransition] = useTransition()

  const [formState, setFormState] = useState(
    initialState ?? {
      success: false,
      message: null,
      errors: null,
    }
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const state = await action(data)

      if (state.success === true && onSuccess) {
        await onSuccess()
      }

      setFormState(state)
    })
  }

  return [formState, handleSubmit, isPending] as const
}
