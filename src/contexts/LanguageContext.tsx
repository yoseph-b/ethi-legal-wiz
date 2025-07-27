import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'am';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    'header.title': 'EthioLegal AI',
    'header.subtitle': 'Ethiopian Legal Assistant',
    'header.findLawyer': 'Find Lawyer',
    'header.signOut': 'Sign Out',
    'header.signIn': 'Sign In',
    
    // Hero Section
    'hero.badge': 'Ethiopian Legal AI Assistant',
    'hero.title': 'Get Instant Legal Guidance for Ethiopian Law',
    'hero.description': 'Access professional legal information and guidance on Ethiopian law through our AI-powered assistant. Get answers to your legal questions 24/7.',
    'hero.startConsultation': 'Start Legal Consultation',
    'hero.learnMore': 'Learn More',
    
    // Features
    'features.availability.title': '24/7 Availability',
    'features.availability.description': 'Get legal guidance anytime, anywhere. Our AI assistant is available around the clock.',
    'features.ethiopianLaw.title': 'Ethiopian Law Focus',
    'features.ethiopianLaw.description': 'Specialized knowledge of Ethiopian legal system, procedures, and regulations.',
    'features.security.title': 'Confidential & Secure',
    'features.security.description': 'Your legal questions are handled with complete confidentiality and security.',
    
    // Chat
    'chat.back': 'Back',
    'chat.legalChat': 'Legal Chat',
    'chat.ethiopianLaw': 'Ethiopian Law',
    'chat.placeholder': 'Ask your legal question here...',
    'chat.thinking': 'Thinking...',
    'chat.greeting': `Hello! I'm your Ethiopian Legal AI Assistant. I'm here to help you with questions about {category}. Please note that this is for informational purposes only and doesn't replace professional legal advice. How can I help you today?`,
    'chat.error': `I apologize, but I'm having trouble connecting to the legal database. Please try again in a moment, or consult with a qualified Ethiopian lawyer for immediate assistance.`,
    
    // Categories
    'categories.title': 'Legal Categories',
    'categories.description': 'Choose a legal category to get specific guidance',
    'categories.askQuestions': 'Ask Questions',
    
    // Language
    'language.english': 'English',
    'language.amharic': 'አማርኛ'
  },
  am: {
    // Header
    'header.title': 'ኢትዮሊጋል AI',
    'header.subtitle': 'የኢትዮጵያ ህግ አማካሪ',
    'header.findLawyer': 'ጠበቃ ማግኛ',
    'header.signOut': 'መውጣት',
    'header.signIn': 'መግባት',
    
    // Hero Section
    'hero.badge': 'የኢትዮጵያ ህግ AI አማካሪ',
    'hero.title': 'ለኢትዮጵያ ህግ ፈጣን ህጋዊ መመሪያ ያግኙ',
    'hero.description': 'በAI የሚነዳ አማካሪያችን በኩል የኢትዮጵያ ህግ ላይ ፕሮፌሽናል ህጋዊ መረጃ እና መመሪያ ያግኙ። በ24/7 የህግ ጥያቄዎችዎን መልስ ያግኙ።',
    'hero.startConsultation': 'ህጋዊ ምክክር ጀምር',
    'hero.learnMore': 'ተጨማሪ እወቅ',
    
    // Features
    'features.availability.title': '24/7 ተደራሽነት',
    'features.availability.description': 'በማንኛውም ጊዜ፣ በማንኛውም ቦታ ህጋዊ መመሪያ ያግኙ። የእኛ AI አማካሪ በጊዜ ዙሪያ ይገኛል።',
    'features.ethiopianLaw.title': 'የኢትዮጵያ ህግ ትኩረት',
    'features.ethiopianLaw.description': 'የኢትዮጵያ ህግ ሥርዓት፣ ሂደቶች እና ደንቦች ላይ ልዩ እውቀት።',
    'features.security.title': 'ሚስጥራዊ እና ደህንነቱ የተጠበቀ',
    'features.security.description': 'የህግ ጥያቄዎችዎ በሙሉ ሚስጥራዊነት እና ደህንነት ይስተናገዳሉ።',
    
    // Chat
    'chat.back': 'ወደ ኋላ',
    'chat.legalChat': 'ህጋዊ ውይይት',
    'chat.ethiopianLaw': 'የኢትዮጵያ ህግ',
    'chat.placeholder': 'የህግ ጥያቄዎን እዚህ ይጠይቁ...',
    'chat.thinking': 'እያሰብኩ ነው...',
    'chat.greeting': `ሰላም! እኔ የኢትዮጵያ ህግ AI አማካሪዎ ነኝ። ስለ {category} ጥያቄዎች ለመርዳት እዚህ ነኝ። ይህ ለመረጃ ዓላማ ብቻ እንደሆነ እና ፕሮፌሽናል ህጋዊ ምክርን እንደማይተካ እባክዎ ልብ ይበሉ። ዛሬ እንዴት ልረዳዎት ይችላል?`,
    'chat.error': `ይቅርታ፣ ነገር ግን ከህጋዊ ዳታቤዙ ጋር ለመገናኘት ችግር አጋጥሞኛል። እባክዎ በአንድ ደቂቃ ውስጥ እንደገና ይሞክሩ፣ ወይም ለፈጣን እርዳታ ባለሙያ የኢትዮጵያ ጠበቃን ያማክሩ።`,
    
    // Categories
    'categories.title': 'የህግ ዓይነቶች',
    'categories.description': 'ልዩ መመሪያ ለማግኘት የህግ ምድብ ይምረጡ',
    'categories.askQuestions': 'ጥያቄዎች ይጠይቁ',
    
    // Language
    'language.english': 'English',
    'language.amharic': 'አማርኛ'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};