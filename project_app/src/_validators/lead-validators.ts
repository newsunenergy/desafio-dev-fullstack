import { z } from "zod";

export const newLeadFormSchema = z.object({
  nome: z
    .string()
    .min(3, { message: "É necessário entrar com um nome válido" }),
  email: z.string().email({ message: "Entre com um endereço de email válido" }),
  telefone: z
    .string()
    .regex(
      /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
      { message: "Entre com um número no formato +55 xx xxxxx-xxxx" }
    ),
});

export type NewLeadFormData = z.infer<typeof newLeadFormSchema>;
