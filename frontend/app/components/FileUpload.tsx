'use client';

import React, { useRef, useState } from 'react';
import { Button } from './Button';

interface FileUploadProps {
  label: string;
  accept?: string;
  multiple?: boolean;
  files: File[];
  onChange: (files: File[]) => void;
  error?: string;
}

export function FileUpload({
  label,
  accept = '.pdf',
  multiple = false,
  files,
  onChange,
  error,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles = Array.from(fileList).filter((file) => {
      // Validar que é PDF
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        alert(`O arquivo "${file.name}" não é um PDF válido. Por favor, selecione apenas arquivos PDF.`);
        return false;
      }
      return true;
    });
    
    if (newFiles.length === 0) return;
    
    if (multiple) {
      onChange([...files, ...newFiles]);
    } else {
      onChange(newFiles);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onChange(newFiles);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-bold text-[#0B3C78] mb-1">{label}</label>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive ? 'border-[#FF9D29] bg-[#FFF4E6]' : 'border-gray-300'
        } ${error ? 'border-[#EF4444]' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <p className="text-[#676767] mb-2">
          Arraste arquivos aqui ou{' '}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-[#0B3C78] hover:text-[#FF9D29] underline font-medium transition-colors cursor-pointer"
          >
            clique para selecionar
          </button>
        </p>
        <p className="text-sm text-[#676767]">Formatos aceitos: PDF</p>
      </div>
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200"
            >
              <span className="text-sm text-[#0B3C78] truncate flex-1">{file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="ml-2 text-[#EF4444] hover:text-[#D32F2F] text-sm font-medium transition-colors"
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      )}
      {error && <p className="mt-1 text-sm text-[#EF4444]">{error}</p>}
    </div>
  );
}

