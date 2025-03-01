"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { InputFile } from "../_components/input-file";
import { Button } from "../_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../_components/ui/form";
import { Input } from "../_components/ui/input";
import { api } from "../_config/api";
import {
  SimulationConsumeSchema,
  simulationConsumeSchema,
} from "../_schemas/simulation-consume.schema";
import { toast } from "../_utils/toast";

const Simular = () => {
  const form = useForm<SimulationConsumeSchema>({
    resolver: zodResolver(simulationConsumeSchema),
    defaultValues: {
      nomeCompleto: "",
      email: "",
      telefone: "",
      informacoesDaFatura: [],
    },
  });
  const router = useRouter();
  const onSubmit = async (values: SimulationConsumeSchema) => {
    api
      .post("/lead", values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        toast({
          title: "Simulação enviada",
          text: "Seus dados foram recebidos com sucesso!",
        });
        form.reset();
        router.push("/listagem");
      })
      .catch((err) => {
        toast({
          title: "Houve um erro...",
          text: err.data.message || "Tente novamente",
          icon: "error",
        });
        console.error(err);
      });
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="animate-fadeIn rounded-2xl border border-orange-100 bg-white/80 p-8 shadow-xl backdrop-blur-lg">
        <div className="mb-8 space-y-6 text-center">
          <h1 className="mb-4 bg-gradient-to-r bg-clip-text text-2xl font-bold text-primary underline decoration-4 underline-offset-[12px] md:text-3xl">
            Nova Simulação de Energia
          </h1>
          <p className="text-gray-600">
            Preencha os dados abaixo para simular seu plano de compensação
            energética
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-5">
              <FormField
                control={form.control}
                name="nomeCompleto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telefone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="informacoesDaFatura"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputFile
                        className="pt-4"
                        files={field.value}
                        onBlur={field.onBlur}
                        onFileRemove={(index: number) => {
                          const newFiles = [...field.value];
                          newFiles.splice(index, 1);
                          field.onChange(newFiles);
                        }}
                        onFilesSelected={(newFiles) =>
                          field.onChange([...field.value, ...newFiles])
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Enviar Simulação</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Simular;
