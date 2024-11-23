"use client";

import React from "react";
import Image from "next/image";
import helpSimulate from "@/public/svgs/helpSimulate.svg";
import uploadFile from "@/public/svgs/uploadFile.svg";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormService } from "@/services/Simulate/formSimulate.service";
import ItemFile from "@/components/modules/Simulate/ItemFile/ItemFile";

const FormSimulate = () => {
  const { form, onSubmit, file, handleUpload, isloading } = useFormService();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[554px] bg-box border border-textInput py-10 px-7 rounded-lg mt-28 flex flex-col gap-5"
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-[10px]">
            <h3 className="font-semibold">
              Simulação de compensação energertica
            </h3>
            <p className="max-w-[300px] text-xs text-textGrey">
              Simule a sua energia para deademio deai dimdea mid i daeimd mied
              emi
            </p>
          </div>
          <Image src={helpSimulate} alt="ajuda" className="cursor-pointer" />
        </div>
        <div className="flex flex-col gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-textForm font-bold">
                  Nome
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Joao garcia" {...field} />
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
                <FormLabel className="text-xs text-textForm font-bold">
                  Email
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Joao@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-textForm font-bold">
                  Telefone
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ex: (11) 94635-1098" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-3">
            <p className="text-xs text-textForm font-bold">Conta de energia</p>
            <label className="max-w-[115px]">
              <Input
                onChange={handleUpload}
                type="file"
                className="hidden"
                accept="application/pdf"
              />
              <span className="max-w-[115px] flex items-center gap-2 border border-dashed border-textInput rounded-xl p-2 text-xs font-bold cursor-pointer">
                Enviar conta
                <Image src={uploadFile} alt="enviar conta" />
              </span>
            </label>
            {file &&
              file.map((file) => (
                <React.Fragment key={file}>
                  <ItemFile name={file} />
                </React.Fragment>
              ))}
          </div>
        </div>

        <Button
          type="submit"
          className="bg-boxColor hover:bg-[#1C1A2B] py-4 px-7"
          disabled={isloading}
        >
          {isloading && <Loader2 className="animate-spin" />}
          Simular
        </Button>
      </form>
    </Form>
  );
};

export default FormSimulate;
