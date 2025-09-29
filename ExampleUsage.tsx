import React from 'react';
import { FloatingLabelField, FloatingLabelTextarea } from './FloatingLabelField';
import { useFloatingForm } from './useFloatingForm';

// Define your form data interface
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  message: string;
}

// Example usage component
export const ContactForm: React.FC = () => {
  const {
    formData,
    errors,
    handleInputChange,
    handleBlur,
    validateForm,
    resetForm
  } = useFloatingForm<ContactFormData>({
    initialData: {
      name: '',
      email: '',
      phone: '',
      company: '',
      website: '',
      message: ''
    },
    validationRules: {
      name: { 
        required: true,
        minLength: 2
      },
      email: { 
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      },
      phone: { 
        required: true,
        pattern: /^\+?[\d\s\-\(\)]+$/,
        custom: (value) => {
          const digits = value.replace(/\D/g, '');
          return digits.length < 10 ? 'Phone number must be at least 10 digits' : null;
        }
      },
      company: { 
        required: true 
      },
      website: { 
        pattern: /^https?:\/\/.+/,
        custom: (value) => {
          if (value && !value.startsWith('http')) {
            return 'Website URL must start with http:// or https://';
          }
          return null;
        }
      }
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form is valid:', formData);
      // Handle form submission here
      alert('Form submitted successfully!');
      resetForm();
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 font-['Poppins']">
        Contact Form Example
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FloatingLabelField
            field="name"
            label="Full Name"
            type="text"
            required={true}
            value={formData.name}
            error={errors.name}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          
          <FloatingLabelField
            field="email"
            label="Email Address"
            type="email"
            required={true}
            value={formData.email}
            error={errors.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FloatingLabelField
            field="phone"
            label="Phone Number"
            type="tel"
            required={true}
            value={formData.phone}
            error={errors.phone}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          
          <FloatingLabelField
            field="company"
            label="Company Name"
            type="text"
            required={true}
            value={formData.company}
            error={errors.company}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        </div>

        <FloatingLabelField
          field="website"
          label="Website URL"
          type="url"
          required={false}
          value={formData.website}
          error={errors.website}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />

        <FloatingLabelTextarea
          field="message"
          label="Message"
          required={false}
          value={formData.message}
          error={errors.message}
          onChange={handleInputChange}
          onBlur={handleBlur}
          rows={4}
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg
              transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2
              font-['Poppins']"
          >
            Submit Form
          </button>
          
          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg
              transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
              font-['Poppins']"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};