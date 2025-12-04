import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useHookFormMask } from 'use-mask-input';
import { CreateLeadSchema, createLeadSchema, useLeads } from '../hooks/useLeads';
import { useNavigate } from 'react-router-dom';

const LeadForm = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { createLead } = useLeads();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateLeadSchema>({
    resolver: zodResolver(createLeadSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      file: undefined,
    },
  });

  const registerWithMask = useHookFormMask(register);

  console.log('Erros do formulário:', errors);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('file', file);
    }
  };

  const onSubmit = useCallback(
    async (data: CreateLeadSchema) => {
      setLoading(true);
      try {
        await createLead(data);
        toast.success('Lead criado com sucesso!');
        navigate('/listagem');
      } catch (error) {
        console.error("Erro ao criar lead:", error);
        toast.error("Erro ao criar lead!");
      } finally {
        setLoading(false);
      }
    },
    [createLead, navigate]
  );
  

  return (
    <div className="h-[88vh] p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-6">Criar Lead</h1>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Nome *</Label>
            <Input id="name" {...register('name')} className="mt-2" />
            <span className="text-red-500 text-sm">{errors?.name?.message}</span>
          </div>
          <div>
            <Label htmlFor="email">E-mail *</Label>
            <Input id="email" {...register('email')} className="mt-2" />
            <span className="text-red-500 text-sm">{errors?.email?.message}</span>
          </div>
          <div>
            <Label htmlFor="phone">Telefone *</Label>
            <Input
              id="phone"
              {...registerWithMask('phone', ['99 99999-9999', '99999-99999'], {
                required: true,
              })}
              className="mt-2"
            />
            <span className="text-red-500 text-sm">{errors?.phone?.message}</span>
          </div>
          <div className="col-span-2">
            <Label htmlFor="file">Unidade</Label>
            <Input
              id="file"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="mt-2"
            />
            <span className="text-red-500 text-sm">{errors?.file?.message}</span>
          </div>
        </div>
        <div className="px-8 w-[100%] flex justify-between items-center pb-[.2rem] pt-[1rem] border-t">
          <Button type="button" variant="outline" onClick={() => navigate('/leads')}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Criando...' : 'Criar'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
