
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';

// Function to fetch translations from the server
const fetchTranslations = async (lang) => {
    try {
        const response = await fetch(`http://localhost:4000/translations?lang=${lang}`);
        if (!response.ok) {
            throw new Error('Failed to fetch translations');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching translations:', error);
        return {};
    }
};

// Initialize i18n
const initI18n = async () => {
    const enTranslations = await fetchTranslations('en');
    const esTranslations = await fetchTranslations('es');
    const koTranslations = await fetchTranslations('ko');

    i18n.use(initReactI18next).init({
        resources: {
            en: { translation: enTranslations },
            es: { translation: esTranslations },
            ko: { translation: koTranslations }

        },
        lng: 'en', // Default language
        fallbackLng: 'en', // Fallback language
        interpolation: {
            escapeValue: false // React already handles escaping
        }
    });
};

initI18n();

export default i18n;