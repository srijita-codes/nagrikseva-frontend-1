"use client";
import { useCallback, useEffect, useState } from "react";

const translations = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.report": "Report",
    "nav.map": "Map",
    "nav.citizen": "Citizen",
    "nav.officer": "Officer",
    "nav.admin": "Admin",
    "nav.login": "Login",
    "nav.signup": "Sign Up",

    // Hero
    "hero.title": "Crowdsourced Civic Issue Reporting",
    "hero.sub": "NagrikSeva empowers citizens to report civic issues, track resolutions, and collaborate with authorities.",
    "hero.cta.report": "Report an Issue",
    "hero.cta.map": "Explore Map",
    "hero.stats.reports": "Reports",
    "hero.stats.resolved": "Resolved",
    "hero.stats.median_response": "Median Response",
    "hero.weekly_caption": "Weekly issue reports",

    // Form
    "form.page_title": "Report an Issue",
    "form.step": "Step",
    "form.step.details": "Details",
    "form.step.location": "Location",
    "form.step.photos": "Photos",
    "form.step.review": "Review",

    "form.title": "Title",
    "form.category": "Category",
    "form.description": "Description",
    "form.pin_location": "Pin Location",
    "form.upload": "Upload Photos/Videos",
    "form.attach_hint": "Attach evidence to help authorities assess the issue.",
    "form.click_map_hint": "Click on the map to set the exact location.",
    "form.review_label": "Review",

    // Categories
    "form.cat.pothole": "Pothole",
    "form.cat.garbage": "Garbage",
    "form.cat.streetlight": "Streetlight",
    "form.cat.water": "Water",
    "form.cat.other": "Other",

    // Buttons
    "btn.back": "Back",
    "btn.next": "Next",
    "btn.submit": "Submit",

    // Toast
    "toast.submitted.title": "Issue submitted!",
    "toast.submitted.desc": "Thanks for reporting. We'll keep you updated.",
  },
  hi: {
    // Nav
    "nav.home": "होम",
    "nav.report": "शिकायत",
    "nav.map": "मानचित्र",
    "nav.citizen": "नागरिक",
    "nav.officer": "अधिकारी",
    "nav.admin": "प्रशासन",
    "nav.login": "लॉगिन",
    "nav.signup": "साइन अप",

    // Hero
    "hero.title": "जन-सहभागिता से नागरिक समस्या रिपोर्टिंग",
    "hero.sub": "नागरिकसेवा नागरिकों को समस्याएँ दर्ज करने, प्रगति ट्रैक करने और अधिकारियों के साथ सहयोग करने में सक्षम बनाता है।",
    "hero.cta.report": "समस्या दर्ज करें",
    "hero.cta.map": "मानचित्र देखें",
    "hero.stats.reports": "रिपोर्ट्स",
    "hero.stats.resolved": "निपटान",
    "hero.stats.median_response": "माध्य प्रतिक्रिया",
    "hero.weekly_caption": "साप्ताहिक समस्या रिपोर्ट",

    // Form
    "form.page_title": "समस्या दर्ज करें",
    "form.step": "चरण",
    "form.step.details": "विवरण",
    "form.step.location": "स्थान",
    "form.step.photos": "फोटो",
    "form.step.review": "समीक्षा",

    "form.title": "शीर्षक",
    "form.category": "श्रेणी",
    "form.description": "विवरण",
    "form.pin_location": "स्थान चुनें",
    "form.upload": "फोटो/वीडियो अपलोड करें",
    "form.attach_hint": "अधिकारियों के आकलन में मदद के लिए प्रमाण संलग्न करें।",
    "form.click_map_hint": "सटीक स्थान सेट करने के लिए मानचित्र पर क्लिक करें।",
    "form.review_label": "समीक्षा",

    // Categories
    "form.cat.pothole": "गड्ढा",
    "form.cat.garbage": "कचरा",
    "form.cat.streetlight": "स्ट्रीट लाइट",
    "form.cat.water": "पानी",
    "form.cat.other": "अन्य",

    // Buttons
    "btn.back": "वापस",
    "btn.next": "आगे",
    "btn.submit": "जमा करें",

    // Toast
    "toast.submitted.title": "समस्या सबमिट हो गई!",
    "toast.submitted.desc": "रिपोर्ट करने के लिए धन्यवाद। हम आपको अपडेट देते रहेंगे।",
  },
};

export const useLang = () => {
  const [lang, setLangState] = useState<string>("en");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    if (saved === "en" || saved === "hi") setLangState(saved);
  }, []);

  const setLang = useCallback((value: string) => {
    setLangState(value);
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", value);
    }
  }, []);

  const t = useCallback((key: string) => {
    return (translations as any)[lang]?.[key] ?? (translations as any).en?.[key] ?? key;
  }, [lang]);

  return { lang, setLang, t };
};