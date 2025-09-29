import { useState } from 'react';

interface FormErrors {
  [key: string]: string;
}

interface UseFloatingFormProps<T> {
  initialData: T;
  validationRules?: {
    [K in keyof T]?: {
      required?: boolean;
      pattern?: RegExp;
      minLength?: number;
      maxLength?: number;
      custom?: (value: string) => string | null;
    };
  };
}

export function useFloatingForm<T extends Record<string, string>>({
  initialData,
  validationRules = {}
}: UseFloatingFormProps<T>) {
  const [formData, setFormData] = useState<T>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateField = (field: string, value: string): boolean => {
    const rules = validationRules[field as keyof T];
    if (!rules) return true;

    // Required validation
    if (rules.required && !value.trim()) {
      setErrors(prev => ({
        ...prev,
        [field]: 'This field is required'
      }));
      return false;
    }

    // Skip other validations if field is empty and not required
    if (!value.trim() && !rules.required) {
      return true;
    }

    // Pattern validation (email, phone, etc.)
    if (rules.pattern && !rules.pattern.test(value)) {
      let errorMessage = 'Invalid format';
      
      // Common pattern error messages
      if (rules.pattern.source.includes('@')) {
        errorMessage = 'Please enter a valid email address';
      } else if (rules.pattern.source.includes('\\d')) {
        errorMessage = 'Please enter a valid phone number';
      }
      
      setErrors(prev => ({
        ...prev,
        [field]: errorMessage
      }));
      return false;
    }

    // Length validations
    if (rules.minLength && value.length < rules.minLength) {
      setErrors(prev => ({
        ...prev,
        [field]: `Minimum ${rules.minLength} characters required`
      }));
      return false;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      setErrors(prev => ({
        ...prev,
        [field]: `Maximum ${rules.maxLength} characters allowed`
      }));
      return false;
    }

    // Custom validation
    if (rules.custom) {
      const customError = rules.custom(value);
      if (customError) {
        setErrors(prev => ({
          ...prev,
          [field]: customError
        }));
        return false;
      }
    }

    return true;
  };

  const handleBlur = (field: string) => {
    const value = formData[field as keyof T] as string;
    validateField(field, value);
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {};

    Object.keys(formData).forEach(field => {
      const value = formData[field as keyof T] as string;
      const rules = validationRules[field as keyof T];
      
      if (rules?.required && !value.trim()) {
        newErrors[field] = 'This field is required';
        isValid = false;
      } else if (value.trim()) {
        // Validate non-empty fields
        const fieldValid = validateField(field, value);
        if (!fieldValid) {
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const resetForm = () => {
    setFormData(initialData);
    setErrors({});
  };

  return {
    formData,
    errors,
    handleInputChange,
    handleBlur,
    validateForm,
    resetForm,
    setFormData,
    setErrors
  };
}