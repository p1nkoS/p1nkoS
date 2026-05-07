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

const VO = "https://viknaroff.ua/wp-content/uploads";

export const HERO_SLIDES = [
  {
    title: "Виготовляємо віконні та дверні системи",
    subtitle: "Які вимикають усе зайве",
    image: `${VO}/2024/08/1.-Gealan-9000-1.webp`,
    cta: "Замовити замір",
  },
  {
    title: "Європейська якість у твоєму домі",
    subtitle: "Профілі Gealan, Decco, Aluprof — гарантія 7-15 років",
    image: `${VO}/2024/08/Decco-82-3-scaled-e1771938971151.webp`,
    cta: "Дізнатись більше",
  },
  {
    title: "Розсувні системи преміум класу",
    subtitle: "Алюмінієві та металопластикові рішення для тераси",
    image: `${VO}/2024/06/35bca50cf6e23ca7c41cabde2431ed37.webp`,
    cta: "Переглянути моделі",
  },
];

export const PRODUCT_CATEGORIES = [
  {
    id: "windows",
    title: "Вікна",
    description: "Енергозберігаючі металопластикові вікна",
    image: `${VO}/2024/05/b375f5c9f5e99b5630107979654bb0d8.webp`,
    items: 25,
  },
  {
    id: "doors",
    title: "Двері",
    description: "Вхідні, міжкімнатні, балконні та офісні двері",
    image: `${VO}/2024/07/photo.webp`,
    items: 18,
  },
  {
    id: "sliding",
    title: "Розсувні системи",
    description: "Алюмінієві та металопластикові розсувні рішення",
    image: `${VO}/2024/06/35bca50cf6e23ca7c41cabde2431ed37.webp`,
    items: 12,
  },
  {
    id: "additional",
    title: "Додаткові продукти",
    description: "Москітні сітки, підвіконня, фурнітура та аксесуари",
    image: `${VO}/2024/07/1-1-scaled.webp`,
    items: 30,
  },
];

export const WINDOW_TABS = {
  purpose: {
    label: "По призначенню",
    items: [
      { name: "Вікна для дому та котеджу", subtitle: "Великі прорізи · ламінація", image: `${VO}/2024/09/1-dlya-kotedzhu.webp`, icon: "Home" },
      { name: "Вікна для квартири", subtitle: "Стандартні розміри · 2-3 камери", image: `${VO}/2024/09/2-dlya-kvartiri.webp`, icon: "Building2" },
      { name: "Вікна для балкону", subtitle: "Холодне/тепле скління", image: `${VO}/2024/09/3-dlya-balkonu.webp`, icon: "PanelTop" },
      { name: "Вікна для спальні", subtitle: "Шумоізоляція до 42 дБ", image: `${VO}/2024/09/4-dlya-spalni.webp`, icon: "Moon" },
      { name: "Вікна для дитячої кімнати", subtitle: "Дитячі замки безпеки", image: `${VO}/2024/09/5-dlya-dityachoyi.webp`, icon: "Baby" },
      { name: "Вікна для тераси", subtitle: "Розсувні панорамні", image: `${VO}/2024/09/6-dlya-terasi.webp`, icon: "Trees" },
    ],
  },
  config: {
    label: "По комплектації",
    items: [
      { name: "Вікна з захистом від шуму", subtitle: "Спецсклопакети до 46 дБ", image: `${VO}/2024/10/Vikna-z-zahistom-vid-shumu.webp`, icon: "Volume2" },
      { name: "Вікна з захистом від злому", subtitle: "Фурнітура RC2", image: `${VO}/2024/10/Vikna-z-zahistom-vid-zlomu.webp`, icon: "Lock" },
      { name: "Вікна з захистом від сонця", subtitle: "Тонування + i-скло", image: `${VO}/2024/10/z-zahistom-vid-sontsya.webp`, icon: "Sun" },
      { name: "Енергозберігаючі вікна", subtitle: "Аргон + мультифункц. скло", image: `${VO}/2024/10/Energozberigayuchi-vikna.webp`, icon: "Zap" },
      { name: "Мультифункціональні вікна", subtitle: "Літо/зима режим", image: `${VO}/2024/10/multifunktsionalni.webp`, icon: "Sparkles" },
      { name: "Розсувні вікна", subtitle: "Економія простору", image: `${VO}/2024/08/rozsuvni-sistemi_Montazhna-oblast-1-_1_-1.webp`, icon: "ArrowLeftRight" },
    ],
  },
  design: {
    label: "По дизайну",
    items: [
      { name: "Арочні вікна", subtitle: "Класичні форми", image: `${VO}/2024/09/Arochni-vikna.png`, icon: "Sparkle" },
      { name: "Трикутні вікна", subtitle: "Мансардні рішення", image: `${VO}/2024/07/67919.webp`, icon: "Triangle" },
      { name: "Круглі вікна", subtitle: "Декоративний акцент", image: `${VO}/2024/07/67917.webp`, icon: "Circle" },
      { name: "Вікна ламіновані", subtitle: "50+ кольорів Renolit", image: `${VO}/2024/07/67916.webp`, icon: "Palette" },
      { name: "Вікна з шпросами", subtitle: "Розкладка під класику", image: `${VO}/2024/07/67915.webp`, icon: "Grid3x3" },
      { name: "Нестандартні вікна", subtitle: "Будь-яка геометрія", image: `${VO}/2024/07/67918.webp`, icon: "Shapes" },
    ],
  },
  brand: {
    label: "По бренду",
    items: [
      { name: "Вікна Gealan", subtitle: "Німеччина · 6-7 камер", image: `${VO}/2024/09/gealan-01.jpg`, icon: "Award" },
      { name: "Вікна Decco", subtitle: "Польща · преміум", image: `${VO}/2024/09/Decco.jpg`, icon: "Award" },
      { name: "Вікна Aluprof", subtitle: "Польща · алюміній", image: `${VO}/2024/10/Alyuminiyevi-vikna.webp`, icon: "Award" },
      { name: "Вікна Viknar'off", subtitle: "Україна · власний бренд", image: `${VO}/2024/09/ViknarOFF-01.jpg`, icon: "Award" },
      { name: "Вікна WDS", subtitle: "Україна · оптимально", image: `${VO}/2024/09/4-dlya-spalni.webp`, icon: "Award" },
      { name: "Вікна OpenTeck", subtitle: "Україна · популярне", image: `${VO}/2024/09/2-dlya-kvartiri.webp`, icon: "Award" },
    ],
  },
};

export const WINDOW_MODELS = [
  { name: "Gealan S 9000", badge: "Вибір покупців", soundproof: "до 42 дб", depth: "82,5 мм", chambers: "6", glass: "32, 44, 48 мм", country: "Німеччина", image: `${VO}/2024/08/1.-Gealan-9000-1.webp` },
  { name: "Gealan S 8000", badge: "Вибір покупців", soundproof: "до 42 дб", depth: "74 мм", chambers: "6/5", glass: "24, 44 мм", country: "Німеччина", image: `${VO}/2024/08/2.-Gealan-8000.webp` },
  { name: "Decco 82", badge: "Преміум", soundproof: "до 42 дб", depth: "81 мм", chambers: "6", glass: "44, 48 мм", country: "Польща", image: `${VO}/2024/08/Decco-82-3-scaled-e1771938971151.webp` },
  { name: "NEO 81", badge: "Новинка", soundproof: "до 42 дб", depth: "81 мм", chambers: "7", glass: "44, 50 мм", country: "Україна", image: `${VO}/2024/09/5-dlya-dityachoyi.webp` },
  { name: "MegaLine 600", badge: "Хіт продажів", soundproof: "до 38 дб", depth: "70 мм", chambers: "6", glass: "24, 32, 42 мм", country: "Україна", image: `${VO}/2024/09/2-dlya-kvartiri.webp` },
  { name: "Aluprof MB-86", badge: "Алюміній", soundproof: "до 43 дБ", depth: "77 мм", chambers: "—", glass: "13,5 – 61,5 мм", country: "Польща", image: `${VO}/2024/10/Alyuminiyevi-vikna.webp` },
  { name: "LuxThermo W75", badge: "Алюміній", soundproof: "до 43 дБ", depth: "75 мм", chambers: "—", glass: "28-56 мм", country: "Польща", image: `${VO}/2024/10/multifunktsionalni.webp` },
  { name: "Fenster 500", badge: "Економ", soundproof: "до 32 дб", depth: "60 мм", chambers: "5", glass: "24, 32 мм", country: "Україна", image: `${VO}/2024/09/3-dlya-balkonu.webp` },
  { name: "LWS 3", badge: "Бюджет", soundproof: "до 32 дб", depth: "58 мм", chambers: "3", glass: "24, 34 мм", country: "Україна", image: `${VO}/2024/09/4-dlya-spalni.webp` },
];

export const DOOR_TYPES = [
  { name: "Балконні двері", image: `${VO}/2024/10/balkonni-dveri.webp` },
  { name: "Балконний блок", image: `${VO}/2024/10/balkonnij-blok.webp` },
  { name: "Офісні двері", image: `${VO}/2024/10/ofisni-dveri.webp` },
  { name: "Вхідні пластикові двері", image: `${VO}/2024/10/vhidni-plastikovi-dveri.webp` },
  { name: "Міжкімнатні двері", image: `${VO}/2024/10/mizhkimnatni-plastikovi-dveri.webp` },
  { name: "Двері для котеджу", image: `${VO}/2024/10/dveri-dlya-kotedzhu.webp` },
  { name: "Розсувні двері", image: `${VO}/2024/10/rozsuvni-dveri.webp` },
  { name: "Алюмінієві двері", image: `${VO}/2024/10/alyuminiyevi-dveri.webp` },
];

export const ADDITIONAL_PRODUCTS = [
  { name: "Металопластикові розсувні системи", image: `${VO}/2024/08/rozsuvni-sistemi_Montazhna-oblast-1-_1_-1.webp` },
  { name: "Алюмінієві розсувні системи", image: `${VO}/2024/06/35bca50cf6e23ca7c41cabde2431ed37.webp` },
  { name: "HPL панелі", image: `${VO}/2024/11/1-03-1-scaled.webp` },
  { name: "Антимоскітні сітки", image: `${VO}/2024/10/antimoskitna-sitka-1.webp` },
  { name: "Підвіконня", image: `${VO}/2024/10/Pidvikonnya-ta-vidlivi-1.webp` },
  { name: "Ролети", image: `${VO}/2024/10/dekorativne-pokrittya-1.webp` },
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
  { src: `${VO}/2024/09/1-dlya-kotedzhu.webp`, title: "Котедж у Вінниці", category: "Приватний дім", tag: "Gealan S 9000" },
  { src: `${VO}/2024/09/2-dlya-kvartiri.webp`, title: "Кухня з панорамним вікном", category: "Квартира", tag: "REHAU SYNEGO" },
  { src: `${VO}/2024/10/Vikna-z-zahistom-vid-shumu.webp`, title: "Спальня з шумоізоляцією", category: "Квартира", tag: "Decco 82" },
  { src: `${VO}/2024/10/Energozberigayuchi-vikna.webp`, title: "Енергозберігаючі вікна", category: "Котедж", tag: "WDS 8S" },
  { src: `${VO}/2024/06/35bca50cf6e23ca7c41cabde2431ed37.webp`, title: "Терасні розсувні портали", category: "Тераса", tag: "Aluprof MB-86" },
  { src: `${VO}/2024/09/3-dlya-balkonu.webp`, title: "Балконне скління", category: "Балкон", tag: "MegaLine 600" },
  { src: `${VO}/2024/10/vhidni-plastikovi-dveri.webp`, title: "Вхідні двері котеджу", category: "Двері", tag: "Gealan + RC2" },
  { src: `${VO}/2024/07/67916.webp`, title: "Ламіновані під дерево", category: "Декор", tag: "Renolit Anteak" },
];
