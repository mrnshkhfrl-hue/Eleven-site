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

const BARBER_PORTFOLIOS: Record<string, string[]> = {
  // 1. Bobur Vafaev (VIP Founder — beard trim shears, temple clipper fade, straight razor shave)
  "308631": [
    "/portfolio/portfolio-01.jpg",
    "/portfolio/portfolio-02.jpg",
    "/portfolio/portfolio-03.jpg",
  ],
  // 2. Shaxriyor Mansurov (TOP Barber — hairline fade, neck taper, high skin fade)
  "503580": [
    "/portfolio/portfolio-04.jpg",
    "/portfolio/portfolio-05.jpg",
    "/portfolio/portfolio-06.jpg",
  ],
  // 3. Diyor Valiyev (Barber — beard scissors, textured crop, classic shear comb)
  "330264": [
    "/portfolio/portfolio-07.jpg",
    "/portfolio/portfolio-08.jpg",
    "/portfolio/portfolio-09.jpg",
  ],
  // 4. Fayoz Rakhmonov (Barber — back of head shears, side scissor detailing, razor outline)
  "394656": [
    "/portfolio/portfolio-10.jpg",
    "/portfolio/portfolio-11.jpg",
    "/portfolio/portfolio-12.jpg",
  ],
  // 5. Jahongir Azizov (Barber — temple fade, ear contour shears, front hairline line-up)
  "573821": [
    "/portfolio/portfolio-13.jpg",
    "/portfolio/portfolio-14.jpg",
    "/portfolio/portfolio-15.jpg",
  ],
  // 6. Samir Axmedov (Barber — hair styling blow dryer, neck & beard line trimmer, clipper fade)
  "330249": [
    "/portfolio/portfolio-16.jpg",
    "/portfolio/portfolio-17.jpg",
    "/portfolio/portfolio-18.jpg",
  ],
  // 7. Shax Adilov (Barber — Wahl clipper neck fade, trimmer neck taper, shears textured cut)
  "1108981": [
    "/portfolio/portfolio-19.jpg",
    "/portfolio/portfolio-20.jpg",
    "/portfolio/portfolio-21.jpg",
  ],
  // 8. Rajabov Shaxboz (Barber — temple fade, neck taper, black clipper fade)
  "shaxboz-rajabov": [
    "/portfolio/portfolio-22.jpg",
    "/portfolio/portfolio-23.jpg",
    "/portfolio/portfolio-24.jpg",
  ],
  // 9. Izzat Zokirov (Barber — buzz fade clipper work, straight razor comb cut, razor neck shave)
  "415119": [
    "/portfolio/portfolio-25.jpg",
    "/portfolio/portfolio-26.jpg",
    "/portfolio/portfolio-27.jpg",
  ],
  // 10. Munis Burxanov (Barber — shear comb top trimming, clipper over ear, razor shaving foam)
  "324800": [
    "/portfolio/portfolio-28.jpg",
    "/portfolio/portfolio-29.jpg",
    "/portfolio/portfolio-30.jpg",
  ],
  // 11. Sanjar Xuramov (Barber — comb & textured hair, trimmer temple fade, hot towel compress)
  "333234": [
    "/portfolio/portfolio-31.jpg",
    "/portfolio/portfolio-32.jpg",
    "/portfolio/portfolio-33.jpg",
  ],
  // 12. Parviz Akilov (Barber — fresh fade & beard, black mask treatment, hot wax cheek contour)
  "parviz-akilov": [
    "/portfolio/portfolio-34.jpg",
    "/portfolio/portfolio-35.jpg",
    "/portfolio/portfolio-36.jpg",
  ],
};

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
    photo: "/team/bobur.jpg",
    years: 12,
    bio: "Основатель ELEVEN с 12-летним стажем. Высший уровень мастерства, авторский подход к стилю каждого гостя и безупречное внимание к деталям.",
    bioUz: "ELEVEN asoschisi, 12 yillik tajribaga ega. Yuqori darajadagi mahorat, har bir mehmon uslubiga mualliflik yondashuvi va mukammal aniqlik.",
  },
  {
    id: "503580",
    name: "Shaxriyor Mansurov",
    role: "TOP Barber",
    photo: "/team/shaxriyor.jpg",
    years: 9,
    bio: "Топ-барбер с 9 годами практики. Виртуозное владение классическими и современными стрижками любой сложности, архитектура бороды и премиальный сервис.",
    bioUz: "9 yillik amaliyotga ega top-barber. Har qanday murakkablikdagi klassik va zamonaviy soch turmaklarini mohirona bajarish, soqol arxitekturasi va a'lo darajadagi servis.",
  },
  {
    id: "330264",
    name: "Diyor Valiyev",
    role: "Barber",
    photo: "/team/diyor.jpg",
    years: 5,
    bio: "Мастер с 5-летним опытом в мужском стиле. Аккуратная работа с формой и текстурой, моделирование бороды и внимательное отношение к пожеланиям гостя.",
    bioUz: "Erkaklar uslubi sohasida 5 yillik tajribaga ega usta. Shakl va tekstura bilan puxta ishlash, soqol modellash va mijoz istaklariga e'tiborli munosabat.",
  },
  {
    id: "394656",
    name: "Fayoz Rakhmonov",
    role: "Barber",
    photo: "/team/fayoz.jpg",
    years: 13,
    bio: "Мастер с 13-летним стажем в барберинге. Колоссальный практический опыт, уверенное владение всеми техниками мужских стрижек и моделирования бороды.",
    bioUz: "Barbering sohasida 13 yillik tajribaga ega usta. Katta amaliy tajriba, erkaklar soch turmaklari va soqol shakllantirishning barcha texnikalarini mukammal biladi.",
  },
  {
    id: "573821",
    name: "Jahongir Azizov",
    role: "Barber",
    photo: "/team/jaxongir.jpg",
    years: 8,
    bio: "Квалифицированный барбер с 8-летним стажем. Точность линий, чистые переходы, профессиональный подбор стрижки под форму лица и индивидуальный стиль.",
    bioUz: "8 yillik tajribaga ega malakali barber. Aniq chiziqlar, toza o'tishlar, yuz tuzilishi va mijoz uslubiga mos soch turmagini professional tanlash.",
  },
  {
    id: "330249",
    name: "Samir Axmedov",
    role: "Barber",
    photo: "/team/samir.jpg",
    years: 4,
    bio: "Талантливый барбер с 4 годами практики. Чистота исполнения, классические и трендовые мужские стрижки, уход за бородой и комфорт в кресле.",
    bioUz: "4 yillik amaliyotga ega iqtidorli barber. Toza ijro, klassik va zamonaviy erkaklar soch turmaklari, soqol parvarishi va qulay muhit.",
  },
  {
    id: "1108981",
    name: "Shax Adilov",
    role: "Barber",
    photo: "/team/shax-adilov.jpg",
    years: 4,
    bio: "Внимательный барбер с 4-летним опытом. Качественное исполнение мужских стрижек, оформление бороды, аккуратность и приятная атмосфера.",
    bioUz: "4 yillik tajribaga ega e'tiborli usta. Erkaklar soch turmaklarini sifatli bajarish, soqol tartibga solish, ozodalik va yoqimli muhit.",
  },

  {
    id: "shaxboz-rajabov",
    name: "Rajabov Shaxboz",
    role: "Barber",
    photo: "/team/shaxboz.jpg",
    years: 7,
    bio: "Опытный барбер со стажем 7 лет. Высокая точность в работе, гармоничные переходы, оформление бороды и персональный подход к каждому клиенту.",
    bioUz: "7 yillik tajribaga ega tajribali barber. Ishda yuqori aniqlik, uyg'un o'tishlar, soqol dizayni va har bir mijozga individual yondashuv.",
  },
  {
    id: "415119",
    name: "Izzat Zokirov",
    role: "Barber",
    photo: "/team/izzat.jpg",
    years: 10,
    bio: "Опытный барбер со стажем 10 лет. Безупречная техника работы ножницами и машинкой, идеальные контуры и премиальный мужской уход.",
    bioUz: "10 yillik tajribaga ega malakali barber. Qaychi va mashinka bilan mukammal ishlash, toza konturlar va yuqori darajadagi erkaklar parvarishi.",
  },
  {
    id: "324800",
    name: "Munis Burxanov",
    role: "Barber",
    photo: "/team/munis.jpg",
    years: 8,
    bio: "Мастер с 8-летним опытом работы. Профессиональное владение всеми видами мужских стрижек, оформление бороды и премиальные уходовые процедуры.",
    bioUz: "8 yillik tajribaga ega usta. Erkaklar soch turmaklarining barcha turlarini professional bajarish, soqol parvarishi va yuqori sifatli muolajalar.",
  },
  {
    id: "333234",
    name: "Sanjar Xuramov",
    role: "Barber",
    photo: "/team/sanjar.jpg",
    years: 4,
    bio: "Энергичный мастер с 4-летним стажем. Уверенное владение техниками стрижки и шейвинга, аккуратность, внимание к деталям и свежий взгляд на стиль.",
    bioUz: "4 yillik tajribaga ega g'ayratli usta. Soch olish va soqol turmaklash texnikalarini ishonchli biladi, aniqlik va har bir detalga e'tibor qaratadi.",
  },
  {
    id: "parviz-akilov",
    name: "Parviz Akilov",
    role: "Barber",
    photo: "/team/parviz.jpg",
    years: 7,
    bio: "Профессиональный барбер с 7-летним стажем. Владеет передовыми техниками стрижек, безупречной геометрией линий и качественным мужским уходом.",
    bioUz: "7 yillik stajga ega professional barber. Ilg'or soch turmaklash texnikalari, mukammal chiziqlar geometriyasi va sifatli parvarish ustasi.",
  },
];


export const BARBERS: Barber[] = RAW.map((b) => ({
  ...b,
  portfolio: BARBER_PORTFOLIOS[b.id] ?? [
    P("photo-1503951914875-452162b0f3f1"),
    P("photo-1599351431202-1e0f0137899a"),
    P("photo-1622286342621-4bd786c2447c"),
  ],
}));

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
