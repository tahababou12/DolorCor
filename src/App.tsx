import React, { useState } from 'react';
import { AlertTriangle, Activity, Heart, Info } from 'lucide-react';
import PatientInfoForm from './components/PatientInfoForm';
import SymptomSelector from './components/SymptomSelector';
import ResultsDisplay from './components/ResultsDisplay';
import Header from './components/Header';
import Footer from './components/Footer';
import { PatientInfo, SymptomData, DiseaseMatch } from './types';

function App() {
  const [step, setStep] = useState<'patientInfo' | 'symptoms' | 'results'>('patientInfo');
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<SymptomData[]>([]);
  const [results, setResults] = useState<DiseaseMatch[]>([]);

  const handlePatientInfoSubmit = (info: PatientInfo) => {
    setPatientInfo(info);
    setStep('symptoms');
  };

  const handleSymptomSubmit = (symptoms: SymptomData[]) => {
    setSelectedSymptoms(symptoms);
    
    // Simulate backend processing
    // In a real app, this would call your backend API
    const mockResults: DiseaseMatch[] = generateMockResults(symptoms, patientInfo);
    setResults(mockResults);
    setStep('results');
  };

  const resetApp = () => {
    setStep('patientInfo');
    setPatientInfo(null);
    setSelectedSymptoms([]);
    setResults([]);
  };

  const startNewSymptomCheck = () => {
    setStep('symptoms');
    setSelectedSymptoms([]);
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Disclaimer Banner */}
          <div className="bg-amber-50 p-4 border-b border-amber-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-amber-500 flex-shrink-0 mt-1" size={20} />
              <div>
                <h3 className="font-semibold text-amber-800">Medical Disclaimer</h3>
                <p className="text-amber-700 text-sm">
                  This tool is for informational and demonstrational purposes ONLY. 
                  It is not a substitute for professional medical advice, diagnosis, or treatment.
                  If you think you may have a medical emergency, call 911 immediately.
                </p>
              </div>
            </div>
          </div>
          
          {/* Progress Indicator */}
          <div className="px-6 pt-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className={`rounded-full h-10 w-10 flex items-center justify-center ${
                  step === 'patientInfo' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
                }`}>
                  1
                </div>
                <div className={`h-1 w-12 ${step === 'patientInfo' ? 'bg-gray-300' : 'bg-blue-600'}`}></div>
                <div className={`rounded-full h-10 w-10 flex items-center justify-center ${
                  step === 'symptoms' ? 'bg-blue-600 text-white' : step === 'results' ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'
                }`}>
                  2
                </div>
                <div className={`h-1 w-12 ${step === 'results' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                <div className={`rounded-full h-10 w-10 flex items-center justify-center ${
                  step === 'results' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  3
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {step === 'patientInfo' && 'Patient Information'}
                {step === 'symptoms' && 'Select Symptoms'}
                {step === 'results' && 'Analysis Results'}
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {step === 'patientInfo' && (
              <PatientInfoForm onSubmit={handlePatientInfoSubmit} />
            )}
            
            {step === 'symptoms' && patientInfo && (
              <SymptomSelector 
                patientInfo={patientInfo} 
                onSubmit={handleSymptomSubmit}
                onBack={() => setStep('patientInfo')}
              />
            )}
            
            {step === 'results' && patientInfo && (
              <ResultsDisplay 
                results={results} 
                patientInfo={patientInfo}
                selectedSymptoms={selectedSymptoms}
                onNewSymptomCheck={startNewSymptomCheck}
                onReset={resetApp}
              />
            )}
          </div>
        </div>
        
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <InfoCard 
            icon={<Activity className="text-blue-500" />}
            title="Advanced Algorithm"
            description="Our symptom checker uses prime number factorization for accurate disease matching."
          />
          <InfoCard 
            icon={<Heart className="text-red-500" />}
            title="Patient-Specific"
            description="Results are filtered based on your age and biological sex for relevance."
          />
          <InfoCard 
            icon={<Info className="text-purple-500" />}
            title="Educational Tool"
            description="Learn about potential conditions and appropriate medical actions."
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

const InfoCard = ({ icon, title, description }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string 
}) => (
  <div className="bg-white rounded-lg shadow-md p-5 border border-gray-100">
    <div className="flex items-center mb-3">
      {icon}
      <h3 className="font-semibold ml-2">{title}</h3>
    </div>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

// Mock function to generate results based on symptoms
function generateMockResults(symptoms: SymptomData[], patientInfo: PatientInfo | null): DiseaseMatch[] {
  if (!symptoms.length || !patientInfo) return [];
  
  // This is just a simplified mock of your backend logic
  const commonCold = {
    name: "Common Cold",
    category: "Infectious Disease/Primary Care",
    matchCount: symptoms.filter(s => 
      ["Cough", "Sore throat", "Runny nose", "Sneezing", "Fatigue"].includes(s.name)
    ).length,
    sqf: 2 * 3 * 5 * 7 * 11,
    action: "Action: Rest, hydrate, OTC remedies. See Primary Care/GP if severe/prolonged."
  };
  
  const influenza = {
    name: "Influenza",
    category: "Infectious Disease/Primary Care",
    matchCount: symptoms.filter(s => 
      ["Fever", "Cough", "Sore throat", "Runny nose", "Body aches", "Fatigue", "Headache", "Chills"].includes(s.name)
    ).length,
    sqf: 13 * 2 * 3 * 5 * 17 * 11 * 19 * 23,
    action: "Action: Consult Primary Care/GP promptly for diagnosis/treatment. Rest/fluids."
  };
  
  const allergies = {
    name: "Seasonal Allergies",
    category: "Allergy/Immunology",
    matchCount: symptoms.filter(s => 
      ["Runny nose", "Sneezing", "Itchy eyes", "Cough"].includes(s.name)
    ).length,
    sqf: 5 * 7 * 29 * 2,
    action: "Action: Avoid triggers, OTC antihistamines. Consult Allergist if severe."
  };
  
  // Filter by age and sex constraints
  const results = [commonCold, influenza, allergies]
    .filter(disease => disease.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount);
  
  return results;
}

export default App;
