export type Service = {
  id: string;
  name: string;
  nameUz: string;
  desc: string;
  descUz: string;
  price: number;
  minutes: number;
  category: CategoryId;
  photo: string;
};

export type CategoryId = "eleven" | "top" | "bobur";

export const CATEGORIES: { id: CategoryId; label: string; note: string }[] = [
  { id: "eleven", label: "ELEVEN", note: "Базовый стандарт качества" },
  { id: "top", label: "TOP BARBER", note: "Опытные мастера студии" },
  { id: "bobur", label: "BOBUR VAFAEV", note: "VIP — только основатель" },
];

const P = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const SERVICES: Service[] = [
  {
    id: "e1",
    name: "Мужская стрижка",
    nameUz: "Erkaklar soch olish",
    desc: "Консультация, стрижка машинкой и ножницами, укладка и стайлинг.",
    descUz: "Konsultatsiya, mashinka va qaychi bilan soch olish, styling.",
    price: 120000,
    minutes: 60,
    category: "eleven",
    photo: P("photo-1585747860715-2ba37e788b70"),
  },
  {
    id: "e2",
    name: "Стрижка + Борода",
    nameUz: "Soch + Soqol",
    desc: "Полный образ: стрижка, контур бороды бритвой, горячее полотенце.",
    descUz: "To'liq ko'rinish: soch, ustara bilan soqol konturi, issiq sochiq.",
    price: 150000,
    minutes: 80,
    category: "eleven",
    photo: P("photo-1621605815971-fbc98d665033"),
  },
  {
    id: "e3",
    name: "Детская стрижка",
    nameUz: "Bolalar soch olish",
    desc: "Спокойно и аккуратно — для юных джентльменов до 12 лет.",
    descUz: "Xotirjam va ozoda — 12 yoshgacha yosh janoblar uchun.",
    price: 100000,
    minutes: 45,
    category: "eleven",
    photo: P("photo-1596728325488-58c87691e9af"),
  },
  {
    id: "e4",
    name: "Тонирование",
    nameUz: "Toniklash",
    desc: "Камуфляж седины и выравнивание тона волос или бороды.",
    descUz: "Oq sochni kamuflyaj qilish va soch tonini tenglashtirish.",
    price: 60000,
    minutes: 30,
    category: "eleven",
    photo: P("photo-1517832606299-7ae9b720a186"),
  },
  {
    id: "e5",
    name: "Черная маска",
    nameUz: "Qora maska",
    desc: "Глубокое очищение кожи лица, сужение пор, свежий вид.",
    descUz: "Yuz terisini chuqur tozalash, teshiklarni toraytirish.",
    price: 60000,
    minutes: 25,
    category: "eleven",
    photo: P("photo-1560750588-73207b1ef5b8"),
  },
  {
    id: "t1",
    name: "Стрижка",
    nameUz: "Soch olish",
    desc: "Работа топ-барбера студии: сложные формы и точный фейд.",
    descUz: "Studiya top-barberi ishi: murakkab shakllar va aniq feyd.",
    price: 150000,
    minutes: 60,
    category: "top",
    photo: P("photo-1503443207922-dff7d543fd0e"),
  },
  {
    id: "t2",
    name: "Стрижка + Борода",
    nameUz: "Soch + Soqol",
    desc: "Топ-барбер, полный уход за бородой и стайлинг премиум-косметикой.",
    descUz: "Top-barber, soqol parvarishi va premium kosmetika bilan styling.",
    price: 200000,
    minutes: 90,
    category: "top",
    photo: P("photo-1519085360753-af0119f7cbe7"),
  },
  {
    id: "b1",
    name: "Стрижка у Бобура",
    nameUz: "Bobur bilan soch olish",
    desc: "Персональная работа основателя ELEVEN — авторский подход.",
    descUz: "ELEVEN asoschisining shaxsiy ishi — muallif yondashuvi.",
    price: 500000,
    minutes: 90,
    category: "bobur",
    photo: P("photo-1622286342621-4bd786c2447c"),
  },
  {
    id: "b2",
    name: "Образ жениха",
    nameUz: "Kuyov ko'rinishi",
    desc: "Полный премиум-пакет для главного дня: стрижка, борода, уход, маска.",
    descUz: "Asosiy kun uchun premium paket: soch, soqol, parvarish, maska.",
    price: 1300000,
    minutes: 150,
    category: "bobur",
    photo: P("photo-1492562080023-ab3db95bfbce"),
  },
];

export const BOBUR = "Bobur Vafaev";

export type Barber = {
  id: string;
  name: string;
  role: string;
  photo: string;
  years: number;
  bio: string;
  bioUz: string;
  portfolio: string[];
};

const WORK = [
  P("photo-1585747860715-2ba37e788b70"),
  P("photo-1596728325488-58c87691e9af"),
  P("photo-1621605815971-fbc98d665033"),
];

export const SONLINE_PLACE_ID = "624881582";

export const widgetUrl = (masterId?: string) =>
  `https://widget.sonline.su/ru/services/?placeid=${SONLINE_PLACE_ID}${
    masterId ? `&master=${masterId}` : ""
  }`;

const RAW: Omit<Barber, "portfolio">[] = [
  {
    id: "308631",
    name: BOBUR,
    role: "Founder",
    photo: P("photo-1503443207922-dff7d543fd0e"),
    years: 12,
    bio: "Основатель ELEVEN. Автор стиля студии, работает только по личной записи.",
    bioUz: "ELEVEN asoschisi. Studiya uslubi muallifi, faqat shaxsiy yozuv bilan ishlaydi.",
  },
  {
    id: "503580",
    name: "Shaxriyor Mansurov",
    role: "Top Barber",
    photo: P("photo-1519085360753-af0119f7cbe7"),
    years: 8,
    bio: "Специалист по классике и точным фейдам, работа с густыми волосами.",
    bioUz: "Klassika va aniq feydlar bo'yicha mutaxassis, qalin sochlar bilan ishlaydi.",
  },
  {
    id: "330264",
    name: "Diyor Valiyev",
    role: "Top Barber",
    photo: P("photo-1500648767791-00dcc994a43e"),
    years: 7,
    bio: "Современные текстурные стрижки и архитектура бороды.",
    bioUz: "Zamonaviy teksturali soch turmaklari va soqol arxitekturasi.",
  },
  {
    id: "394656",
    name: "Fayoz Rakhmonov",
    role: "Barber",
    photo: P("photo-1492562080023-ab3db95bfbce"),
    years: 5,
    bio: "Аккуратные мужские стрижки и уверенный стайлинг на каждый день.",
    bioUz: "Ozoda erkaklar soch turmaklari va har kunlik styling.",
  },
  {
    id: "573821",
    name: "Jaxongir Azizov",
    role: "Barber",
    photo: P("photo-1547425260-76bcadfb4f2c"),
    years: 5,
    bio: "Любит короткие формы, скин-фейд и чистые линии.",
    bioUz: "Qisqa shakllar, skin-feyd va toza chiziqlarni yaxshi ko'radi.",
  },
  {
    id: "330249",
    name: "Samir Axmedov",
    role: "Barber",
    photo: P("photo-1531384441138-2736e62e0919"),
    years: 4,
    bio: "Работа с бородой, горячее полотенце и уход за кожей лица.",
    bioUz: "Soqol bilan ishlash, issiq sochiq va yuz terisi parvarishi.",
  },
  {
    id: "1108981",
    name: "Shax Adilov",
    role: "Barber",
    photo: P("photo-1506794778202-cad84cf45f1d"),
    years: 4,
    bio: "Детские стрижки и спокойная атмосфера в кресле.",
    bioUz: "Bolalar soch turmaklari va kursida xotirjam muhit.",
  },
  {
    id: "415119",
    name: "Izzat Zokirov",
    role: "Barber",
    photo: P("photo-1521119989659-a83eee488004"),
    years: 6,
    bio: "Классические пробор и помпадур, работа с укладкой.",
    bioUz: "Klassik probor va pompadur, styling bilan ishlaydi.",
  },
  {
    id: "324800",
    name: "Munis Burxanov",
    role: "Barber",
    photo: P("photo-1534308143481-c55f00be8bd7"),
    years: 3,
    bio: "Тонирование, камуфляж седины и деликатная коррекция формы.",
    bioUz: "Toniklash, oq soch kamuflyaji va shaklni nozik to'g'rilash.",
  },
  {
    id: "333234",
    name: "Sanjar",
    role: "Barber",
    photo: P("photo-1622286342621-4bd786c2447c"),
    years: 3,
    bio: "Быстро и чисто: базовые стрижки для плотного графика.",
    bioUz: "Tez va toza: zich jadval uchun asosiy soch turmaklari.",
  },
];

export const BARBERS: Barber[] = RAW.map((b) => ({ ...b, portfolio: WORK }));

export const LOOKBOOK = [
  P("photo-1585747860715-2ba37e788b70", 900),
  P("photo-1596728325488-58c87691e9af", 900),
  P("photo-1621605815971-fbc98d665033", 900),
  P("photo-1517832606299-7ae9b720a186", 900),
  P("photo-1503951914875-452162b0f3f1", 900),
  P("photo-1622286342621-4bd786c2447c", 900),
];

export const formatPrice = (v: number) =>
  new Intl.NumberFormat("ru-RU").format(v).replace(/\u00A0/g, " ") + " сум";

export const formatTime = (min: number, lang: "ru" | "uz" = "ru") => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  const hu = lang === "uz" ? "соат" : "ч";
  const mu = lang === "uz" ? "дак" : "мин";
  return [h ? `${h} ${hu}` : null, m ? `${m} ${mu}` : null].filter(Boolean).join(" ");
};
