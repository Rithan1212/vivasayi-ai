/**
 * Gemini AI service.
 *
 * In production the FastAPI backend should proxy this call so the API key
 * never reaches the browser. For the demo we support either:
 *   1. VITE_GEMINI_API_KEY set at build time → real Gemini call
 *   2. No key → graceful, deterministic offline expert simulation
 */

export interface AdvisoryAnswer {
  problem: string;
  reason: string;
  solution: string;
  precautions: string[];
  language: "en" | "ta";
}

const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

function buildPrompt(question: string, language: "en" | "ta") {
  const lang = language === "ta" ? "Tamil" : "English";
  return `You are VIVASAYI, an expert agricultural advisor for Indian farmers.
A farmer has asked the following question. Reply ONLY in ${lang}.

Farmer's question:
"""${question}"""

Respond strictly as JSON with this exact shape and nothing else:
{
  "problem": "Short one-line description of the problem.",
  "reason": "2-4 sentence explanation of the most likely cause.",
  "solution": "Practical, step-by-step solution the farmer can apply within a week. Include affordable/organic options first.",
  "precautions": ["Short bullet 1", "Short bullet 2", "Short bullet 3", "Short bullet 4"]
}

Do NOT wrap the JSON in markdown fences. Do NOT include any extra commentary.`;
}

function tryParseJson(text: string): Partial<AdvisoryAnswer> | null {
  // Strip markdown fences if the model returned them.
  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
  // Find first { ... } block
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) return null;
  try {
    return JSON.parse(cleaned.slice(start, end + 1));
  } catch {
    return null;
  }
}

export async function askGemini(
  question: string,
  language: "en" | "ta"
): Promise<AdvisoryAnswer> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

  if (!apiKey) {
    // Offline simulated expert mode
    return simulateAnswer(question, language);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  try {
    const res = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: buildPrompt(question, language) }] }],
        generationConfig: { temperature: 0.4, maxOutputTokens: 800 },
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      throw new Error(`Gemini API error ${res.status}: ${errText.slice(0, 200)}`);
    }

    const data = await res.json();
    const text: string =
      data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("") ??
      "";

    const parsed = tryParseJson(text);
    if (!parsed || !parsed.problem) {
      // Fall back to wrapping the raw text
      return {
        problem: language === "ta" ? "ஆலோசனை" : "Advisory",
        reason: text.slice(0, 400) || (language === "ta" ? "விளக்கம் கிடைக்கவில்லை." : "No detail."),
        solution: text.slice(400, 1200) || "",
        precautions: [],
        language,
      };
    }
    return {
      problem: parsed.problem ?? "",
      reason: parsed.reason ?? "",
      solution: parsed.solution ?? "",
      precautions: Array.isArray(parsed.precautions) ? parsed.precautions.slice(0, 6) : [],
      language,
    };
  } catch (err) {
    if ((err as Error).name === "AbortError") {
      throw new Error(
        language === "ta"
          ? "சேவையகம் பதிலளிக்க அதிக நேரம் ஆனது. மீண்டும் முயற்சிக்கவும்."
          : "The AI took too long to respond. Please try again."
      );
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

/* ----------------------------- Offline expert ----------------------------- */

interface KB {
  keywords: string[];
  en: AdvisoryAnswer;
  ta: AdvisoryAnswer;
}

const KNOWLEDGE: KB[] = [
  {
    keywords: ["tomato", "yellow", "leaf", "leaves", "தக்காளி", "மஞ்சள்", "இலை"],
    en: {
      problem: "Yellowing of tomato leaves (chlorosis).",
      reason:
        "The most common causes are nitrogen deficiency, overwatering leading to root suffocation, or early blight infection. Sudden yellowing of lower leaves usually points to a nutrient issue, while spotted yellow patches indicate fungal disease.",
      solution:
        "1) Inspect the soil — if it is soggy, reduce watering and improve drainage. 2) Apply a nitrogen-rich organic input such as well-rotted cow manure (1 kg per plant) or a 19:19:19 NPK foliar spray (5 g/L) once a week. 3) If you see dark concentric spots, spray neem oil 3% or copper oxychloride (3 g/L) every 7 days for 2–3 cycles. 4) Mulch around the base to keep soil moisture stable.",
      precautions: [
        "Water early in the morning, not in the evening.",
        "Do not wet the foliage while irrigating.",
        "Remove and burn infected leaves — never compost them.",
        "Rotate tomato with non-solanaceous crops every season.",
      ],
      language: "en",
    },
    ta: {
      problem: "தக்காளி இலைகள் மஞ்சளாக மாறுகின்றன (குளோரோசிஸ்).",
      reason:
        "பெரும்பாலும் இது நைட்ரஜன் குறைபாடு, அதிக நீர் பாய்ச்சுதலால் வேர் மூச்சுத் திணறல், அல்லது ஆரம்ப பிளைட் (early blight) தொற்று காரணமாக ஏற்படுகிறது. கீழ் இலைகளில் மஞ்சள் நிறம் தோன்றினால் ஊட்டச்சத்து குறை; புள்ளிகளுடன் இருந்தால் பூஞ்சை தொற்று.",
      solution:
        "1) மண் ஈரப்பதத்தை சரிபார்க்கவும் — அதிக ஈரமாக இருந்தால் நீர் குறைக்கவும். 2) நன்கு உளுத்த மாட்டுச் சாணம் (1 கிலோ/செடி) அல்லது 19:19:19 NPK இலையில் தெளிப்பு (5 கி/லிட்டர்) வாரம் ஒருமுறை பயன்படுத்தவும். 3) கருத்த வட்டப் புள்ளிகள் இருந்தால் வேப்ப எண்ணெய் 3% அல்லது காப்பர் ஆக்ஸிகுளோரைடு (3 கி/லிட்டர்) 7 நாட்களுக்கு ஒருமுறை 2–3 முறை தெளிக்கவும். 4) செடி அடியில் மல்ச் (உலர் இலைகள்) போடவும்.",
      precautions: [
        "காலையில் மட்டும் நீர் ஊற்றவும், மாலையில் தவிர்க்கவும்.",
        "இலைகள் மீது நீர் தெளிக்க வேண்டாம்.",
        "பாதிக்கப்பட்ட இலைகளை எரிக்கவும், கம்போஸ்ட் செய்ய வேண்டாம்.",
        "ஒவ்வொரு பருவத்திலும் பயிர் சுழற்சி பின்பற்றவும்.",
      ],
      language: "ta",
    },
  },
  {
    keywords: ["paddy", "rice", "blast", "நெல்", "அரிசி"],
    en: {
      problem: "Possible rice blast or nitrogen burn in paddy.",
      reason:
        "Diamond-shaped grey lesions on leaves indicate rice blast (Magnaporthe oryzae). Excess urea, dense planting and prolonged leaf wetness increase risk.",
      solution:
        "Spray Tricyclazole 75% WP @ 0.6 g/L or organic Pseudomonas fluorescens @ 10 g/L at first symptom. Drain the field for 2 days, then re-flood to 2–3 cm. Skip the next nitrogen top-dressing.",
      precautions: [
        "Avoid over-application of nitrogen fertiliser.",
        "Maintain proper plant spacing (20×15 cm).",
        "Use resistant varieties like CO-51 or ADT-43 next season.",
        "Treat seeds with carbendazim before sowing.",
      ],
      language: "en",
    },
    ta: {
      problem: "நெல்லில் பிளாஸ்ட் நோய் அல்லது நைட்ரஜன் எரிச்சல்.",
      reason:
        "இலைகளில் வைரம் வடிவ சாம்பல் புள்ளிகள் தோன்றினால் அது நெல் பிளாஸ்ட் நோய் (Magnaporthe oryzae). அதிக யூரியா, நெருக்கமான நடவு, நீண்ட நேர இலை ஈரம் ஆகியவை இதை அதிகரிக்கும்.",
      solution:
        "டிரைசைக்ளசோல் 75% WP @ 0.6 கி/லிட்டர் அல்லது சூடோமோனாஸ் ஃப்ளோரசன்ஸ் @ 10 கி/லிட்டர் முதல் அறிகுறி தோன்றியவுடன் தெளிக்கவும். வயலை 2 நாட்கள் வடிகட்டி பின் 2–3 செ.மீ. வரை மீண்டும் நிரப்பவும். அடுத்த நைட்ரஜன் இடுபொருளை தவிர்க்கவும்.",
      precautions: [
        "நைட்ரஜன் உரத்தை அதிகமாக பயன்படுத்த வேண்டாம்.",
        "20×15 செ.மீ. சரியான இடைவெளியில் நடவு செய்யவும்.",
        "அடுத்த பருவத்தில் CO-51 அல்லது ADT-43 போன்ற எதிர்ப்புத்தன்மை கொண்ட வகைகளை பயன்படுத்தவும்.",
        "விதைகளை கார்பெண்டசிம் கொண்டு சுத்திகரிக்கவும்.",
      ],
      language: "ta",
    },
  },
  {
    keywords: ["pest", "insect", "aphid", "பூச்சி", "வண்டு"],
    en: {
      problem: "Sap-sucking insect attack (likely aphids or whiteflies).",
      reason:
        "Curled leaves, sticky honeydew and ants on the plant indicate aphid colonies on tender shoots. They multiply quickly in warm, dry weather and can transmit viruses.",
      solution:
        "Spray neem oil 5 ml/L + 1 ml liquid soap, in the early morning, for 3 consecutive days. Release ladybird beetles if available. For heavy infestation use Imidacloprid 17.8% SL @ 0.3 ml/L, only once, observing a 7-day harvest gap.",
      precautions: [
        "Inspect the underside of leaves every 3 days.",
        "Install yellow sticky traps (10 per acre).",
        "Avoid excess nitrogen which produces soft, attractive new growth.",
        "Encourage natural predators — do not spray broad-spectrum insecticides.",
      ],
      language: "en",
    },
    ta: {
      problem: "சாறு உறிஞ்சும் பூச்சித் தாக்குதல் (மா/வெள்ளை ஈ).",
      reason:
        "இலைகள் சுருண்டு, ஒட்டும் தேன்பனி, எறும்புகள் காணப்பட்டால் இளம் தளிர்களில் மா பூச்சிகள் (aphids) உள்ளன. வெப்பமான வறண்ட காலநிலையில் வேகமாக பெருகி வைரஸ் நோய்களை பரப்பும்.",
      solution:
        "வேப்ப எண்ணெய் 5 மி.லி/லிட்டர் + 1 மி.லி திரவ சோப்பு கலந்து காலையில் 3 நாட்களுக்கு தொடர்ந்து தெளிக்கவும். குறைவாக இருந்தால் வண்டு பறவை (ladybird) விடவும். அதிக தாக்கம் இருந்தால் இமிடாக்ளோபிரிட் 17.8% SL @ 0.3 மி.லி/லிட்டர் ஒரு முறை மட்டும், 7 நாள் அறுவடை இடைவெளியுடன் பயன்படுத்தவும்.",
      precautions: [
        "3 நாட்களுக்கு ஒருமுறை இலை அடிப்பகுதி பரிசோதிக்கவும்.",
        "ஒரு ஏக்கருக்கு 10 மஞ்சள் ஒட்டும் பொறிகள் வைக்கவும்.",
        "அதிக நைட்ரஜன் தவிர்க்கவும் — அது மென்மையான தளிர்களை உருவாக்கி பூச்சிகளை ஈர்க்கும்.",
        "இயற்கை எதிரிகளை பாதுகாக்கவும் — பரந்த நிறமாலை பூச்சிக்கொல்லியை தவிர்க்கவும்.",
      ],
      language: "ta",
    },
  },
];

const GENERIC_EN: AdvisoryAnswer = {
  problem: "General agricultural advisory",
  reason:
    "Based on your question, a few common factors could be at play — soil health, irrigation schedule, nutrient balance, and seasonal pests. A site inspection is always best, but here is a safe general plan.",
  solution:
    "1) Test soil pH (target 6.0–7.0 for most crops). 2) Apply well-rotted farmyard manure 5 t/acre at land preparation. 3) Follow a 7–10 day irrigation interval depending on weather. 4) Scout the field twice a week and act early on any pest signs using neem-based sprays first.",
  precautions: [
    "Always read pesticide labels and use protective gear.",
    "Keep records of inputs and observations for each plot.",
    "Consult your local Krishi Vigyan Kendra for area-specific advice.",
    "Do not mix multiple chemicals without confirming compatibility.",
  ],
  language: "en",
};
const GENERIC_TA: AdvisoryAnswer = {
  problem: "பொது வேளாண் ஆலோசனை",
  reason:
    "உங்கள் கேள்வியின் அடிப்படையில் — மண் ஆரோக்கியம், நீர்ப்பாசன கால அட்டவணை, ஊட்டச்சத்து சமநிலை மற்றும் பருவகால பூச்சிகள் காரணமாக இருக்கலாம். நேரடி களப்பார்வை சிறந்தது, ஆனால் இது பாதுகாப்பான பொதுவான திட்டம்.",
  solution:
    "1) மண் pH சோதனை செய்யவும் (பெரும்பாலான பயிர்களுக்கு 6.0–7.0). 2) நிலம் தயாரிக்கும் போது 5 டன்/ஏக்கர் நன்கு உளுத்த தொழு உரம் இடவும். 3) வானிலையை பொறுத்து 7–10 நாள் இடைவெளியில் நீர் பாய்ச்சவும். 4) வாரம் இரண்டு முறை வயலை பரிசோதித்து, பூச்சி அறிகுறிகள் தோன்றியவுடன் வேப்ப அடிப்படையிலான தெளிப்புகளை பயன்படுத்தவும்.",
  precautions: [
    "பூச்சிக்கொல்லி பயன்படுத்தும் போது பாதுகாப்பு உபகரணங்களை அணியவும்.",
    "ஒவ்வொரு வயலுக்கும் இடுபொருள் & கண்காணிப்பு பதிவுகள் வைக்கவும்.",
    "உங்கள் பகுதி கிருஷி விக்யான் கேந்திராவை அணுகவும்.",
    "பல ரசாயனங்களை சோதனை செய்யாமல் கலக்க வேண்டாம்.",
  ],
  language: "ta",
};

async function simulateAnswer(question: string, language: "en" | "ta"): Promise<AdvisoryAnswer> {
  // Simulate latency so the typing animation feels real
  await new Promise((r) => setTimeout(r, 900 + Math.random() * 600));
  const q = question.toLowerCase();
  for (const item of KNOWLEDGE) {
    if (item.keywords.some((k) => q.includes(k.toLowerCase()))) {
      return language === "ta" ? item.ta : item.en;
    }
  }
  return language === "ta" ? GENERIC_TA : GENERIC_EN;
}
