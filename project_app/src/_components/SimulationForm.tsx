"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Dropzone from "./Dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  NewLeadFormData,
  newLeadFormSchema,
} from "@/_validators/lead-validators";
import { useState } from "react";

export default function SimulationForm() {
  const form = useForm<NewLeadFormData>({
    resolver: zodResolver(newLeadFormSchema),
  });

  const [files, setFiles] = useState<File[]>([]);

  function handleFilesChange(uploadedFiles: File[]) {
    setFiles(uploadedFiles);
  }

  function onSubmit(data: NewLeadFormData) {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key as keyof NewLeadFormData]);
    });

    files.forEach((file) => {
      formData.append("files", file);
    });

    //axios
    console.log(formData);

    setTimeout(() => {
      alert("Simulação enviada com sucesso!");
      form.reset();
      setFiles([]);
    }, 1000);
  }

  return (
    <div className="w-full flex justify-center items-center p-4 mt-5">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 mt-2 w-[400px]">
          <div className="flex flex-col gap-0.5">
            <Input placeholder="Nome" {...form.register("nome")} />
            {form.formState.errors.nome && (
              <p className="text-red-600 text-sm">
                {form.formState.errors.nome.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-0.5">
            <Input placeholder="Email" {...form.register("email")} />
            {form.formState.errors.email && (
              <p className="text-red-600 text-sm">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-0.5">
            <Input placeholder="Telefone" {...form.register("telefone")} />
            {form.formState.errors.telefone && (
              <p className="text-red-600 text-sm">
                {form.formState.errors.telefone.message}
              </p>
            )}
          </div>
        </div>
        <Dropzone
          className="p-10 w-[400px] h-[200px] mt-6 border border-neutral-100 text-zinc-400 text-center hover:cursor-pointer"
          onFilesChange={handleFilesChange}
          files={files}
        />
        <footer className="flex flex-col items-center gap-2 mt-10">
          <Button className="w-32">Simular</Button>
        </footer>
      </form>
    </div>
  );
}
