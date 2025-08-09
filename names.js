const BASE = [
  "Muhammad ﷺ (Payg'ambar)","Ibrahim (Payg'ambar)","Musa (Payg'ambar)","Isa (Payg'ambar)","Nuh (Payg'ambar)",
  "Dawud (Payg'ambar)","Sulayman (Payg'ambar)","Yusuf (Payg'ambar)","Yunus (Payg'ambar)","Hud (Payg'ambar)",
  "Salih (Payg'ambar)","Lut (Payg'ambar)","Idris (Payg'ambar)","Shu'ayb (Payg'ambar)","Ilyas (Payg'ambar)",
  "Ayyub (Payg'ambar)","Zakariya (Payg'ambar)","Yahya (Payg'ambar)","Harun (Payg'ambar)",

  "Abu Bakr as-Siddiq (Sahoba)","Umar ibn al-Khattab (Sahoba)","Uthman ibn Affan (Sahoba)","Ali ibn Abi Talib (Sahoba)",
  "Abd al-Rahman ibn Awf (Sahoba)","Sa'd ibn Abi Waqqas (Sahoba)","Talha ibn Ubaydullah (Sahoba)","Zubayr ibn al-Awwam (Sahoba)",
  "Abu Ubaidah ibn al-Jarrah (Sahoba)","Bilal ibn Rabah (Sahoba)","Salman al-Farsi (Sahoba)","Abu Darda (Sahoba)","Abu Hurayra (Sahoba)",
  "Aisha (Sahobiya)","Khadijah (Sahobiya)","Fatimah (Sahobiya)","Umm Salama (Sahobiya)","Hafsah (Sahobiya)","Asma (Sahobiya)","Umm Ayman (Sahobiya)",

  "Imam Abu Hanifa (Olim)","Imam Malik (Olim)","Imam Shafi'i (Olim)","Imam Ahmad ibn Hanbal (Olim)","Ibn Taymiyya (Olim)",
  "Ibn Qayyim (Olim)","Al-Ghazali (Olim)","Ibn Sina (Olim)","Ibn Rushd (Olim)","Al-Bukhari (Olim)","Muslim ibn al-Hajjaj (Olim)",
  "At-Tabari (Olim)","Ibn Kathir (Olim)","Al-Tirmidhi (Olim)","An-Nasa'i (Olim)","Ibn Majah (Olim)","Al-Farabi (Olim)","Ibn al-Jawzi (Olim)",

  "Makkah (Joy)","Madinah (Joy)","Kaaba (Joy)","Masjid al-Haram (Joy)","Masjid an-Nabawi (Joy)","Masjid al-Aqsa (Joy)",
  "Badr (Joy)","Uhud (Joy)","Khandaq (Joy)","Yarmuk (Joy)","Tabuk (Joy)","Hunayn (Joy)","Khaybar (Joy)","Taif (Joy)","Najd (Joy)",

  "Namoz (Amal)","Ro'za (Amal)","Zakot (Amal)","Haj (Amal)","Tawba (Amal)","Tahorat (Amal)","Zikr (Amal)","Tilovat (Amal)",
  "Sadaqa (Amal)","Du'a (Amal)","Istighfor (Amal)","Tahajjud (Amal)","Juma (Amal)","Aqiqah (Amal)",

  "Abdullah ibn Ubayy (Munofiq)","Abu Jahl (Mushrik)","Abu Lahab (Mushrik)","Uqbah ibn Abi Mu'ayt (Mushrik)",
  "Quraysh (Qabila)","Banu Hashim (Qabila)","Banu Umayya (Qabila)","Banu 'Abd al-Muttalib (Qabila)"
];

// 400 taga to'ldirish:
const NAMES = (() => {
  const out = [];
  let i = 0;
  while (out.length < 400) {
    const base = BASE[i % BASE.length];
    out.push(i < BASE.length ? base : `${base} #${Math.floor(i/BASE.length)+1}`);
    i++;
  }
  return out;
})();
