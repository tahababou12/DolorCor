import { SymptomData, SymptomCategory } from '../types';

// This data is derived from your backend code
export const symptoms: SymptomData[] = [
  { id: 1, name: "Fever", prime: 13, category: "Systemic" },
  { id: 2, name: "Fatigue", prime: 11, category: "Systemic" },
  { id: 3, name: "Chills", prime: 23, category: "Systemic" },
  { id: 4, name: "Body aches", prime: 17, category: "Musculoskeletal" },
  { id: 5, name: "Pain", prime: 31, category: "General" },
  { id: 6, name: "Autonomic dysfunction", prime: 37, category: "Autonomic" },
  { id: 7, name: "Tachycardia", prime: 41, category: "Cardiovascular" },
  { id: 8, name: "Panic attacks", prime: 43, category: "Psychological" },
  { id: 9, name: "Anxiety", prime: 47, category: "Psychological" },
  { id: 10, name: "Flu-like symptoms", prime: 53, category: "Systemic" },
  { id: 11, name: "Headache", prime: 19, category: "Neurological" },
  { id: 12, name: "Sore throat", prime: 3, category: "ENT" },
  { id: 13, name: "Swollen Tonsils", prime: 59, category: "ENT" },
  { id: 14, name: "Confusion", prime: 61, category: "Neurological" },
  { id: 15, name: "Memory loss", prime: 67, category: "Neurological" },
  { id: 16, name: "Rapid cognitive decline", prime: 71, category: "Neurological" },
  { id: 17, name: "Myoclonus", prime: 73, category: "Neurological" },
  { id: 18, name: "Ataxia", prime: 79, category: "Neurological" },
  { id: 19, name: "Unsteady walk (Ataxia)", prime: 83, category: "Neurological" },
  { id: 20, name: "Visual disturbances", prime: 89, category: "Sensory" },
  { id: 21, name: "Itchy eyes", prime: 29, category: "Sensory/Allergy" },
  { id: 22, name: "Progressive severe insomnia", prime: 97, category: "Neurological" },
  { id: 23, name: "Hallucinations", prime: 101, category: "Neurological" },
  { id: 24, name: "Tingling in extremities", prime: 103, category: "Neurological" },
  { id: 25, name: "Cough", prime: 2, category: "Respiratory" },
  { id: 26, name: "Sneezing", prime: 7, category: "Respiratory/Allergy" },
  { id: 27, name: "Runny nose", prime: 5, category: "Respiratory/Allergy" },
  { id: 28, name: "Difficulty breathing", prime: 107, category: "Respiratory" },
  { id: 29, name: "Nausea", prime: 109, category: "Gastrointestinal" },
  { id: 30, name: "Vomiting", prime: 113, category: "Gastrointestinal" },
  { id: 31, name: "Diarrhea", prime: 127, category: "Gastrointestinal" },
  { id: 32, name: "Abdominal pain", prime: 131, category: "Gastrointestinal" },
  { id: 33, name: "Severe abdominal pain", prime: 137, category: "Gastrointestinal" },
  { id: 34, name: "Muscle weakness", prime: 139, category: "Musculoskeletal" },
  { id: 35, name: "Malformed great toe", prime: 149, category: "Musculoskeletal/Genetic" },
  { id: 36, name: "Localized painful swelling", prime: 151, category: "Musculoskeletal" },
  { id: 37, name: "Reduced joint mobility", prime: 157, category: "Musculoskeletal" },
  { id: 38, name: "Painful urination", prime: 163, category: "Urogenital" },
  { id: 39, name: "Difficulty urinating", prime: 167, category: "Urogenital" },
  { id: 40, name: "Pain in groin/pelvis", prime: 173, category: "Urogenital" }
];

// Group symptoms by category for better UI organization
export const symptomCategories: SymptomCategory[] = [
  { name: "Systemic", symptoms: symptoms.filter(s => s.category === "Systemic") },
  { name: "Respiratory", symptoms: symptoms.filter(s => s.category === "Respiratory" || s.category === "Respiratory/Allergy") },
  { name: "Neurological", symptoms: symptoms.filter(s => s.category === "Neurological") },
  { name: "Gastrointestinal", symptoms: symptoms.filter(s => s.category === "Gastrointestinal") },
  { name: "Musculoskeletal", symptoms: symptoms.filter(s => s.category === "Musculoskeletal" || s.category === "Musculoskeletal/Genetic") },
  { name: "ENT", symptoms: symptoms.filter(s => s.category === "ENT") },
  { name: "Sensory", symptoms: symptoms.filter(s => s.category === "Sensory" || s.category === "Sensory/Allergy") },
  { name: "Psychological", symptoms: symptoms.filter(s => s.category === "Psychological") },
  { name: "Cardiovascular", symptoms: symptoms.filter(s => s.category === "Cardiovascular") },
  { name: "Urogenital", symptoms: symptoms.filter(s => s.category === "Urogenital") },
  { name: "Other", symptoms: symptoms.filter(s => 
    !["Systemic", "Respiratory", "Respiratory/Allergy", "Neurological", "Gastrointestinal", 
      "Musculoskeletal", "Musculoskeletal/Genetic", "ENT", "Sensory", "Sensory/Allergy", 
      "Psychological", "Cardiovascular", "Urogenital"].includes(s.category)
  )}
];

// Category colors for visualization
export const categoryColors: Record<string, string> = {
  "Infectious Disease/Primary Care": '#f8cecc',
  "Allergy/Immunology": '#fad7ac',
  "Neurology": '#d0e0fc',
  "Metabolic/Genetic": '#d5e8d4',
  "Musculoskeletal/Genetic": '#fff2cc',
  "Gastroenterology": '#f8d7f8',
  "Urology": '#e1d5e7',
  "Default": '#f5f5f5',
  
  // Symptom category colors
  "Systemic": '#c4e3f3',
  "Respiratory": '#d9edf7',
  "Neurological": '#dff0d8',
  "Gastrointestinal": '#fcf8e3',
  "Musculoskeletal": '#f2dede',
  "ENT": '#e8f5e9',
  "Sensory": '#fff9c4',
  "Psychological": '#f3e5f5',
  "Cardiovascular": '#ffebee',
  "Urogenital": '#e0f7fa',
  "Other": '#f5f5f5'
};
