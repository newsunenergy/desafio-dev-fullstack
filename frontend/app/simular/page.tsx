'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { FileUpload } from '../components/FileUpload';
import { simulacaoApi } from '../lib/api';

export default function SimularPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    telefone: '',
  });
  const [arquivos, setArquivos] = useState<File[]>([]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nomeCompleto.trim()) {
      newErrors.nomeCompleto = 'Nome completo é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    }

    if (arquivos.length === 0) {
      newErrors.arquivos = 'Pelo menos um arquivo de conta de energia é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await simulacaoApi.criar(
        formData.nomeCompleto,
        formData.email,
        formData.telefone,
        arquivos,
      );

      router.push('/listagem?success=true');
    } catch (error: unknown) {
      console.error('Erro ao criar simulação:', error);
      
      let errorMessage = 'Erro ao criar simulação. Tente novamente.';
      
      if (
        error &&
        typeof error === 'object' &&
        'response' in error &&
        error.response &&
        typeof error.response === 'object' &&
        'data' in error.response
      ) {
        const responseData = error.response.data as {
          message?: string;
          errors?: Array<{ path: string; message: string }>;
        };
        
        if (responseData.message) {
          errorMessage = responseData.message;
        } else if (responseData.errors) {
          // Erros de validação do Zod
          const validationErrors = responseData.errors
            .map((err) => `${err.path}: ${err.message}`)
            .join(', ');
          errorMessage = `Erro de validação: ${validationErrors}`;
        }
      } else if (
        error &&
        typeof error === 'object' &&
        'message' in error &&
        typeof error.message === 'string'
      ) {
        errorMessage = error.message;
      }
      
      setErrors({
        submit: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-energy-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg p-8">
          <h1 className="text-3xl font-bold text-[#0B3C78] mb-6 text-center">Simulador de Compensação Energética</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Nome Completo"
              type="text"
              placeholder="Digite seu nome completo"
              value={formData.nomeCompleto}
              onChange={(e) => setFormData({ ...formData, nomeCompleto: e.target.value })}
              error={errors.nomeCompleto}
              required
            />

            <Input
              label="Email"
              type="email"
              placeholder="Digite seu email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
              required
            />

            <Input
              label="Telefone"
              type="tel"
              placeholder="Digite seu telefone"
              value={formData.telefone}
              onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
              error={errors.telefone}
              required
            />

            <FileUpload
              label="Contas de Energia (PDF)"
              accept=".pdf"
              multiple={true}
              files={arquivos}
              onChange={setArquivos}
              error={errors.arquivos}
            />

            {errors.submit && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}

            <div className="flex gap-4">
              <Button type="submit" loading={loading} className="flex-1">
                Simular
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.push('/listagem')}
              >
                Ver Listagem
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

