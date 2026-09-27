// The 10th Anniversary & First Walimatul Qur’an special edition (/anniversary).
//
// Like upcoming.ts, this module stays free of Vite-only syntax so the test suite can
// import it under plain `node --test`. Images are named by file, not URL — the page
// and components resolve them from src/assets/ with import.meta.glob.

/** Turn on once the photos and video from the day are ready. */
export const SHOW_FROM_THE_DAY = false;

/** Served from public/ at a fixed URL so it can be linked and shared. */
export const MAGAZINE_PDF = '/magazine/al-muhsinoon-10th-anniversary.pdf';

/** One image per page in src/assets/magazine/, named page-01.jpg … page-32.jpg. */
export const MAGAZINE_PAGE_COUNT = 32;

/** Page-level captions, used in alt text. Pages without an entry get a bare "Page N". */
export const PAGE_LABELS: Record<number, string> = {
  1: 'Cover · Special Edition',
  3: 'Editorial · A decade of faith, service, community, impact',
  4: 'The journey so far',
  5: 'Heartfelt felicitations · Alhikmah Al Balegah Islamic Organisation',
  6: 'Faces of the 2026 graduands',
  7: 'Walimat-ul Qur’an · Programme of events',
  9: 'Felicitations · Council of Nigerian Muslim Organisations (CNMO), UK',
  10: 'Al-Muhsinoon and the passion for global peace',
  11: 'A sincere tribute to Al-Muhsinoon Islamic Centre',
  12: 'Goodwill message',
  17: 'Felicitations · Zuglool International',
  18: 'When vision becomes legacy',
  19: 'Goodwill message · Old Kent Road Mosque',
  23: 'Our final prayer',
  24: 'Awardees',
  26: 'Felicitations · The Aims Recruitment',
  27: 'Al-Muhsinoon collaborates with Manchester Muslim Youth Network',
  29: 'Felicitation · Roobitah, League of Nigerian Imams and Alfas',
};

/** Page number the Awardees list is printed on. */
export const AWARDEES_PAGE = 24;

/** Filename of page `n` (1-based) in src/assets/magazine/. */
export function pageFile(n: number): string {
  return `page-${String(n).padStart(2, '0')}.jpg`;
}

/** Alt text for page `n` (1-based). */
export function pageAlt(n: number): string {
  const label = PAGE_LABELS[n];
  return label ? `Page ${n} · ${label}` : `Page ${n}`;
}

/** Wrap a 0-based page index into range, so prev on the first page lands on the last. */
export function wrapPage(index: number, count = MAGAZINE_PAGE_COUNT): number {
  return ((index % count) + count) % count;
}

export type Graduand = { name: string; slug: string };

/** Order as read out on the day. Photo: src/assets/anniversary/graduands/g-<slug>.jpg */
export const GRADUANDS: Graduand[] = [
  { name: 'Abdul Adil Albath', slug: 'abdul-adil-albath' },
  { name: 'Amirah Izuagie', slug: 'amirah-izuagie' },
  { name: 'Muyideen Abdul Hannan Albath', slug: 'muyideen-abdul-hannan-albath' },
  { name: 'Erum Yisa', slug: 'erum-yisa' },
  { name: 'Aisha Issah Aigbedion', slug: 'aisha-issah-aigbedion' },
  { name: 'Iklas Opeyemi Abdul', slug: 'iklas-opeyemi-abdul' },
  { name: 'Hajarat Kola Balogun', slug: 'hajarat-kola-balogun' },
  { name: 'Nabella Yisa', slug: 'nabella-yisa' },
  { name: 'Miss Aliyat Garuba', slug: 'aliyat-garuba' },
];

/** The five faces on the home page band, in the order shown. */
export const BAND_FACES = ['abdul-adil-albath', 'amirah-izuagie', 'iklas-opeyemi-abdul', 'muyideen-abdul-hannan-albath', 'aisha-issah-aigbedion'];

export type Felicitation = { org: string; quote: string; page: number };

export const FELICITATIONS: Felicitation[] = [
  {
    org: 'Alhikmah Al Balegah Islamic Organisation',
    quote: 'A decade of unwavering dedication, faith-driven service, and positive impact in the community is truly commendable.',
    page: 5,
  },
  {
    org: 'Council of Nigerian Muslim Organisations (CNMO), UK',
    quote: 'May Almighty Allah continue to bless the organisation.',
    page: 9,
  },
];

export type Award = { title: string; names: string[] };

// Transcribed from page 24 of the magazine. Patron awards first, then the magazine's column order.
export const AWARDS: Award[] = (
  [
    ['Grand Patron Award', ['Sheikh (Dr) Sulaiman Faruq Onikijipa (OON)']],
    ['Patron Award', ['Alhaji Adesina Alabi']],
    ['Community Service and Leadership Award', ['Imam Tajudeen Salami', 'Dr. Ogunfemi Adedoyin', 'Imam Kazeem Wahab', 'Imam Ahmad Abdul Rahman', 'Prof. Moshood Adebayo Baderin', 'Sheik Al-Khaleefa Muyideen', 'Najimudeen Al Kubura', 'Dr. Imiran Alawiye', 'Sheikh Ishaq Ayobami Zuglool Sanusi', 'Sheikh Rasheed Akinwale', 'Abdul Jelil Yinka Oladejo President', 'Prof. Dawud Olatokunbo Noibi', 'Alhaji Musa Animashaun']],
    ['Philanthropy Award', ['Mr. Wasiu Adeshina', 'Dr. Isiaq Adeyemi Morafa', 'Mr Ayotunde Abdul', 'Dr. Toye Ajeigbe']],
    ['Community Service and Philanthropy Award', ['The Khaf Sisters']],
    ['Minding & Mending Enthusiast Award', ['Eng. Ganiyu ’Jide Lawal Shekoni', 'Hajia Latifat Abiola Ayoola Awolesi']],
    ['Minding & Mending Support Award', ['Mrs. Afusat Adeite Elias M.B.E.', 'Alhaji Ganny Folaranmi Durowoju', 'Alhaja Muslimat Adelani', 'Alhaja Mujidat Toyin Mebude']],
    ['Long Service & Dedication Award', ['Dr. Jamiu Adebayo', 'Sheikh Lukman Mukhtar Isalekoto']],
    ['Community Service Award', ['Hadjia Rashidat Hassan', 'Abdul Ganiyu Olawale Hassan', 'Dr. Fatai Gbedemuke', 'MAN Sisters', 'Alhaji Ibrahim Adewusi', 'Mustapha Babtunde Akande', 'Imam Kazeem Wahab', 'Alhaji Abiola Kumoye Aare Musulumi Of United Kigdom', 'Alhaji Ibrahim Adewusi', 'Dr. Mustapha Tunde Salawu', 'Alhaji Ibrahim Kuti', 'Alhaji Munirudeen Ajayi', 'Mulikat Ibrahim', 'Alhaja Sherifat Kamaldeen', 'Elders Group MAN', 'Nafisat Ayefola', 'Alhaji Saheed Jimoh', 'Dr Omodele Sulaiman Salaudeen', 'Alhaji Abraham Atunrase', 'Alhaji Tesleem Tokunbo Omotosho', 'Alhaji Idris Eletu', 'Alhaji Tijani Bello', 'Abraham Atunrase']],
    ['Community Service and Minding & Mending Enthusiast Award', ['Sheikh Muntaqa Abimbade Sanusi Zuglool']],
    ['Dedication Award', ['Adebisi Sadiq', 'Muritala Majolagbe', 'Faoziat Olayinka Ajenifuja']],
    ['Long Service Award', ['Yakub Olasoji']],
    ['Posthumous Long Service & Dedication Award', ['Alhaja Muinat Olabisi Bamgbose']],
    ['Special Support Award', ['Alhaji Moruf Apampa', 'Alhaji Kamal Olawuyi', 'Mr Abdullah Thawaba', 'Noufal Hassan', 'Rubayeth Kamal Ahmed', 'Bashir Otusanya', 'Jubril Ayoola']],
    ['Support & Leadership Award', ['Justice Suleiman Bolaji Belgore']],
    ['Mentoring & Leadership Award', ['Prof. Moshood Adebayo Baderin']],
    ['Consistency Award', ['Alhaji Shamusideen Abayomi Sadiq']],
    ['Ansar Award', ['Sheikh Ahmad Mukhtar (Muhammadu Rosul)']],
  ] as const
).map(([title, names]) => ({ title, names: [...names] }));
