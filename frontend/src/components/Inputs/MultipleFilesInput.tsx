import { useState } from 'react';
import { FilePdf } from 'phosphor-react';

type MultipleFilesInputProps = {
  onChange: (files: FileList | null) => void;
  files?: FileList | null;
};

const getDisplayText = (selectedFiles: FileList | null) => {
  if (!selectedFiles || selectedFiles.length === 0) {
    return '';
  }
  return selectedFiles.length > 1 ? `${selectedFiles[0].name}...` : selectedFiles[0].name;
};

const MultipleFilesInput: React.FC<MultipleFilesInputProps> = ({ onChange, files }) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(files || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSelectedFiles(files);
      onChange(files);
    }
  };

  return (
    <div className="flex gap-3 items-center justify-center">
      <p className="text-md text-white font-bold">{getDisplayText(selectedFiles)}</p>
      <label className="max-w-[200px]">
        <input
          onChange={handleFileChange}
          type="file"
          className="hidden"
          accept="application/pdf"
        />
        <span className="max-w-[200px] text-white flex items-center gap-2 border border-white rounded-xl p-2 font-bold ease-in-out duration-300 cursor-pointer hover:border-amber-600 transition-all ">
          <FilePdf size={24} className='text-white' />
          Enviar conta(s)
        </span>
      </label>
    </div>
  );
};

export default MultipleFilesInput;
