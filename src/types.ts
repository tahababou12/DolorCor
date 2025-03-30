export interface PatientInfo {
  age: number;
  sex: 'M' | 'F' | 'Other';
}

export interface SymptomData {
  id: number;
  name: string;
  prime: number;
  category: string;
}

export interface DiseaseMatch {
  name: string;
  category: string;
  matchCount: number;
  sqf: number;
  action: string;
}

export interface SymptomCategory {
  name: string;
  symptoms: SymptomData[];
}
