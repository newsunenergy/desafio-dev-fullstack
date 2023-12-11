import React from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";

export default function Form({ register }: Props) {
  return (
    <>
      <FormControl isRequired>
        <FormLabel>Nome completo</FormLabel>
        <Input type="text" {...register("nomeCompleto")} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input type="email" {...register("email")} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Telefone</FormLabel>
        <Input type="text" {...register("telefone")} />
      </FormControl>
    </>
  );
}

type Props = {
  register: UseFormRegister<Inputs>;
};

export type Inputs = {
  nomeCompleto: string;
  email: string;
  telefone: number;
};
