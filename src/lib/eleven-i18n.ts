export type Lang = "ru" | "uz";

export const TIME_SLOTS = (() => {
  const slots: string[] = [];
  for (let h = 10; h <= 21; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    if (h !== 21) slots.push(`${String(h).padStart(2, "0")}:30`);
  }
  return slots;
})();

export const ADDRESS = {
  ru: "ул. Амира Тимура, 224, ТРЦ «Атлас»",
  uz: "Amir Temur ko'chasi, 224, Atlas savdo markazi",
};

export const ADDRESS_CITY = {
  ru: "Самарканд",
  uz: "Samarqand",
};

export const HOURS = {
  ru: "Ежедневно 10:00 — 21:00",
  uz: "Har kuni 10:00 — 21:00",
};

export const PHONE = "+998 (66) 233-11-11";
export const PHONE_HREF = "tel:+998662331111";

export const INSTAGRAM = "https://instagram.com/eleven_uzb";

const dict = {
  ru: {
    /* nav */
    home: "Главная",
    services: "Услуги",
    team: "Команда",
    lookbook: "Lookbook",
    contacts: "Контакты",
    book: "Записаться",

    /* hero */
    heroBadge: "premium barbershop · samarkand",
    heroTitle: "ELEVEN",
    heroSub: "Премиум барбершоп в Самарканде",
    heroCta: "Записаться",

    /* services */
    servicesTitle: "Наши услуги",
    servicesHint: "Выберите услугу и запишитесь к мастеру",
    chooseMaster: "Выбрать мастера",

    /* team */
    teamTitle: "Команда",
    teamHint: "Листайте стрелками или свайпайте для выбора мастера",
    experience: "Опыт",
    years: "лет",

    /* lookbook */
    lookbookTitle: "LOOKBOOK",
    ourWork: "наши работы",

    /* contacts */
    contactsTitle: "Контакты",
    address: "Адрес",
    workHours: "Часы работы",
    phone: "Телефон",
    mapTitle: "Как нас найти",

    /* vibe cards */
    cardCareT: "Премиальный уход",
    cardCareD: "Используем только топовую мужскую косметику",
    cardCoffeeT: "Specialty Coffee",
    cardCoffeeD: "Свежая обжарка, альтернатива и эспрессо",
    cardTeamT: "10 мастеров",
    cardTeamD: "От топ-барберов до founder-уровня",

    /* modal */
    portfolio: "Портфолио",
    bookWith: "Записаться к",
    bookingTitle: "ОНЛАЙН-ЗАПИСЬ",
    bio: "О мастере",
    tapMaster: "Нажми на мастера, чтобы посмотреть работы и записаться",

    /* misc */
    menu: "Меню",
    close: "Закрыть",
  },
  uz: {
    /* nav */
    home: "Bosh sahifa",
    services: "Xizmatlar",
    team: "Jamoa",
    lookbook: "Lookbook",
    contacts: "Kontaktlar",
    book: "Yozilish",

    /* hero */
    heroBadge: "premium barbershop · samarkand",
    heroTitle: "ELEVEN",
    heroSub: "Samarqanddagi premium barbershop",
    heroCta: "Yozilish",

    /* services */
    servicesTitle: "Bizning xizmatlar",
    servicesHint: "Xizmatni tanlang va ustaga yoziling",
    chooseMaster: "Ustani tanlash",

    /* team */
    teamTitle: "Jamoa",
    teamHint: "Ustalarni ko'rish uchun strelkalarni bosing yoki suring",
    experience: "Tajriba",
    years: "yil",

    /* lookbook */
    lookbookTitle: "LOOKBOOK",
    ourWork: "bizning ishlarimiz",

    /* contacts */
    contactsTitle: "Kontaktlar",
    address: "Manzil",
    workHours: "Ish vaqti",
    phone: "Telefon",
    mapTitle: "Bizni qanday topish mumkin",

    /* vibe cards */
    cardCareT: "Mukammal parvarish",
    cardCareD: "Faqat brend erkaklar kosmetikasidan foydalanamiz",
    cardCoffeeT: "Specialty Qahva",
    cardCoffeeD: "Yangi qovurilgan qahva va espressolar",
    cardTeamT: "10 ta usta",
    cardTeamD: "Top-barberlardan founder-darajasigacha",

    /* modal */
    portfolio: "Portfolio",
    bookWith: "Yozilish:",
    bookingTitle: "ONLAYN YOZILISH",
    bio: "Usta haqida",
    tapMaster: "Ishlarini ko'rish va yozilish uchun ustaga bosing",

    /* misc */
    menu: "Menyu",
    close: "Yopish",
  },
} as const;

export const t = (lang: Lang) => dict[lang];
