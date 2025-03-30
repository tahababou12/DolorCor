import React, { useState } from 'react';
import { Search, X, ChevronDown, ChevronUp, ArrowLeft, ArrowRight } from 'lucide-react';
import { PatientInfo, SymptomData } from '../types';
import { symptoms, symptomCategories, categoryColors } from '../data/symptoms';

interface SymptomSelectorProps {
  patientInfo: PatientInfo;
  onSubmit: (symptoms: SymptomData[]) => void;
  onBack: () => void;
}

const SymptomSelector: React.FC<SymptomSelectorProps> = ({ patientInfo, onSubmit, onBack }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<SymptomData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    symptomCategories.slice(0, 3).map(cat => cat.name)
  );
  
  const toggleCategory = (category: string) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter(c => c !== category));
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
  };
  
  const addSymptom = (symptom: SymptomData) => {
    if (!selectedSymptoms.some(s => s.id === symptom.id)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };
  
  const removeSymptom = (symptomId: number) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s.id !== symptomId));
  };
  
  const handleSubmit = () => {
    if (selectedSymptoms.length > 0) {
      onSubmit(selectedSymptoms);
    }
  };
  
  const filteredSymptoms = searchTerm 
    ? symptoms.filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Select Symptoms</h2>
      <p className="text-gray-600 mb-6">
        Select all symptoms you're experiencing. You can search or browse by category.
      </p>
      
      <div className="mb-6">
        <div className="flex items-center bg-gray-100 rounded-lg p-2">
          <Search className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search symptoms..."
            className="bg-transparent border-none flex-grow focus:outline-none text-gray-700"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        
        {searchTerm && filteredSymptoms.length > 0 && (
          <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-sm max-h-60 overflow-y-auto">
            {filteredSymptoms.map(symptom => (
              <div 
                key={symptom.id}
                className="p-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 flex justify-between items-center"
                onClick={() => addSymptom(symptom)}
              >
                <div>
                  <span className="font-medium">{symptom.name}</span>
                  <span className="text-xs text-gray-500 ml-2">({symptom.category})</span>
                </div>
                <span className="text-xs text-gray-400">Prime: {symptom.prime}</span>
              </div>
            ))}
          </div>
        )}
        
        {searchTerm && filteredSymptoms.length === 0 && (
          <div className="mt-2 p-3 bg-gray-50 text-gray-500 text-center rounded-lg">
            No symptoms found matching "{searchTerm}"
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 max-h-[400px] overflow-y-auto">
          <h3 className="font-semibold text-gray-700 mb-3">Browse by Category</h3>
          
          {symptomCategories.map(category => (
            <div key={category.name} className="mb-3">
              <div 
                className="flex justify-between items-center p-2 bg-white rounded cursor-pointer hover:bg-gray-100"
                onClick={() => toggleCategory(category.name)}
                style={{ borderLeft: `4px solid ${categoryColors[category.name] || '#ccc'}` }}
              >
                <span className="font-medium">{category.name}</span>
                {expandedCategories.includes(category.name) ? (
                  <ChevronUp className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                )}
              </div>
              
              {expandedCategories.includes(category.name) && (
                <div className="ml-2 mt-1 space-y-1">
                  {category.symptoms.map(symptom => (
                    <div 
                      key={symptom.id}
                      className="flex justify-between items-center p-2 text-sm hover:bg-blue-50 cursor-pointer rounded"
                      onClick={() => addSymptom(symptom)}
                    >
                      <span>{symptom.name}</span>
                      <span className="text-xs text-gray-500">Prime: {symptom.prime}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <h3 className="font-semibold text-blue-800 mb-3">Selected Symptoms</h3>
            
            {selectedSymptoms.length === 0 ? (
              <div className="text-center p-4 text-blue-600">
                No symptoms selected yet. Search or browse to add symptoms.
              </div>
            ) : (
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {selectedSymptoms.map(symptom => (
                  <div 
                    key={symptom.id}
                    className="flex justify-between items-center p-2 bg-white rounded border border-blue-200"
                  >
                    <div>
                      <span className="font-medium">{symptom.name}</span>
                      <span className="text-xs text-gray-500 ml-2">({symptom.category})</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-2">Prime: {symptom.prime}</span>
                      <button 
                        onClick={() => removeSymptom(symptom.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-4 text-sm text-blue-700">
              <p>Total selected: {selectedSymptoms.length} symptom(s)</p>
              {selectedSymptoms.length > 0 && (
                <p className="mt-1">
                  Prime product: {selectedSymptoms.reduce((acc, s) => acc * s.prime, 1).toLocaleString()}
                </p>
              )}
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Patient Info
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={selectedSymptoms.length === 0}
              className={`flex items-center px-4 py-2 rounded-md ${
                selectedSymptoms.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Analyze Symptoms
              <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomSelector;
