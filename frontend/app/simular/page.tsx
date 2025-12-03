"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/app/components";
import { useCreateLead } from "@/lib/hooks/use-leads";
import { validateFormSchema } from "@/lib/form-schema";
import { ZodError } from "zod";
import toast from "react-hot-toast";

export default function SimularPage() {
  const router = useRouter();
  const createLeadMutation = useCreateLead();
  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    file: "",
  });

  const validateForm = (): boolean => {
    setErrors({ name: "", email: "", phone: "", file: "" });

    try {
      validateFormSchema.parse({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        file: file,
      });
      return true;
    } catch (err) {
      if (err instanceof ZodError) {
        const newErrors = { name: "", email: "", phone: "", file: "" };
        err.issues.forEach((issue) => {
          const field = issue.path[0] as keyof typeof newErrors;
          newErrors[field] = issue.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Verifique os erros no formulário");
      return;
    }

    if (!file) {
      setErrors((prev) => ({ ...prev, file: "Arquivo é obrigatório" }));
      toast.error("Selecione um arquivo PDF");
      return;
    }

    createLeadMutation.mutate(
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        file,
      },
      {
        onSuccess: () => {
          toast.success("Simulação criada com sucesso!");
          setTimeout(() => router.push("/listagem?success=true"), 500);
        },
        onError: (error) => {
          const errorMessage =
            error instanceof Error ? error.message : "Erro ao criar simulação";
          toast.error(errorMessage);
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md rounded-lg bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Nova Simulação
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome Completo"
            type="text"
            placeholder="João Silva"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
            disabled={createLeadMutation.isPending}
          />

          <Input
            label="Email"
            type="email"
            placeholder="joao@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            error={errors.email}
            disabled={createLeadMutation.isPending}
          />

          <Input
            label="Telefone"
            type="tel"
            placeholder="(85) 99772-0796"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            error={errors.phone}
            disabled={createLeadMutation.isPending}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fatura de Luz (PDF)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => {
                setFile(e.target.files?.[0] || null);
                if (e.target.files?.[0]) {
                  setErrors((prev) => ({ ...prev, file: "" }));
                }
              }}
              disabled={createLeadMutation.isPending}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 disabled:opacity-50"
            />
            {file && (
              <p className="mt-2 text-sm text-green-600">✓ {file.name}</p>
            )}
            {errors.file && (
              <span className="text-sm text-red-600 mt-1 block">
                {errors.file}
              </span>
            )}
          </div>

          <Button
            type="submit"
            disabled={createLeadMutation.isPending}
            className="w-full mt-6"
          >
            {createLeadMutation.isPending ? "Enviando..." : "Enviar Simulação"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Sua fatura será processada em segundos
        </p>
      </div>
    </div>
  );
}
