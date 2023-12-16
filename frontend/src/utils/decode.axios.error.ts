import { AxiosError } from "axios";

export function decodeAxiosError(plainError?: Error) {
  if (!plainError) return
  const error: AxiosError<{ message: string }> = plainError as AxiosError<{ message: string }>
  if (!(error instanceof AxiosError)) return
  return error?.response?.data?.message
}