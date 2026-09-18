// Every AI line and UI label lives here in all 3 languages.
// Swap this file's questions[] for a real LLM call later — the rest of the
// app doesn't need to change, it just reads whatever text this returns.

export const LANGS = [
  { code: "mr", voice: "mr-IN", label: "मराठी", sub: "Marathi" },
  { code: "hi", voice: "hi-IN", label: "हिंदी", sub: "Hindi" },
  { code: "en", voice: "en-IN", label: "English", sub: "English" },
];

export const UI = {
  chooseLanguage: { mr: "भाषा निवडा", hi: "भाषा चुनें", en: "Choose your language" },
  chooseLanguageSub: { mr: "तुम्हाला हवी ती भाषा टॅप करा", hi: "अपनी पसंदीदा भाषा चुनें", en: "Tap the language you're comfortable with" },
  continueBtn: { mr: "पुढे जा", hi: "आगे बढ़ें", en: "Continue" },
  consentTitle: { mr: "तुमची संमती", hi: "आपकी सहमति", en: "Your privacy, your choice" },
  consentPlay: { mr: "ऐकण्यासाठी टॅप करा", hi: "सुनने के लिए टैप करें", en: "Tap to hear this" },
  consentText: {
    mr: "आम्ही तुमची माहिती फक्त डॉक्टरांना उपचारासाठी दाखवू. तुम्ही केव्हाही परवानगी काढून घेऊ शकता.",
    hi: "हम आपकी जानकारी केवल इलाज के लिए डॉक्टर को दिखाएँगे। आप कभी भी सहमति वापस ले सकते हैं।",
    en: "We'll only share your information with your doctor, for your treatment. You can withdraw consent anytime.",
  },
  consentAgree: { mr: "मी माझी माहिती डॉक्टरांशी शेअर करण्यास सहमत आहे", hi: "मैं अपनी जानकारी डॉक्टर के साथ साझा करने के लिए सहमत हूँ", en: "I agree to share my information with my doctor" },
  interviewTitle: { mr: "तुम्हाला काय त्रास आहे ते सांगा", hi: "बताइए आपको क्या तकलीफ़ है", en: "Tell us what's wrong" },
  interviewSub: { mr: "बोला किंवा टॅप करा — मी ऐकत आहे", hi: "बोलें या टैप करें — मैं सुन रहा हूँ", en: "Speak or tap — I'm listening" },
  listening: { mr: "ऐकत आहे...", hi: "सुन रहा है...", en: "Listening..." },
  tapToSpeak: { mr: "बोलण्यासाठी दाबून ठेवा", hi: "बोलने के लिए दबाकर रखें", en: "Hold to speak" },
  docScanTitle: { mr: "जुने अहवाल स्कॅन करा", hi: "पुराने रिपोर्ट स्कैन करें", en: "Scan old records" },
  docScanSub: { mr: "जुने प्रिस्क्रिप्शन असल्यास कॅमेऱ्यासमोर धरा", hi: "पुराना प्रिस्क्रिप्शन हो तो कैमरे के सामने रखें", en: "Show any prior prescription or report to the camera" },
  scanBtn: { mr: "स्कॅन करा", hi: "स्कैन करें", en: "Scan a document" },
  scanning: { mr: "स्कॅन करत आहे...", hi: "स्कैन हो रहा है...", en: "Scanning..." },
  skipDocs: { mr: "काहीही नाही, पुढे जा", hi: "कुछ नहीं, आगे बढ़ें", en: "I don't have any, continue" },
  generateSummary: { mr: "सारांश तयार करा", hi: "सारांश तैयार करें", en: "Generate my summary" },
  summaryTitle: { mr: "डॉक्टरांसाठी तयार सारांश", hi: "डॉक्टर के लिए तैयार सारांश", en: "Doctor-ready summary" },
  summaryGenerating: { mr: "माहिती एकत्र करत आहे...", hi: "जानकारी तैयार की जा रही है...", en: "Structuring clinical history..." },
  summaryFooter: { mr: "हा AI-निर्मित मसुदा आहे — डॉक्टर पडताळणी करतील.", hi: "यह AI-जनित मसौदा है — डॉक्टर सत्यापित करेंगे।", en: "AI-drafted — doctor will review and confirm before saving." },
  restart: { mr: "पुन्हा सुरू करा", hi: "फिर से शुरू करें", en: "Start over" },
};

// The 5-question script (SOCRATES-style), plus one optional 6th hook
// into the document-scan screen. Linear — no branching needed for the demo.
export const QUESTIONS = [
  {
    id: "complaint",
    text: { mr: "आज तुम्हाला काय त्रास होत आहे?", hi: "आज आपको क्या तकलीफ़ है?", en: "What's bothering you today?" },
  },
  {
    id: "onset",
    text: { mr: "हे केव्हापासून सुरू आहे?", hi: "यह कब से हो रहा है?", en: "Since when have you had this?" },
  },
  {
    id: "character",
    text: { mr: "हा त्रास सतत आहे, की मध्येच येतो आणि जातो?", hi: "क्या यह लगातार है, या बीच-बीच में आता-जाता है?", en: "Is it constant, or does it come and go?" },
  },
  {
    id: "modifiers",
    text: {
      mr: "काही केल्याने बरं वाटतं किंवा जास्त त्रास होतो का — जसं की विश्रांती, जेवण, किंवा हालचाल?",
      hi: "क्या कुछ करने से बेहतर या बदतर महसूस होता है — जैसे आराम करना, खाना, या हिलना-डुलना?",
      en: "Does anything make it better or worse — like resting, eating, or moving?",
    },
  },
  {
    id: "history",
    text: {
      mr: "आधी काही आजार होता का, किंवा सध्या काही औषधं घेत आहात का?",
      hi: "क्या पहले कोई बीमारी थी, या फ़िलहाल कोई दवा ले रहे हैं?",
      en: "Any past medical conditions, or medicines you're currently taking?",
    },
  },
  {
    id: "docs",
    text: {
      mr: "तुमच्याकडे जुनी प्रिस्क्रिप्शन किंवा रिपोर्ट्स आहेत का?",
      hi: "क्या आपके पास पुराने प्रिस्क्रिप्शन या रिपोर्ट हैं?",
      en: "Do you have any old prescriptions or reports to show me?",
    },
  },
];

export const CLOSING_LINE = {
  mr: "धन्यवाद — आता तुमचा अहवाल डॉक्टरांसाठी तयार करत आहोत.",
  hi: "धन्यवाद — अब आपकी रिपोर्ट डॉक्टर के लिए तैयार की जा रही है।",
  en: "Thank you — generating your summary for the doctor now.",
};

// Demo summary shown at the end (would come from a real LLM call in production)
export const DEMO_SUMMARY = {
  complaint: {
    mr: "मुख्य तक्रार: छातीत दुखणे, आजपासून सकाळ पासून",
    hi: "मुख्य शिकायत: सीने में दर्द, आज सुबह से",
    en: "Chief Complaint: Chest pain, since this morning",
  },
  history: {
    mr: "हृदयाचा जुना आजार नाही असे सांगितले",
    hi: "पहले से दिल की कोई बीमारी नहीं बताई गई",
    en: "No prior cardiac history reported",
  },
  meds: {
    mr: "सध्याचे औषध: Atorvastatin 10mg (जुन्या प्रिस्क्रिप्शनवरून)",
    hi: "वर्तमान दवा: Atorvastatin 10mg (पुराने प्रिस्क्रिप्शन से)",
    en: "Current Medication: Atorvastatin 10mg (from scanned prescription)",
  },
  allergy: {
    mr: "कोणतीही ऍलर्जी नोंदवली नाही",
    hi: "कोई एलर्जी दर्ज नहीं",
    en: "Allergies: None reported",
  },
};
