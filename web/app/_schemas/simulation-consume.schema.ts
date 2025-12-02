import * as z from "zod";

export const simulationConsumeSchema = z.object({
  nomeCompleto: z
    .string()
    .min(2, "Nome completo deve ter no mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(8, "Telefone deve ter no mínimo 8 caracteres"),
  informacoesDaFatura: z
    .custom<FileList>()
    .transform((fileList, ctx) => {
      if (!fileList || fileList.length <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Nenhum arquivo selecionado",
        });
        return z.NEVER;
      }
      const filesArray = Array.from(fileList);
      const validFiles = filesArray.filter((file) => {
        const isValidSize = file.size <= 10 * 1024 * 1024;
        const isValidType = file.type === "application/pdf";
        return isValidSize && isValidType;
      });
      if (validFiles.length !== filesArray.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Um ou mais arquivos são inválidos (tamanho ou formato)",
        });
        return z.NEVER;
      }
      return filesArray;
    })
    .refine((files) => files.length > 0, {
      message: "É necessário fornecer pelo menos uma conta de energia",
    }),
});

export type SimulationConsumeSchema = z.infer<typeof simulationConsumeSchema>;
