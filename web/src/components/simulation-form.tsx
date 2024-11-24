'use client'

import * as FileInput from '@/components/ui/input-file'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useFormState } from '@/hooks/use-form-state'
import { createSimulationAction } from '@/app/(app)/simular/actions'
import { cn, formatPhoneNumber } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { AlertTriangle, Loader2 } from 'lucide-react'

export function SimulationForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    createSimulationAction,
    () => {
      toast({
        className: cn(
          'top-14 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex fixed md:max-w-[420px] md:top-14 md:left-1/2 md:transform md:-translate-x-1/2'
        ),
        variant: 'success',
        title: '✅ Simulação registrada com sucesso!',
      })
      router.push('/')
    }
  )
  return (
    <div className="max-w-[860px] mx-auto">
      {success === false && message && (
        <Alert variant="destructive" className="mb-5">
          <AlertTriangle className="size-4" />
          <AlertTitle>Erro ao enviar os dados !</AlertTitle>

          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}
      <div className="shadow-xl shadow-blue-900/20 rounded-xl">
        <div className="relative flex max-w-full items-center rounded-t-lg bg-gray-800 px-24 py-2">
          <div className="absolute start-4 top-2/4 hidden -translate-y-1 space-x-1 sm:flex">
            <span className="size-3 rounded-full bg-gray-600 dark:bg-neutral-600" />
            <span className="size-3 rounded-full bg-gray-600 dark:bg-neutral-600" />
            <span className="size-3 rounded-full bg-gray-600 dark:bg-neutral-600" />
          </div>
          <div className="flex w-full justify-center rounded-sm text-xs text-gray-400  sm:bg-gray-700">
            https://www.newsun.energy
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <div className="space-y-1">
            <Label htmlFor="name">Nome Completo</Label>
            <Input name="name" id="name" />

            {errors?.name && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.name[0]}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">E-mail</Label>
            <Input
              name="email"
              type="email"
              id="email"
              placeholder="johndoe@hotmail.com"
            />
            {errors?.email && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.email[0]}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              name="telefone"
              type="text"
              id="telefone"
              onChange={e => {
                const { value } = e.target
                e.target.value = formatPhoneNumber(value)
              }}
            />
            {errors?.telefone && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.telefone[0]}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="bills">Conta de energia</Label>
            <FileInput.Root id="bills">
              <FileInput.Trigger />
              <FileInput.FileList />
              <FileInput.Control multiple name="bills" />
            </FileInput.Root>

            {errors?.bills && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.bills[0]}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Enviar'}
          </Button>
        </form>
      </div>
    </div>
  )
}
