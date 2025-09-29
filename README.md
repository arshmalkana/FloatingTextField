# Floating Label Input Fields

Beautiful, animated floating label input fields built with React, TypeScript, and Tailwind CSS.

## Features

- ✨ Smooth floating label animations
- 🎨 Customizable colors and styling
- ✅ Built-in validation with error states
- 📱 Fully responsive design
- ♿ Accessible with proper ARIA attributes
- 🔧 TypeScript support with full type safety
- 🎯 Easy to integrate and customize

## Installation

1. Copy the component files to your project
2. Make sure you have the required dependencies:
   ```bash
   npm install react react-dom
   npm install -D tailwindcss
   ```
3. Add Poppins font to your HTML head:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
   ```

## Quick Start

```tsx
import { FloatingLabelField } from './FloatingLabelField';
import { useFloatingForm } from './useFloatingForm';

interface MyFormData {
  name: string;
  email: string;
}

function MyForm() {
  const { formData, errors, handleInputChange, handleBlur } = useFloatingForm<MyFormData>({
    initialData: { name: '', email: '' },
    validationRules: {
      name: { required: true },
      email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
    }
  });

  return (
    <form>
      <FloatingLabelField
        field="name"
        label="Full Name"
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
    </form>
  );
}
```

## Components

### FloatingLabelField

Main input component with floating label animation.

**Props:**
- `field` (string): Unique field identifier
- `label` (string): Label text to display
- `type` (string, optional): Input type (default: 'text')
- `required` (boolean, optional): Whether field is required
- `value` (string): Current field value
- `error` (string, optional): Error message to display
- `onChange` (function): Change handler `(field: string, value: string) => void`
- `onBlur` (function, optional): Blur handler `(field: string) => void`
- `className` (string, optional): Additional CSS classes
- `disabled` (boolean, optional): Whether field is disabled

### FloatingLabelTextarea

Textarea component with floating label animation.

**Props:** Same as FloatingLabelField, plus:
- `rows` (number, optional): Number of textarea rows (default: 4)

### useFloatingForm Hook

Custom hook for managing form state and validation.

**Parameters:**
- `initialData`: Initial form data object
- `validationRules`: Validation rules for each field

**Validation Rules:**
- `required`: Field is required
- `pattern`: RegExp pattern to match
- `minLength`: Minimum character length
- `maxLength`: Maximum character length
- `custom`: Custom validation function

**Returns:**
- `formData`: Current form data
- `errors`: Current validation errors
- `handleInputChange`: Input change handler
- `handleBlur`: Input blur handler
- `validateForm`: Validate entire form
- `resetForm`: Reset form to initial state

## Customization

### Colors

The component uses these Tailwind classes for colors:
- Focus: `ring-yellow-500`, `text-yellow-600`
- Error: `border-red-300`, `text-red-600`
- Default: `border-gray-300`, `text-gray-500`

To customize colors, modify the className strings in the component.

### Font

The component uses Poppins font. To change:
1. Update the `font-['Poppins']` classes
2. Load your preferred font in your HTML

### Animation

Animation duration is controlled by `transition-all duration-200`. Modify this class to change animation speed.

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- Tailwind CSS peer selector support required
- React 16.8+ (hooks support)

## License

MIT License - feel free to use in your projects!