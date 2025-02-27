"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Dropzone from "./Dropzone";

export default function SimulationForm() {
  const form = useForm();

  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <div className="w-full flex justify-center items-center p-4 mt-5">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 mt-2 w-[300px]">
          <Input placeholder="Nome" {...form.register("nome")} />

          <Input placeholder="Email" {...form.register("email")} />

          <Input placeholder="Telefone" {...form.register("telefone")} />
        </div>
        <Dropzone className="p-10 w-[300px] h-[200px] mt-6 border border-neutral-100 text-zinc-400 text-center hover:cursor-pointer" />
        <footer className="flex flex-col items-center gap-2 mt-6">
          <Button className="w-32">Simular</Button>
        </footer>
      </form>
    </div>
  );
}
