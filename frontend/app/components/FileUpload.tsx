'use client';

import React, { useRef, useState } from 'react';

interface FileUploadProps {
  label: string;
  accept?: string;
  multiple?: boolean;
  files: File[];
  onChange: (files: File[]) => void;
  error?: string;
  darkMode?: boolean; // Nova prop para modo escuro
}

export function FileUpload({
  label,
  accept = '.pdf',
  multiple = false,
  files,
  onChange,
  error,
  darkMode = false,
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
      <label className={`block text-sm font-bold mb-1 ${darkMode ? 'text-white' : 'text-text-primary'}`}>{label}</label>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive ? 'border-primary bg-primary-light' : darkMode ? 'border-white/50 bg-white/10' : 'border-gray-300'
        } ${error ? 'border-error' : ''}`}
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
        <p className={darkMode ? 'text-white/80 mb-2' : 'text-text-secondary mb-2'}>
          Arraste arquivos aqui ou{' '}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={darkMode ? 'text-white hover:text-primary underline font-medium transition-colors cursor-pointer' : 'text-text-primary hover:text-primary underline font-medium transition-colors cursor-pointer'}
          >
            clique para selecionar
          </button>
        </p>
        <p className={darkMode ? 'text-sm text-white/70' : 'text-sm text-text-secondary'}>Formatos aceitos: PDF</p>
      </div>
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200"
            >
              <span className="text-sm text-text-primary truncate flex-1">{file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="ml-2 text-error hover:text-error text-sm font-medium transition-colors"
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      )}
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
}

