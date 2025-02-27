"use client";

import { Input } from "@/components/ui/input";
import { useCallback, useState } from "react";
import { LuFilePlus } from "react-icons/lu";
import { useDropzone } from "react-dropzone";
import { FaRegFilePdf } from "react-icons/fa";
import { X } from "lucide-react";

export default function Dropzone({
  className,
}: Readonly<{ className?: string }>) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  }, []);

  function removeFile(name: string) {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== name));
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
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

          <div className="flex w-[300px] flex-row flex-wrap items-center mt-4 text-sm gap-3">
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
