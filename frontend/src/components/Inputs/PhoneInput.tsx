import { useState } from 'react';

type PhoneInputProps = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

const formatPhoneNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, '');

  if (cleaned.length <= 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  } else {
    return cleaned.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  }
};

const PhoneInput: React.FC<PhoneInputProps> = ({ placeholder = 'Digite seu telefone', value, disabled = false, onChange }) => {
  const [inputValue, setInputValue] = useState(formatPhoneNumber(value));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setInputValue(formatted);
    onChange(formatted);
  };

  return (
    <div className="mb-4 w-full">
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
        className={`w-full p-2 border border-gray-600 rounded bg-white text-black
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-text'}
        `}
      />
    </div>
  );
};

export default PhoneInput;
