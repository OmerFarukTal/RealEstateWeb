import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          "Sign in": "Sign in",
          "Sign up": "Sign up",
          "Admin Sign up": "Admin Sign up", 
          "Admin Credential": "Admin Credential",
          "Welcome": "Welcome to our application!",
          "Description": "This is an example of react-i18next integration.",
          "Dashboard": "Dashboard",
          "User Name": "User Name",
          "Password": "Password",
          "Don't have an account? Sign Up": "Don't have an account? Sign Up",
          "Already have an account? Sign in": "Already have an account? Sign in",
          "Email Address": "Email Address"
        }
      },
      tr: {
        translation: {
          "Sign in": "Giriş yap",
          "Sign up": "Kayıt ol",
          "Admin Sign up": "Yönetici kayıt",
          "Admin Credential": "Admin Özel Kodu",
          "Welcome": "Uygulamamıza hoş geldiniz!",
          "Description": "Bu, react-i18next entegrasyonunun bir örneğidir.",
          "Dashboard": "Gösterge Paneli",
          "User Name": "Kullanıcı Adı",
          "Password": "Şifre",
          "Don't have an account? Sign Up": "Hesabınız yok mu? Kayıt Olun",
          "Already have an account? Sign in": "Zaten bir hesabınız var mı? Giriş yapın",
          "Email Address": "E-mail Adresi"
        }
      }
    }
  });


export default i18n;
