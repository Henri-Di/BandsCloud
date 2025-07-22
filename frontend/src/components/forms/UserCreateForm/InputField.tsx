import React from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  required?: boolean;
  error?: string;
  register: any;
  placeholder?: string;
  type?: string;
  ariaLabel?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  icon,
  required = false,
  error,
  register,
  placeholder = '',
  type = 'text',
  ariaLabel,
}) => (
  <div className="w-full">
    <label
      htmlFor={id}
      className="text-sm font-semibold flex items-center gap-2 text-purple-200"
    >
      {icon} {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={id}
      type={type}
      {...register}
      className={`input-base ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
      placeholder={placeholder}
      aria-invalid={!!error}
      aria-describedby={`${id}-error`}
      aria-label={ariaLabel || label}
    />
    {error && (
      <p id={`${id}-error`} className="mt-1 text-xs text-red-400" role="alert">
        {error}
      </p>
    )}
  </div>
);

export default InputField;
