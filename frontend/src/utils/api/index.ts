import { API_URL } from '@/src/contants'
import axios from 'axios'

export const api = axios.create({
    baseURL: API_URL,
})

export * from './leads'