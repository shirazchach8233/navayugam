export const CARD_FIELDS = [
  { key: "dob", label: "Date of Birth", ml: "ജന്മതീയതി", defaultOn: true },
  { key: "blood_group", label: "Blood Group", ml: "രക്ത ഗ്രൂപ്പ്", defaultOn: true },
  { key: "passport_number", label: "Passport Number", ml: "പാസ്‌പോർട്ട് നമ്പർ", defaultOn: true },
  { key: "mobile", label: "Mobile", ml: "മൊബൈൽ", defaultOn: true },
  { key: "unit_area", label: "Unit, Area", ml: "യൂണിറ്റ്, മേഖല", defaultOn: true },
  { key: "email", label: "Email", ml: "ഇ-മെയിൽ", defaultOn: false },
  { key: "unit", label: "Unit", ml: "യൂണിറ്റ്", defaultOn: false },
  { key: "job", label: "Job", ml: "ജോലി", defaultOn: false },
  { key: "native_contact", label: "Native Contact", ml: "നാട്ടിലെ കോൺടാക്റ്റ്", defaultOn: false },
  { key: "district", label: "District", ml: "ജില്ല", defaultOn: false },
  { key: "assembly_mandalam", label: "Assembly Mandalam", ml: "അസംബ്ലി മണ്ഡലം", defaultOn: false },
  { key: "iqama_number", label: "Iqama Number", ml: "ഇഖാമ നമ്പർ", defaultOn: false },
  { key: "working_zone", label: "Working Zone", ml: "വർക്കിംഗ് സോൺ", defaultOn: false },
  { key: "parliament_mandalam", label: "Parliament Mandalam", ml: "പാർലമെന്റ് മണ്ഡലം", defaultOn: false },
] as const;

export type CardFieldKey = (typeof CARD_FIELDS)[number]["key"];

export const CARD_SIZES = {
  cr80: { label: "CR80 (85.6 × 54 mm)", widthMm: 85.6, heightMm: 53.98 },
  cr100: { label: "CR100 (105 × 74 mm)", widthMm: 105, heightMm: 74 },
} as const;

export type CardSizeKey = keyof typeof CARD_SIZES;
