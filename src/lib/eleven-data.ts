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
  // 1. Bobur Vafaev (VIP Founder — luxury straight razor shave, hot towel & clipper fade)
  "308631": [
    P("photo-1605497788044-5a32c7078486"),
    P("photo-1503951914875-452162b0f3f1"),
    P("photo-1599351431202-1e0f0137899a"),
  ],
  // 2. Shaxriyor Mansurov (TOP Barber — skin fade, shavette razor line & shear work)
  "503580": [
    P("photo-1596728325488-58c87691e9af"),
    P("photo-1585747860715-2ba37e788b70"),
    P("photo-1621605815971-fbc98d665033"),
  ],
  // 3. Diyor Valiyev (Barber — shear texturing, clipper fade & styling)
  "330264": [
    P("photo-1567894340315-735d7c361db0"),
    P("photo-1593702275687-f8b402bf1fb5"),
    P("photo-1517832606299-7ae9b720a186"),
  ],
  // 4. Fayoz Rakhmonov (Barber — classic scissor cut & razor detailing)
  "394656": [
    P("photo-1635273051937-a0ddef9573b6"),
    P("photo-1593702295094-aea22597af65"),
    P("photo-1647140655214-e4a2d914971f"),
  ],
  // 5. Jahongir Azizov (Barber — sharp clipper fade & comb technique)
  "573821": [
    P("photo-1635273051839-003bf06a8751"),
    P("photo-1599011176306-4a96f1516d4d"),
    P("photo-1657105052497-f996284ffff8"),
  ],
  // 6. Samir Axmedov (Barber — razor contour, warm foam & beard care)
  "330249": [
    P("photo-1593702288056-7927b442d0fa"),
    P("photo-1605497787865-e6d4762b386f"),
    P("photo-1493256338651-d82f7acb2b38"),
  ],
  // 7. Shax Adilov (Barber — clean scissor work & hair comb styling)
  "1108981": [
    P("photo-1598524374912-6b0b0bab43dd"),
    P("photo-1599351431408-433ef72fe40b"),
    P("photo-1648221122323-572c13a31663"),
  ],
  // 8. Rajabov Shaxboz (Barber — clipper fade, comb & scissor cut)
  "shaxboz-rajabov": [
    P("photo-1672642150228-3fcd5826ec26"),
    P("photo-1589985494639-69e60c82cab2"),
    P("photo-1604355240616-5e907f42b431"),
  ],
  // 9. Izzat Zokirov (Barber — classic scissor cutting & razor work)
  "415119": [
    P("photo-1640301133543-41fe25ad6450"),
    P("photo-1640301133857-c4bc5789c1bb"),
    P("photo-1520338661084-680395057c93"),
  ],
  // 10. Munis Burxanov (Barber — beard trim, clippers & styling)
  "324800": [
    P("photo-1582771498000-8ad44e6c84db"),
    P("photo-1514336937476-a5b961020a5c"),
    P("photo-1606333259737-6da197890fa2"),
  ],
  // 11. Sanjar Xuramov (Barber — fast clean cuts, trimmer & styling)
  "333234": [
    P("photo-1585581905588-9e91f63bdd47"),
    P("photo-1512864084360-7c0c4d0a0845"),
    P("photo-1599351430140-c70f0250bd70"),
  ],
  // 12. Parviz Akilov (Barber — modern cuts, razor detailing & comb)
  "parviz-akilov": [
    P("photo-1630435664010-20cbd1d7bb6d"),
    P("photo-1598524374576-40ba05ac9be5"),
    P("photo-1527512950678-b88a241e9f4b"),
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
