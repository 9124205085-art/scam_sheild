export interface Sample {
  id: string
  label: string
  mode: 'message' | 'link' | 'phone'
  text: string
}

export const SAMPLES: Sample[] = [
  {
    id: 'arrest',
    label: 'Digital arrest',
    mode: 'message',
    text: 'This is Inspector Sharma from CBI. Your Aadhaar is linked to a money laundering case. You are under digital arrest. Do not tell your family. Install AnyDesk immediately and share the OTP sent to your phone to verify identity. Failure within 30 minutes will lead to a court warrant.',
  },
  {
    id: 'kyc',
    label: 'Fake KYC',
    mode: 'message',
    text: 'Dear Customer, your SBI KYC has expired. Update now at https://sbi-kyc-update.xyz to avoid account freeze within 24 hours. Share OTP to complete vkyc.',
  },
  {
    id: 'upi',
    label: 'UPI collect',
    mode: 'message',
    text: 'Your refund of Rs 8450 failed. Approve the UPI collect request or pay Rs 1 to 9876543210@paytm to verify your account. Enter UPI PIN to receive the refund.',
  },
  {
    id: 'parcel',
    label: 'Parcel fee',
    mode: 'message',
    text: 'FedEx: Your parcel is held at customs. Pay delivery fee of Rs 127 at http://bit.ly/fedex-in-pay or it will be returned today. Do not tell anyone until payment is done.',
  },
  {
    id: 'safe',
    label: 'Likely safe',
    mode: 'message',
    text: 'Hi Priya, I will be 10 minutes late to class. See you at the library near the main gate.',
  },
]
