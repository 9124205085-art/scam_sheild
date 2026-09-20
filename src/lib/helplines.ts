import type { CountryHelp } from '../types'

export const COUNTRIES: CountryHelp[] = [
  {
    code: 'IN',
    name: 'India',
    helpline: '1930',
    helplineLabel: 'National Cybercrime Helpline 1930',
    reportUrl: 'https://cybercrime.gov.in',
    reportLabel: 'cybercrime.gov.in',
    extra: 'If money just left via UPI, call your bank freeze number immediately, then 1930.',
  },
  {
    code: 'US',
    name: 'United States',
    helpline: '1-877-438-4338',
    helplineLabel: 'FTC Identity Theft 1-877-IDTHEFT',
    reportUrl: 'https://www.ic3.gov',
    reportLabel: 'ic3.gov',
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    helpline: '0300 123 2040',
    helplineLabel: 'Action Fraud 0300 123 2040',
    reportUrl: 'https://www.actionfraud.police.uk',
    reportLabel: 'actionfraud.police.uk',
  },
  {
    code: 'SG',
    name: 'Singapore',
    helpline: '1800-722-6688',
    helplineLabel: 'ScamShield / Police 1800-722-6688',
    reportUrl: 'https://www.scamshield.gov.sg',
    reportLabel: 'scamshield.gov.sg',
  },
  {
    code: 'AU',
    name: 'Australia',
    helpline: '1300 795 395',
    helplineLabel: 'Scamwatch / ReportCyber',
    reportUrl: 'https://www.cyber.gov.au',
    reportLabel: 'cyber.gov.au',
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    helpline: '800-2121',
    helplineLabel: 'UAE Cybercrime 800-2121',
    reportUrl: 'https://www.dubaipolice.gov.ae',
    reportLabel: 'Dubai Police e-crime',
  },
  {
    code: 'CA',
    name: 'Canada',
    helpline: '1-888-495-8501',
    helplineLabel: 'Canadian Anti-Fraud Centre',
    reportUrl: 'https://www.antifraudcentre-centreantifraude.ca',
    reportLabel: 'antifraudcentre.ca',
  },
  {
    code: 'NG',
    name: 'Nigeria',
    helpline: '09-290-0694',
    helplineLabel: 'EFCC / national cybercrime desk',
    reportUrl: 'https://www.nfiu.gov.ng',
    reportLabel: 'Report via NFIU / EFCC',
  },
]

export function countryByCode(code: string): CountryHelp {
  return COUNTRIES.find((c) => c.code === code) ?? COUNTRIES[0]
}
