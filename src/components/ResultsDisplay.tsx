import React, { useState } from 'react';
import { AlertTriangle, ArrowLeft, RefreshCw, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { PatientInfo, SymptomData, DiseaseMatch } from '../types';
import { categoryColors } from '../data/symptoms';
import VisualizationGraph from './VisualizationGraph';

interface ResultsDisplayProps {
  results: DiseaseMatch[];
  patientInfo: PatientInfo;
  selectedSymptoms: SymptomData[];
  onNewSymptomCheck: () => void;
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ 
  results, 
  patientInfo, 
  selectedSymptoms,
  onNewSymptomCheck,
  onReset
}) => {
  const [expandedDisease, setExpandedDisease] = useState<string | null>(
    results.length > 0 ? results[0].name : null
  );
  
  const toggleDisease = (diseaseName: string) => {
    if (expandedDisease === diseaseName) {
      setExpandedDisease(null);
    } else {
      setExpandedDisease(diseaseName);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Analysis Results</h2>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
        <h3 className="font-semibold text-blue-800 mb-2">Patient & Symptom Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Age:</span> {patientInfo.age}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Biological Sex:</span> {patientInfo.sex === 'M' ? 'Male' : patientInfo.sex === 'F' ? 'Female' : 'Other'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Selected Symptoms:</span> {selectedSymptoms.length}
            </p>
            <p className="text-sm text-gray-600 truncate">
              <span className="font-medium">Symptoms:</span> {selectedSymptoms.map(s => s.name).join(', ')}
            </p>
          </div>
        </div>
      </div>
      
      {results.length === 0 ? (
        <div className="bg-gray-50 p-6 rounded-lg text-center border border-gray-200">
          <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Matches Found</h3>
          <p className="text-gray-600 mb-4">
            Based on the symptoms provided, no matching conditions were found in our database.
          </p>
          <button
            onClick={onNewSymptomCheck}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Different Symptoms
          </button>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mb-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-amber-500 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold text-amber-800">Important Note</h3>
                  <p className="text-amber-700 text-sm">
                    These results are for informational purposes only and should not be considered a diagnosis.
                    Always consult with a qualified healthcare professional.
                  </p>
                </div>
              </div>
            </div>
            
            <h3 className="font-semibold text-gray-800 mb-3">Potential Conditions</h3>
            <div className="space-y-3">
              {results.map((disease) => (
                <div 
                  key={disease.name}
                  className="border rounded-lg overflow-hidden"
                  style={{ borderLeftWidth: '4px', borderLeftColor: categoryColors[disease.category] || categoryColors.Default }}
                >
                  <div 
                    className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleDisease(disease.name)}
                  >
                    <div>
                      <h4 className="font-medium text-gray-800">{disease.name}</h4>
                      <p className="text-sm text-gray-500">{disease.category}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-3">
                        {disease.matchCount} symptom match{disease.matchCount !== 1 ? 'es' : ''}
                      </span>
                      {expandedDisease === disease.name ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                  
                  {expandedDisease === disease.name && (
                    <div className="p-4 bg-gray-50 border-t">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">SQF (Symptom Quotient Factorization):</span> {disease.sqf.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Category:</span> {disease.category}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Matched Symptoms:</span> {disease.matchCount} of {selectedSymptoms.length}
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-white p-3 rounded border border-gray-200">
                        <h5 className="font-medium text-gray-800 mb-2">Suggested Action</h5>
                        <p className="text-sm text-gray-600">{disease.action}</p>
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <a 
                          href={`https://www.google.com/search?q=${encodeURIComponent(disease.name + ' medical condition')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                        >
                          Learn more
                          <ExternalLink className="h-4 w-4 ml-1" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Visualization</h3>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <VisualizationGraph 
                symptoms={selectedSymptoms}
                diseases={results}
              />
            </div>
          </div>
        </>
      )}
      
      <div className="flex justify-between mt-8">
        <button
          onClick={onNewSymptomCheck}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Try Different Symptoms
        </button>
        
        <button
          onClick={onReset}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          Start Over
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
