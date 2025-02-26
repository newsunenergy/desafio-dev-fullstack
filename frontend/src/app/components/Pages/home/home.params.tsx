/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { IHomeParams, IHomeProps } from "./home.interface";
import { TableListPageService } from "../table-list/table-list.service";

export const HomeParams = (props: IHomeProps): IHomeParams => {
  const listService = new TableListPageService();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<any>();
  const [severity, setSeverity] = useState<any>("success");
  const [selectedFile, setSelectedFile] = useState<File[] | null>(null);
  const [formData, setFormData] = useState<any>({
    nome: "",
    email: "",
    telefone: "",
  });


  const handleSubmit = async () => {
    if (!selectedFile) {
      setSeverity("error");
      setMessage("Por favor, selecione um arquivo PDF.");
      setOpen(true);
      return;
    }

    const formDataToSend = new FormData();
    selectedFile.forEach((file) => { formDataToSend.append(`files`, file) });
    formDataToSend.append("nome", formData.nome);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("telefone", formData.telefone);

    try {
      setLoading(true);

      const res = await listService.createClient(formDataToSend);

      if (res.statusCode >= 399) {
        setSeverity("error");
        setMessage("Erro ao processar a requisição." + res.message);
        return null
      }

      setSeverity("success");
      setMessage("Pedido criado com sucesso");

    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Erro inesperado ao cadastrar.";

      setSeverity("error");
      setMessage(errorMessage);

    } finally {
      setLoading(false);
      setOpen(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files ? Array.from(event.target.files) : [];
  
    setSelectedFile((prevFiles) => {
      const updatedFiles = [...(prevFiles || []), ...newFiles];
      return updatedFiles;
    });
  };

  return {
    open,
    loading,
    message,
    severity,
    setOpen,
    handleChange,
    handleSubmit,
    formData,
    handleFileChange,
    selectedFile
  };
};
