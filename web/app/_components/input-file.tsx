import { Upload, X } from "lucide-react";
import { ComponentProps, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "../_lib/utils";

interface InputFileProps extends ComponentProps<"div"> {
  onFilesSelected: (files: File[]) => void;
  files: File[];
  onFileRemove: (index: number) => void;
}

export const InputFile = ({
  onFilesSelected,
  files,
  onFileRemove,
  className,
}: InputFileProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesSelected(acceptedFiles);
    },
    [onFilesSelected],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: true,
  });

  return (
    <div className={cn("space-y-4", className)}>
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors duration-200 ${
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300 hover:border-primary/50"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-2">
          <Upload className="h-8 w-8 text-gray-400" />
          <p className="text-sm text-gray-600">
            {isDragActive
              ? "Solte os arquivos aqui..."
              : "Arraste e solte as contas de energia aqui, ou clique para selecionar"}
          </p>
          <p className="text-xs text-gray-500">
            Apenas arquivos PDF são aceitos
          </p>
        </div>
      </div>
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="animate-fadeIn flex items-center justify-between rounded-md bg-gray-100 p-3"
            >
              <span className="truncate text-sm text-gray-600">
                {file.name}
              </span>
              <button
                onClick={() => onFileRemove(index)}
                className="text-gray-400 transition-colors duration-200 hover:text-red-500"
              >
                <X className="h-4 w-4 font-bold" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
