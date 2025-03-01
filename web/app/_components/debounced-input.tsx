import { debounce } from "lodash";
import React, {
  ComponentProps,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { cn } from "../_lib/utils";
import { Input } from "./ui/input";

interface DebouncedInputProps
  extends Omit<ComponentProps<"input">, "onChange"> {
  delay?: number;
  value?: string;
  onChange?: (value: string) => void;
  icon?: ReactNode;
}

export const DebouncedInput: React.FC<DebouncedInputProps> = ({
  value = "",
  placeholder = "Digite a busca...",
  delay = 750,
  className,
  onChange,
  icon,
  ...props
}) => {
  const [inputValue, setInputValue] = useState(value);

  const debouncedOnChange = useMemo(
    () => debounce((newValue: string) => onChange?.(newValue), delay),
    [delay, onChange],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = e.target.value;
      setInputValue(nextValue);
      debouncedOnChange(nextValue);
    },
    [debouncedOnChange],
  );

  useEffect(() => setInputValue(value), [value]);

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  return (
    <label className={cn("relative w-full", className)}>
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500">
          {icon}
        </span>
      )}
      <Input
        value={inputValue}
        className={cn(icon ? "pl-10" : "")}
        onChange={handleChange}
        placeholder={placeholder}
        {...props}
      />
    </label>
  );
};
