import React from 'react';

interface SubmitButtonProps {
  isSubmitting: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting }) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className={`w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 
      text-white font-semibold rounded-3xl py-4 shadow-lg transition-all duration-300 
      disabled:opacity-60 disabled:cursor-not-allowed disabled:animate-pulse`}
  >
    {isSubmitting ? (
      <>
        <svg
          className="w-5 h-5 animate-spin text-white"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 000 16v-4l-3.5 3.5L12 24v-4a8 8 0 01-8-8z"
          ></path>
        </svg>
        Criando conta...
      </>
    ) : (
      'Criar Conta'
    )}
  </button>
);

export default SubmitButton;
