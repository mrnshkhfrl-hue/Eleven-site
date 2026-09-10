export type Service = {
  id: string;
  name: string;
  nameUz: string;
  desc: string;
  descUz: string;
  price: number;
  isFromPrice?: boolean;
  minutes: number;
  category: CategoryId;
  photo: string;
  isMain?: boolean;
};

export type CategoryId = "vip" | "top" | "barber";

export const CATEGORIES: {
  id: CategoryId;
  label: string;
  labelUz: string;
  note: string;
  noteUz: string;
}[] = [
  {
    id: "vip",
    label: "VIP (Bobur Vafaev)",
    labelUz: "VIP (Bobur Vafaev)",
    note: "Персональная работа основателя ELEVEN — авторский стиль и безупречная форма",
    noteUz: "ELEVEN asoschisining shaxsiy mualliflik ishi va qabuli",
  },
  {
    id: "top",
    label: "TOP BARBER (Shaxriyor Mansurov)",
    labelUz: "TOP BARBER (Shaxriyor Mansurov)",
    note: "Фирменные стрижки, борода и детский стиль от топ-мастера",
    noteUz: "Top-barber tomonidan mualliflik soch va soqol parvarishi",
  },
  {
    id: "barber",
    label: "BARBER (Парикмахерские услуги)",
    labelUz: "BARBER (Sartaroshlik xizmatlari)",
    note: "Стрижки, уход за кожей, воск, тонирование и маски",
    noteUz: "Soch olish, yuz parvarishi, mum, niqob va toniklash",
  },
];

const P = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const SERVICES: Service[] = [
  /* ─── 1. Category 1: VIP (Bobur Vafaev) ─── */
  {
    id: "bobur-haircut",
    name: "Стрижка у Бобура",
    nameUz: "Bobur Vafaev bilan soch olish",
    desc: "Персональная работа основателя ELEVEN — авторский стиль и безупречная форма.",
    descUz: "ELEVEN asoschisidan shaxsiy soch turmagi — mualliflik uslubi va mukammal shakl.",
    price: 500000,
    minutes: 120,
    category: "vip",
    photo: "/services/service-bobur-haircut.jpg",
    isMain: true,
  },
  {
    id: "bobur-groom",
    name: "Образ жениха у Бобура 100$",
    nameUz: "Kuyov ko'rinishi (Bobur Vafaev) 100$",
    desc: "Эксклюзивный полный VIP-образ жениха: стрижка, борода, уход и укладка.",
    descUz: "Kuyov uchun to'liq VIP obraz (100$): soch, soqol, parvarish va styling.",
    price: 1300000,
    minutes: 120,
    category: "vip",
    photo: "/services/service-bobur-groom.jpg",
  },

  /* ─── 2. Category 2: TOP BARBER (Shaxriyor Mansurov) ─── */
  {
    id: "top-haircut",
    name: "Стрижка",
    nameUz: "Soch olish",
    desc: "Фирменная мужская стрижка от топ-мастера с подбором формы и укладкой.",
    descUz: "Top-ustadan mualliflik erkaklar soch turmagi va styling.",
    price: 150000,
    minutes: 60,
    category: "top",
    photo: "/services/service-top-haircut.jpg",
    isMain: true,
  },
  {
    id: "top-haircut-beard",
    name: "Стрижка + Борода",
    nameUz: "Soch + Soqol",
    desc: "Полный образ от топ-барбера: моделирование бороды, четкие линии и уход.",
    descUz: "Top-barberdan to'liq obraz: soqol modellash, toza chiziqlar va parvarish.",
    price: 200000,
    minutes: 90,
    category: "top",
    photo: "/services/service-top-haircut-beard.jpg",
    isMain: true,
  },
  {
    id: "top-kids",
    name: "Детская стрижка до 11 лет",
    nameUz: "Bolalar soch olish (11 yoshgacha)",
    desc: "Бережная и стильная стрижка для детей в кресле топ-мастера.",
    descUz: "Top-usta kursisida bolalar uchun nozik va zamonaviy soch turmagi.",
    price: 140000,
    minutes: 45,
    category: "top",
    photo: "/services/service-kids.jpg",
  },

  /* ─── 3. Category 3: BARBER (Парикмахерские услуги) ─── */
  {
    id: "barber-haircut",
    name: "Мужская стрижка",
    nameUz: "Erkaklar soch turmagi",
    desc: "Классическая или трендовая мужская стрижка с мытьем головы и стайлингом.",
    descUz: "Bosh yuvish va styling bilan birga klassik yoki zamonaviy erkaklar soch turmagi.",
    price: 120000,
    minutes: 45,
    category: "barber",
    photo: "/services/service-barber-haircut.jpg",
    isMain: true,
  },
  {
    id: "barber-wedding",
    name: "Свадебные причёски",
    nameUz: "To'y turmaklari",
    desc: "Праздничная укладка и создание гармоничного свадебного образа.",
    descUz: "Kuyov va maxsus tantanalar uchun tantanali soch turmagi va styling.",
    price: 800000,
    isFromPrice: true,
    minutes: 120,
    category: "barber",
    photo: "/services/service-barber-wedding.jpg",
  },
  {
    id: "barber-clipper",
    name: "Стрижка под насадку",
    nameUz: "Mashinka bilan olish",
    desc: "Быстрая, ровная и аккуратная стрижка машинкой с переходами.",
    descUz: "Mashinka bilan tezkor, tekis va chiroyli o'tishlar bilan olish.",
    price: 100000,
    minutes: 30,
    category: "barber",
    photo: "/services/service-clipper.jpg",
    isMain: true,
  },
  {
    id: "barber-styling",
    name: "Укладка",
    nameUz: "Soch turmaklash (styling)",
    desc: "Профессиональная укладка волос премиальными стайлинговыми средствами.",
    descUz: "Bosh yuvish, shakl berish va premium styling bilan mahkamlash.",
    price: 70000,
    minutes: 30,
    category: "barber",
    photo: "/services/service-styling.jpg",
  },
  {
    id: "barber-facial",
    name: "Чистка лица",
    nameUz: "Yuz tozalash",
    desc: "Глубокое очищение кожи лица и распаривание.",
    descUz: "Yuz teshiklarini chuqur tozalash va terini yangilovchi parvarish.",
    price: 80000,
    minutes: 30,
    category: "barber",
    photo: "/services/service-facial.jpg",
  },
  {
    id: "barber-beard-razor",
    name: "Коррекция бороды лезвием",
    nameUz: "Soqol korreksiyasi (ustara bilan)",
    desc: "Четкие контуры бороды шаветкой с распариванием и бальзамом.",
    descUz: "Ustara bilan soqol chiziqlarini to'g'rilash, bug'lash va soqol moyi.",
    price: 70000,
    minutes: 30,
    category: "barber",
    photo: "/services/service-beard-razor.jpg",
    isMain: true,
  },
  {
    id: "barber-wax",
    name: "Горячий воск",
    nameUz: "Issiq mum (vosk)",
    desc: "Депиляция нежелательных волос (нос, уши, брови) горячим воском.",
    descUz: "Burun, quloq va yanoq sohasidagi keraksiz tuklarni nozik tozalash.",
    price: 60000,
    minutes: 15,
    category: "barber",
    photo: "/services/service-hot-wax.jpg",
  },
  {
    id: "barber-toning-head",
    name: "Тонирование головы",
    nameUz: "Bosh sochlarini toniklash",
    desc: "Камуфляж седины и придание волосам естественного ровного тона.",
    descUz: "Oq sochlarni tabiiy kamuflyaj qilish va yorqin rang berish.",
    price: 60000,
    minutes: 30,
    category: "barber",
    photo: "/services/service-toning-head.jpg",
  },
  {
    id: "barber-toning-beard",
    name: "Тонирование бороды",
    nameUz: "Soqol toniklash",
    desc: "Камуфляж седины на бороде для ухоженного натурального вида.",
    descUz: "Soqol rangini bir xil qilish va oq sochlarni berkitish.",
    price: 50000,
    minutes: 15,
    category: "barber",
    photo: "/services/service-toning-beard.jpg",
  },
  {
    id: "barber-black-mask",
    name: "Черная маска",
    nameUz: "Qora maska",
    desc: "Очищающая маска-пленка против черных точек и загрязнений кожи.",
    descUz: "Qora nuqtalarga qarshi detoks-maska va tinchlantiruvchi losyon.",
    price: 60000,
    minutes: 30,
    category: "barber",
    photo: "/services/service-black-mask.jpg",
  },
];

export const BOBUR = "Bobur Vafaev";

export type Barber = {
  id: string;
  name: string;
  role: "VIP Barber" | "TOP Barber" | "Barber";
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
  `https://widget.sonline.su/ru/masters/?placeid=${SONLINE_PLACE_ID}${
    masterId ? `&master=${masterId}` : ""
  }`;

const RAW: Omit<Barber, "portfolio">[] = [
  {
    id: "308631",
    name: BOBUR,
    role: "VIP Barber",
    photo: P("photo-1503443207922-dff7d543fd0e"),
    years: 12,
    bio: "Основатель ELEVEN. Автор стиля студии, работает только по личной записи.",
    bioUz: "ELEVEN asoschisi. Studiya uslubi muallifi, faqat shaxsiy yozuv bilan ishlaydi.",
  },
  {
    id: "503580",
    name: "Shaxriyor Mansurov",
    role: "TOP Barber",
    photo: "/team/shaxriyor.jpg",
    years: 9,
    bio: "Специалист по классике и точным фейдам, работа с густыми волосами.",
    bioUz: "Klassika va aniq feydlar bo'yicha mutaxassis, qalin sochlar bilan ishlaydi.",
  },
  {
    id: "330264",
    name: "Diyor Valiyev",
    role: "Barber",
    photo: "/team/diyor.jpg",
    years: 5,
    bio: "Современные текстурные стрижки и архитектура бороды.",
    bioUz: "Zamonaviy teksturali soch turmaklari va soqol arxitekturasi.",
  },
  {
    id: "394656",
    name: "Fayoz Rakhmonov",
    role: "Barber",
    photo: "/team/fayoz.jpg",
    years: 13,
    bio: "Аккуратные мужские стрижки и уверенный стайлинг на каждый день.",
    bioUz: "Ozoda erkaklar soch turmaklari va har kunlik styling.",
  },
  {
    id: "573821",
    name: "Jahongir Azizov",
    role: "Barber",
    photo: "/team/jaxongir.jpg",
    years: 8,
    bio: "Любит короткие формы, скин-фейд и чистые линии.",
    bioUz: "Qisqa shakllar, skin-feyd va toza chiziqlarni yaxshi ko'radi.",
  },
  {
    id: "330249",
    name: "Samir Axmedov",
    role: "Barber",
    photo: "/team/samir.jpg",
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
    id: "shaxboz-rajabov",
    name: "Rajabov Shaxboz",
    role: "Barber",
    photo: "/team/shaxboz.jpg",
    years: 7,
    bio: "Классические и современные стрижки, оформление бороды и индивидуальный стиль.",
    bioUz: "Klassik va zamonaviy soch turmaklari, soqol parvarishi va individual uslub.",
  },
  {
    id: "415119",
    name: "Izzat Zokirov",
    role: "Barber",
    photo: "/team/izzat.jpg",
    years: 10,
    bio: "Классические пробор и помпадур, работа с укладкой.",
    bioUz: "Klassik probor va pompadur, styling bilan ishlaydi.",
  },
  {
    id: "324800",
    name: "Munis Burxanov",
    role: "Barber",
    photo: "/team/munis.jpg",
    years: 8,
    bio: "Тонирование, камуфляж седины и деликатная коррекция формы.",
    bioUz: "Toniklash, oq soch kamuflyaji va shaklni nozik to'g'rilash.",
  },
  {
    id: "333234",
    name: "Sanjar Xuramov",
    role: "Barber",
    photo: "/team/sanjar.jpg",
    years: 4,
    bio: "Быстро и чисто: базовые стрижки для плотного графика.",
    bioUz: "Tez va toza: zich jadval uchun asosiy soch turmaklari.",
  },
  {
    id: "parviz-akilov",
    name: "Parviz Akilov",
    role: "Barber",
    photo: "/team/parviz.jpg",
    years: 7,
    bio: "Современные мужские стрижки, текстурирование и четкие контуры.",
    bioUz: "Zamonaviy erkaklar soch turmaklari, teksturalash va toza konturlar.",
  },
];

export const BARBERS: Barber[] = RAW.map((b) => ({ ...b, portfolio: WORK }));

export const LOOKBOOK = [
  "/vibe/vibe-1-entrance.jpg",
  "/vibe/vibe-2-reception.jpg",
  "/vibe/vibe-3-lounge.jpg",
  "/vibe/vibe-4-hall-kids.jpg",
  "/vibe/vibe-5-workstation.jpg",
  "/vibe/vibe-6-action.jpg",
  "/vibe/vibe-7-fragrance-stone.jpg",
  "/vibe/vibe-8-academy.jpg",
  "/vibe/vibe-9-vip-studio.jpg",
  "/vibe/vibe-10-loft-lounge.jpg",
  "/vibe/vibe-11-panoramic.jpg",
];

export const formatPrice = (v: number, isFrom?: boolean, lang: "ru" | "uz" = "ru") => {
  const formatted = new Intl.NumberFormat("ru-RU").format(v).replace(/\u00A0/g, " ");
  if (lang === "uz") {
    return isFrom ? `${formatted} so'mdan` : `${formatted} so'm`;
  }
  return isFrom ? `от ${formatted} сум` : `${formatted} сум`;
};

export const formatTime = (min: number, lang: "ru" | "uz" = "ru") => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  const hu = lang === "uz" ? "soat" : "ч";
  const mu = lang === "uz" ? "daq" : "мин";
  return [h ? `${h} ${hu}` : null, m ? `${m} ${mu}` : null].filter(Boolean).join(" ");
};
