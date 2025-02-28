import { QueryClient } from '@tanstack/react-query'
import { ApiError } from 'next/dist/server/api-utils'

export const queryClient = new QueryClient()

export const API_URL = process.env.NEXT_PUBLIC_API_URL