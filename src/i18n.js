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
          "Real Estate": "Real Estate",
          "Sign in": "Sign in",
          "Sign up": "Sign up",
          "Admin Sign up": "Admin Sign up", 
          "Admin Credential": "Admin Credential",
          "Welcome": "Welcome to our application!",
          "Description": "This is an example of react-i18next integration.",
          "Dashboard": "Dashboard",
          "Property": "Property",
          "My Properties": "My Properties",
          "On Map": "On Map",
          "User Name": "User Name",
          "Password": "Password",
          "Don't have an account? Sign Up": "Don't have an account? Sign Up",
          "Already have an account? Sign in": "Already have an account? Sign in",
          "Email Address": "Email Address",

          "All Types": "All Types",
          "All Statuses": "All Statuses",
          "All Currencies": "All Currencies",
          "Lower Price": "Lower Price",
          "Upper Price": "Upper Price",
          "Start Date": "Start Date",
          "End Date": "End Date",

          "View Details": "View Details",
          "Contact Agent": "Contact Agent",
          "Edit Property": "Edit Property",
          "Delete Property": "Delete Property",

          "Property Type and Statuses Percentage": "Property Type and Statuses Percentage",
          "Daily Property Added": "Daily Property Added",
          "All Roles" : "All Roles",
          "All Translations": "All Translations",

          "Add": "Add",
          "Delete": "Delete",
          "Edit": "Edit"

        }
      },
      tr: {
        translation: {
          "Real Estate": "Emlak",
          "Sign in": "Giriş yap",
          "Sign up": "Kayıt ol",
          "Admin Sign up": "Yönetici kayıt",
          "Admin Credential": "Admin Özel Kodu",
          "Welcome": "Uygulamamıza hoş geldiniz!",
          "Description": "Bu, react-i18next entegrasyonunun bir örneğidir.",
          "Dashboard": "Gösterge Paneli",
          "Property": "Mülk",
          "My Properties": "Mülklerim",
          "On Map": "Harita",
          "User Name": "Kullanıcı Adı",
          "Password": "Şifre",
          "Don't have an account? Sign Up": "Hesabınız yok mu? Kayıt Olun",
          "Already have an account? Sign in": "Zaten bir hesabınız var mı? Giriş yapın",
          "Email Address": "E-mail Adresi",


          "All Types": "Bütün Tipler",
          "All Statuses": "Bütün Durumlar",
          "All Currencies": "Bütün Para Türleri",
          "Lower Price": "Taban Fiyat",
          "Upper Price": "Tavan Fiyat",
          "Start Date": "Başlangıç Tarihi",
          "End Date": "Bitiş Tarihi",

          "View Details": "Detayları Gör",
          "Contact Agent": "Mülk Sahibi ile İrtibat",
          "Edit Property": "Mülkü Güncelle",
          "Delete Property": "Mülkü Sil",

          "Property Type and Statuses Percentage" : "Mülk Tipleri ve Durumları Yüzdelikleri",
          "Daily Property Added": "Günlük Eklenen Mülkler",
          "All Roles" : "Bütün Roller",
          "All Translations": "Bütün Çevirmeler",

          "Add": "Ekle",
          "Delete": "Sil",
          "Edit": "Değiştir"
        }
      }
    }
  });


export default i18n;
