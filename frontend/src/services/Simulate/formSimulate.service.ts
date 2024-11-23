import { z } from "zod";

import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "@/schemas/Simulate/formSchema";
import { EnergyConsumption } from "@/types/fileSolarium";
import { Unidade } from "@/types/lead";
import { toast } from "sonner";
import { useState } from "react";
import { Lead } from "@/types/lead";
import apiClient from "@/services/api/apiClient.service";

export const useFormService = () => {
  const [file, setFile] = useState<string[]>([]);
  const [isloading, setIsloading] = useState(false);
  const [uploadFileData, setUploadFileData] = useState<Unidade[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (uploadFileData.length === 0) {
      return toast.error(
        "É preciso enviar a conta de energia para fazer a simulação.",
      );
    }
    const submitData: Lead = {
      nomeCompleto: values?.name,
      email: values?.email,
      telefone: values?.phone,
      unidades: uploadFileData,
    };

    try {
      setIsloading(true);
      const leadPost = await apiClient.post("/lead", submitData);
      if (leadPost) {
        toast.success("Simulação realizada com sucesso");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        console.log(error);
      }
    } finally {
      setIsloading(false);
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;

    const fd = new FormData();
    fd.append("file", e?.target?.files[0]);

    try {
      const { data } = await axios.post<EnergyConsumption>(
        "https://magic-pdf.solarium.newsun.energy/v1/magic-pdf",
        fd,
      );
      const { unit_key, chargingModel, phaseModel, invoice } = data;
      const newData: Unidade = {
        codigoDaUnidadeConsumidora: unit_key,
        enquadramento: chargingModel,
        modeloFasico: phaseModel,
        historicoDeConsumoEmKWH: invoice?.map((item) => ({
          consumoForaPontaEmKWH: item.consumo_fp,
          mesDoConsumo: item.consumo_date,
        })),
      };
      setUploadFileData((prev) => [...prev, newData]);

      setFile((prev) => [...prev, e?.target?.files[0]?.name]);
    } catch (error) {
      toast.error(
        "Erro ao adicionar a conta. Por favor verifique se a conta enviada é valida",
      );
      console.log(error);
    }
  };
  return { form, onSubmit, handleUpload, file, isloading };
};
