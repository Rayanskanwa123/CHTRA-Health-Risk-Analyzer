
export interface LanguageData {
  State: string;
  LGA: string;
  PrimaryLanguages: string;
  LanguageFamily: string;
  Notes: string;
}

export const locationLanguages: LanguageData[] = [
  { State: "Abia", LGA: "Aba North", PrimaryLanguages: "Igbo", LanguageFamily: "Niger-Congo", Notes: "" },
  { State: "Abia", LGA: "Aba South", PrimaryLanguages: "Igbo", LanguageFamily: "Niger-Congo", Notes: "" },
  { State: "Abia", LGA: "Arochukwu", PrimaryLanguages: "Igbo, Ibibio", LanguageFamily: "Niger-Congo", Notes: "Cross-border influence" },
  { State: "Abia", LGA: "Bende", PrimaryLanguages: "Igbo", LanguageFamily: "Niger-Congo", Notes: "" },
  { State: "Adamawa", LGA: "Demsa", PrimaryLanguages: "Bachama, Bata", LanguageFamily: "Afro-Asiatic", Notes: "" },
  { State: "Adamawa", LGA: "Fufore", PrimaryLanguages: "Fulfulde, Hausa", LanguageFamily: "Afro-Asiatic", Notes: "" },
  { State: "Adamawa", LGA: "Ganye", PrimaryLanguages: "Chamba, Fulfulde", LanguageFamily: "Afro-Asiatic", Notes: "Chamba is dominant" },
  { State: "Akwa Ibom", LGA: "Abak", PrimaryLanguages: "Ibibio", LanguageFamily: "Niger-Congo", Notes: "" },
  { State: "Akwa Ibom", LGA: "Eastern Obolo", PrimaryLanguages: "Obolo", LanguageFamily: "Niger-Congo", Notes: "" },
  { State: "Akwa Ibom", LGA: "Eket", PrimaryLanguages: "Eket (Ibibio subgroup)", LanguageFamily: "Niger-Congo", Notes: "" },
  { State: "Anambra", LGA: "Aguata", PrimaryLanguages: "Igbo", LanguageFamily: "Niger-Congo", Notes: "" },
  { State: "Anambra", LGA: "Anambra West", PrimaryLanguages: "Igbo", LanguageFamily: "Niger-Congo", Notes: "" },
  { State: "Anambra", LGA: "Onitsha North", PrimaryLanguages: "Igbo", LanguageFamily: "Niger-Congo", Notes: "" },
  { State: "Bauchi", LGA: "Bauchi", PrimaryLanguages: "Hausa, Fulfulde", LanguageFamily: "Afro-Asiatic", Notes: "" },
  { State: "Bauchi", LGA: "Toro", PrimaryLanguages: "Hausa, Fulfulde", LanguageFamily: "Afro-Asiatic", Notes: "" },
  { State: "Bauchi", LGA: "Katagum", PrimaryLanguages: "Hausa, Fulfulde", LanguageFamily: "Afro-Asiatic", Notes: "" },
  { State: "Bayelsa", LGA: "Brass", PrimaryLanguages: "Nembe, Ijaw", LanguageFamily: "Niger-Congo", Notes: "" },
  { State: "Bayelsa", LGA: "Yenagoa", PrimaryLanguages: "Ijaw, Epie", LanguageFamily: "Niger-Congo", Notes: "" },
  { State: "Benue", LGA: "Makurdi", PrimaryLanguages: "Tiv, Idoma", LanguageFamily: "Niger-Congo", Notes: "" },
  { State: "Benue", LGA: "Gboko", PrimaryLanguages: "Tiv", LanguageFamily: "Niger-Congo", Notes: "" },
  { State: "Borno", LGA: "Maiduguri", PrimaryLanguages: "Kanuri, Hausa", LanguageFamily: "Nilo-Saharan", Notes: "" },
  { State: "Borno", LGA: "Bama", PrimaryLanguages: "Kanuri", LanguageFamily: "Nilo-Saharan", Notes: "" },
  { State: "Cross River", LGA: "Calabar Municipal", PrimaryLanguages: "Efik", LanguageFamily: "Niger-Congo", Notes: "" },
  { State: "Cross River", LGA: "Ikom", PrimaryLanguages: "Ejagham", LanguageFamily: "Niger-Congo", Notes: "" },
  { State: "Delta", LGA: "Warri South", PrimaryLanguages: "Itsekiri, Ijaw, Urhobo", LanguageFamily: "Niger-Congo", Notes: "Highly multilingual" },
  { State: "Delta", LGA: "Sapele", PrimaryLanguages: "Urhobo, Okpe", LanguageFamily: "Niger-Congo", Notes: "" },
  { State: "Ebonyi", LGA: "Abakaliki", PrimaryLanguages: "Igbo", LanguageFamily: "Niger-Congo", Notes: "" },
  { State: "Edo", LGA: "Benin City", PrimaryLanguages: "Edo (Bini)", LanguageFamily: "Niger-Congo", Notes: "" },
  { State: "Ekiti", LGA: "Ado Ekiti", PrimaryLanguages: "Yoruba", LanguageFamily: "Niger-Congo", Notes: "" },
  { State: "Enugu", LGA: "Enugu North", PrimaryLanguages: "Igbo", LanguageFamily: "Niger-Congo", Notes: "" },
  { State: "Gombe", LGA: "Gombe", PrimaryLanguages: "Hausa, Fulfulde", LanguageFamily: "Afro-Asiatic", Notes: "" },
  { State: "Imo", LGA: "Owerri Municipal", PrimaryLanguages: "Igbo", LanguageFamily: "Niger-Congo", Notes: "" },
  { State: "Jigawa", LGA: "Dutse", PrimaryLanguages: "Hausa", LanguageFamily: "Afro-Asiatic", Notes: "" },
  { State: "Kaduna", LGA: "Kaduna North", PrimaryLanguages: "Hausa", LanguageFamily: "Afro-Asiatic", Notes: "" },
  { State: "Kaduna", LGA: "Zaria", PrimaryLanguages: "Hausa", LanguageFamily: "Afro-Asiatic", Notes: "" },
  { State: "Kano", LGA: "Kano Municipal", PrimaryLanguages: "Hausa", LanguageFamily: "Afro-Asiatic", Notes: "" },
  { State: "Katsina", LGA: "Katsina", PrimaryLanguages: "Hausa", LanguageFamily: "Afro-Asiatic", Notes: "" },
  { State: "Kebbi", LGA: "Birnin Kebbi", PrimaryLanguages: "Hausa", LanguageFamily: "Afro-Asiatic", Notes: "" },
  { State: "Kogi", LGA: "Lokoja", PrimaryLanguages: "Hausa, Igala", LanguageFamily: "Niger-Congo", Notes: "" },
  { State: "Kwara", LGA: "Ilorin South", PrimaryLanguages: "Yoruba", LanguageFamily: "Niger-Congo", Notes: "" },
  { State: "Lagos", LGA: "Ikeja", PrimaryLanguages: "Yoruba", LanguageFamily: "Niger-Congo", Notes: "" },
  { State: "Lagos", LGA: "Lagos Island", PrimaryLanguages: "Yoruba", LanguageFamily: "Niger-Congo", Notes: "" },
  { State: "Nasarawa", LGA: "Lafia", PrimaryLanguages: "Hausa, Eggon", LanguageFamily: "Afro-Asiatic", Notes: "" },
  { State: "Niger", LGA: "Minna", PrimaryLanguages: "Nupe, Gbagyi", LanguageFamily: "Niger-Congo", Notes: "" },
  { State: "Ogun", LGA: "Abeokuta South", PrimaryLanguages: "Yoruba", LanguageFamily: "Niger-Congo", Notes: "" },
  { State: "Ondo", LGA: "Akure South", PrimaryLanguages: "Yoruba", LanguageFamily: "Niger-Congo", Notes: "" },
  { State: "Osun", LGA: "Osogbo", PrimaryLanguages: "Yoruba", LanguageFamily: "Niger-Congo", Notes: "" },
  { State: "Oyo", LGA: "Ibadan North", PrimaryLanguages: "Yoruba", LanguageFamily: "Niger-Congo", Notes: "" },
  { State: "Plateau", LGA: "Jos South", PrimaryLanguages: "Hausa, Berom", LanguageFamily: "Afro-Asiatic", Notes: "" },
  { State: "Rivers", LGA: "Port Harcourt", PrimaryLanguages: "Ikwerre (Igbo subgroup), Ijaw", LanguageFamily: "Niger-Congo", Notes: "" },
  { State: "Sokoto", LGA: "Sokoto South", PrimaryLanguages: "Hausa", LanguageFamily: "Afro-Asiatic", Notes: "" },
  { State: "Taraba", LGA: "Jalingo", PrimaryLanguages: "Hausa, Fulfulde", LanguageFamily: "Afro-Asiatic", Notes: "" },
  { State: "Yobe", LGA: "Damaturu", PrimaryLanguages: "Kanuri, Hausa", LanguageFamily: "Nilo-Saharan", Notes: "" },
  { State: "Zamfara", LGA: "Gusau", PrimaryLanguages: "Hausa", LanguageFamily: "Afro-Asiatic", Notes: "" },
  { State: "FCT", LGA: "Municipal Area Council", PrimaryLanguages: "Hausa, Gbagyi", LanguageFamily: "Afro-Asiatic", Notes: "" }
];

// Helper function to get languages for a specific location
export const getLanguagesForLocation = (state: string, lga: string): string[] => {
  const record = locationLanguages.find(
    l => l.State === state && (l.LGA === lga || lga === "All")
  );

  if (record) {
    return record.PrimaryLanguages.split(',').map(l => l.trim());
  }

  // Fallback defaults based on region if specific LGA data is missing
  const northernStates = ['Kano', 'Kaduna', 'Katsina', 'Sokoto', 'Kebbi', 'Zamfara', 'Jigawa', 'Bauchi', 'Gombe', 'Yobe', 'Borno', 'Adamawa', 'Taraba', 'Niger', 'Nasarawa', 'Plateau', 'FCT'];
  const westernStates = ['Lagos', 'Ogun', 'Oyo', 'Osun', 'Ondo', 'Ekiti', 'Kwara', 'Kogi', 'Edo'];
  const easternStates = ['Anambra', 'Enugu', 'Ebonyi', 'Imo', 'Abia', 'Rivers', 'Delta', 'Akwa Ibom', 'Cross River', 'Bayelsa', 'Benue'];

  if (northernStates.includes(state)) return ['Hausa', 'Fulfulde'];
  if (westernStates.includes(state)) return ['Yoruba', 'Pidgin'];
  if (easternStates.includes(state)) return ['Igbo', 'Pidgin'];

  return ['Hausa', 'Yoruba', 'Igbo', 'Pidgin']; // National fallback
};
