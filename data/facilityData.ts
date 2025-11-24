
export interface FacilityRecord {
  State: string;
  LGA: string;
  Name: string;
  Type: string;
  Address: string;
}

export const facilityData: FacilityRecord[] = [
  // --- FEDERAL & TEACHING HOSPITALS (Referral Centers - State Wide Coverage) ---
  { State: "Abia", LGA: "All", Name: "Federal Medical Centre Umuahia", Type: "Federal Medical Centre", Address: "Abia Way, Umuahia" },
  { State: "Adamawa", LGA: "All", Name: "Federal Medical Centre Yola", Type: "Federal Medical Centre", Address: "Lamido Zubairu Way, Yola Bypass" },
  { State: "Akwa Ibom", LGA: "All", Name: "University of Uyo Teaching Hospital", Type: "Teaching Hospital", Address: "Abak Road, Uyo" },
  { State: "Anambra", LGA: "All", Name: "Nnamdi Azikiwe University Teaching Hospital", Type: "Teaching Hospital", Address: "Nnewi" },
  { State: "Bauchi", LGA: "All", Name: "Abubakar Tafawa Balewa University Teaching Hospital", Type: "Teaching Hospital", Address: "Hospital Road, Bauchi" },
  { State: "Bauchi", LGA: "All", Name: "Federal Medical Centre Azare", Type: "Federal Medical Centre", Address: "Azare" },
  { State: "Bayelsa", LGA: "All", Name: "Federal Medical Centre Yenagoa", Type: "Federal Medical Centre", Address: "Yenagoa" },
  { State: "Benue", LGA: "All", Name: "Benue State University Teaching Hospital", Type: "Teaching Hospital", Address: "Makurdi" },
  { State: "Benue", LGA: "All", Name: "Federal Medical Centre Makurdi", Type: "Federal Medical Centre", Address: "Makurdi" },
  { State: "Borno", LGA: "All", Name: "University of Maiduguri Teaching Hospital", Type: "Teaching Hospital", Address: "Bama Road, Maiduguri" },
  { State: "Borno", LGA: "All", Name: "Federal Neuro-Psychiatric Hospital", Type: "Specialist Hospital", Address: "Maiduguri" },
  { State: "Cross River", LGA: "All", Name: "University of Calabar Teaching Hospital", Type: "Teaching Hospital", Address: "Calabar" },
  { State: "Delta", LGA: "All", Name: "Federal Medical Centre Asaba", Type: "Federal Medical Centre", Address: "Nnebisi Road, Asaba" },
  { State: "Delta", LGA: "All", Name: "Delta State University Teaching Hospital", Type: "Teaching Hospital", Address: "Oghara" },
  { State: "Ebonyi", LGA: "All", Name: "Alex Ekwueme Federal University Teaching Hospital", Type: "Teaching Hospital", Address: "Abakaliki" },
  { State: "Edo", LGA: "All", Name: "University of Benin Teaching Hospital (UBTH)", Type: "Teaching Hospital", Address: "Ugbowo Lagos Road, Benin City" },
  { State: "Edo", LGA: "All", Name: "Irrua Specialist Teaching Hospital", Type: "Teaching Hospital", Address: "Irrua" },
  { State: "Ekiti", LGA: "All", Name: "Ekiti State University Teaching Hospital", Type: "Teaching Hospital", Address: "Ado Ekiti" },
  { State: "Ekiti", LGA: "All", Name: "Federal Teaching Hospital Ido-Ekiti", Type: "Teaching Hospital", Address: "Ido-Ekiti" },
  { State: "Enugu", LGA: "All", Name: "University of Nigeria Teaching Hospital (UNTH)", Type: "Teaching Hospital", Address: "Ituku-Ozalla, Enugu" },
  { State: "Enugu", LGA: "All", Name: "National Orthopaedic Hospital", Type: "Specialist Hospital", Address: "Enugu" },
  { State: "FCT", LGA: "All", Name: "National Hospital Abuja", Type: "National Hospital", Address: "Independence Ave, Central Business District" },
  { State: "FCT", LGA: "All", Name: "University of Abuja Teaching Hospital", Type: "Teaching Hospital", Address: "Gwagwalada" },
  { State: "FCT", LGA: "All", Name: "Federal Medical Centre Jabi", Type: "Federal Medical Centre", Address: "Jabi, Abuja" },
  { State: "Gombe", LGA: "All", Name: "Federal Teaching Hospital Gombe", Type: "Teaching Hospital", Address: "Ashaka Road, Gombe" },
  { State: "Imo", LGA: "All", Name: "Federal Medical Centre Owerri", Type: "Federal Medical Centre", Address: "Orlu Road, Owerri" },
  { State: "Imo", LGA: "All", Name: "Imo State University Teaching Hospital", Type: "Teaching Hospital", Address: "Orlu" },
  { State: "Jigawa", LGA: "All", Name: "Federal Medical Centre Birnin Kudu", Type: "Federal Medical Centre", Address: "Birnin Kudu" },
  { State: "Kaduna", LGA: "All", Name: "Ahmadu Bello University Teaching Hospital (ABUTH)", Type: "Teaching Hospital", Address: "Shika, Zaria" },
  { State: "Kaduna", LGA: "All", Name: "National Eye Centre", Type: "Specialist Hospital", Address: "Kaduna" },
  { State: "Kano", LGA: "All", Name: "Aminu Kano Teaching Hospital", Type: "Teaching Hospital", Address: "Zaria Road, Kano" },
  { State: "Kano", LGA: "All", Name: "National Orthopaedic Hospital Dala", Type: "Specialist Hospital", Address: "Dala, Kano" },
  { State: "Katsina", LGA: "All", Name: "Federal Medical Centre Katsina", Type: "Federal Medical Centre", Address: "Katsina" },
  { State: "Kebbi", LGA: "All", Name: "Federal Medical Centre Birnin Kebbi", Type: "Federal Medical Centre", Address: "Birnin Kebbi" },
  { State: "Kogi", LGA: "All", Name: "Federal Medical Centre Lokoja", Type: "Federal Medical Centre", Address: "Lokoja" },
  { State: "Kwara", LGA: "All", Name: "University of Ilorin Teaching Hospital", Type: "Teaching Hospital", Address: "Oke-Oyi, Ilorin" },
  { State: "Lagos", LGA: "All", Name: "Lagos University Teaching Hospital (LUTH)", Type: "Teaching Hospital", Address: "Idi-Araba, Surulere" },
  { State: "Lagos", LGA: "All", Name: "Lagos State University Teaching Hospital (LASUTH)", Type: "Teaching Hospital", Address: "Ikeja" },
  { State: "Lagos", LGA: "All", Name: "Federal Medical Centre Ebute Metta", Type: "Federal Medical Centre", Address: "Ebute Metta, Lagos" },
  { State: "Lagos", LGA: "All", Name: "National Orthopaedic Hospital Igbobi", Type: "Specialist Hospital", Address: "Ikorodu Road, Lagos" },
  { State: "Nasarawa", LGA: "All", Name: "Federal Medical Centre Keffi", Type: "Federal Medical Centre", Address: "Keffi" },
  { State: "Niger", LGA: "All", Name: "Federal Medical Centre Bida", Type: "Federal Medical Centre", Address: "Bida" },
  { State: "Ogun", LGA: "All", Name: "Federal Medical Centre Abeokuta", Type: "Federal Medical Centre", Address: "Idi-Aba, Abeokuta" },
  { State: "Ogun", LGA: "All", Name: "Olabisi Onabanjo University Teaching Hospital", Type: "Teaching Hospital", Address: "Sagamu" },
  { State: "Ondo", LGA: "All", Name: "Federal Medical Centre Owo", Type: "Federal Medical Centre", Address: "Owo" },
  { State: "Osun", LGA: "All", Name: "Obafemi Awolowo University Teaching Hospitals Complex", Type: "Teaching Hospital", Address: "Ile-Ife" },
  { State: "Osun", LGA: "All", Name: "Osun State University Teaching Hospital", Type: "Teaching Hospital", Address: "Osogbo" },
  { State: "Oyo", LGA: "All", Name: "University College Hospital (UCH)", Type: "Teaching Hospital", Address: "Queen Elizabeth Road, Ibadan" },
  { State: "Plateau", LGA: "All", Name: "Jos University Teaching Hospital (JUTH)", Type: "Teaching Hospital", Address: "Lamingo, Jos" },
  { State: "Rivers", LGA: "All", Name: "University of Port Harcourt Teaching Hospital", Type: "Teaching Hospital", Address: "East-West Road, Port Harcourt" },
  { State: "Sokoto", LGA: "All", Name: "Usmanu Danfodiyo University Teaching Hospital", Type: "Teaching Hospital", Address: "Sokoto" },
  { State: "Taraba", LGA: "All", Name: "Federal Medical Centre Jalingo", Type: "Federal Medical Centre", Address: "Jalingo" },
  { State: "Yobe", LGA: "All", Name: "Federal Medical Centre Nguru", Type: "Federal Medical Centre", Address: "Nguru" },
  { State: "Yobe", LGA: "All", Name: "Yobe State University Teaching Hospital", Type: "Teaching Hospital", Address: "Damaturu" },
  { State: "Zamfara", LGA: "All", Name: "Federal Medical Centre Gusau", Type: "Federal Medical Centre", Address: "Gusau" },

  // --- PRIMARY HEALTH CENTRES (Community Level) ---
  // Abia
  { State: "Abia", LGA: "Aba North", Name: "Eziama Primary Health Centre", Type: "Primary Health Centre", Address: "Eziama Community, Aba North" },
  { State: "Abia", LGA: "Aba South", Name: "Aba South Primary Health Centre", Type: "Primary Health Centre", Address: "Township, Aba" },
  { State: "Abia", LGA: "Umuahia North", Name: "Umuahia Township Health Centre", Type: "Primary Health Centre", Address: "School Road, Umuahia" },
  
  // Adamawa
  { State: "Adamawa", LGA: "Yola North", Name: "Nassarawa Primary Health Centre", Type: "Primary Health Centre", Address: "Nassarawa Ward, Jimeta" },
  { State: "Adamawa", LGA: "Yola South", Name: "Bole Primary Health Centre", Type: "Primary Health Centre", Address: "Bole Community, Yola" },
  
  // Akwa Ibom
  { State: "Akwa Ibom", LGA: "Uyo", Name: "Wellington Bassey Way Health Centre", Type: "Primary Health Centre", Address: "Uyo Municipal" },
  { State: "Akwa Ibom", LGA: "Eket", Name: "Idua Health Centre", Type: "Primary Health Centre", Address: "Idua, Eket" },
  
  // Anambra
  { State: "Anambra", LGA: "Awka South", Name: "Amaku Primary Health Centre", Type: "Primary Health Centre", Address: "Awka" },
  { State: "Anambra", LGA: "Onitsha North", Name: "Inland Town Health Centre", Type: "Primary Health Centre", Address: "Inland Town, Onitsha" },

  // Bauchi
  { State: "Bauchi", LGA: "Bauchi", Name: "Kofar Ran Health Centre", Type: "Primary Health Centre", Address: "Bauchi City" },
  { State: "Bauchi", LGA: "Bauchi", Name: "Jahun Primary Health Centre", Type: "Primary Health Centre", Address: "Jahun, Bauchi" },
  
  // Bayelsa
  { State: "Bayelsa", LGA: "Yenagoa", Name: "Amarata Primary Health Centre", Type: "Primary Health Centre", Address: "Amarata, Yenagoa" },
  
  // Benue
  { State: "Benue", LGA: "Makurdi", Name: "Wadata Primary Health Centre", Type: "Primary Health Centre", Address: "Wadata, Makurdi" },
  
  // Borno
  { State: "Borno", LGA: "Maiduguri", Name: "Yerwa Primary Health Centre", Type: "Primary Health Centre", Address: "Yerwa, Maiduguri" },
  { State: "Borno", LGA: "Jere", Name: "Galtimari Primary Health Centre", Type: "Primary Health Centre", Address: "Galtimari" },
  
  // Cross River
  { State: "Cross River", LGA: "Calabar Municipal", Name: "Diamond Hill Health Centre", Type: "Primary Health Centre", Address: "Diamond Hill, Calabar" },
  
  // Delta
  { State: "Delta", LGA: "Warri South", Name: "Pessu Primary Health Centre", Type: "Primary Health Centre", Address: "Pessu, Warri" },
  { State: "Delta", LGA: "Asaba", Name: "Okwe Primary Health Centre", Type: "Primary Health Centre", Address: "Okwe, Asaba" },
  
  // Ebonyi
  { State: "Ebonyi", LGA: "Abakaliki", Name: "Azuiyiokwu Health Centre", Type: "Primary Health Centre", Address: "Azuiyiokwu, Abakaliki" },
  
  // Edo
  { State: "Edo", LGA: "Oredo", Name: "Oredo Primary Health Centre", Type: "Primary Health Centre", Address: "Benin City" },
  
  // Ekiti
  { State: "Ekiti", LGA: "Ado Ekiti", Name: "Okesa Comprehensive Health Centre", Type: "Primary Health Centre", Address: "Okesa, Ado Ekiti" },
  
  // Enugu
  { State: "Enugu", LGA: "Enugu North", Name: "Asata Medical Centre of Health", Type: "Primary Health Centre", Address: "Asata, Enugu" },
  
  // FCT
  { State: "FCT", LGA: "Municipal Area Council", Name: "Garki Village Clinic", Type: "Primary Health Centre", Address: "Garki Village" },
  { State: "FCT", LGA: "Municipal Area Council", Name: "Area 2 Primary Health Clinic", Type: "Primary Health Centre", Address: "Section 1, Garki" },
  { State: "FCT", LGA: "Bwari", Name: "Bwari Comprehensive Health Centre", Type: "Primary Health Centre", Address: "Bwari" },
  
  // Gombe
  { State: "Gombe", LGA: "Gombe", Name: "Pantami Primary Health Centre", Type: "Primary Health Centre", Address: "Pantami, Gombe" },
  
  // Imo
  { State: "Imo", LGA: "Owerri Municipal", Name: "Douglas Road Health Centre", Type: "Primary Health Centre", Address: "Owerri" },
  
  // Jigawa
  { State: "Jigawa", LGA: "Dutse", Name: "Takur Primary Health Centre", Type: "Primary Health Centre", Address: "Takur Site, Dutse" },
  
  // Kaduna
  { State: "Kaduna", LGA: "Kaduna North", Name: "Badarawa Primary Health Centre", Type: "Primary Health Centre", Address: "Badarawa, Kaduna" },
  { State: "Kaduna", LGA: "Kaduna South", Name: "Makera Primary Health Centre", Type: "Primary Health Centre", Address: "Makera, Kakuri" },
  
  // Kano
  { State: "Kano", LGA: "Kano Municipal", Name: "Marmara Primary Health Centre", Type: "Primary Health Centre", Address: "Marmara, Kano" },
  { State: "Kano", LGA: "Nassarawa", Name: "Gwagwarwa Primary Health Centre", Type: "Primary Health Centre", Address: "Gwagwarwa, Kano" },
  { State: "Kano", LGA: "Tarauni", Name: "Unguwa Uku Primary Health Centre", Type: "Primary Health Centre", Address: "Unguwa Uku, Kano" },
  
  // Katsina
  { State: "Katsina", LGA: "Katsina", Name: "Kofar Sauri Primary Health Centre", Type: "Primary Health Centre", Address: "Kofar Sauri, Katsina" },
  
  // Kebbi
  { State: "Kebbi", LGA: "Birnin Kebbi", Name: "Nassarawa Primary Health Centre", Type: "Primary Health Centre", Address: "Nassarawa, Birnin Kebbi" },
  
  // Kogi
  { State: "Kogi", LGA: "Lokoja", Name: "Kabawa Primary Health Centre", Type: "Primary Health Centre", Address: "Kabawa, Lokoja" },
  
  // Kwara
  { State: "Kwara", LGA: "Ilorin South", Name: "Fufu Primary Health Centre", Type: "Primary Health Centre", Address: "Fufu, Ilorin" },
  { State: "Kwara", LGA: "Ilorin West", Name: "Pakata Primary Health Centre", Type: "Primary Health Centre", Address: "Pakata, Ilorin" },
  
  // Lagos
  { State: "Lagos", LGA: "Ikeja", Name: "Ikeja Primary Health Centre", Type: "Primary Health Centre", Address: "Obafemi Awolowo Way, Ikeja" },
  { State: "Lagos", LGA: "Lagos Island", Name: "Sura Primary Health Centre", Type: "Primary Health Centre", Address: "Sura, Lagos Island" },
  { State: "Lagos", LGA: "Eti Osa", Name: "Ikota Primary Health Centre", Type: "Primary Health Centre", Address: "Ikota, Lekki-Epe Expressway" },
  { State: "Lagos", LGA: "Alimosho", Name: "Aboru Primary Health Centre", Type: "Primary Health Centre", Address: "Aboru, Alimosho" },
  { State: "Lagos", LGA: "Surulere", Name: "Akerele Primary Health Centre", Type: "Primary Health Centre", Address: "Akerele, Surulere" },
  { State: "Lagos", LGA: "Yaba", Name: "Yaba Primary Health Centre", Type: "Primary Health Centre", Address: "Yaba LCDA" },

  // Nasarawa
  { State: "Nasarawa", LGA: "Lafia", Name: "Millionaires Quarters PHC", Type: "Primary Health Centre", Address: "Lafia" },
  
  // Niger
  { State: "Niger", LGA: "Minna", Name: "Maitumbi Primary Health Centre", Type: "Primary Health Centre", Address: "Maitumbi, Minna" },
  
  // Ogun
  { State: "Ogun", LGA: "Abeokuta South", Name: "Ijaiye Primary Health Centre", Type: "Primary Health Centre", Address: "Ijaiye, Abeokuta" },
  
  // Ondo
  { State: "Ondo", LGA: "Akure South", Name: "Oke-Aro Primary Health Centre", Type: "Primary Health Centre", Address: "Oke-Aro, Akure" },
  
  // Osun
  { State: "Osun", LGA: "Osogbo", Name: "Oja-Oba Primary Health Centre", Type: "Primary Health Centre", Address: "Oja-Oba, Osogbo" },
  
  // Oyo
  { State: "Oyo", LGA: "Ibadan North", Name: "Agodi Gate Primary Health Centre", Type: "Primary Health Centre", Address: "Agodi, Ibadan" },
  { State: "Oyo", LGA: "Ibadan South-West", Name: "Aleshinloye Primary Health Centre", Type: "Primary Health Centre", Address: "Aleshinloye Market, Ibadan" },
  
  // Plateau
  { State: "Plateau", LGA: "Jos North", Name: "Tudun Wada Primary Health Centre", Type: "Primary Health Centre", Address: "Tudun Wada, Jos" },
  
  // Rivers
  { State: "Rivers", LGA: "Port Harcourt", Name: "Churchill Primary Health Centre", Type: "Primary Health Centre", Address: "Borokiri, Port Harcourt" },
  { State: "Rivers", LGA: "Obio/Akpor", Name: "Rumuigbo Primary Health Centre", Type: "Primary Health Centre", Address: "Rumuigbo" },
  
  // Sokoto
  { State: "Sokoto", LGA: "Sokoto North", Name: "Kofar Rini Primary Health Centre", Type: "Primary Health Centre", Address: "Kofar Rini" },
  
  // Taraba
  { State: "Taraba", LGA: "Jalingo", Name: "Mayo Gwoi Primary Health Centre", Type: "Primary Health Centre", Address: "Jalingo" },
  
  // Yobe
  { State: "Yobe", LGA: "Damaturu", Name: "Nayi-Nawa Primary Health Centre", Type: "Primary Health Centre", Address: "Damaturu" },
  
  // Zamfara
  { State: "Zamfara", LGA: "Gusau", Name: "Tudun Wada Health Centre", Type: "Primary Health Centre", Address: "Gusau" },
];
