import React from 'react';

interface FloatingLabelFieldProps {
  field: string;
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  error?: string;
  onChange: (field: string, value: string) => void;
  onBlur?: (field: string) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

export const FloatingLabelField: React.FC<FloatingLabelFieldProps> = ({
  field,
  label,
  type = 'text',
  required = false,
  value,
  error,
  onChange,
  onBlur,
  className = '',
  disabled = false,
  placeholder = ' '
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
          onBlur={() => onBlur?.(field)}
          placeholder={placeholder} // Keep as single space for floating effect
          disabled={disabled}
          className={`peer w-full px-4 pt-5 pb-2 border ${
            error ? 'border-red-300' : 'border-gray-300'
          } rounded-lg bg-gray-50 text-gray-900 text-base font-['Poppins']
            focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent
            transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed`}
        />
        {/* Floating Label */}
        <label
          className={`absolute left-4 top-3 text-gray-500 text-base font-['Poppins']
            transition-all duration-200 pointer-events-none
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
            peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-600
            peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-yellow-600 peer-focus:!text-yellow-600
            ${error ? 'peer-[:not(:placeholder-shown)]:text-red-600' : ''}
            ${disabled ? 'text-gray-400' : ''}`}
        >
          {label}{required && ' *'}
        </label>
      </div>
      {error && (
        <p className="text-sm text-red-600 font-['Poppins']">{error}</p>
      )}
    </div>
  );
};

// Textarea version
interface FloatingLabelTextareaProps {
  field: string;
  label: string;
  required?: boolean;
  value: string;
  error?: string;
  onChange: (field: string, value: string) => void;
  onBlur?: (field: string) => void;
  className?: string;
  disabled?: boolean;
  rows?: number;
}

export const FloatingLabelTextarea: React.FC<FloatingLabelTextareaProps> = ({
  field,
  label,
  required = false,
  value,
  error,
  onChange,
  onBlur,
  className = '',
  disabled = false,
  rows = 4
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
          onBlur={() => onBlur?.(field)}
          placeholder=" "
          disabled={disabled}
          rows={rows}
          className={`peer w-full px-4 pt-5 pb-2 border ${
            error ? 'border-red-300' : 'border-gray-300'
          } rounded-lg bg-gray-50 text-gray-900 text-base font-['Poppins']
            focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent
            transition-all duration-200 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed`}
        />
        <label
          className={`absolute left-4 top-3 text-gray-500 text-base font-['Poppins']
            transition-all duration-200 pointer-events-none
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
            peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-600
            peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-yellow-600 peer-focus:!text-yellow-600
            ${error ? 'peer-[:not(:placeholder-shown)]:text-red-600' : ''}
            ${disabled ? 'text-gray-400' : ''}`}
        >
          {label}{required && ' *'}
        </label>
      </div>
      {error && (
        <p className="text-sm text-red-600 font-['Poppins']">{error}</p>
      )}
    </div>
  );
};