import { HelpOffice } from '@/types';

export const HELP_OFFICES_DATA: HelpOffice[] = [
  {
    id: 'off-ramanagara-1',
    district: 'Ramanagara',
    districtKannada: 'ರಾಮನಗರ',
    officeName: 'Raitha Samparka Kendra (RSK) - Magadi Hobli',
    address: 'Near Old Bus Stand, Magadi Town, Ramanagara District',
    pincode: '562120',
    workingHours: '10:00 AM - 5:30 PM (Mon-Sat, 2nd & 4th Sat Holidays)',
    phone: '080-27745230',
    email: 'ada.magadi.agri@karnataka.gov.in',
    servicesProvided: [
      'FRUITS Farmer ID (FID) enrollment & biometric verification',
      'Raitha Siri minor millet subsidy registration & crop audit',
      'Soil health card sampling collection',
      'Certified Ragi seeds distribution (ML-365, GPU-28 varieties)'
    ],
    dataSourceNote: 'Verified with Karnataka State Agriculture Directory 2025-26 (Office of JDA Ramanagara)'
  },
  {
    id: 'off-ramanagara-2',
    district: 'Ramanagara',
    districtKannada: 'ರಾಮನಗರ',
    officeName: 'Office of the Assistant Director of Agriculture (ADA) - Channapatna',
    address: 'Mini Vidhana Soudha Complex, B.M. Road, Channapatna',
    pincode: '562160',
    workingHours: '10:00 AM - 5:30 PM (Mon-Sat)',
    phone: '080-27251340',
    servicesProvided: [
      'Krishi Bhagya farm pond subsidy work orders',
      'Tarpaulin and sprinkler subsidy distribution',
      'PM-KISAN bank rejection & DBT re-seeding assistance',
      'Micro-irrigation subsidy processing'
    ],
    dataSourceNote: 'Verified with Karnataka State Agriculture Directory 2025-26'
  },
  {
    id: 'off-bengaluru-rural-1',
    district: 'Bengaluru Rural',
    districtKannada: 'ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ',
    officeName: 'Raitha Samparka Kendra - Nelamangala',
    address: 'APMC Yard Premises, B.H. Road, Nelamangala',
    pincode: '562123',
    workingHours: '10:00 AM - 5:30 PM (Mon-Sat)',
    phone: '080-27722180',
    email: 'ada.nelamangala@karnataka.gov.in',
    servicesProvided: [
      'FRUITS FID updates & land survey hissa addition',
      'Bele Samikshe farmer grievance resolution desk',
      'Custom hiring centre farm machinery bookings',
      'Organic farming input subsidy'
    ],
    dataSourceNote: 'Verified with Bengaluru Rural District Agriculture Department Records 2025'
  },
  {
    id: 'off-mandya-1',
    district: 'Mandya',
    districtKannada: 'ಮಂಡ್ಯ',
    officeName: 'Raitha Samparka Kendra - Maddur Central',
    address: 'Near Taluk Panchayat Office, Maddur Town',
    pincode: '571428',
    workingHours: '10:00 AM - 5:30 PM (Mon-Sat)',
    phone: '08232-232240',
    servicesProvided: [
      'PM-KISAN land seeding & eKYC biometric center',
      'Raitha Siri millet incentive documentation',
      'Sugar cane and paddy crop insurance claim helpdesk',
      'Fertilizer grievance redressal'
    ],
    dataSourceNote: 'Verified with Mandya District Joint Director of Agriculture Desk'
  },
  {
    id: 'off-kolar-1',
    district: 'Kolar',
    districtKannada: 'ಕೋಲಾರ',
    officeName: 'Raitha Samparka Kendra - Srinivasapura',
    address: 'Opposite Sub-Registrar Office, Srinivasapura Taluk, Kolar',
    pincode: '563135',
    workingHours: '10:00 AM - 5:30 PM (Mon-Sat)',
    phone: '08157-246220',
    servicesProvided: [
      'Krishi Bhagya farm pond applications (Priority dryland zone)',
      'FRUITS ID mutation and RTC linkage',
      'Drip irrigation subsidy approvals for mango & ragi farmers',
      'Drought compensation disbursement queries'
    ],
    dataSourceNote: 'Verified with Kolar District Agriculture Office Directory 2025-26'
  },
  {
    id: 'off-tumakuru-1',
    district: 'Tumakuru',
    districtKannada: 'ತುಮಕೂರು',
    officeName: 'Raitha Samparka Kendra - Koratagere Hobli',
    address: 'Court Road, Koratagere Town, Tumakuru District',
    pincode: '572129',
    workingHours: '10:00 AM - 5:30 PM (Mon-Sat)',
    phone: '08138-232110',
    servicesProvided: [
      'Raitha Siri millet subsidy field verification',
      'Groundnut & Ragi certified seed subsidy',
      'FRUITS portal registration',
      'PM-KISAN NPCI Aadhaar bank status checks'
    ],
    dataSourceNote: 'Tumakuru District Agricultural Support Directory 2025'
  },
  {
    id: 'off-mysuru-1',
    district: 'Mysuru',
    districtKannada: 'ಮೈಸೂರು',
    officeName: 'Office of the Assistant Director of Agriculture - Hunsur',
    address: 'Near Old Bus Stand, Hunsur Town, Mysuru',
    pincode: '571105',
    workingHours: '10:00 AM - 5:30 PM (Mon-Sat)',
    phone: '08222-252030',
    servicesProvided: [
      'FRUITS registration & tribal farmer sub-plan assistance',
      'Paddy and ragi crop insurance helpdesk (Samrakshane)',
      'Soil health analysis and zinc/gypsum distribution'
    ],
    dataSourceNote: 'Mysuru District JDA Portal'
  },
  {
    id: 'off-chikkaballapura-1',
    district: 'Chikkaballapura',
    districtKannada: 'ಚಿಕ್ಕಬಳ್ಳಾಪುರ',
    officeName: 'Raitha Samparka Kendra - Sidlaghatta',
    address: 'Bagepalli Road, Sidlaghatta Town, Chikkaballapura',
    pincode: '562105',
    workingHours: '10:00 AM - 5:30 PM (Mon-Sat)',
    phone: '08158-255140',
    servicesProvided: [
      'Krishi Bhagya pond lining inspections',
      'Sericulture and ragi inter-cropping advisory',
      'FRUITS portal Bhoomi linkings'
    ],
    dataSourceNote: 'Chikkaballapura Agriculture Directorate Directory'
  }
];

export const KARNATAKA_DISTRICTS = [
  'All Districts',
  'Bengaluru Rural',
  'Bengaluru Urban',
  'Chikkaballapura',
  'Kolar',
  'Mandya',
  'Mysuru',
  'Ramanagara',
  'Tumakuru',
  'Hassan',
  'Chitradurga',
  'Davanagere',
  'Shivamogga',
  'Belagavi',
  'Kalaburagi'
];
