"use client";

import React, { useEffect } from "react";
import { Input } from "./ui/input";
import SubmitButton from "./submit-button";
import { useFormState } from "react-dom";
import { Toast, toastHandler } from "./ui/toast";

type Props = {
  formAction: (state: any, formData: FormData) => Promise<any>;
};

const MainForm = ({ formAction }: Props) => {
  const [state, action] = useFormState(formAction, {
    error: null,
    message: null,
  });

  useEffect(() => {
    if (!!state.success) {
      toastHandler.show({
        type: "success",
        title: "Sucesso",
        message: "Formulário submetido com sucesso!",
      });
    }
    if (!!state.error) {
      toastHandler.show({
        type: "error",
        title: "Error",
        message: state.message,
      });
    }
  }, [state]);

  return (
    <>
      <form
        action={action}
        className="space-y-4 border-zinc-200 border rounded p-4 bg-slate-100"
      >
        <Input placeholder="Nome Completo" name="name" required />
        <Input placeholder="E-mail" type="email" name="email" required />
        <Input placeholder="Telefone" type="tel" name="telefone" required />
        <Input
          placeholder="File"
          type="file"
          name="file"
          accept=".pdf"
          multiple
          required
        />
        <SubmitButton />
      </form>
      <Toast />
    </>
  );
};

export default MainForm;
