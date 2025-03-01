import { z } from "zod";

export const newLeadFormSchema = z.object({
  nome: z
    .string()
    .min(3, { message: "É necessário entrar com um nome válido" }),
  email: z.string().email({ message: "Entre com um endereço de email válido" }),
  telefone: z
    .string()
    .regex(/^(?:(?:\+|00)?(55))?([1-9][0-9])([0-9]{8,9})$/, {
      message:
        "Entre com um número no formato DDDXXXXXXXXX (apenas números, sem traços ou caracteres especiais)",
    }),
});

export type NewLeadFormData = z.infer<typeof newLeadFormSchema>;
