export const validationFields = {
  nome: {
    validate: (value: string) => value.trim().length >= 2,
    message: "Nome é obrigatório e deve ter pelo menos 2 caracteres.",
  },
  email: {
    validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: "Email inválido. Insira um email válido.",
  },
  telefone: {
    validate: (value: string) => /^\d{10,}$/.test(value.replace(/\D/g, "")),
    message: "Telefone inválido.",
  },
};