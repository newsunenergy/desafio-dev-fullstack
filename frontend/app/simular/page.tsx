"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/app/components";
import { api } from "@/lib/api";

export default function SimularPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
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
    const newErrors = { name: "", email: "", phone: "", file: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório";
    }

    if (!file) {
      newErrors.file = "Arquivo PDF é obrigatório";
    } else if (file.type !== "application/pdf") {
      newErrors.file = "Apenas arquivos PDF são permitidos";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    if (!file) {
      setErrors((prev) => ({ ...prev, file: "Arquivo é obrigatório" }));
      return;
    }

    setIsLoading(true);

    try {
      await api.createLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        file,
      });

      // Redireciona para listagem após sucesso
      router.push("/listagem?success=true");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao criar simulação. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md rounded-lg bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Nova Simulação
        </h1>

        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-700 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome Completo"
            type="text"
            placeholder="João Silva"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
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
              disabled={isLoading}
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

          <Button type="submit" disabled={isLoading} className="w-full mt-6">
            {isLoading ? "Enviando..." : "Enviar Simulação"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Sua fatura será processada em segundos
        </p>
      </div>
    </div>
  );
}
