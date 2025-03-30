import React, { useState } from 'react';
import { User, Calendar, AlertCircle } from 'lucide-react';
import { PatientInfo } from '../types';

interface PatientInfoFormProps {
  onSubmit: (info: PatientInfo) => void;
}

const PatientInfoForm: React.FC<PatientInfoFormProps> = ({ onSubmit }) => {
  const [age, setAge] = useState<string>('');
  const [sex, setSex] = useState<'M' | 'F' | 'Other' | ''>('');
  const [errors, setErrors] = useState<{ age?: string; sex?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    const newErrors: { age?: string; sex?: string } = {};
    
    if (!age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(Number(age)) || Number(age) < 0 || Number(age) > 120) {
      newErrors.age = 'Please enter a valid age between 0 and 120';
    }
    
    if (!sex) {
      newErrors.sex = 'Biological sex is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Clear any previous errors
    setErrors({});
    
    // Submit the form
    onSubmit({
      age: Number(age),
      sex: sex as 'M' | 'F' | 'Other'
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Patient Information</h2>
      <p className="text-gray-600 mb-6">
        Please provide basic information to help us filter relevant conditions.
        This information is used only for this session and is not stored.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="age">
            Age
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="age"
              type="number"
              min="0"
              max="120"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className={`block w-full pl-10 pr-3 py-2 border ${
                errors.age ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter age (0-120)"
            />
          </div>
          {errors.age && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.age}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Biological Sex (for medical filtering)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={sex}
              onChange={(e) => setSex(e.target.value as 'M' | 'F' | 'Other' | '')}
              className={`block w-full pl-10 pr-3 py-2 border ${
                errors.sex ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="">Select biological sex</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {errors.sex && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.sex}
            </p>
          )}
          <p className="mt-2 text-xs text-gray-500">
            This information is used only for filtering sex-specific conditions.
          </p>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Continue to Symptom Selection
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientInfoForm;
