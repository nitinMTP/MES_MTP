export const machines = [
  {
    name: "IMM-01",
    room: 6,
    type: "carpet",
    energyVariables: ["Nadelmaschine"],
    location: "MTP 1",
  },
];

export const rooms = [
  6, 19, 26, 27, 28, 52, 53, 54,
  // 101,
  106, 128, 157, 160,
];

export const types = [
  { type: "carpet", en: "Carpet Machine", de: "Teppichanlage" },
  { type: "forming", en: "Forming Machine", de: "Verformungsanlage" },
  { type: "punching", en: "Punching Machine", de: "Stanzanlage" },
  { type: "press", en: "Press Machine", de: "Pressanlage" },
  { type: "waterjet", en: "Waterjet Machine", de: "Waterjetanlage" },
  { type: "other", en: "Other Machine", de: "Sonstiges" },
];

export const facilities = [
  {
    name: "Plant Bocholt",
    energyVariables: [
      { name: "Werk-Bocholt", scale: 1.6, unit: "kWh" },
      { name: "111-St-01 Trafo 1", scale: 0.001, unit: "kWh" },
      { name: "111-St-01 Trafo 2", scale: 0.001, unit: "kWh" },
      { name: "111-St-01 Trafo 3", scale: 0.001, unit: "kWh" },
      { name: "199-St-04 Trafo 1", scale: 0.001, unit: "kWh" },
      { name: "199-St-04 Trafo 2", scale: 0.001, unit: "kWh" },
      { name: "199-St-04 Trafo 3", scale: 0.001, unit: "kWh" },
    ],
    compressedAirConsumption: [
      { name: "GA 110 Druckluft", scale: 1, unit: "Nm^3" },
      { name: "GA 160 Druckluft", scale: 1, unit: "Nm^3" },
      { name: "GA 75 Druckluft", scale: 1, unit: "Nm^3" },
    ],
    compressedAirEnergy: [
      { name: "GA 110 Energie", scale: 1, unit: "kWh" },
      { name: "GA 160 Energie", scale: 1, unit: "kWh" },
      { name: "GA 75 Energie", scale: 1, unit: "kWh" },
    ],
  },
];
