// Mock data for Viknar'off Vinnytsia Salon-Shop

export const SITE_CONFIG = {
  brandName: "VIKNAR'OFF",
  badge: "Салон магазин",
  city: "Вінниця",
  address: "м. Вінниця, вул. Замостянська 37",
  phones: ["(068) 723-97-22", "(073) 723-23-22"],
  primaryPhone: "+380687239722",
  primaryPhoneRaw: "380687239722",
  email: "viknaroffvin@gmail.com",
  domain: "viknaroffvin.com",
  workingHours: "Пн-Пт: 9:00 - 18:00 | Сб: 9:00 - 15:00",
  hotline: "0 800 50 53 52",
  telegram: "https://t.me/+380687239722",
  viber: "viber://chat?number=%2B380687239722",
  instagram: "https://www.instagram.com/viknaroffvin",
  facebook: "https://www.facebook.com/share/1AxmhrVBoW/?mibextid=wwXIfr",
  mailto: "mailto:viknaroffvin@gmail.com?subject=Заявка з сайту&body=Доброго дня! Хочу замовити...",
};

export const NAV_MENU = [
  {
    title: "Вікна",
    href: "/catalog/windows",
    submenu: [
      { name: "Усі вікна", href: "/catalog/windows" },
      { name: "Вікна Gealan", href: "/catalog/windows?brand=Gealan" },
      { name: "Вікна Decco", href: "/catalog/windows?brand=Decco" },
      { name: "Алюмінієві вікна", href: "/catalog/windows?brand=Aluprof" },
      { name: "Українські бренди", href: "/catalog/windows?country=Україна" },
      { name: "Енергозберігаючі", href: "/catalog/windows" },
    ],
  },
  {
    title: "Двері",
    href: "/catalog/doors",
    submenu: [
      { name: "Усі двері", href: "/catalog/doors" },
      { name: "Вхідні двері", href: "/product/vhidni-dveri" },
      { name: "Балконні двері", href: "/product/balconni-dveri" },
      { name: "Офісні двері", href: "/product/ofisni-dveri" },
      { name: "Міжкімнатні", href: "/product/mizhkimnatni-dveri" },
      { name: "Алюмінієві двері", href: "/product/alyuminievi-dveri" },
    ],
  },
  {
    title: "Розсувні системи",
    href: "/catalog/sliding",
    submenu: [
      { name: "Усі розсувні", href: "/catalog/sliding" },
      { name: "Алюмінієві", href: "/product/alu-rozsuvni" },
      { name: "Металопластикові", href: "/product/metalo-rozsuvni" },
    ],
  },
  {
    title: "Додаткові продукти",
    href: "/catalog/additional",
    submenu: [
      { name: "Усі аксесуари", href: "/catalog/additional" },
      { name: "Антимоскітні сітки", href: "/product/antimoskitni" },
      { name: "HPL панелі", href: "/product/hpl-paneli" },
      { name: "Підвіконня", href: "/product/pidvikonnya" },
      { name: "Захисні ролети", href: "/product/rolety" },
      { name: "Відливи", href: "/product/vidlyvy" },
      { name: "Фурнітура", href: "/product/furnitura" },
    ],
  },
];

export const HERO_SLIDES = [
  {
    title: "Виготовляємо віконні та дверні системи",
    subtitle: "Які вимикають усе зайве",
    image: "https://images.unsplash.com/photo-1745864049984-08ad9bf9d5d2",
    cta: "Замовити замір",
  },
  {
    title: "Європейська якість у твоєму домі",
    subtitle: "Профілі Gealan, Decco, Aluprof — гарантія 7-15 років",
    image: "https://images.unsplash.com/photo-1736593319421-250e17bb2f11",
    cta: "Дізнатись більше",
  },
  {
    title: "Розсувні системи преміум класу",
    subtitle: "Алюмінієві та металопластикові рішення для тераси",
    image: "https://images.unsplash.com/photo-1572716220309-b3afbd2aea66",
    cta: "Переглянути моделі",
  },
];

export const PRODUCT_CATEGORIES = [
  {
    id: "windows",
    title: "Вікна",
    description: "Енергозберігаючі металопластикові вікна",
    image: "https://images.unsplash.com/photo-1745864049984-08ad9bf9d5d2",
    items: 25,
  },
  {
    id: "doors",
    title: "Двері",
    description: "Вхідні, міжкімнатні, балконні та офісні двері",
    image: "https://images.unsplash.com/photo-1618599527032-31124e95c89f",
    items: 18,
  },
  {
    id: "sliding",
    title: "Розсувні системи",
    description: "Алюмінієві та металопластикові розсувні рішення",
    image: "https://images.unsplash.com/photo-1572716220309-b3afbd2aea66",
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
      { name: "Вікна для дому та котеджу", subtitle: "Великі прорізи · ламінація", image: "https://images.unsplash.com/photo-1745864049984-08ad9bf9d5d2", icon: "Home" },
      { name: "Вікна для квартири", subtitle: "Стандартні розміри · 2-3 камери", image: "https://images.unsplash.com/photo-1758555226274-7b9f5c220b64", icon: "Building2" },
      { name: "Вікна для балкону", subtitle: "Холодне/тепле скління", image: "https://images.unsplash.com/photo-1677073384275-d2ba10667179", icon: "PanelTop" },
      { name: "Вікна для спальні", subtitle: "Шумоізоляція до 42 дБ", image: "https://images.unsplash.com/photo-1675279200694-8529c73b1fd0", icon: "Moon" },
      { name: "Вікна для дитячої кімнати", subtitle: "Дитячі замки безпеки", image: "https://images.unsplash.com/photo-1736593319421-250e17bb2f11", icon: "Baby" },
      { name: "Вікна для тераси", subtitle: "Розсувні панорамні", image: "https://images.unsplash.com/photo-1572716220309-b3afbd2aea66", icon: "Trees" },
    ],
  },
  config: {
    label: "По комплектації",
    items: [
      { name: "Вікна з захистом від шуму", subtitle: "Спецсклопакети до 46 дБ", image: "https://images.unsplash.com/photo-1745864049984-08ad9bf9d5d2", icon: "Volume2" },
      { name: "Вікна з захистом від злому", subtitle: "Фурнітура RC2", image: "https://images.unsplash.com/photo-1736593319421-250e17bb2f11", icon: "Lock" },
      { name: "Вікна з захистом від сонця", subtitle: "Тонування + i-скло", image: "https://images.unsplash.com/photo-1675279200694-8529c73b1fd0", icon: "Sun" },
      { name: "Енергозберігаючі вікна", subtitle: "Аргон + мультифункц. скло", image: "https://images.unsplash.com/photo-1758555226274-7b9f5c220b64", icon: "Zap" },
      { name: "Мультифункціональні вікна", subtitle: "Літо/зима режим", image: "https://images.unsplash.com/photo-1677073384275-d2ba10667179", icon: "Sparkles" },
      { name: "Розсувні вікна", subtitle: "Економія простору", image: "https://images.unsplash.com/photo-1572716220309-b3afbd2aea66", icon: "ArrowLeftRight" },
    ],
  },
  design: {
    label: "По дизайну",
    items: [
      { name: "Арочні вікна", subtitle: "Класичні форми", image: "https://images.unsplash.com/photo-1745864049984-08ad9bf9d5d2", icon: "Sparkle" },
      { name: "Трикутні вікна", subtitle: "Мансардні рішення", image: "https://images.unsplash.com/photo-1736593319421-250e17bb2f11", icon: "Triangle" },
      { name: "Круглі вікна", subtitle: "Декоративний акцент", image: "https://images.unsplash.com/photo-1675279200694-8529c73b1fd0", icon: "Circle" },
      { name: "Вікна ламіновані", subtitle: "50+ кольорів Renolit", image: "https://images.unsplash.com/photo-1702041846955-940327c1fd03", icon: "Palette" },
      { name: "Вікна з шпросами", subtitle: "Розкладка під класику", image: "https://images.unsplash.com/photo-1758555226274-7b9f5c220b64", icon: "Grid3x3" },
      { name: "Нестандартні вікна", subtitle: "Будь-яка геометрія", image: "https://images.unsplash.com/photo-1677073384275-d2ba10667179", icon: "Shapes" },
    ],
  },
  brand: {
    label: "По бренду",
    items: [
      { name: "Вікна Gealan", subtitle: "Німеччина · 6-7 камер", image: "https://images.unsplash.com/photo-1745864049984-08ad9bf9d5d2", icon: "Award" },
      { name: "Вікна Decco", subtitle: "Польща · преміум", image: "https://images.unsplash.com/photo-1736593319421-250e17bb2f11", icon: "Award" },
      { name: "Вікна Aluprof", subtitle: "Польща · алюміній", image: "https://images.unsplash.com/photo-1572716220309-b3afbd2aea66", icon: "Award" },
      { name: "Вікна REHAU", subtitle: "Німеччина · класика", image: "https://images.unsplash.com/photo-1758555226274-7b9f5c220b64", icon: "Award" },
      { name: "Вікна WDS", subtitle: "Україна · оптимально", image: "https://images.unsplash.com/photo-1675279200694-8529c73b1fd0", icon: "Award" },
      { name: "Вікна OpenTeck", subtitle: "Україна · популярне", image: "https://images.unsplash.com/photo-1677073384275-d2ba10667179", icon: "Award" },
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
  { src: "https://images.unsplash.com/photo-1745864049984-08ad9bf9d5d2", title: "Котедж у Вінниці", category: "Приватний дім", tag: "Gealan S 9000" },
  { src: "https://images.unsplash.com/photo-1758555226274-7b9f5c220b64", title: "Кухня з панорамним вікном", category: "Квартира", tag: "REHAU SYNEGO" },
  { src: "https://images.unsplash.com/photo-1675279200694-8529c73b1fd0", title: "Спальня з шумоізоляцією", category: "Квартира", tag: "Decco 82" },
  { src: "https://images.unsplash.com/photo-1736593319421-250e17bb2f11", title: "Енергозберігаючі вікна", category: "Котедж", tag: "WDS 8S" },
  { src: "https://images.unsplash.com/photo-1572716220309-b3afbd2aea66", title: "Терасні розсувні портали", category: "Тераса", tag: "Aluprof MB-86" },
  { src: "https://images.unsplash.com/photo-1677073384275-d2ba10667179", title: "Балконне скління", category: "Балкон", tag: "MegaLine 600" },
  { src: "https://images.unsplash.com/photo-1618599527032-31124e95c89f", title: "Вхідні двері котеджу", category: "Двері", tag: "Gealan + RC2" },
  { src: "https://images.unsplash.com/photo-1702041846955-940327c1fd03", title: "Ламіновані під дерево", category: "Декор", tag: "Renolit Anteak" },
];
