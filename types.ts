
export interface UserInput {
  state: string;
  lga: string;
  symptoms: string;
  ageGroup: string;
  preExistingConditions: string;
  context: EnvironmentalContext;
}

export interface EnvironmentalContext {
  factors: string[];
  notes: string;
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

export interface ParsedReport {
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL' | 'UNKNOWN';
  diagnoses: Diagnosis[];
  urgentActionPlan: string;
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