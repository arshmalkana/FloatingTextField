import React, { useState } from 'react';

interface FormData {
  inchargeName: string;
  inchargeMobile: string;
  inchargeEmail: string;
  companyName: string;
  website: string;
  address: string;
  city: string;
  zipCode: string;
  description: string;
}

interface FormErrors {
  [key: string]: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    inchargeName: '',
    inchargeMobile: '',
    inchargeEmail: '',
    companyName: '',
    website: '',
    address: '',
    city: '',
    zipCode: '',
    description: ''
  });

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

  const validateField = (field: string, value: string, required: boolean) => {
    if (required && !value.trim()) {
      setErrors(prev => ({
        ...prev,
        [field]: 'This field is required'
      }));
      return false;
    }

    if (field === 'inchargeEmail' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setErrors(prev => ({
          ...prev,
          [field]: 'Please enter a valid email address'
        }));
        return false;
      }
    }

    if (field === 'inchargeMobile' && value) {
      const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
      if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
        setErrors(prev => ({
          ...prev,
          [field]: 'Please enter a valid mobile number'
        }));
        return false;
      }
    }

    return true;
  };

  const handleBlur = (field: string, required: boolean) => {
    const value = formData[field as keyof FormData];
    validateField(field, value, required);
  };

  // Your exact renderInput function
  const renderInput = (
    field: string,
    label: string,
    type: string = 'text',
    required: boolean = false
  ) => (
    <div className="space-y-2">
      <div className="relative">
        <input
          type={type}
          value={formData[field as keyof typeof formData] as string}
          onChange={(e) => handleInputChange(field, e.target.value)}
          onBlur={() => handleBlur(field, required)}
          placeholder=" " // 👈 important: keep placeholder as a single space
          className={`peer w-full px-4 pt-5 pb-2 border ${
            errors[field] ? 'border-red-300' : 'border-gray-300'
          } rounded-lg bg-gray-50 text-gray-900 text-base font-['Poppins']
            focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent
            transition-all duration-200`}
        />
        {/* Floating Label */}
        <label
          className={`absolute left-4 top-3 text-gray-500 text-base font-['Poppins']
            transition-all duration-200 pointer-events-none
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
            peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-600
            peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-yellow-600 peer-focus:!text-yellow-600
            ${errors[field] ? 'peer-[:not(:placeholder-shown)]:text-red-600' : ''}`}
        >
          {label}{required && ' *'}
        </label>
      </div>
      {errors[field] && (
        <p className="text-sm text-red-600 font-['Poppins']">{errors[field]}</p>
      )}
    </div>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 font-['Poppins']">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-['Poppins']">
            Floating Label Fields Showcase
          </h1>
          <p className="text-lg text-gray-600 font-['Poppins']">
            Beautiful floating label input fields with smooth animations
          </p>
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800 font-['Poppins']">
              💡 Click on any field to see the floating label animation. Try typing and then clearing the field to see all states.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 font-['Poppins']">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderInput('inchargeName', 'Name of Incharge', 'text', true)}
              {renderInput('inchargeMobile', 'Mobile Number', 'tel', true)}
            </div>
            <div className="mt-6">
              {renderInput('inchargeEmail', 'Email Address', 'email', true)}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 font-['Poppins']">
              Company Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderInput('companyName', 'Company Name', 'text', true)}
              {renderInput('website', 'Website URL', 'url', false)}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 font-['Poppins']">
              Address Information
            </h2>
            <div className="space-y-6">
              {renderInput('address', 'Street Address', 'text', false)}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderInput('city', 'City', 'text', false)}
                {renderInput('zipCode', 'ZIP Code', 'text', false)}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 font-['Poppins']">
              Additional Information
            </h2>
            <div className="space-y-2">
              <div className="relative">
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder=" "
                  rows={4}
                  className={`peer w-full px-4 pt-5 pb-2 border ${
                    errors.description ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg bg-gray-50 text-gray-900 text-base font-['Poppins']
                    focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent
                    transition-all duration-200 resize-none`}
                />
                <label
                  className={`absolute left-4 top-3 text-gray-500 text-base font-['Poppins']
                    transition-all duration-200 pointer-events-none
                    peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                    peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-600
                    peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-yellow-600
                    ${errors.description ? 'peer-[:not(:placeholder-shown)]:text-red-600' : ''}`}
                >
                  Description
                </label>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg
                transform transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2
                font-['Poppins']"
            >
              Submit Form
            </button>
          </div>
        </form>

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 font-['Poppins']">
            Features Demonstrated:
          </h3>
          <ul className="space-y-2 text-gray-600 font-['Poppins']">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
              Floating labels with smooth animation
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
              Required field indicators with asterisk
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
              Error validation and styling
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
              Focus states with yellow accent color
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
              Poppins font integration
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
              Responsive grid layout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;