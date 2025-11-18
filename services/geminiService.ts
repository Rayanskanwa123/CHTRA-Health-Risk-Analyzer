
import { GoogleGenAI } from "@google/genai";
import type { UserInput, ReportData, ParsedReport } from '../types';

// The API key is strictly obtained from the environment variable.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const parseReportFromText = (text: string): ParsedReport | null => {
  // Try to find JSON inside markdown block first
  // Improved regex: Case insensitive, optional 'json' tag, lazy match content
  const jsonBlockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/i;
  const match = text.match(jsonBlockRegex);

  if (match && match[1]) {
    try {
      const parsedJson = JSON.parse(match[1]);
      if (parsedJson.parsed) {
        return parsedJson.parsed as ParsedReport;
      }
      // If the root is the object itself (fallback)
      if (parsedJson.riskLevel) {
        return parsedJson as ParsedReport;
      }
    } catch (e) {
      console.error("Failed to parse JSON from code block:", e);
    }
  }

  // Fallback: Try to parse the whole text as JSON (if model didn't use markdown)
  try {
    const parsedJson = JSON.parse(text);
    if (parsedJson.parsed) {
      return parsedJson.parsed as ParsedReport;
    }
  } catch (e) {
    // Expected if text is narrative
  }

  return null;
}

export const generateHealthReport = async (userInput: UserInput): Promise<ReportData> => {
  const { state, lga, symptoms, ageGroup, preExistingConditions, context } = userInput;

  const location = lga === 'All'
    ? `${state} State (all local governments), Nigeria`
    : `${lga}, ${state} State, Nigeria`;

  const demographics = `Age Group: ${ageGroup || 'Not specified'}. Pre-existing Conditions: ${preExistingConditions || 'None specified'}.`;
  
  const formattedContext = `Selected Factors: ${context.factors.length > 0 ? context.factors.join(', ') : 'None selected'}. Additional Notes: ${context.notes || 'None'}`;

  const prompt = `
    SYSTEM INSTRUCTION / PERSONA
    You are the Comprehensive Health and Threat Response Agent (CHTRA). Your primary function is to analyze immediate user-provided health symptoms and demographic data against a pre-loaded, comprehensive, geographically-specific dataset for Nigeria to generate an immediate, synthesized, and actionable risk assessment. You are a non-diagnostic AI for low-resource communities. Your tone is urgent, empathetic, and clear. Always provide disclaimers that you are NOT a substitute for a medical professional.

    CORE INSTRUCTIONS:
    1. CROSS-REFERENCING CAPABILITY:
    - You MUST cross-reference across all three primary datasets (Environment, Facilities, Alerts) when generating a response.
    - When discussing an LGA, automatically include relevant environmental context, healthcare facilities, and active alerts.
    - Map environmental risks (e.g., 'Flood-Prone Area') to appropriate health alerts (e.g., 'Cholera Alert') and healthcare responses.

    2. PRIORITIZATION LOGIC:
    - High-severity alerts take precedence in recommendations.
    - Recommend Teaching hospitals for complex cases and Primary Health Centres for preventive care, considering their quality ratings.
    - Match healthcare facility capabilities with the identified environmental and health risks.
    - Consider seasonal patterns: rainy season implies higher malaria/flood/cholera risk; dry season implies higher meningitis/heatwave risk.

    3. ANALYTICAL FRAMEWORK & ACTIONABLE INSIGHTS:
    - Identify LGAs with high health risks but poor healthcare infrastructure.
    - Flag environmental hotspots requiring urgent intervention.
    - Generate specific, data-driven public health intervention proposals.
    - Provide emergency response planning guidance based on the synthesis of all available data.

    4. EMERGENCY RESPONSE PROTOCOL:
    For high-severity alerts, you must automatically:
    - Identify the nearest, highest-rated, and most appropriate healthcare facilities.
    - Describe how environmental factors may be exacerbating the situation.
    - Recommend specific preventive measures for the community.
    - Suggest capacity requirements for an effective healthcare response.

    USER INPUT
    Current Location: ${location}
    Reported Symptoms: ${symptoms}
    Demographic: ${demographics}
    Environmental Context: ${formattedContext}

    --- DATA MODULES ---

    MODULE 1: DIAGNOSTIC GUIDANCE DATA (General)
    SymptomPattern,LikelyDiagnoses,ConfidenceScore,Notes
    "profuse watery diarrhea; vomiting; acute dehydration","Cholera; Severe gastroenteritis",0.9,"High priority; treat for dehydration; lab confirmation needed"
    "fever; severe headache; neck stiffness","Meningitis; Severe malaria",0.8,"Referral for lumbar puncture and labs recommended"
    "fever; chills; severe joint pain","Malaria",0.85,"Rapid diagnostic test (RDT) recommended"
    "cough; shortness of breath; chest pain","Pneumonia; Acute respiratory infection",0.7,"Chest X-ray and oxygen assessment recommended"

    MODULE 2: FIRST AID & PREVENTION PROTOCOLS (General)
    Condition,FirstAidSteps,WhenToRefer,PreventiveMeasures
    "Dehydration (suspected cholera)","Oral rehydration solution (ORS) immediately; if vomit/diarrhea severe give IV fluids by trained provider; keep patient upright; replace fluids frequently","If unable to drink, signs of hypovolemic shock, or reduced consciousness — urgent transport to hospital","Boil water; use chlorine tablets; handwashing; safe food handling; avoid floodwater"
    "Malaria (suspected)","Give paracetamol for fever; keep patient hydrated; seek RDT or start ACT as per local guidelines if RDT unavailable and severe risk","If severe signs (coma, inability to drink/convulsions) — urgent referral","Use insecticide-treated nets; remove standing water; indoor spraying"
    "Pneumonia","Keep patient warm, ensure open airway; give oxygen if available for low SpO2; antibiotics per guideline for bacterial pneumonia","If breathing >30/min in adults or severe distress — urgent referral","Vaccination (where available), reduce indoor smoke exposure"

    MODULE 3: ENVIRONMENTAL CONTEXT DATASET (NIGERIA)
    (Data implied from context provided in user input and internal knowledge of Nigerian geography for the selected state/LGA)
    
    --- OUTPUT INSTRUCTIONS ---
    1. Provide a comprehensive, empathetic, and clear text-based risk assessment first. This should be human-readable.
    2. After the text report, you MUST provide a single JSON code block that starts with \`\`\`json and ends with \`\`\`.
    3. The JSON object must contain a single root key "parsed" that holds the structured data.
    4. The structure of the "parsed" object must exactly match the following TypeScript interface:
      interface ParsedReport {
        riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL' | 'UNKNOWN';
        diagnoses: { name: string; confidence: number; rationale: string; }[];
        urgentActionPlan: string;
        firstAid: string[];
        preventiveMeasures: string[];
        contacts: { Service: string; Number: string; Notes: string; }[];
        facilities: { "Facility Name": string; "Location / Address": string; "Priority Level": string; }[];
      }
    `;

  // Use gemini-3-pro-preview for complex reasoning tasks.
  const model = 'gemini-3-pro-preview';
  
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    const textReport = response.text;
    const parsedReport = parseReportFromText(textReport);

    return {
      textReport,
      parsedReport,
    };
  } catch (error) {
    console.error("Error generating health report:", error);
    throw new Error("Failed to generate report. Please try again.");
  }
};
