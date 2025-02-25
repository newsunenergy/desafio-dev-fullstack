import { useState } from 'react';
import { FilePdf } from 'phosphor-react';

type MultipleFilesInputProps = {
  onChange: (files: FileList | null) => void;
  disabled?: boolean;
};

const MultipleFilesInput: React.FC<MultipleFilesInputProps> = ({ onChange, disabled = false }) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSelectedFiles(files);
      onChange(files);
    }
  };

  const getDisplayText = () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      return 'Eviar contas de energia';
    }
    return selectedFiles.length > 1 ? `${selectedFiles[0].name}...` : selectedFiles[0].name;
  };

  return (
    <label
      className={`flex items-center gap-2 p-2 border border-gray-600 rounded cursor-pointer bg-white text-black 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
    >
      <FilePdf size={20} className="text-white font-bold" />
      <span className="truncate">{getDisplayText()}</span>
      <input
        type="file"
        accept="application/pdf"
        multiple
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
      />
    </label>
  );
};

export default MultipleFilesInput;
