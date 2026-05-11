// Mock data for Viknar'off Vinnytsia Salon-Shop

export const SITE_CONFIG = {
  brandName: "VIKNAR'OFF",
  badge: "Салон магазин",
  city: "Вінниця",
  address: "м. Вінниця, вул. Замостянська 37",
  phones: ["(068) 723-97-22"],
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
      { name: "Вікна Viknar'off", href: "/catalog/windows?brand=Viknar%27off" },
      { name: "Українські бренди", href: "/catalog/windows?country=Україна" },
      { name: "Енергозберігаючі", href: "/catalog/windows" },
    ],
  },
  {
    title: "Двері",
    href: "/catalog/doors",
    submenu: [
      { name: "Усі двері", href: "/catalog/doors" },
      { name: "Вхідні двері", href: "/product/vhidni-pvc-dveri" },
      { name: "Балконні двері", href: "/product/balconni-dveri" },
      { name: "Офісні двері", href: "/product/ofisni-dveri" },
      { name: "Міжкімнатні", href: "/product/mizhkimnatni-dveri" },
    ],
  },
  {
    title: "Розсувні системи",
    href: "/catalog/sliding",
    submenu: [
      { name: "Усі розсувні", href: "/catalog/sliding" },
      { name: "Металопластикові", href: "/catalog/sliding?type=pvc" },
      { name: "HST портали", href: "/product/hst-portal" },
      { name: "PSK портали", href: "/product/psk-portal" },
    ],
  },
  {
    title: "Алюмінієві конструкції",
    href: "/catalog/aluminum",
    submenu: [
      { name: "Усі алюмінієві", href: "/catalog/aluminum" },
      { name: "Алюмінієві вікна", href: "/product/aluprof-mb86" },
      { name: "Алюмінієві двері", href: "/product/alyuminievi-dveri" },
      { name: "Розсувні системи", href: "/product/mb-77hs" },
      { name: "Офісні двері", href: "/product/ofisni-dveri" },
      { name: "Захисні ролети", href: "/product/rolety" },
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
const L = "/viknaroff_photos";

export const HERO_SLIDES = []; // legacy — Hero now uses local lifestyle photos directly

export const PRODUCT_CATEGORIES = []; // legacy — replaced by CATEGORIES from products.js

export const WINDOW_TABS = {
  purpose: {
    label: "По призначенню",
    items: [
      { name: "Вікна для дому та котеджу", subtitle: "Великі прорізи · ламінація", image: `${L}/windows_for_house/windows_for_house_01.jpg`, icon: "Home" },
      { name: "Вікна для квартири", subtitle: "Стандартні розміри · 2-3 камери", image: `${L}/windows_for_flat/windows_for_flat_01.jpg`, icon: "Building2" },
      { name: "Вікна для балкону", subtitle: "Холодне/тепле скління", image: `${L}/windows_for_balcony/windows_for_balcony_01.jpg`, icon: "PanelTop" },
      { name: "Вікна для спальні", subtitle: "Шумоізоляція до 42 дБ", image: `${L}/windows_for_bedroom/windows_for_bedroom_01.jpg`, icon: "Moon" },
      { name: "Вікна для дитячої кімнати", subtitle: "Дитячі замки безпеки", image: `${L}/windows_for_kids/windows_for_kids_01.jpg`, icon: "Baby" },
      { name: "Вікна для тераси", subtitle: "Розсувні панорамні", image: `${L}/windows_for_terrace/windows_for_terrace_01.jpg`, icon: "Trees" },
    ],
  },
  config: {
    label: "По комплектації",
    items: [
      { name: "Вікна з захистом від шуму", subtitle: "Спецсклопакети до 46 дБ", image: `${L}/soundproof_windows/soundproof_windows_01.jpg`, icon: "Volume2" },
      { name: "Вікна з захистом від злому", subtitle: "Фурнітура RC2", image: `${L}/security_windows/security_windows_01.jpg`, icon: "Lock" },
      { name: "Вікна з захистом від сонця", subtitle: "Тонування + i-скло", image: `${L}/tinted_windows/tinted_windows_01.jpg`, icon: "Sun" },
      { name: "Енергозберігаючі вікна", subtitle: "Аргон + мультифункц. скло", image: `${L}/windows_energy_saving/windows_energy_saving_01.jpg`, icon: "Zap" },
      { name: "Мультифункціональні вікна", subtitle: "Літо/зима режим", image: `${L}/windows_multifunction/windows_multifunction_01.jpg`, icon: "Sparkles" },
      { name: "Розсувні вікна", subtitle: "Економія простору", image: `${L}/sliding_pvc/sliding_pvc_01.jpg`, icon: "ArrowLeftRight" },
    ],
  },
  design: {
    label: "По дизайну",
    items: [
      { name: "Арочні вікна", subtitle: "Класичні форми", image: `${L}/arch_windows/arch_windows_01.jpg`, icon: "Sparkle" },
      { name: "Трикутні вікна", subtitle: "Мансардні рішення", image: `${L}/triangle_windows/triangle_windows_01.jpg`, icon: "Triangle" },
      { name: "Круглі вікна", subtitle: "Декоративний акцент", image: `${L}/round_windows/round_windows_01.jpg`, icon: "Circle" },
      { name: "Вікна ламіновані", subtitle: "50+ кольорів Renolit", image: `${L}/windows_laminated/windows_laminated_01.jpg`, icon: "Palette" },
      { name: "Вікна з шпросами", subtitle: "Розкладка під класику", image: `${L}/windows_general/windows_general_01.jpg`, icon: "Grid3x3" },
      { name: "Нестандартні вікна", subtitle: "Будь-яка геометрія", image: `${L}/windows_for_terrace/windows_for_terrace_02.jpg`, icon: "Shapes" },
    ],
  },
  brand: {
    label: "По бренду",
    items: [
      { name: "Вікна Gealan", subtitle: "Німеччина · 6-7 камер", image: `${L}/windows_gealan_general/windows_gealan_general_01.jpg`, icon: "Award" },
      { name: "Вікна Decco", subtitle: "Польща · преміум", image: `${L}/windows_decco82/windows_decco82_01.jpg`, icon: "Award" },
      { name: "Вікна Fenster 500", subtitle: "Україна · 5 камер", image: `${L}/windows_fen500/windows_fen500_01.jpg`, icon: "Award" },
      { name: "Вікна MegaLine 600", subtitle: "Україна · хіт продажів", image: `${L}/windows_mega600/windows_mega600_01.jpg`, icon: "Award" },
      { name: "Вікна NEO 81", subtitle: "Україна · 7 камер", image: `${L}/windows_neo81/windows_neo81_01.jpg`, icon: "Award" },
      { name: "Вікна LWS 3", subtitle: "Україна · бюджет", image: `${L}/windows_lws3/windows_lws3_01.jpg`, icon: "Award" },
    ],
  },
};

export const WINDOW_MODELS = []; // legacy — replaced by PRODUCTS from products.js

export const DOOR_TYPES = []; // legacy

export const ADDITIONAL_PRODUCTS = []; // legacy

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
    q: "Який профіль ви використовуєте для вікон?",
    a: "Ми використовуємо високоякісні європейські та власні профільні системи (Gealan, Decco, Viknar'off) від 4 до 7 камер, які відповідають усім сучасним стандартам енергоефективності.",
  },
  {
    q: "Яка гарантія на вікна Viknar'off?",
    a: "Ми надаємо офіційну гарантію від заводу-виробника від 7 до 15 років на віконні конструкції за умови дотримання правил експлуатації та професійного монтажу нашими спеціалістами.",
  },
  {
    q: "Чи можна замовити вікна нестандартної форми чи кольору?",
    a: "Так, ми виготовляємо вікна будь-якої складності: арочні, круглі, трикутні. Також доступна широка палітра ламінації (понад 50 кольорів) та інноваційне покриття Acrylcolor.",
  },
  {
    q: "Який термін виготовлення вікон?",
    a: "Стандартні білі вікна виготовляються від 5-7 робочих днів. Для вікон з ламінацією або конструкцій нестандартних форм термін виготовлення може становити 10-14 днів.",
  },
  {
    q: "Що таке енергозберігаючий склопакет?",
    a: "Це склопакет, у якому одне або кілька стекол мають спеціальне низькоемісійне (i-скло) покриття, а камери заповнені інертним газом (аргоном). Це дозволяє зберегти до 40% більше тепла взимку.",
  },
  {
    q: "Чи надаєте ви послуги з монтажу?",
    a: "Так, наші кваліфіковані майстри виконують професійний монтаж згідно з вимогами ДСТУ. Це гарантує надійність, довговічність конструкцій та збереження офіційної гарантії.",
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
  { src: `${VO}/2024/09/2-dlya-kvartiri.webp`, title: "Кухня з панорамним вікном", category: "Квартира", tag: "Viknar'off" },
  { src: `${VO}/2024/10/Vikna-z-zahistom-vid-shumu.webp`, title: "Спальня з шумоізоляцією", category: "Квартира", tag: "Decco 82" },
  { src: `${VO}/2024/10/Energozberigayuchi-vikna.webp`, title: "Енергозберігаючі вікна", category: "Котедж", tag: "WDS 8S" },
  { src: `${VO}/2024/06/35bca50cf6e23ca7c41cabde2431ed37.webp`, title: "Терасні розсувні портали", category: "Тераса", tag: "Aluprof MB-86" },
  { src: `${VO}/2024/09/3-dlya-balkonu.webp`, title: "Балконне скління", category: "Балкон", tag: "MegaLine 600" },
  { src: `${VO}/2024/10/vhidni-plastikovi-dveri.webp`, title: "Вхідні двері котеджу", category: "Двері", tag: "Gealan + RC2" },
  { src: `${VO}/2024/07/67916.webp`, title: "Ламіновані під дерево", category: "Декор", tag: "Renolit Anteak" },
];
