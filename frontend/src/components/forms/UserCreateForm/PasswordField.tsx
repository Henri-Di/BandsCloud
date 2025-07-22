import React from 'react';
import { FiLock } from 'react-icons/fi';

interface PasswordFieldProps {
  id: string;
  label: string;
  register: any;
  error?: string;
  show: boolean;
  toggle: () => void;
  placeholder?: string;
  infoTooltip?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  id,
  label,
  register,
  error,
  show,
  toggle,
  placeholder,
  infoTooltip,
}) => (
  <div>
    <label
      htmlFor={id}
      className="text-sm font-semibold flex items-center gap-2 text-purple-200"
      title={infoTooltip}
    >
      <FiLock /> {label} <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <input
        id={id}
        type={show ? 'text' : 'password'}
        {...register}
        className={`input-base ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={`${id}-error`}
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400 focus:outline-none"
        aria-label={show ? 'Ocultar senha' : 'Mostrar senha'}
        tabIndex={-1}
      >
        {show ? '🙈' : '👁️'}
      </button>
    </div>
    {error && (
      <p id={`${id}-error`} className="mt-1 text-xs text-red-400" role="alert">
        {error}
      </p>
    )}
  </div>
);

export default PasswordField;
