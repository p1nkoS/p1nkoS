// Mock data for Viknar'off Vinnytsia Salon-Shop

export const SITE_CONFIG = {
  brandName: "VIKNAR'OFF",
  badge: "Салон магазин",
  city: "Вінниця",
  address: "м. Вінниця, вул. Замостянська 37",
  phones: ["(068) 723-97-22", "(073) 723-23-22"],
  email: "office@viknaroff.com.ua",
  workingHours: "Пн-Пт: 9:00 - 18:00 | Сб: 9:00 - 15:00",
  hotline: "0 800 50 53 52",
};

export const NAV_MENU = [
  {
    title: "Вікна",
    href: "#windows",
    submenu: [
      { name: "Вікна для квартири", href: "#windows" },
      { name: "Вікна для балкону", href: "#windows" },
      { name: "Вікна для спальні", href: "#windows" },
      { name: "Вікна для дитячої кімнати", href: "#windows" },
      { name: "Вікна для тераси", href: "#windows" },
      { name: "Вікна для дому та котеджу", href: "#windows" },
    ],
  },
  {
    title: "Двері",
    href: "#doors",
    submenu: [
      { name: "Металопластикові двері", href: "#doors" },
      { name: "Алюмінієві двері", href: "#doors" },
      { name: "Вхідні пластикові двері", href: "#doors" },
      { name: "Міжкімнатні пластикові двері", href: "#doors" },
      { name: "Балконні двері", href: "#doors" },
      { name: "Офісні двері", href: "#doors" },
    ],
  },
  {
    title: "Розсувні системи",
    href: "#sliding",
    submenu: [
      { name: "Алюмінієві розсувні системи", href: "#sliding" },
      { name: "Металопластикові розсувні системи", href: "#sliding" },
    ],
  },
  {
    title: "Додаткові продукти",
    href: "#additional",
    submenu: [
      { name: "Антимоскітна сітка", href: "#additional" },
      { name: "VIKNAR'OFF HPL Панелі", href: "#additional" },
      { name: "Віконна фурнітура", href: "#additional" },
      { name: "Ламінація вікон", href: "#additional" },
      { name: "Підвіконня", href: "#additional" },
      { name: "Відливи", href: "#additional" },
      { name: "Склопакети", href: "#additional" },
    ],
  },
];

export const HERO_SLIDES = [
  {
    title: "Виготовляємо віконні та дверні системи",
    subtitle: "Які вимикають усе зайве",
    image: "https://images.unsplash.com/photo-1772563139470-9232b4e435c2",
    cta: "Замовити замір",
  },
  {
    title: "Європейська якість у твоєму домі",
    subtitle: "Профілі Gealan, Decco, Aluprof — гарантія 7-15 років",
    image: "https://images.unsplash.com/photo-1638885930125-85350348d266",
    cta: "Дізнатись більше",
  },
  {
    title: "Розсувні системи преміум класу",
    subtitle: "Алюмінієві та металопластикові рішення для тераси",
    image: "https://images.unsplash.com/photo-1700308232171-aa0d87ee1a88",
    cta: "Переглянути моделі",
  },
];

export const PRODUCT_CATEGORIES = [
  {
    id: "windows",
    title: "Вікна",
    description: "Енергозберігаючі металопластикові вікна",
    image: "https://images.unsplash.com/photo-1638885930125-85350348d266",
    items: 25,
  },
  {
    id: "doors",
    title: "Двері",
    description: "Вхідні, міжкімнатні, балконні та офісні двері",
    image: "https://images.unsplash.com/photo-1626556504142-f9ec02f05d67",
    items: 18,
  },
  {
    id: "sliding",
    title: "Розсувні системи",
    description: "Алюмінієві та металопластикові розсувні рішення",
    image: "https://images.unsplash.com/photo-1700308232171-aa0d87ee1a88",
    items: 12,
  },
  {
    id: "additional",
    title: "Додаткові продукти",
    description: "Москітні сітки, підвіконня, фурнітура та аксесуари",
    image: "https://images.unsplash.com/photo-1758998222336-d48b2390a686",
    items: 30,
  },
];

export const WINDOW_TABS = {
  purpose: {
    label: "По призначенню",
    items: [
      { name: "Вікна для дому та котеджу", image: "https://images.unsplash.com/photo-1772563139470-9232b4e435c2" },
      { name: "Вікна для квартири", image: "https://images.unsplash.com/photo-1638885930125-85350348d266" },
      { name: "Вікна для балкону", image: "https://images.unsplash.com/photo-1665150200731-fecf2b2b4160" },
      { name: "Вікна для спальні", image: "https://images.unsplash.com/photo-1777108720112-a3ed10a2e778" },
      { name: "Вікна для дитячої кімнати", image: "https://images.unsplash.com/photo-1772563139470-9232b4e435c2" },
      { name: "Вікна для тераси", image: "https://images.unsplash.com/photo-1700308232171-aa0d87ee1a88" },
    ],
  },
  config: {
    label: "По комплектації",
    items: [
      { name: "Вікна з захистом від шуму", image: "https://images.unsplash.com/photo-1638885930125-85350348d266" },
      { name: "Вікна з захистом від злому", image: "https://images.unsplash.com/photo-1772563139470-9232b4e435c2" },
      { name: "Вікна з захистом від сонця", image: "https://images.unsplash.com/photo-1777108720112-a3ed10a2e778" },
      { name: "Енергозберігаючі вікна", image: "https://images.unsplash.com/photo-1665150200731-fecf2b2b4160" },
      { name: "Мультифункціональні вікна", image: "https://images.unsplash.com/photo-1638885930125-85350348d266" },
      { name: "Розсувні вікна", image: "https://images.unsplash.com/photo-1700308232171-aa0d87ee1a88" },
    ],
  },
  design: {
    label: "По дизайну",
    items: [
      { name: "Арочні вікна", image: "https://images.unsplash.com/photo-1772563139470-9232b4e435c2" },
      { name: "Трикутні вікна", image: "https://images.unsplash.com/photo-1638885930125-85350348d266" },
      { name: "Круглі вікна", image: "https://images.unsplash.com/photo-1665150200731-fecf2b2b4160" },
      { name: "Вікна ламіновані", image: "https://images.unsplash.com/photo-1777108720112-a3ed10a2e778" },
      { name: "Вікна з декоративними шпросами", image: "https://images.unsplash.com/photo-1700308232171-aa0d87ee1a88" },
      { name: "Нестандартні вікна", image: "https://images.unsplash.com/photo-1638885930125-85350348d266" },
    ],
  },
  brand: {
    label: "По бренду",
    items: [
      { name: "Вікна Gealan", image: "https://images.unsplash.com/photo-1772563139470-9232b4e435c2" },
      { name: "Вікна Viknar'off", image: "https://images.unsplash.com/photo-1638885930125-85350348d266" },
      { name: "Вікна Decco", image: "https://images.unsplash.com/photo-1665150200731-fecf2b2b4160" },
    ],
  },
};

export const WINDOW_MODELS = [
  {
    name: "Gealan S 9000",
    badge: "Вибір покупців",
    soundproof: "до 42 дб",
    depth: "82,5 мм",
    chambers: "6",
    glass: "32, 44, 48 мм",
    country: "Німеччина",
    image: "https://images.unsplash.com/photo-1772563139470-9232b4e435c2",
  },
  {
    name: "Gealan S 8000",
    badge: "Вибір покупців",
    soundproof: "до 42 дб",
    depth: "74 мм",
    chambers: "6/5",
    glass: "24, 44 мм",
    country: "Німеччина",
    image: "https://images.unsplash.com/photo-1638885930125-85350348d266",
  },
  {
    name: "Decco 82",
    badge: "Преміум",
    soundproof: "до 42 дб",
    depth: "81 мм",
    chambers: "6",
    glass: "44, 48 мм",
    country: "Польща",
    image: "https://images.unsplash.com/photo-1665150200731-fecf2b2b4160",
  },
  {
    name: "NEO 81",
    badge: "Новинка",
    soundproof: "до 42 дб",
    depth: "81 мм",
    chambers: "7",
    glass: "44, 50 мм",
    country: "Україна",
    image: "https://images.unsplash.com/photo-1777108720112-a3ed10a2e778",
  },
  {
    name: "MegaLine 600",
    badge: "Хіт продажів",
    soundproof: "до 38 дб",
    depth: "70 мм",
    chambers: "6",
    glass: "24, 32, 42 мм",
    country: "Україна",
    image: "https://images.unsplash.com/photo-1638885930125-85350348d266",
  },
  {
    name: "Aluprof MB-86",
    badge: "Алюміній",
    soundproof: "до 43 дБ",
    depth: "77 мм",
    chambers: "—",
    glass: "13,5 – 61,5 мм",
    country: "Польща",
    image: "https://images.unsplash.com/photo-1700308232171-aa0d87ee1a88",
  },
  {
    name: "LuxThermo W75",
    badge: "Алюміній",
    soundproof: "до 43 дБ",
    depth: "75 мм",
    chambers: "—",
    glass: "28-56 мм",
    country: "Польща",
    image: "https://images.unsplash.com/photo-1758998256408-ab2c9fbec19b",
  },
  {
    name: "Fenster 500",
    badge: "Економ",
    soundproof: "до 32 дб",
    depth: "60 мм",
    chambers: "5",
    glass: "24, 32 мм",
    country: "Україна",
    image: "https://images.unsplash.com/photo-1772563139470-9232b4e435c2",
  },
  {
    name: "LWS 3",
    badge: "Бюджет",
    soundproof: "до 32 дб",
    depth: "58 мм",
    chambers: "3",
    glass: "24, 34 мм",
    country: "Україна",
    image: "https://images.unsplash.com/photo-1665150200731-fecf2b2b4160",
  },
];

export const DOOR_TYPES = [
  { name: "Балконні двері", image: "https://images.unsplash.com/photo-1665150200731-fecf2b2b4160" },
  { name: "Балконний блок", image: "https://images.unsplash.com/photo-1777108720112-a3ed10a2e778" },
  { name: "Офісні двері", image: "https://images.unsplash.com/photo-1626556504142-f9ec02f05d67" },
  { name: "Вхідні пластикові двері", image: "https://images.unsplash.com/photo-1767884161637-799b89e3fc9e" },
  { name: "Міжкімнатні двері", image: "https://images.unsplash.com/photo-1638885930125-85350348d266" },
  { name: "Двері для котеджу", image: "https://images.unsplash.com/photo-1626556504142-f9ec02f05d67" },
  { name: "Розсувні двері", image: "https://images.unsplash.com/photo-1700308232171-aa0d87ee1a88" },
  { name: "Алюмінієві двері", image: "https://images.unsplash.com/photo-1758998256408-ab2c9fbec19b" },
];

export const ADDITIONAL_PRODUCTS = [
  { name: "Металопластикові розсувні системи", image: "https://images.unsplash.com/photo-1700308232171-aa0d87ee1a88" },
  { name: "Алюмінієві розсувні системи", image: "https://images.unsplash.com/photo-1758998256408-ab2c9fbec19b" },
  { name: "HPL панелі", image: "https://images.unsplash.com/photo-1626556504142-f9ec02f05d67" },
  { name: "Антимоскітні сітки", image: "https://images.unsplash.com/photo-1758998222336-d48b2390a686" },
  { name: "Підвіконня", image: "https://images.unsplash.com/photo-1772563139470-9232b4e435c2" },
  { name: "Ролети", image: "https://images.unsplash.com/photo-1507035159636-7a86eb324885" },
];

export const FEATURES = [
  {
    icon: "Factory",
    title: "Від виробника",
    text: "Працюємо напряму з заводом Viknar'off — без посередників та переплат",
  },
  {
    icon: "Globe",
    title: "Європейська якість",
    text: "Профілі Gealan (Німеччина), фурнітура Siegenia, скло Guardian та Pilkington",
  },
  {
    icon: "Ruler",
    title: "Безкоштовний замір",
    text: "Спеціаліст приїде до вас, зробить точні заміри та розрахує вартість",
  },
  {
    icon: "ShieldCheck",
    title: "Гарантія 7-15 років",
    text: "Офіційна гарантія на всі вироби та монтажні роботи від виробника",
  },
  {
    icon: "Zap",
    title: "Швидкий монтаж",
    text: "Професійна установка протягом 1-3 днів кваліфікованою бригадою",
  },
  {
    icon: "BadgePercent",
    title: "Вигідні ціни",
    text: "Оптимальне співвідношення ціни та якості. Розстрочка та знижки",
  },
];

export const STATS = [
  { value: 19, suffix: "+", label: "Років на ринку" },
  { value: 5000, suffix: "+", label: "Задоволених клієнтів" },
  { value: 12, suffix: "", label: "Країн експорту" },
  { value: 2374, suffix: "", label: "Точок продажу" },
];

export const PROCESS_STEPS = [
  {
    num: "01",
    title: "Заявка",
    text: "Залиште заявку через форму або зателефонуйте — ми передзвонимо протягом 15 хвилин",
  },
  {
    num: "02",
    title: "Замір",
    text: "Безкоштовний виїзд спеціаліста з точним заміром та консультацією щодо моделей",
  },
  {
    num: "03",
    title: "Виробництво",
    text: "Виготовлення індивідуального замовлення на сучасному європейському обладнанні",
  },
  {
    num: "04",
    title: "Монтаж",
    text: "Професійна установка фахівцями за 1-3 дні з гарантією та сервісним обслуговуванням",
  },
];

export const TESTIMONIALS = [
  {
    name: "Олена Мельник",
    city: "Вінниця",
    text: "Замовляли вікна Gealan S 9000 для всієї квартири. Якість бездоганна, бригада працювала дуже акуратно. Рекомендую!",
    rating: 5,
  },
  {
    name: "Андрій Коваленко",
    city: "Вінницький р-н",
    text: "Скло Decco 82 — справжня знахідка для нашого котеджу. Тепло і тихо, навіть в сильний дощ нічого не чути. Дякую за професіоналізм!",
    rating: 5,
  },
  {
    name: "Ірина Левченко",
    city: "Вінниця",
    text: "Дуже задоволені балконним блоком. Заміри робили швидко, монтаж — ще швидше. Все чисто, без зайвого пилу. 10/10",
    rating: 5,
  },
  {
    name: "Михайло Петренко",
    city: "Калинівка",
    text: "Брали ролети та москітні сітки. Все встановили за один день, ціна порадувала. Тепер захищені від комах і сонця.",
    rating: 5,
  },
  {
    name: "Тетяна Грищук",
    city: "Вінниця",
    text: "Вхідні двері поставили рік тому — жодних нарікань. Виглядає стильно, тримає тепло чудово. Спасибі команді!",
    rating: 5,
  },
];

export const FAQ_ITEMS = [
  {
    q: "Чому немає цін?",
    a: "Ціни на вікна не вказуються заздалегідь, оскільки кожне вікно виготовляється індивідуально, з урахуванням ваших потреб і розмірів. Ми оптимізуємо матеріали, щоб не лише забезпечити високу якість, а й запропонувати вам найкращу ціну. Зв'яжіться з нами для точного розрахунку.",
  },
  {
    q: "Чому немає в наявності готових вікон?",
    a: "Готових вікон на складі немає, бо ми виготовляємо їх спеціально для вас, враховуючи унікальні розміри та ваші побажання. Це дозволяє забезпечити ідеальне поєднання функціональності та естетики.",
  },
  {
    q: "Як відрізнити енергозберігаючий склопакет від звичайного?",
    a: "Якщо запалити запальничку біля скла, енергозберігаюче скло відображатиме вогник іншим кольором через спеціальне покриття. Воно допомагає зберігати тепло в приміщенні.",
  },
  {
    q: "Як правильно вибрати металопластикові вікна?",
    a: "Мінімальні вимоги для житлових приміщень — профіль монтажною глибиною не менше 70 мм і двокамерний склопакет, заповнений газом аргон. Якісна фурнітура гарантує зручність використання.",
  },
  {
    q: "Чи складно доглядати за металопластиковими вікнами?",
    a: "Регулярне миття скла та рам м'якою тканиною, періодичне змащування ущільнювачів та фурнітури — все, що потрібно для довговічної роботи ваших вікон.",
  },
  {
    q: "Який термін виготовлення замовлення?",
    a: "Стандартний термін виготовлення — 5-10 робочих днів залежно від складності та обсягу замовлення. Монтаж проводиться протягом 1-3 днів.",
  },
];

export const PARTNERS = [
  "Gealan",
  "Decco",
  "Siegenia",
  "Guardian",
  "Pilkington",
  "Aluprof",
  "Roto",
  "Schirmer",
];

export const GALLERY = [
  "https://images.unsplash.com/photo-1772563139470-9232b4e435c2",
  "https://images.unsplash.com/photo-1638885930125-85350348d266",
  "https://images.unsplash.com/photo-1665150200731-fecf2b2b4160",
  "https://images.unsplash.com/photo-1777108720112-a3ed10a2e778",
  "https://images.unsplash.com/photo-1700308232171-aa0d87ee1a88",
  "https://images.unsplash.com/photo-1758998256408-ab2c9fbec19b",
  "https://images.unsplash.com/photo-1626556504142-f9ec02f05d67",
  "https://images.unsplash.com/photo-1767884161637-799b89e3fc9e",
];
