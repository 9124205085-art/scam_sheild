import type { LanguageCode, Verdict } from '../types'

export interface LangMeta {
  code: LanguageCode
  label: string
  native: string
  speech: string
}

export const LANGUAGES: LangMeta[] = [
  { code: 'en', label: 'English', native: 'English', speech: 'en-IN' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', speech: 'hi-IN' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்', speech: 'ta-IN' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు', speech: 'te-IN' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা', speech: 'bn-IN' },
  { code: 'mr', label: 'Marathi', native: 'मराठी', speech: 'mr-IN' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ', speech: 'kn-IN' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം', speech: 'ml-IN' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી', speech: 'gu-IN' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ', speech: 'pa-IN' },
]

const UI: Record<string, Partial<Record<LanguageCode, string>>> = {
  brand: { en: 'Scam Shield', hi: 'स्कैम शील्ड', ta: 'ஸ்காம் ஷீல்டு' },
  tagline: {
    en: 'Is this a scam?',
    hi: 'क्या यह स्कैम है?',
    ta: 'இது மோசடியா?',
  },
  checkBefore: {
    en: 'Paste a message, screenshot, link, or phone number. Scan. Green flag = safe. Red flag = danger.',
    hi: 'संदेश, स्क्रीनशॉट, लिंक या फ़ोन नंबर डालें। स्कैन करें। हरा = सुरक्षित। लाल = खतरा।',
    ta: 'செய்தி, ஸ்கிரீன்ஷாட், இணைப்பு அல்லது எண்ணை இடுங்கள். பச்சை = பாதுகாப்பு. சிவப்பு = ஆபத்து.',
  },
  paste: { en: 'Message', hi: 'संदेश', ta: 'செய்தி' },
  screenshot: { en: 'Screenshot', hi: 'स्क्रीनशॉट', ta: 'ஸ்கிரீன்ஷாட்' },
  link: { en: 'Link', hi: 'लिंक', ta: 'இணைப்பு' },
  phone: { en: 'Phone', hi: 'फ़ोन', ta: 'தொலைபேசி' },
  placeholderMessage: {
    en: 'Paste the SMS or WhatsApp message here…',
    hi: 'SMS या व्हाट्सऐप संदेश यहाँ चिपकाएँ…',
    ta: 'SMS அல்லது வாட்ஸ்அப் செய்தியை இங்கே ஒட்டவும்…',
  },
  placeholderLink: {
    en: 'https://…',
    hi: 'https://…',
    ta: 'https://…',
  },
  placeholderPhone: {
    en: 'Number that called or messaged you',
    hi: 'जिस नंबर ने कॉल या मैसेज किया',
    ta: 'அழைத்த அல்லது செய்தி அனுப்பிய எண்',
  },
  explainIn: { en: 'Explain in', hi: 'भाषा', ta: 'மொழி' },
  analyze: { en: 'Scan this', hi: 'जाँचें', ta: 'சரிபார்' },
  analyzing: { en: 'Scanning…', hi: 'जाँच हो रही है…', ta: 'சரிபார்க்கிறது…' },
  samples: { en: 'Try a sample', hi: 'नमूना आज़माएँ', ta: 'மாதிரியை முயற்சிக்கவும்' },
  privacyNote: {
    en: 'Nothing is sent to a WhatsApp group until you tap Share.',
    hi: 'शेयर दबाने तक कुछ भी व्हाट्सऐप ग्रुप में नहीं जाता।',
    ta: 'பகிர் என அழுத்தும் வரை வாட்ஸ்அப் குழுவுக்கு எதுவும் செல்லாது.',
  },
  emergency: { en: 'Already paid?', hi: 'पेमेंट हो गई?', ta: 'பணம் செலுத்திவிட்டீரா?' },
  back: { en: 'Back', hi: 'वापस', ta: 'திரும்பு' },
  verdict: { en: 'Result', hi: 'नतीजा', ta: 'முடிவு' },
  scam: { en: 'Red flag — scam', hi: 'लाल झंडा — स्कैम', ta: 'சிவப்புக் கொடி — மோசடி' },
  suspicious: { en: 'Yellow flag — be careful', hi: 'पीला झंडा — सावधान', ta: 'மஞ்சள் கொடி — கவனம்' },
  safe: { en: 'Green flag — safe', hi: 'हरा झंडा — सुरक्षित', ta: 'பச்சைக் கொடி — பாதுகாப்பு' },
  confidence: { en: 'confidence', hi: 'विश्वास', ta: 'நம்பகத்தன்மை' },
  rules: { en: 'Rules', hi: 'नियम', ta: 'விதிகள்' },
  ai: { en: 'AI', hi: 'एआई', ta: 'AI' },
  why: { en: 'Why', hi: 'क्यों', ta: 'ஏன்' },
  flags: { en: 'Warning signs', hi: 'चेतावनी', ta: 'எச்சரிக்கைகள்' },
  next: { en: 'What to do', hi: 'अब क्या करें', ta: 'என்ன செய்ய வேண்டும்' },
  listen: { en: 'Listen', hi: 'सुनें', ta: 'கேளுங்கள்' },
  stop: { en: 'Stop', hi: 'रोकें', ta: 'நிறுத்து' },
  family: { en: 'Share with family', hi: 'परिवार से शेयर करें', ta: 'குடும்பத்துடன் பகிரவும்' },
  familyHint: {
    en: 'Save this check, then share it to your family WhatsApp group.',
    hi: 'इस जाँच को सेव करें, फिर परिवार के व्हाट्सऐप ग्रुप में भेजें।',
    ta: 'இந்த சரிபார்ப்பை சேமித்து குடும்ப வாட்ஸ்அப் குழுவில் பகிரவும்.',
  },
  shareWhatsapp: { en: 'Share to WhatsApp group', hi: 'व्हाट्सऐप ग्रुप में भेजें', ta: 'வாட்ஸ்அப் குழுவில் பகிர்' },
  copyText: { en: 'Copy', hi: 'कॉपी', ta: 'நகலெடு' },
  saveImage: { en: 'Save', hi: 'सेव', ta: 'சேமி' },
  engine: { en: 'Hybrid engine', hi: 'हाइब्रिड इंजन', ta: 'கலப்பு இயந்திரம்' },
  engineBody: {
    en: 'Deterministic rules run first (lookalike domains, shorteners, punycode, urgency, OTP, remote apps). The LLM only reasons on top of that — and only sees masked text.',
    hi: 'पहले नियम चलते हैं (नकली डोमेन, शॉर्टनर, प्यूनीकोड, जल्दबाज़ी, OTP, रिमोट ऐप)। एआई उसके ऊपर सोचता है, और केवल मास्क किया टेक्स्ट देखता है।',
    ta: 'முதலில் விதிகள் இயங்கும். AI அதற்கு மேல் மட்டுமே பகுத்தறிகிறது; மறைக்கப்பட்ட உரையை மட்டுமே பார்க்கும்.',
  },
  masked: { en: 'Sent to AI (masked)', hi: 'AI को भेजा (मास्क्ड)', ta: 'AI-க்கு அனுப்பியது (மறைப்பு)' },
  noAi: {
    en: 'Rules-only mode. Add a Gemini API key to unlock AI reasoning.',
    hi: 'केवल नियम मोड। एआई के लिए Gemini कुंजी जोड़ें।',
    ta: 'விதிகள் மட்டும். AI-க்கு Gemini API விசை சேர்க்கவும்.',
  },
  ocrHint: {
    en: 'Tap to upload a screenshot',
    hi: 'स्क्रीनशॉट अपलोड करने के लिए टैप करें',
    ta: 'ஸ்கிரீன்ஷாட்டை பதிவேற்ற தட்டவும்',
  },
  reading: { en: 'Reading screenshot…', hi: 'स्क्रीनशॉट पढ़ा जा रहा है…', ta: 'ஸ்கிரீன்ஷாட்டைப் படிக்கிறது…' },
  how1: {
    en: '1. Choose Message, Screenshot, Link, or Phone',
    hi: '1. संदेश, स्क्रीनशॉट, लिंक या फ़ोन चुनें',
    ta: '1. செய்தி, ஸ்கிரீன்ஷாட், இணைப்பு அல்லது எண்',
  },
  how2: {
    en: '2. Tap Scan',
    hi: '2. स्कैन दबाएँ',
    ta: '2. ஸ்கேன் அழுத்தவும்',
  },
  how3: {
    en: '3. Green flag = safe. Red flag = danger. Then share to your WhatsApp group.',
    hi: '3. हरा = सुरक्षित। लाल = खतरा। फिर व्हाट्सऐप ग्रुप में शेयर करें।',
    ta: '3. பச்சை = பாதுகாப்பு. சிவப்பு = ஆபத்து. பின் வாட்ஸ்அப் குழுவில் பகிரவும்.',
  },
}

export function t(lang: LanguageCode, key: string): string {
  const row = UI[key]
  if (!row) return key
  return row[lang] ?? row.en ?? key
}

export function verdictLabel(lang: LanguageCode, verdict: Verdict): string {
  return t(lang, verdict)
}

type Pack = { explanation: string; nextSteps: string[] }

const PACKS: Record<string, Partial<Record<LanguageCode, Pack>>> = {
  digital_arrest: {
    en: {
      explanation:
        'This matches a “digital arrest” scam. Real police, CBI, or ED will never arrest you over WhatsApp, never ask you to install AnyDesk, and never demand OTP or cash to “clear a case”. Hang up. Do not install anything. Tell a family member.',
      nextSteps: [
        'Do not talk further or install remote apps.',
        'Call a family member and put the phone down.',
        'If you shared an OTP or AnyDesk, open Emergency mode now.',
        'Report at 1930 / cybercrime.gov.in (India).',
      ],
    },
    hi: {
      explanation:
        'यह “डिजिटल अरेस्ट” स्कैम जैसा है। असली पुलिस, CBI या ED व्हाट्सऐप पर गिरफ्तार नहीं करती, AnyDesk नहीं लगवाती, और केस क्लियर करने के लिए OTP या पैसे नहीं माँगती। फोन काटें। परिवार को बताएँ।',
      nextSteps: [
        'आगे बात न करें, कोई रिमोट ऐप न लगाएँ।',
        'परिवार को फोन करें।',
        'अगर OTP या AnyDesk दे दिया है तो इमरजेंसी मोड खोलें।',
        '1930 / cybercrime.gov.in पर रिपोर्ट करें।',
      ],
    },
    ta: {
      explanation:
        'இது “டிஜிட்டல் அரெஸ்ட்” மோசடி போல் உள்ளது. உண்மையான போலீஸ் வாட்ஸ்அப்பில் கைது செய்யாது, AnyDesk போடச் சொல்லாது, OTP அல்லது பணம் கேட்காது. அழைப்பை துண்டியுங்கள். குடும்பத்தினரிடம் சொல்லுங்கள்.',
      nextSteps: [
        'தொடர்ந்து பேச வேண்டாம்; ரிமோட் ஆப் நிறுவ வேண்டாம்.',
        'குடும்பத்தினரை அழைங்கள்.',
        'OTP அல்லது AnyDesk கொடுத்திருந்தால் அவசரப் பயன்முறையைத் திறக்கவும்.',
        '1930 / cybercrime.gov.in இல் புகார் அளிக்கவும்.',
      ],
    },
  },
  kyc: {
    en: {
      explanation:
        'Banks do not send KYC links over SMS that expire in 24 hours. A real KYC update happens inside the official app or branch — never via a random link, and never by sharing OTP.',
      nextSteps: [
        'Do not tap the link.',
        'Open your bank app yourself (not from the message).',
        'If unsure, call the number on the back of your debit card.',
        'Warn family: fake KYC SMS are common.',
      ],
    },
    hi: {
      explanation:
        'बैंक 24 घंटे में खत्म होने वाले KYC लिंक SMS पर नहीं भेजते। असली KYC बैंक ऐप या शाखा में होता है — अजनबी लिंक या OTP से नहीं।',
      nextSteps: [
        'लिंक न खोलें।',
        'बैंक ऐप खुद खोलें (मैसेज से नहीं)।',
        'शक हो तो डेबिट कार्ड के पीछे लिखे नंबर पर कॉल करें।',
        'परिवार को नकली KYC के बारे में बताएँ।',
      ],
    },
    ta: {
      explanation:
        'வங்கிகள் 24 மணி நேரத்தில் முடியும் KYC இணைப்புகளை SMS-ல் அனுப்புவதில்லை. உண்மையான KYC அதிகாரப்பூர்வ ஆப் அல்லது கிளையில் மட்டுமே.',
      nextSteps: [
        'இணைப்பைத் தட்ட வேண்டாம்.',
        'வங்கி ஆப்பை நீங்களே திறக்கவும்.',
        'சந்தேகம் இருந்தால் டெபிட் கார்டின் பின்புற எண்ணை அழைக்கவும்.',
        'போலி KYC பற்றி குடும்பத்தினருக்கு எச்சரிக்கவும்.',
      ],
    },
  },
  parcel: {
    en: {
      explanation:
        'Courier companies do not ask you to pay customs on a random short link. Fake “parcel held” texts steal card details or UPI.',
      nextSteps: [
        'Ignore the link and do not pay.',
        'Track only on the official FedEx / DHL / India Post site you type yourself.',
        'If you paid, use Emergency mode.',
      ],
    },
    hi: {
      explanation: 'कूरियर कंपनियाँ कस्टम ड्यूटी शॉर्ट लिंक पर नहीं लेतीं। नकली पार्सल SMS से पैसे निकलवाए जाते हैं।',
      nextSteps: ['लिंक न खोलें, पैसे न दें।', 'आधिकारिक साइट पर खुद ट्रैक करें।', 'पेमेंट हो गया हो तो इमरजेंसी मोड खोलें।'],
    },
    ta: {
      explanation: 'கூரியர் நிறுவனங்கள் சுருக்க இணைப்பில் கஸ்டம்ஸ் கட்டணம் கேட்பதில்லை. இது பணம் திருடும் தந்திரம்.',
      nextSteps: ['இணைப்பைப் புறக்கணிக்கவும்.', 'அதிகாரப்பூர்வ தளத்திலேயே ட்ராக் செய்யவும்.', 'பணம் செலுத்தியிருந்தால் அவசரப் பயன்முறை.'],
    },
  },
  job: {
    en: {
      explanation:
        'Real employers do not ask for a registration or training fee on WhatsApp. “Pay to start earning” is a scam.',
      nextSteps: [
        'Do not pay any joining fee.',
        'Never share Aadhaar or bank screenshots with a job page.',
        'Search the company on the Ministry of Corporate Affairs site if it claims to be registered.',
      ],
    },
    hi: {
      explanation: 'सच्ची नौकरी व्हाट्सऐप पर रजिस्ट्रेशन फीस नहीं माँगती। पैसे देकर जॉइन करना स्कैम है।',
      nextSteps: ['कोई फीस न दें।', 'आधार/बैंक स्क्रीनशॉट न भेजें।', 'कंपनी का नाम जाँचें।'],
    },
    ta: {
      explanation: 'உண்மையான வேலை வாட்ஸ்அப்பில் பதிவுக் கட்டணம் கேட்காது. பணம் கட்டி சேர்வது மோசடி.',
      nextSteps: ['கட்டணம் செலுத்த வேண்டாம்.', 'ஆதார்/வங்கி படம் அனுப்ப வேண்டாம்.', 'நிறுவனத்தைத் தேடிச் சரிபார்க்கவும்.'],
    },
  },
  upi: {
    en: {
      explanation:
        'A UPI collect request pulls money from you. Refunds never need you to “pay ₹1 to verify”. If someone asks you to enter UPI PIN to receive money, it is a scam.',
      nextSteps: [
        'Decline any collect request you did not start.',
        'Do not enter UPI PIN to receive a refund.',
        'In the UPI app, check the request direction: collect vs pay.',
        'If you already paid, freeze UPI in the app and open Emergency mode.',
      ],
    },
    hi: {
      explanation:
        'UPI कलेक्ट रिक्वेस्ट आपसे पैसे खींचती है। रिफंड के लिए ₹1 देना या पिन डालना स्कैम है।',
      nextSteps: ['अनजान कलेक्ट को रिजेक्ट करें।', 'पैसे लेने के लिए PIN न डालें।', 'पेमेंट हो गया हो तो UPI फ्रीज करें।'],
    },
    ta: {
      explanation:
        'UPI கலெக்ட் கோரிக்கை உங்களிடமிருந்து பணத்தை இழுக்கும். ரீஃபண்டிற்கு ₹1 செலுத்துவதோ PIN போடுவதோ மோசடி.',
      nextSteps: ['தெரியாத கலெக்டை நிராகரிக்கவும்.', 'பணம் பெற PIN போட வேண்டாம்.', 'ஏற்கனவே செலுத்தினால் UPI-ஐ முடக்குங்கள்.'],
    },
  },
  otp: {
    en: {
      explanation:
        'OTP is a key to your account. Banks, courier firms, and police will never ask you to read it out. Anyone who asks for OTP already wants to empty the account.',
      nextSteps: [
        'Do not share the OTP.',
        'If you already shared it, call your bank freeze line now.',
        'Change UPI PIN and app passwords.',
      ],
    },
    hi: {
      explanation: 'OTP आपकी खाता-चाबी है। बैंक या पुलिस OTP नहीं माँगते। जिसने माँगा वह पैसे निकालना चाहता है।',
      nextSteps: ['OTP न बताएँ।', 'बता दिया हो तो बैंक फ्रीज नंबर पर कॉल करें।', 'UPI PIN बदलें।'],
    },
    ta: {
      explanation: 'OTP உங்கள் கணக்கின் திறவுகோல். வங்கி அல்லது போலீஸ் OTP கேட்காது.',
      nextSteps: ['OTP பகிர வேண்டாம்.', 'பகிர்ந்திருந்தால் வங்கியை அழைத்து முடக்குங்கள்.', 'UPI PIN மாற்றுங்கள்.'],
    },
  },
  remote_access: {
    en: {
      explanation:
        'AnyDesk, TeamViewer and similar apps let a stranger tap your screen. Once installed, they can approve UPI payments. Uninstall immediately and tell family.',
      nextSteps: [
        'Uninstall AnyDesk / TeamViewer / UltraViewer.',
        'Turn off the phone’s remote-access settings.',
        'Call the bank if they watched a payment.',
      ],
    },
    hi: {
      explanation: 'AnyDesk जैसी ऐप से कोई आपकी स्क्रीन चला सकता है और UPI मंज़ूर कर सकता है। तुरंत डिलीट करें।',
      nextSteps: ['रिमोट ऐप हटाएँ।', 'पेमेंट हुई हो तो बैंक को कॉल करें।'],
    },
    ta: {
      explanation: 'AnyDesk போன்ற ஆப் மற்றவர் உங்கள் திரையை இயக்க உதவும். உடனே நீக்கவும்.',
      nextSteps: ['ரிமோட் ஆப்பை நீக்குங்கள்.', 'பணம் சென்றிருந்தால் வங்கியை அழைங்கள்.'],
    },
  },
  phishing_link: {
    en: {
      explanation:
        'The link does not match the real bank or brand site. Lookalike spellings, extra words like “-kyc”, and shorteners are classic phishing. Type the official site yourself.',
      nextSteps: [
        'Do not tap the link.',
        'Type the brand name into Google yourself and use the official result.',
        'Never enter a password on a page that arrived by SMS.',
      ],
    },
    hi: {
      explanation: 'यह लिंक असली बैंक/ब्रांड साइट नहीं है। गलत स्पेलिंग, “-kyc” और शॉर्टनर फिशिंग हैं।',
      nextSteps: ['लिंक न खोलें।', 'आधिकारिक साइट खुद टाइप करें।', 'SMS वाले पेज पर पासवर्ड न डालें।'],
    },
    ta: {
      explanation: 'இந்த இணைப்பு உண்மையான வங்கி/பிராண்டு தளம் அல்ல. போலி எழுத்துக்களும் சுருக்க இணைப்புகளும் ஃபிஷிங்.',
      nextSteps: ['இணைப்பைத் தட்ட வேண்டாம்.', 'அதிகாரப்பூர்வ தளத்தை நீங்களே தட்டச்சு செய்யவும்.'],
    },
  },
  prize: {
    en: {
      explanation: 'Unexpected prizes that need a fee, KYC, or OTP are fake. You cannot win a lottery you never entered.',
      nextSteps: ['Do not pay to claim a prize.', 'Do not share KYC photos.', 'Delete the message.'],
    },
    hi: {
      explanation: 'अचानक इनाम जिसमें फीस, KYC या OTP लगे — नकली है।',
      nextSteps: ['इनाम के लिए पैसे न दें।', 'KYC फोटो न भेजें।'],
    },
    ta: {
      explanation: 'திடீர் பரிசுக்கு கட்டணம், KYC அல்லது OTP தேவைப்பட்டால் அது பொய்.',
      nextSteps: ['பரிசுக்குப் பணம் செலுத்த வேண்டாம்.', 'KYC புகைப்படம் அனுப்ப வேண்டாம்.'],
    },
  },
  generic: {
    en: {
      explanation:
        'Several scam patterns showed up in this text. Treat it as hostile until you verify using an official app or a number you already had — not a number from the message.',
      nextSteps: [
        'Do not tap links or call back unknown numbers.',
        'Verify using the official app or the number on your card.',
        'Forward a Family Shield warning if this was sent to relatives.',
      ],
    },
    hi: {
      explanation: 'इस टेक्स्ट में स्कैम के कई संकेत हैं। मैसेज वाले नंबर से नहीं, आधिकारिक ऐप से जाँचें।',
      nextSteps: ['लिंक न खोलें।', 'आधिकारिक ऐप से पुष्टि करें।', 'परिवार को वॉर्निंग फॉरवर्ड करें।'],
    },
    ta: {
      explanation: 'இந்த உரையில் மோசடி அறிகுறிகள் உள்ளன. செய்தியில் வரும் எண்ணை நம்ப வேண்டாம்.',
      nextSteps: ['இணைப்பைத் தட்ட வேண்டாம்.', 'அதிகாரப்பூர்வ ஆப்பில் சரிபார்க்கவும்.', 'குடும்பத்தினருக்கு எச்சரிக்கை அனுப்பவும்.'],
    },
  },
  safe: {
    en: {
      explanation:
        'No strong scam markers were found. Still skip unexpected payment links, and never share OTP — even with someone you think you know if the request feels odd.',
      nextSteps: [
        'If money or OTP is requested, scan again with the full message.',
        'Keep Family Shield handy for relatives.',
      ],
    },
    hi: {
      explanation: 'मज़बूत स्कैम संकेत नहीं मिले। फिर भी अचानक पेमेंट लिंक और OTP से बचें।',
      nextSteps: ['पैसे या OTP माँगे जाएँ तो पूरा मैसेज फिर जाँचें।'],
    },
    ta: {
      explanation: 'வலுவான மோசடி அறிகுறி இல்லை. இருந்தாலும் OTP பகிர வேண்டாம்.',
      nextSteps: ['பணம் அல்லது OTP கேட்டால் முழு செய்தியையும் மீண்டும் சரிபார்க்கவும்.'],
    },
  },
  urgency: {
    en: {
      explanation:
        'The message pushes you to act before you can think. Urgency plus a request for money, OTP, or a link is a standard social-engineering pattern.',
      nextSteps: [
        'Pause. Scams rely on panic.',
        'Call the organisation on a number from their official site.',
        'Do not use contact details inside the message.',
      ],
    },
  },
}

function translatePack(lang: LanguageCode, type: string): Pack {
  const row = PACKS[type] ?? PACKS.generic
  return row[lang] ?? row.en ?? PACKS.generic.en!
}

export function localNarrative(
  lang: LanguageCode,
  scamType: string,
  verdict: Verdict,
  hitLabels: string[],
): Pack {
  const key = verdict === 'safe' ? 'safe' : scamType
  const pack = translatePack(lang, key)
  if (hitLabels.length && lang === 'en' && verdict !== 'safe') {
    return {
      explanation: `${pack.explanation} Flags: ${hitLabels.slice(0, 4).join('; ')}.`,
      nextSteps: pack.nextSteps,
    }
  }
  return pack
}

export function familyShareText(
  lang: LanguageCode,
  verdict: Verdict,
  explanation: string,
  originalText: string,
  inputMode?: string,
): string {
  const v = verdictLabel(lang, verdict)
  const kind =
    inputMode === 'screenshot'
      ? 'screenshot'
      : inputMode === 'link'
        ? 'link'
        : inputMode === 'phone'
          ? 'phone number'
          : 'message'
  const snippet = originalText.replace(/\s+/g, ' ').trim().slice(0, 280)
  const intros: Partial<Record<LanguageCode, string>> = {
    en: `Scam Shield check — ${v}\n\nI scanned this ${kind}:\n${snippet}`,
    hi: `स्कैम शील्ड जाँच — ${v}\n\nमैंने यह ${kind} स्कैन किया:\n${snippet}`,
    ta: `ஸ்காம் ஷீல்டு சரிபார்ப்பு — ${v}\n\nநான் இந்த ${kind}-ஐ சரிபார்த்தேன்:\n${snippet}`,
  }
  const footers: Partial<Record<LanguageCode, string>> = {
    en: 'Sharing this with our family WhatsApp group. Do not tap unknown links or share OTP.',
    hi: 'यह परिवार के व्हाट्सऐप ग्रुप में शेयर कर रहा/रही हूँ। अनजान लिंक न खोलें, OTP न दें।',
    ta: 'இதை குடும்ப வாட்ஸ்அப் குழுவில் பகிர்கிறேன். தெரியாத இணைப்பைத் தட்ட வேண்டாம், OTP கொடுக்க வேண்டாம்.',
  }
  return `${intros[lang] ?? intros.en}\n\n${explanation}\n\n${footers[lang] ?? footers.en}`
}
