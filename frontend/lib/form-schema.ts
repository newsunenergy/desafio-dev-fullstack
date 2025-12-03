import { z } from "zod";

export const validateFormSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(3, "O nome precisa conter pelo menos 3 caracteres.")
    .max(180, "O nome não pode conter mais de 180 caracteres."),

  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Informe um e-mail válido"),

  phone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .regex(
      /^(\+55\s?)?(\(?\d{2}\)?)\s?9?\d{4}[-\s]?\d{4}$/,
      "Informe um telefone válido (ex: (85) 99772-0796)"
    ),

  file: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Selecione um arquivo PDF")
    .refine(
      (file) => file.size <= 1024 * 1024 * 2,
      "Arquivos não podem exceder 2MB"
    )
    .refine(
      (file) => file.type === "application/pdf",
      "Apenas arquivos PDF são permitidos"
    ),
});

export type ContactFormData = z.infer<typeof validateFormSchema>;
