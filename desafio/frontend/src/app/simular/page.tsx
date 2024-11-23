"use client";
import FeedbackModal from "@/components/FeedbackModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as z from "zod";

const schema = z.object({
  nomeCompleto: z.string().min(8, "Nome completo é obrigatório"),
  email: z.string().email("Email inválido"),
  telefone: z
    .string()
    .regex(/^\d+$/, "Telefone deve conter apenas números")
    .min(10, "Telefone deve ter pelo menos 10 dígitos"),
  arquivo: z.instanceof(File).refine((file) => file instanceof File, {
    message: "Um arquivo deve ser enviado",
  }),
});

type FormValues = z.infer<typeof schema>;

export default function page() {
  const [formValues, setFormValues] = useState<Partial<FormValues>>({});
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormValues, string>>
  >({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleShowModal = (success: boolean, msg: string) => {
    setIsSuccess(success);
    setMessage(msg);
    setShowModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const validatedData = schema.parse(formValues);

      const formData = new FormData();
      Object.entries(validatedData).forEach(([key, value]) =>
        formData.append(key, value as Blob | string)
      );

      const res = await fetch("http://localhost:3333/simulacao", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.message) {
        handleShowModal(true, data.message);
        if (data.success) {
          setTimeout(() => {
            router.push("/listagem");
          }, 3000);
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const zodErrors = error.flatten().fieldErrors;
        setErrors(
          Object.fromEntries(
            Object.entries(zodErrors).map(([field, messages]) => [
              field,
              messages?.[0],
            ])
          )
        );
      } else {
        handleShowModal(false, "Erro ao enviar a simulação.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={onSubmit}
        className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Nova Simulação</h2>

        <div className="mb-4">
          <label htmlFor="nomeCompleto">Nome Completo</label>
          <input
            id="nomeCompleto"
            type="text"
            name="nomeCompleto"
            className="w-full border rounded-md p-1"
            onChange={handleInputChange}
            required
          />
          {errors.nomeCompleto && (
            <p className="text-red-500 text-sm mt-1">{errors.nomeCompleto}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className="w-full border rounded-md p-1"
            onChange={handleInputChange}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="telefone">Telefone</label>
          <input
            id="telefone"
            name="telefone"
            type="number"
            className="w-full border rounded-md p-1"
            onChange={handleInputChange}
            required
          />
          {errors.telefone && (
            <p className="text-red-500 text-sm mt-1">{errors.telefone}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="arquivo">Arquivo da Fatura</label>
          <input
            id="arquivo"
            type="file"
            name="arquivo"
            className="w-full border rounded-md p-1"
            onChange={handleInputChange}
            required
          />
          {errors.arquivo && (
            <p className="text-red-500 text-sm mt-1">{errors.arquivo}</p>
          )}
        </div>

        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
          >
            Voltar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? "Enviando..." : "Enviar Simulação"}
          </button>
        </div>
      </form>
      {showModal && (
        <FeedbackModal
          isSuccess={isSuccess}
          message={message}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
