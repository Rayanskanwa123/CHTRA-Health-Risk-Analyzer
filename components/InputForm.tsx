
import React, { useState, useEffect } from 'react';
import type { UserInput } from '../types';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { ChevronIcon } from './icons/ChevronIcon';
import { healthAlerts } from '../data/healthAlerts';

const nigerianStatesAndLGAs: { [key: string]: string[] } = {
  "Abia": ["Aba North", "Aba South", "Arochukwu", "Bende", "Ikwuano", "Isiala Ngwa North", "Isiala Ngwa South", "Isuikwuato", "Obi Ngwa", "Ohafia", "Osisioma", "Ugwunagbo", "Ukwa East", "Ukwa West", "Umuahia North", "Umuahia South", "Umunneochi"],
  "Adamawa": ["Demsa", "Fufore", "Ganye", "Girei", "Gombi", "Guyuk", "Hong", "Jada", "Lamurde", "Madagali", "Maiha", "Mayo Belwa", "Michika", "Mubi North", "Mubi South", "Numan", "Shelleng", "Song", "Toungo", "Yola North", "Yola South"],
  "Akwa Ibom": ["Abak", "Eastern Obolo", "Eket", "Esit Eket", "Essien Udim", "Etim Ekpo", "Etinan", "Ibeno", "Ibesikpo Asutan", "Ibiono-Ibom", "Ika", "Ikono", "Ikot Abasi", "Ikot Ekpene", "Ini", "Itu", "Mbo", "Mkpat-Enin", "Nsit-Atai", "Nsit-Ibom", "Nsit-Ubium", "Obot Akara", "Okobo", "Onna", "Oron", "Oruk Anam", "Udung-Uko", "Ukanafun", "Uruan", "Urue-Offong/Oruko", "Uyo"],
  "Anambra": ["Aguata", "Anambra East", "Anambra West", "Anaocha", "Awka North", "Awka South", "Ayamelum", "Dunukofia", "Ekwusigo", "Idemili North", "Idemili South", "Ihiala", "Njikoka", "Nnewi North", "Nnewi South", "Ogbaru", "Onitsha North", "Onitsha South", "Orumba North", "Orumba South", "Oyi"],
  "Bauchi": ["Alkaleri", "Bauchi", "Bogoro", "Damban", "Darazo", "Dass", "Gamawa", "Ganjuwa", "Giade", "Itas/Gadau", "Jama'are", "Katagum", "Kirfi", "Misau", "Ningi", "Shira", "Tafawa Balewa", "Toro", "Warji", "Zaki"],
  "Bayelsa": ["Brass", "Ekeremor", "Kolokuma/Opokuma", "Nembe", "Ogbia", "Sagbama", "Southern Ijaw", "Yenagoa"],
  "Benue": ["Ado", "Agatu", "Apa", "Buruku", "Gboko", "Guma", "Gwer East", "Gwer West", "Katsina-Ala", "Konshisha", "Kwande", "Logo", "Makurdi", "Obi", "Ogbadibo", "Ohimini", "Oju", "Okpokwu", "Otukpo", "Tarka", "Ukum", "Ushongo", "Vandeikya"],
  "Borno": ["Abadam", "Askira/Uba", "Bama", "Bayo", "Biu", "Chibok", "Damboa", "Dikwa", "Gubio", "Guzamala", "Gwoza", "Hawul", "Jere", "Kaga", "Kala/Balge", "Konduga", "Kukawa", "Kwaya Kusar", "Mafa", "Magumeri", "Maiduguri", "Marte", "Mobbar", "Monguno", "Ngala", "Nganzai", "Shani"],
  "Cross River": ["Abi", "Akamkpa", "Akpabuyo", "Bakassi", "Bekwarra", "Biase", "Boki", "Calabar Municipal", "Calabar South", "Etung", "Ikom", "Obanliku", "Obubra", "Obudu", "Odukpani", "Ogoja", "Yakuur", "Yala"],
  "Delta": ["Aniocha North", "Aniocha South", "Bomadi", "Burutu", "Ethiope East", "Ethiope West", "Ika North East", "Ika South", "Isoko North", "Isoko South", "Ndokwa East", "Ndokwa West", "Okpe", "Oshimili North", "Oshimili South", "Patani", "Sapele", "Udu", "Ughelli North", "Ughelli South", "Ukwuani", "Uvwie", "Warri North", "Warri South", "Warri South West"],
  "Ebonyi": ["Abakaliki", "Afikpo North", "Afikpo South", "Ebonyi", "Ezza North", "Ezza South", "Ikwo", "Ishielu", "Ivo", "Izzi", "Ohaozara", "Ohaukwu", "Onicha"],
  "Edo": ["Akoko-Edo", "Egor", "Esan Central", "Esan North-East", "Esan South-East", "Esan West", "Etsako Central", "Etsako East", "Etsako West", "Igueben", "Ikpoba-Okha", "Oredo", "Orhionmwon", "Ovia North-East", "Ovia South-West", "Owan East", "Owan West", "Uhunmwonde"],
  "Ekiti": ["Ado Ekiti", "Efon", "Ekiti East", "Ekiti South-West", "Ekiti West", "Emure", "Gbonyin", "Ido Osi", "Ijero", "Ikere", "Ikole", "Ilejemeje", "Irepodun/Ifelodun", "Ise/Orun", "Moba", "Oye"],
  "Enugu": ["Aninri", "Awgu", "Enugu East", "Enugu North", "Enugu South", "Ezeagu", "Igbo Etiti", "Igbo Eze North", "Igbo Eze South", "Isi Uzo", "Nkanu East", "Nkanu West", "Nsukka", "Oji River", "Udenu", "Udi", "Uzo Uwani"],
  "FCT": ["Abaji", "Bwari", "Gwagwalada", "Kuje", "Kwali", "Municipal Area Council"],
  "Gombe": ["Akko", "Balanga", "Billiri", "Dukku", "Funakaye", "Gombe", "Kaltungo", "Kwami", "Nafada", "Shongom", "Yamaltu/Deba"],
  "Imo": ["Aboh Mbaise", "Ahiazu Mbaise", "Ehime Mbano", "Ezinihitte", "Ideato North", "Ideato South", "Ihitte/Uboma", "Ikeduru", "Isiala Mbano", "Isu", "Mbaitoli", "Ngor Okpala", "Njaba", "Nkwerre", "Nwangele", "Obowo", "Oguta", "Ohaji/Egbema", "Okigwe", "Orlu", "Orsu", "Oru East", "Oru West", "Owerri Municipal", "Owerri North", "Owerri West", "Unuimo"],
  "Jigawa": ["Auyo", "Babura", "Biriniwa", "Birnin Kudu", "Buji", "Dutse", "Gagarawa", "Garki", "Gumel", "Guri", "Gwaram", "Gwiwa", "Hadejia", "Jahun", "Kafin Hausa", "Kazaure", "Kiri Kasama", "Kiyawa", "Maigatari", "Malam Madori", "Miga", "Ringim", "Roni", "Sule Tankarkar", "Taura", "Yankwashi"],
  "Kaduna": ["Birnin Gwari", "Chikun", "Giwa", "Igabi", "Ikara", "Jaba", "Jema'a", "Kachia", "Kaduna North", "Kaduna South", "Kagarko", "Kajuru", "Kaura", "Kauru", "Kubau", "Kudan", "Lere", "Makarfi", "Sabon Gari", "Sanga", "Soba", "Zangon Kataf", "Zaria"],
  "Kano": ["Ajingi", "Albasu", "Bagwai", "Bebeji", "Bichi", "Bunkure", "Dala", "Dambatta", "Dawakin Kudu", "Dawakin Tofa", "Doguwa", "Fagge", "Gabasawa", "Garko", "Garum", "Gaya", "Gezawa", "Gwale", "Gwarzo", "Kabo", "Kano Municipal", "Karaye", "Kibiya", "Kiru", "Kumbotso", "Kunchi", "Kura", "Madobi", "Makoda", "Minjibir", "Nassarawa", "Rano", "Rimin Gado", "Rogo", "Shanono", "Sumaila", "Takai", "Tarauni", "Tofa", "Tsanyawa", "Tudun Wada", "Ungogo", "Warawa", "Wudil"],
  "Katsina": ["Bakori", "Batagarawa", "Batsari", "Baure", "Bindawa", "Charanci", "Dan Musa", "Dandume", "Danja", "Duara", "Dutsi", "Dutsin Ma", "Faskari", "Funtua", "Ingawa", "Jibia", "Kafur", "Kaita", "Kankara", "Kankia", "Katsina", "Kurfi", "Kusada", "Mai'Adua", "Malumfashi", "Mani", "Mashi", "Matazu", "Musawa", "Rimi", "Sabuwa", "Safana", "Sandamu", "Zango"],
  "Kebbi": ["Aleiro", "Arewa Dandi", "Argungu", "Augie", "Bagudo", "Birnin Kebbi", "Bunza", "Dandi", "Fakai", "Gwandu", "Jega", "Kalgo", "Koko/Besse", "Maiyama", "Ngaski", "Sakaba", "Shanga", "Suru", "Danko/Wasagu", "Yauri", "Zuru"],
  "Kogi": ["Adavi", "Ajaokuta", "Ankpa", "Bassa", "Dekina", "Ibaji", "Idah", "Igalamela Odolu", "Ijumu", "Kabba/Bunu", "Kogi", "Lokoja", "Mopa Muro", "Ofu", "Ogori/Magongo", "Okene", "Okehi", "Olamaboro", "Omala", "Yagba East", "Yagba West"],
  "Kwara": ["Asa", "Baruten", "Edu", "Ekiti", "Ifelodun", "Ilorin East", "Ilorin South", "Ilorin West", "Isin", "Kaiama", "Moro", "Offa", "Oke Ero", "Oyun", "Pategi"],
  "Lagos": ["Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa", "Badagry", "Epe", "Eti Osa", "Ibeju-Lekki", "Ifako-Ijaiye", "Ikeja", "Ikorodu", "Kosofe", "Lagos Island", "Lagos Mainland", "Mushin", "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere"],
  "Nasarawa": ["Akwanga", "Awe", "Doma", "Karu", "Keana", "Keffi", "Kokona", "Lafia", "Nasarawa", "Nasarawa Egon", "Obi", "Toto", "Wamba"],
  "Niger": ["Agaie", "Agwara", "Bida", "Borgu", "Bosso", "Chanchaga", "Edati", "Gbako", "Gurara", "Katcha", "Kontagora", "Lapai", "Lavun", "Magama", "Mariga", "Mashegu", "Mokwa", "Moya", "Paikoro", "Rafi", "Rijau", "Shiroro", "Suleja", "Tafa", "Wushishi"],
  "Ogun": ["Abeokuta North", "Abeokuta South", "Ado-Odo/Ota", "Egbado North", "Egbado South", "Ewekoro", "Ifo", "Ijebu East", "Ijebu North", "Ijebu North East", "Ijebu Ode", "Ikenne", "Imeko Afon", "Ipokia", "Obafemi Owode", "Odeda", "Odogbolu", "Ogun Waterside", "Remo North", "Shagamu"],
  "Ondo": ["Akoko North-East", "Akoko North-West", "Akoko South-East", "Akoko South-West", "Akure North", "Akure South", "Ese Odo", "Idanre", "Ifedore", "Ilaje", "Ile Oluji/Okeigbo", "Irele", "Odigbo", "Okitipupa", "Ondo East", "Ondo West", "Ose", "Owo"],
  "Osun": ["Aiyedade", "Aiyedire", "Atakunmosa East", "Atakunmosa West", "Boluwaduro", "Boripe", "Ede North", "Ede South", "Egbedore", "Ejigbo", "Ife Central", "Ife East", "Ife North", "Ife South", "Ifedayo", "Ifelodun", "Ila", "Ilesa East", "Ilesa West", "Irepodun", "Irewole", "Isokan", "Iwo", "Obokun", "Odo Otin", "Ola Oluwa", "Olorunda", "Oriade", "Orolu", "Osogbo"],
  "Oyo": ["Afijio", "Akinyele", "Atiba", "Atisbo", "Egbeda", "Ibadan North", "Ibadan North-East", "Ibadan North-West", "Ibadan South-East", "Ibadan South-West", "Ibarapa Central", "Ibarapa East", "Ibarapa North", "Ido", "Irepo", "Iseyin", "Itesiwaju", "Iwajowa", "Kajola", "Lagelu", "Ogbomosho North", "Ogbomosho South", "Ogo Oluwa", "Olorunsogo", "Oluyole", "Ona Ara", "Orelope", "Ori Ire", "Oyo East", "Oyo West", "Saki East", "Saki West", "Surulere"],
  "Plateau": ["Barkin Ladi", "Bassa", "Bokkos", "Jos East", "Jos North", "Jos South", "Kanam", "Kanke", "Langtang North", "Langtang South", "Mangu", "Mikang", "Pankshin", "Qua'an Pan", "Riyom", "Shendam", "Wase"],
  "Rivers": ["Abua/Odual", "Ahoada East", "Ahoada West", "Akuku-Toru", "Andoni", "Asari-Toru", "Bonny", "Degema", "Eleme", "Emuoha", "Etche", "Gokana", "Ikwerre", "Khana", "Obio/Akpor", "Ogba/Egbema/Ndoni", "Ogu/Bolo", "Okrika", "Omuma", "Opobo/Nkoro", "Oyigbo", "Port Harcourt", "Tai"],
  "Sokoto": ["Binji", "Bodinga", "Dange Shuni", "Gada", "Goronyo", "Gudu", "Gwadabawa", "Illela", "Isa", "Kebbe", "Kware", "Rabah", "Sabon Birni", "Shagari", "Silame", "Sokoto North", "Sokoto South", "Tambuwal", "Tangaza", "Tureta", "Wamako", "Wurno", "Yabo"],
  "Taraba": ["Ardo Kola", "Bali", "Donga", "Gashaka", "Gassol", "Ibi", "Jalingo", "Karim Lamido", "Kumi", "Lau", "Sardauna", "Takum", "Ussa", "Wukari", "Yorro", "Zing"],
  "Yobe": ["Bade", "Bursari", "Damaturu", "Fika", "Fune", "Geidam", "Gujba", "Gulani", "Jakusko", "Karasuwa", "Machina", "Nangere", "Nguru", "Potiskum", "Tarmuwa", "Yunusari", "Yusufari"],
  "Zamfara": ["Anka", "Bakura", "Birnin Magaji/Kiyaw", "Bukkuyum", "Bungudu", "Gummi", "Gusau", "Kaura Namoda", "Maradun", "Maru", "Shinkafi", "Talata Mafara", "Chafe", "Zurmi"],
};

const nigerianStates = Object.keys(nigerianStatesAndLGAs).sort();

const alertToSymptomsMap: { [key: string]: string[] } = {
  'Malaria Surge': ['fever', 'chills', 'severe joint pain', 'headache'],
  'Heatwave': ['extreme fatigue', 'dehydration', 'headache', 'dizziness'],
  'Air Pollution': ['cough', 'shortness of breath', 'chest pain', 'wheezing'],
  'Industrial Pollution': ['cough', 'breathing difficulty', 'skin irritation'],
  'Flood Alert': ['watery diarrhea', 'vomiting', 'stomach cramps'],
  'Cholera Alert': ['profuse watery diarrhea', 'vomiting', 'leg cramps', 'dehydration'],
  'Meningitis Alert': ['fever', 'severe headache', 'neck stiffness', 'nausea'],
  'Water Contamination': ['diarrhea', 'vomiting', 'stomach pain'],
  'Respiratory Alert': ['cough', 'shortness of breath', 'wheezing'],
  'Malnutrition Alert': ['fatigue', 'dizziness', 'weight loss'],
};

const environmentalFactors = ['Flood-Prone', 'Arid', 'Coastal', 'Industrial Zone', 'Rural', 'Urban', 'Semi-Urban'];

interface InputFormProps {
  userInput: UserInput;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  language?: string;
}

export const InputForm: React.FC<InputFormProps> = ({ userInput, onInputChange, onSubmit, isLoading, language }) => {
  const [symptomSuggestions, setSymptomSuggestions] = useState<string[]>([]);
  const [isMedicalHistoryOpen, setIsMedicalHistoryOpen] = useState(false);
  
  const lgasForSelectedState = userInput.state ? nigerianStatesAndLGAs[userInput.state] || [] : [];
  
  useEffect(() => {
    if (userInput.state) {
      const alertsForState = healthAlerts.filter(alert => alert.State === userInput.state);
      const alertTypes = [...new Set(alertsForState.map(alert => alert.AlertType))];
      const suggestions = alertTypes.flatMap(type => alertToSymptomsMap[type] || []);
      const uniqueSuggestions = [...new Set(suggestions)];
      setSymptomSuggestions(uniqueSuggestions);
    } else {
      setSymptomSuggestions([]);
    }
  }, [userInput.state]);

  const handleSymptomClick = (symptom: string) => {
    const currentSymptoms = userInput.symptoms.trim();
    let newSymptoms;
    
    if (currentSymptoms === '') {
      newSymptoms = symptom.charAt(0).toUpperCase() + symptom.slice(1);
    } else {
      newSymptoms = `${currentSymptoms}, ${symptom}`;
    }
  
    const event = {
      target: { name: 'symptoms', value: newSymptoms }
    } as React.ChangeEvent<HTMLTextAreaElement>;
    onInputChange(event);
  };


  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 shadow-lg h-full flex flex-col">
      <h2 className="text-2xl font-bold text-white mb-4">Case Details</h2>
      <form onSubmit={onSubmit} className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="patientName" className="block text-sm font-medium text-cyan-400 mb-1">Patient Name</label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={userInput.patientName}
              onChange={onInputChange}
              placeholder="Enter patient name or ID"
              className="w-full bg-slate-800 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-cyan-400 mb-1">Gender</label>
            <select
              id="gender"
              name="gender"
              value={userInput.gender}
              onChange={onInputChange}
              className="w-full bg-slate-800 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-cyan-400 mb-1">State</label>
            <select
              id="state"
              name="state"
              value={userInput.state}
              onChange={onInputChange}
              className="w-full bg-slate-800 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            >
              <option value="" disabled>Select a State</option>
              {nigerianStates.map(state => <option key={state} value={state}>{state}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="lga" className="block text-sm font-medium text-cyan-400 mb-1">Local Government Area (LGA)</label>
            <select
              id="lga"
              name="lga"
              value={userInput.lga}
              onChange={onInputChange}
              disabled={!userInput.state}
              className="w-full bg-slate-800 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition disabled:bg-slate-700 disabled:cursor-not-allowed"
            >
              <option value="All">All LGAs</option>
              {lgasForSelectedState.map(lga => <option key={lga} value={lga}>{lga}</option>)}
            </select>
          </div>
        </div>

        <div>
            <label htmlFor="symptoms" className="block text-sm font-medium text-cyan-400 mb-1">Reported Symptoms</label>
            <textarea
                id="symptoms"
                name="symptoms"
                value={userInput.symptoms}
                onChange={onInputChange}
                rows={4}
                className="w-full bg-slate-800 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            />
            {symptomSuggestions.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2" role="toolbar" aria-label="Symptom suggestions">
                    {symptomSuggestions
                        .filter(symptom => !userInput.symptoms.toLowerCase().includes(symptom.toLowerCase()))
                        .map(symptom => (
                            <button
                                type="button"
                                key={symptom}
                                onClick={() => handleSymptomClick(symptom)}
                                className="px-2.5 py-1 bg-slate-700 text-cyan-300 text-xs font-medium rounded-full hover:bg-slate-600 hover:text-cyan-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500"
                            >
                                + {symptom}
                            </button>
                        ))
                    }
                </div>
            )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ageGroup" className="block text-sm font-medium text-cyan-400 mb-1">Age Group</label>
            <select
              id="ageGroup"
              name="ageGroup"
              value={userInput.ageGroup}
              onChange={onInputChange}
              className="w-full bg-slate-800 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            >
              <option value="0-4">Infant/Toddler (0-4)</option>
              <option value="5-12">Child (5-12)</option>
              <option value="13-17">Adolescent (13-17)</option>
              <option value="18-25">Young Adult (18-25)</option>
              <option value="26-45">Adult (26-45)</option>
              <option value="46-65">Middle-Aged Adult (46-65)</option>
              <option value="65+">Senior (65+)</option>
            </select>
          </div>
          <div>
            <label htmlFor="preExistingConditions" className="block text-sm font-medium text-cyan-400 mb-1">Major Condition Summary</label>
            <input
              type="text"
              id="preExistingConditions"
              name="preExistingConditions"
              value={userInput.preExistingConditions}
              onChange={onInputChange}
              placeholder="e.g., Diabetes, Asthma"
              className="w-full bg-slate-800 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            />
          </div>
        </div>

        {/* Collapsible Detailed Medical History Section */}
        <div className="border border-slate-700 rounded-lg bg-slate-800/30 overflow-hidden">
          <button
            type="button"
            onClick={() => setIsMedicalHistoryOpen(!isMedicalHistoryOpen)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-700/50 transition-colors"
          >
            <span className="text-sm font-medium text-cyan-400">Detailed Medical History</span>
            <ChevronIcon className="w-4 h-4 text-slate-400" expanded={isMedicalHistoryOpen} />
          </button>
          
          {isMedicalHistoryOpen && (
            <div className="p-4 border-t border-slate-700 space-y-4 animate-in slide-in-from-top-2 fade-in duration-200">
              <div>
                <label htmlFor="pastDiagnoses" className="block text-xs font-medium text-slate-400 mb-1">Past Diagnoses</label>
                <textarea
                  id="pastDiagnoses"
                  name="pastDiagnoses"
                  value={userInput.detailedHistory?.pastDiagnoses || ''}
                  onChange={onInputChange}
                  rows={2}
                  placeholder="List any chronic illnesses or previous major health events..."
                  className="w-full bg-slate-900 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition"
                />
              </div>
              <div>
                <label htmlFor="surgicalHistory" className="block text-xs font-medium text-slate-400 mb-1">Surgical History</label>
                <textarea
                  id="surgicalHistory"
                  name="surgicalHistory"
                  value={userInput.detailedHistory?.surgicalHistory || ''}
                  onChange={onInputChange}
                  rows={2}
                  placeholder="Any previous surgeries and dates..."
                  className="w-full bg-slate-900 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition"
                />
              </div>
               <div>
                <label htmlFor="familyHistory" className="block text-xs font-medium text-slate-400 mb-1">Family Medical History</label>
                <textarea
                  id="familyHistory"
                  name="familyHistory"
                  value={userInput.detailedHistory?.familyHistory || ''}
                  onChange={onInputChange}
                  rows={2}
                  placeholder="Hereditary conditions in immediate family..."
                  className="w-full bg-slate-900 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition"
                />
              </div>
              <div>
                <label htmlFor="allergies" className="block text-xs font-medium text-slate-400 mb-1">Allergies</label>
                <input
                  type="text"
                  id="allergies"
                  name="allergies"
                  value={userInput.detailedHistory?.allergies || ''}
                  onChange={onInputChange}
                  placeholder="Medications, foods, environmental..."
                  className="w-full bg-slate-900 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition"
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <fieldset className="space-y-3 rounded-lg border border-slate-700 p-4">
            <legend className="text-sm font-medium text-cyan-400 px-1">Environmental Context</legend>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
              {environmentalFactors.map(factor => (
                <label key={factor} className="flex items-center space-x-2 text-slate-300 font-normal">
                  <input
                    type="checkbox"
                    name="contextFactor"
                    value={factor}
                    checked={userInput.context.factors.includes(factor)}
                    onChange={onInputChange}
                    className="h-4 w-4 rounded border-slate-500 bg-slate-700 text-cyan-600 focus:ring-cyan-500 transition"
                  />
                  <span>{factor}</span>
                </label>
              ))}
            </div>
            <textarea
              id="contextNotes"
              name="contextNotes"
              value={userInput.context.notes}
              onChange={onInputChange}
              rows={2}
              className="w-full bg-slate-800 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition mt-2"
              placeholder="e.g., Mid-rainy season, recent community gathering..."
            />
          </fieldset>
        </div>
        
        <div className="pt-2 sticky bottom-0 bg-slate-900/0 backdrop-blur-sm">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-600 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 shadow-md disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <SpinnerIcon className="w-5 h-5 mr-3" />
                  Analyzing Risk...
                </>
              ) : (
                'Generate Risk Assessment'
              )}
            </button>
        </div>
      </form>
    </div>
  );
};
