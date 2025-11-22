
export interface UserInput {
  patientName: string;
  gender: string;
  state: string;
  lga: string;
  symptoms: string;
  ageGroup: string;
  preExistingConditions: string;
  context: EnvironmentalContext;
  detailedHistory: DetailedMedicalHistory;
}

export interface DetailedMedicalHistory {
  pastDiagnoses: string;
  surgicalHistory: string;
  familyHistory: string;
  allergies: string;
}

export interface EnvironmentalContext {
  factors: string[];
  notes: string;
  timestamp?: number; // Added for history tracking
}

export interface Diagnosis {
  name: string;
  confidence: number;
  rationale: string;
}

export interface ResourceContact {
  Service: string;
  Number: string;
  Notes: string;
}

export interface MedicalFacility {
  "Facility Name": string;
  "Location / Address": string;
  "Priority Level": string;
}

export interface LabTest {
  testName: string;
  reason: string;
  priority: 'Routine' | 'Urgent';
}

export interface ParsedReport {
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL' | 'UNKNOWN';
  diagnoses: Diagnosis[];
  urgentActionPlan: string;
  labTests: LabTest[];
  firstAid: string[];
  preventiveMeasures: string[];
  contacts: ResourceContact[];
  facilities: MedicalFacility[];
}

export interface ReportData {
  textReport: string;
  parsedReport: ParsedReport | null;
}

export interface HealthAlert {
  State: string;
  LGA: string;
  AlertType: string;
  Description: string;
  Severity: string;
}

export interface SavedReport {
  id: string;
  timestamp: number;
  userInput: UserInput;
  reportData: ReportData;
}
