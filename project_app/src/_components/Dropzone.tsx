"use client";

import { Input } from "@/components/ui/input";
import { LuFilePlus } from "react-icons/lu";
import { useDropzone } from "react-dropzone";
import { FaRegFilePdf } from "react-icons/fa";
import { X } from "lucide-react";

export default function Dropzone({
  className,
  onFilesChange,
  files,
}: Readonly<{
  className?: string;
  onFilesChange: (files: File[]) => void;
  files: File[];
}>) {
  function removeFile(name: string) {
    const updatedFiles = files.filter((file) => file.name !== name);
    onFilesChange(updatedFiles);
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const newFiles = [...files, ...acceptedFiles];
      onFilesChange(newFiles);
    },
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: true,
  });

  return (
    <div>
      <div {...getRootProps({ className: className })}>
        <Input {...getInputProps()} />{" "}
        {isDragActive ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <p>Solte seu arquivo aqui.</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <p>
              {" "}
              Arraste para cá suas contas, ou clique para selecionar os
              arquivos.
            </p>
            <LuFilePlus className="text-3xl" />
          </div>
        )}
      </div>
      {files.length > 0 && (
        <div className=" text-zinc-600">
          <p className=" font-semibold">Arquivos Selecionados:</p>

          <div className="flex w-[400px] flex-row flex-wrap items-center mt-4 text-sm gap-3">
            {files.map((file, idx) => (
              <div
                key={idx}
                className="relative flex flex-col items-center text-center w-20"
              >
                <FaRegFilePdf className="text-3xl text-red-600" />
                <p className="text-xs truncate w-full mt-1">{file.name}</p>
                <button
                  onClick={() => removeFile(file.name)}
                  className="absolute -top-1 right-3 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
