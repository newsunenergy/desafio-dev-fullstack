import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres.")
    .max(50, "O nome pode ter no máximo 50 caracteres."),
  email: z.string().email("Digite um e-mail válido."),
  phone: z.string().min(15, "O Telefone deve ter pelo menos 15 caracteres."),
});
