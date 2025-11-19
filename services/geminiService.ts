
import { GoogleGenAI } from "@google/genai";
import type { UserInput, ReportData, ParsedReport } from '../types';

if (!process.env.API_KEY) {
  // This is a placeholder check. The actual key is expected to be in the environment.
  console.warn("API_KEY environment variable not set. Using a placeholder.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const parseReportFromText = (text: string): ParsedReport | null => {
  const jsonBlockRegex = /```json\s*([\s\S]*?)\s*```/i; // Case insensitive for robustness
  const match = text.match(jsonBlockRegex);

  if (match && match[1]) {
    try {
      const parsedJson = JSON.parse(match[1]);
      // Assuming the structure is {"parsed": {...}}
      if (parsedJson.parsed) {
        return parsedJson.parsed as ParsedReport;
      }
    } catch (e) {
      console.error("Failed to parse JSON from report:", e);
      return null;
    }
  }
  return null;
}


export const generateHealthReport = async (userInput: UserInput): Promise<ReportData> => {
  const { state, lga, symptoms, ageGroup, preExistingConditions, detailedHistory, context } = userInput;

  const location = lga === 'All'
    ? `${state} State (all local governments), Nigeria`
    : `${lga}, ${state} State, Nigeria`;

  // Format detailed medical history
  const detailedHistoryText = detailedHistory ? `
    - Past Diagnoses: ${detailedHistory.pastDiagnoses || 'None'}
    - Surgical History: ${detailedHistory.surgicalHistory || 'None'}
    - Family Medical History: ${detailedHistory.familyHistory || 'None'}
    - Allergies: ${detailedHistory.allergies || 'None'}
  ` : 'None';

  const demographics = `Age Group: ${ageGroup || 'Not specified'}. 
  Summary of Major Conditions: ${preExistingConditions || 'None specified'}.
  Detailed Medical History: ${detailedHistoryText}`;
  
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
    - Consider user's specific medical history (allergies, past surgeries, etc.) when suggesting first aid or treatments (e.g., flag allergy risks).

    4. EMERGENCY RESPONSE PROTOCOL:
    For high-severity alerts, you must automatically:
    - Identify the nearest, highest-rated, and most appropriate healthcare facilities.
    - Describe how environmental factors may be exacerbating the situation.
    - Recommend specific preventive measures for the community.
    - Suggest capacity requirements for an effective healthcare response.

    USER INPUT
    Current Location: ${location}
    Reported Symptoms: ${symptoms}
    Demographic & History: ${demographics}
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
    State,LGA,EnvironmentalContext
    Abia,Aba North,Urban
    Abia,Aba South,Urban
    Abia,Arochukwu,Rural
    Abia,Bende,Rural
    Abia,Ikwuano,Semi-Urban
    Abia,Isiala Ngwa North,Semi-Urban
    Abia,Isiala Ngwa South,Semi-Urban
    Abia,Isuikwuato,Rural
    Abia,Obi Ngwa,Rural
    Abia,Ohafia,Rural
    Abia,Osisioma,Industrial Zone
    Abia,Ugwunagbo,Semi-Urban
    Abia,Ukwa East,Coastal Area
    Abia,Ukwa West,Coastal Area
    Abia,Umuahia North,Urban
    Abia,Umuahia South,Urban
    Abia,Umunneochi,Rural
    Adamawa,Demsa,Flood-Prone Area
    Adamawa,Fufore,Rural
    Adamawa,Ganye,Rural
    Adamawa,Girei,Semi-Urban
    Adamawa,Gombi,Rural
    Adamawa,Guyuk,Rural
    Adamawa,Hong,Rural
    Adamawa,Jada,Rural
    Adamawa,Lamurde,Flood-Prone Area
    Adamawa,Madagali,Arid Area
    Adamawa,Maiha,Rural
    Adamawa,Mayo Belwa,Rural
    Adamawa,Michika,Rural
    Adamawa,Mubi North,Urban
    Adamawa,Mubi South,Urban
    Adamawa,Numan,Flood-Prone Area
    Adamawa,Shelleng,Rural
    Adamawa,Song,Rural
    Adamawa,Toungo,Rural
    Adamawa,Yola North,Urban
    Adamawa,Yola South,Urban
    Akwa Ibom,Abak,Semi-Urban
    Akwa Ibom,Eastern Obolo,Coastal Area
    Akwa Ibom,Eket,Urban
    Akwa Ibom,Esit Eket,Coastal Area
    Akwa Ibom,Essien Udim,Rural
    Akwa Ibom,Etim Ekpo,Rural
    Akwa Ibom,Etinan,Semi-Urban
    Akwa Ibom,Ibeno,Coastal Area
    Akwa Ibom,Ibesikpo Asutan,Semi-Urban
    Akwa Ibom,Ibiono-Ibom,Rural
    Akwa Ibom,Ika,Rural
    Akwa Ibom,Ikono,Rural
    Akwa Ibom,Ikot Abasi,Industrial Zone
    Akwa Ibom,Ikot Ekpene,Urban
    Akwa Ibom,Ini,Rural
    Akwa Ibom,Itu,Semi-Urban
    Akwa Ibom,Mbo,Coastal Area
    Akwa Ibom,Mkpat-Enin,Coastal Area
    Akwa Ibom,Nsit-Atai,Rural
    Akwa Ibom,Nsit-Ibom,Rural
    Akwa Ibom,Nsit-Ubium,Rural
    Akwa Ibom,Obot Akara,Rural
    Akwa Ibom,Okobo,Coastal Area
    Akwa Ibom,Onna,Semi-Urban
    Akwa Ibom,Oron,Coastal Area
    Akwa Ibom,Oruk Anam,Rural
    Akwa Ibom,Udung-Uko,Coastal Area
    Akwa Ibom,Ukanafun,Rural
    Akwa Ibom,Uruan,Semi-Urban
    Akwa Ibom,Urue-Offong/Oruko,Coastal Area
    Akwa Ibom,Uyo,Urban
    Anambra,Aguata,Semi-Urban
    Anambra,Anambra East,Flood-Prone Area
    Anambra,Anambra West,Flood-Prone Area
    Anambra,Anaocha,Rural
    Anambra,Awka North,Rural
    Anambra,Awka South,Urban
    Anambra,Ayamelum,Flood-Prone Area
    Anambra,Dunukofia,Rural
    Anambra,Ekwusigo,Semi-Urban
    Anambra,Idemili North,Industrial Zone
    Anambra,Idemili South,Industrial Zone
    Anambra,Ihiala,Rural
    Anambra,Njikoka,Semi-Urban
    Anambra,Nnewi North,Industrial Zone
    Anambra,Nnewi South,Industrial Zone
    Anambra,Ogbaru,Flood-Prone Area
    Anambra,Onitsha North,Urban
    Anambra,Onitsha South,Urban
    Anambra,Orumba North,Rural
    Anambra,Orumba South,Rural
    Anambra,Oyi,Semi-Urban
    Bauchi,Alkaleri,Rural
    Bauchi,Bauchi,Urban
    Bauchi,Bogoro,Rural
    Bauchi,Damban,Rural
    Bauchi,Darazo,Arid Area
    Bauchi,Dass,Rural
    Bauchi,Gamawa,Arid Area
    Bauchi,Ganjuwa,Rural
    Bauchi,Giade,Rural
    Bauchi,Itas/Gadau,Rural
    Bauchi,Jama'are,Rural
    Bauchi,Katagum,Rural
    Bauchi,Kirfi,Rural
    Bauchi,Misau,Rural
    Bauchi,Ningi,Rural
    Bauchi,Shira,Rural
    Bauchi,Tafawa Balewa,Rural
    Bauchi,Toro,Rural
    Bauchi,Warji,Rural
    Bauchi,Zaki,Rural
    Bayelsa,Brass,Coastal Area
    Bayelsa,Ekeremor,Coastal Area
    Bayelsa,Kolokuma/Opokuma,Flood-Prone Area
    Bayelsa,Nembe,Coastal Area
    Bayelsa,Ogbia,Coastal Area
    Bayelsa,Sagbama,Flood-Prone Area
    Bayelsa,Southern Ijaw,Coastal Area
    Bayelsa,Yenagoa,Urban
    Benue,Ado,Rural
    Benue,Agatu,Flood-Prone Area
    Benue,Apa,Rural
    Benue,Buruku,Rural
    Benue,Gboko,Urban
    Benue,Guma,Rural
    Benue,Gwer East,Rural
    Benue,Gwer West,Rural
    Benue,Katsina-Ala,Rural
    Benue,Konshisha,Rural
    Benue,Kwande,Rural
    Benue,Logo,Rural
    Benue,Makurdi,Urban
    Benue,Obi,Rural
    Benue,Ogbadibo,Rural
    Benue,Ohimini,Rural
    Benue,Oju,Rural
    Benue,Okpokwu,Rural
    Benue,Otukpo,Urban
    Benue,Tarka,Rural
    Benue,Ukum,Rural
    Benue,Ushongo,Rural
    Benue,Vandeikya,Rural
    Borno,Abadam,Arid Area
    Borno,Askira/Uba,Arid Area
    Borno,Bama,Arid Area
    Borno,Bayo,Arid Area
    Borno,Biu,Arid Area
    Borno,Chibok,Arid Area
    Borno,Damboa,Arid Area
    Borno,Dikwa,Arid Area
    Borno,Gubio,Arid Area
    Borno,Guzamala,Arid Area
    Borno,Gwoza,Arid Area
    Borno,Hawul,Arid Area
    Borno,Jere,Urban
    Borno,Kaga,Arid Area
    Borno,Kala/Balge,Arid Area
    Borno,Konduga,Arid Area
    Borno,Kukawa,Arid Area
    Borno,Kwaya Kusar,Arid Area
    Borno,Mafa,Arid Area
    Borno,Magumeri,Arid Area
    Borno,Maiduguri,Urban
    Borno,Marte,Arid Area
    Borno,Mobbar,Arid Area
    Borno,Monguno,Arid Area
    Borno,Ngala,Arid Area
    Borno,Nganzai,Arid Area
    Borno,Shani,Arid Area
    Cross River,Abi,Rural
    Cross River,Akamkpa,Rural
    Cross River,Akpabuyo,Coastal Area
    Cross River,Bakassi,Coastal Area
    Cross River,Bekwarra,Rural
    Cross River,Biase,Rural
    Cross River,Boki,Rural
    Cross River,Calabar Municipal,Urban
    Cross River,Calabar South,Urban
    Cross River,Etung,Rural
    Cross River,Ikom,Urban
    Cross River,Obanliku,Rural
    Cross River,Obubra,Rural
    Cross River,Obudu,Rural
    Cross River,Odukpani,Semi-Urban
    Cross River,Ogoja,Urban
    Cross River,Yakuur,Rural
    Cross River,Yala,Rural
    Delta,Aniocha North,Rural
    Delta,Aniocha South,Semi-Urban
    Delta,Bomadi,Flood-Prone Area
    Delta,Burutu,Coastal Area
    Delta,Ethiope East,Semi-Urban
    Delta,Ethiope West,Semi-Urban
    Delta,Ika North East,Semi-Urban
    Delta,Ika South,Semi-Urban
    Delta,Isoko North,Semi-Urban
    Delta,Isoko South,Semi-Urban
    Delta,Ndokwa East,Flood-Prone Area
    Delta,Ndokwa West,Flood-Prone Area
    Delta,Okpe,Semi-Urban
    Delta,Oshimili North,Urban
    Delta,Oshimili South,Urban
    Delta,Patani,Coastal Area
    Delta,Sapele,Industrial Zone
    Delta,Udu,Industrial Zone
    Delta,Ughelli North,Urban
    Delta,Ughelli South,Urban
    Delta,Ukwuani,Flood-Prone Area
    Delta,Uvwie,Industrial Zone
    Delta,Warri North,Coastal Area
    Delta,Warri South,Urban
    Delta,Warri South West,Coastal Area
    Ebonyi,Abakaliki,Urban
    Ebonyi,Afikpo North,Urban
    Ebonyi,Afikpo South,Semi-Urban
    Ebonyi,Ebonyi,Rural
    Ebonyi,Ezza North,Rural
    Ebonyi,Ezza South,Rural
    Ebonyi,Ikwo,Rural
    Ebonyi,Ishielu,Rural
    Ebonyi,Ivo,Rural
    Ebonyi,Izzi,Rural
    Ebonyi,Ohaozara,Rural
    Ebonyi,Ohaukwu,Rural
    Ebonyi,Onicha,Semi-Urban
    Edo,Akoko-Edo,Rural
    Edo,Egor,Urban
    Edo,Esan Central,Rural
    Edo,Esan North-East,Rural
    Edo,Esan South-East,Rural
    Edo,Esan West,Rural
    Edo,Etsako Central,Rural
    Edo,Etsako East,Rural
    Edo,Etsako West,Semi-Urban
    Edo,Igueben,Rural
    Edo,Ikpoba-Okha,Urban
    Edo,Oredo,Urban
    Edo,Orhionmwon,Rural
    Edo,Ovia North-East,Rural
    Edo,Ovia South-West,Rural
    Edo,Owan East,Rural
    Edo,Owan West,Rural
    Edo,Uhunmwonde,Rural
    Ekiti,Ado Ekiti,Urban
    Ekiti,Efon,Rural
    Ekiti,Ekiti East,Rural
    Ekiti,Ekiti South-West,Rural
    Ekiti,Ekiti West,Rural
    Ekiti,Emure,Rural
    Ekiti,Gbonyin,Rural
    Ekiti,Ido Osi,Rural
    Ekiti,Ijero,Rural
    Ekiti,Ikere,Semi-Urban
    Ekiti,Ikole,Rural
    Ekiti,Ilejemeje,Rural
    Ekiti,Irepodun/Ifelodun,Rural
    Ekiti,Ise/Orun,Rural
    Ekiti,Moba,Rural
    Ekiti,Oye,Rural
    Enugu,Aninri,Rural
    Enugu,Awgu,Rural
    Enugu,Enugu East,Urban
    Enugu,Enugu North,Urban
    Enugu,Enugu South,Urban
    Enugu,Ezeagu,Rural
    Enugu,Igbo Etiti,Rural
    Enugu,Igbo Eze North,Rural
    Enugu,Igbo Eze South,Rural
    Enugu,Isi Uzo,Rural
    Enugu,Nkanu East,Rural
    Enugu,Nkanu West,Rural
    Enugu,Nsukka,Urban
    Enugu,Oji River,Semi-Urban
    Enugu,Udenu,Rural
    Enugu,Udi,Semi-Urban
    Enugu,Uzo Uwani,Rural
    Gombe,Akko,Rural
    Gombe,Balanga,Rural
    Gombe,Billiri,Rural
    Gombe,Dukku,Rural
    Gombe,Funakaye,Arid Area
    Gombe,Gombe,Urban
    Gombe,Kaltungo,Rural
    Gombe,Kwami,Rural
    Gombe,Nafada,Rural
    Gombe,Shongom,Rural
    Gombe,Yamaltu/Deba,Rural
    Imo,Aboh Mbaise,Rural
    Imo,Ahiazu Mbaise,Rural
    Imo,Ehime Mbano,Rural
    Imo,Ezinihitte,Rural
    Imo,Ideato North,Rural
    Imo,Ideato South,Rural
    Imo,Ihitte/Uboma,Rural
    Imo,Ikeduru,Rural
    Imo,Isiala Mbano,Rural
    Imo,Isu,Rural
    Imo,Mbaitoli,Semi-Urban
    Imo,Ngor Okpala,Rural
    Imo,Njaba,Rural
    Imo,Nkwerre,Rural
    Imo,Nwangele,Rural
    Imo,Obowo,Rural
    Imo,Oguta,Flood-Prone Area
    Imo,Ohaji/Egbema,Rural
    Imo,Okigwe,Urban
    Imo,Orlu,Urban
    Imo,Orsu,Rural
    Imo,Oru East,Rural
    Imo,Oru West,Rural
    Imo,Owerri Municipal,Urban
    Imo,Owerri North,Semi-Urban
    Imo,Owerri West,Semi-Urban
    Imo,Unuimo,Rural
    Jigawa,Auyo,Arid Area
    Jigawa,Babura,Arid Area
    Jigawa,Biriniwa,Arid Area
    Jigawa,Birnin Kudu,Arid Area
    Jigawa,Buji,Arid Area
    Jigawa,Dutse,Urban
    Jigawa,Gagarawa,Arid Area
    Jigawa,Garki,Arid Area
    Jigawa,Gumel,Urban
    Jigawa,Guri,Arid Area
    Jigawa,Gwaram,Arid Area
    Jigawa,Gwiwa,Arid Area
    Jigawa,Hadejia,Urban
    Jigawa,Jahun,Arid Area
    Jigawa,Kafin Hausa,Arid Area
    Jigawa,Kazaure,Arid Area
    Jigawa,Kiri Kasama,Arid Area
    Jigawa,Kiyawa,Arid Area
    Jigawa,Maigatari,Arid Area
    Jigawa,Malam Madori,Arid Area
    Jigawa,Miga,Arid Area
    Jigawa,Ringim,Arid Area
    Jigawa,Roni,Arid Area
    Jigawa,Sule Tankarkar,Arid Area
    Jigawa,Taura,Arid Area
    Jigawa,Yankwashi,Arid Area
    Kaduna,Birnin Gwari,Rural
    Kaduna,Chikun,Semi-Urban
    Kaduna,Giwa,Rural
    Kaduna,Igabi,Semi-Urban
    Kaduna,Ikara,Rural
    Kaduna,Jaba,Rural
    Kaduna,Jema'a,Rural
    Kaduna,Kachia,Rural
    Kaduna,Kaduna North,Urban
    Kaduna,Kaduna South,Urban
    Kaduna,Kagarko,Rural
    Kaduna,Kajuru,Rural
    Kaduna,Kaura,Rural
    Kaduna,Kauru,Rural
    Kaduna,Kubau,Rural
    Kaduna,Kudan,Rural
    Kaduna,Lere,Rural
    Kaduna,Makarfi,Rural
    Kaduna,Sabon Gari,Urban
    Kaduna,Sanga,Rural
    Kaduna,Soba,Rural
    Kaduna,Zangon Kataf,Rural
    Kaduna,Zaria,Urban
    Kano,Ajingi,Arid Area
    Kano,Albasu,Arid Area
    Kano,Bagwai,Arid Area
    Kano,Bebeji,Arid Area
    Kano,Bichi,Arid Area
    Kano,Bunkure,Arid Area
    Kano,Dala,Urban
    Kano,Dambatta,Arid Area
    Kano,Dawakin Kudu,Arid Area
    Kano,Dawakin Tofa,Arid Area
    Kano,Doguwa,Arid Area
    Kano,Fagge,Urban
    Kano,Gabasawa,Arid Area
    Kano,Garko,Arid Area
    Kano,Garum,Arid Area
    Kano,Mallam,Arid Area
    Kano,Gaya,Arid Area
    Kano,Gezawa,Arid Area
    Kano,Gwale,Urban
    Kano,Gwarzo,Arid Area
    Kano,Kabo,Arid Area
    Kano,Kano Municipal,Urban
    Kano,Karaye,Arid Area
    Kano,Kibiya,Arid Area
    Kano,Kiru,Arid Area
    Kano,Kumbotso,Urban
    Kano,Kunchi,Arid Area
    Kano,Kura,Arid Area
    Kano,Madobi,Arid Area
    Kano,Makoda,Arid Area
    Kano,Minjibir,Arid Area
    Kano,Nassarawa,Urban
    Kano,Rano,Arid Area
    Kano,Rimin Gado,Arid Area
    Kano,Rogo,Arid Area
    Kano,Shanono,Arid Area
    Kano,Sumaila,Arid Area
    Kano,Takai,Arid Area
    Kano,Tarauni,Urban
    Kano,Tofa,Arid Area
    Kano,Tsanyawa,Arid Area
    Kano,Tudun Wada,Arid Area
    Kano,Ungogo,Urban
    Kano,Warawa,Arid Area
    Kano,Wudil,Arid Area
    Katsina,Bakori,Arid Area
    
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

  // FIX: Call the Gemini API and return a value to satisfy the function's signature.
  const model = 'gemini-3-pro-preview'; // Use a powerful model for this complex reasoning task.
  
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
};
