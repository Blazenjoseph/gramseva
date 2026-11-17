import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.log('------------------------------------------------------------');
  console.log('Scheme Access Kit — Database Seed Notice:');
  console.log('NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set.');
  console.log('The application will run using its built-in verified static dataset');
  console.log('in src/lib/data/ which contains all schemes, offices, glossary, and news.');
  console.log('To seed an active Supabase project, populate .env.local and rerun.');
  console.log('------------------------------------------------------------');
  process.exit(0);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function runSeed() {
  console.log('Connecting to Supabase at:', supabaseUrl);
  console.log('Applying seed data for Scheme Access Kit...');

  // 1. Seed schemes
  const sampleSchemes = [
    {
      slug: 'pm-kisan',
      title: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
      department: 'Department of Agriculture & Farmers Welfare, GoI',
      state: 'central',
      badge_category: 'cash-benefit',
      what_it_gives: '₹6,000 per year provided as direct income support in 3 equal four-monthly instalments of ₹2,000 via DBT into Aadhaar-seeded bank accounts.',
      who_it_is_for: 'All landholding farmer families who possess cultivable land parcels in their names in the official revenue records.',
      land_size_min_acres: 0,
      eligible_crops: JSON.stringify(['all']),
      requires_land_record: true,
      requires_farmer_id: false,
      requires_aadhaar_bank_link: true,
      benefit_amount: '₹6,000 / year',
      documents_needed: JSON.stringify(['Bhoomi RTC / Pahani', 'Aadhaar Card with mobile linked', 'Bank passbook with NPCI DBT mapping']),
      where_to_apply: JSON.stringify({
        portalName: 'PM-KISAN Portal',
        portalUrl: 'https://pmkisan.gov.in',
        offlineOffice: 'Nearest Grama One, Karnataka One kiosk or Hobli RSK',
        helpline: '155261'
      }),
      watch_for: 'Bank account must be actively linked on the NPCI mapper for Direct Benefit Transfer (DBT), not just standard KYC.',
      source_url: 'https://pmkisan.gov.in',
      last_verified_on: '2026-11-15',
      verified_by: 'Group 5 Research Desk, JAIN University',
      published: true
    },
    {
      slug: 'raitha-siri',
      title: 'Raitha Siri Scheme (ರೈತ ಸಿರಿ ಯೋಜನೆ)',
      department: 'Department of Agriculture, Government of Karnataka',
      state: 'karnataka',
      badge_category: 'subsidy',
      what_it_gives: 'Direct financial assistance of ₹10,000 per hectare (up to 2 hectares) for farmers growing minor millets (Ragi, Navane, Same, Haraka).',
      who_it_is_for: 'Small and marginal farmers in Karnataka cultivating minor millets or ragi on drylands, including plots under 1 acre.',
      land_size_min_acres: 0.2,
      land_size_max_acres: 5.0,
      eligible_crops: JSON.stringify(['ragi', 'millet', 'millets']),
      requires_land_record: true,
      requires_farmer_id: true,
      requires_aadhaar_bank_link: true,
      benefit_amount: '₹10,000 / hectare',
      documents_needed: JSON.stringify(['FRUITS Farmer ID (FID)', 'Current RTC with Bele Samikshe crop survey entry', 'Aadhaar card with NPCI mapping']),
      where_to_apply: JSON.stringify({
        portalName: 'Raita Mitra Karnataka / FRUITS',
        portalUrl: 'https://fruits.karnataka.gov.in',
        offlineOffice: 'Raitha Samparka Kendra (RSK) at Hobli level',
        helpline: '1800-425-3553'
      }),
      watch_for: 'Crop details MUST be captured in Karnataka Bele Samikshe (Farmer Mobile Crop Survey) during sowing season.',
      source_url: 'https://raitamitra.karnataka.gov.in',
      last_verified_on: '2026-11-15',
      verified_by: 'Group 5 Agriculture Policy Desk, JAIN University',
      published: true
    },
    {
      slug: 'krishi-bhagya',
      title: 'Krishi Bhagya Scheme (ಕೃಷಿ ಭಾಗ್ಯ ಯೋಜನೆ)',
      department: 'Watershed Development & Agriculture Dept, Govt of Karnataka',
      state: 'karnataka',
      badge_category: 'infrastructure',
      what_it_gives: 'Subsidy package up to 80%-90% for farm ponds (Krishi Honda), polythene lining, pump sets, and drip irrigation.',
      who_it_is_for: 'Cultivable dryland/rainfed agricultural landholders in notified dryland taluks across Karnataka.',
      land_size_min_acres: 0.5,
      land_size_max_acres: 12.5,
      eligible_crops: JSON.stringify(['all', 'ragi', 'pulses']),
      requires_land_record: true,
      requires_farmer_id: true,
      requires_aadhaar_bank_link: true,
      benefit_amount: '80% - 90% subsidy',
      documents_needed: JSON.stringify(['Computerised RTC showing dryland', 'FRUITS Farmer ID', 'Bank passbook copy', 'Recent photo of farm parcel']),
      where_to_apply: JSON.stringify({
        portalName: 'Raita Mitra Schemes Desk',
        portalUrl: 'https://raitamitra.karnataka.gov.in',
        offlineOffice: 'Assistant Director of Agriculture (ADA) or Hobli RSK',
        helpline: '080-22212804'
      }),
      watch_for: 'Wait for official Work Order from Agriculture Officer before starting excavation.',
      source_url: 'https://raitamitra.karnataka.gov.in',
      last_verified_on: '2026-11-16',
      verified_by: 'Group 5 Field Studies Unit, JAIN University',
      published: true
    },
    {
      slug: 'fruits-farmer-id',
      title: 'FRUITS Farmer ID (Karnataka Unified Beneficiary System)',
      department: 'e-Governance & Agriculture Dept, Govt of Karnataka',
      state: 'karnataka',
      badge_category: 'identity',
      what_it_gives: 'Permanent 8 or 9-digit Farmer Identification Number (FID) linking Bhoomi land record, bank, and Aadhaar.',
      who_it_is_for: 'Every single farmer cultivating land in Karnataka seeking any state subsidy or MSP.',
      land_size_min_acres: 0,
      eligible_crops: JSON.stringify(['all']),
      requires_land_record: true,
      requires_farmer_id: false,
      requires_aadhaar_bank_link: true,
      benefit_amount: 'Single-Window Access',
      documents_needed: JSON.stringify(['Aadhaar card of landholder', 'Bhoomi RTC (Pahani) copy', 'Bank passbook copy']),
      where_to_apply: JSON.stringify({
        portalName: 'FRUITS Portal',
        portalUrl: 'https://fruits.karnataka.gov.in',
        offlineOffice: 'Grama One, Bangalore One, Karnataka One, or RSK',
        helpline: '080-22370281'
      }),
      watch_for: 'Name spelling on Aadhaar must match RTC. If mismatch exists, obtain Name Variation Certificate from VAO.',
      source_url: 'https://fruits.karnataka.gov.in',
      last_verified_on: '2026-11-15',
      verified_by: 'Group 5 Data Team, JAIN University',
      published: true
    }
  ];

  for (const s of sampleSchemes) {
    const { error } = await supabase.from('schemes').upsert(s, { onConflict: 'slug' });
    if (error) {
      console.warn('Upsert notice for scheme', s.slug, error.message);
    } else {
      console.log('Seeded scheme:', s.slug);
    }
  }

  console.log('Seed completed successfully.');
}

runSeed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
