import type { IconType } from "react-icons"
import {
  FaBaby,
  FaBookOpenReader,
  FaBookQuran,
  FaHandHoldingDollar,
  FaHandHoldingHeart,
  FaMoon,
  FaMosque,
  FaRing,
} from "react-icons/fa6"

export interface ProgrammeImage {
  src: string
  alt: string
}

export interface Programme {
  slug: string
  title: string
  summary: string
  body: string
  icon: IconType
  /** First gallery image also serves as the hero/teaser image. Empty for programmes with no photo archive. */
  gallery: ProgrammeImage[]
}

export const programmes: Programme[] = [
  {
    slug: "jummah-service",
    title: "Jummah Service",
    summary: "Our weekly Friday congregation — the heartbeat of the centre.",
    body: "Our weekly congregational Friday (Jumu'ah) prayer is the heartbeat of the centre, bringing the community together each week for worship and reminder. Service runs from approximately 1:00–1:30pm, with the khutbah delivered by the Imam and visiting scholars. Special editions mark moments such as the new Hijra year.",
    icon: FaMosque,
    gallery: [
      {
        src: "/programmes/jummah-service/jummah-service-03.jpg",
        alt: "Guest speaker in traditional dress addressing the congregation at the lectern during a Jummah Service",
      },
      {
        src: "/programmes/jummah-service/jummah-service-01.jpg",
        alt: "Friday khutbah being delivered at the lectern, Jummah Service 2018",
      },
      {
        src: "/programmes/jummah-service/jummah-service-02.jpg",
        alt: "Congregation gathered for Friday prayer, Jummah Service 2018",
      },
    ],
  },
  {
    slug: "madrasa",
    title: "Madrasa",
    summary: "Weekend Qur'an and Islamic studies for children and young people.",
    body: "Weekend Qur'an and Islamic studies classes for children and young people. Saturday Madrasa and Sunday Madrasa each run from 1:00pm to 3:00pm, teaching Qur'anic recitation, Islamic knowledge, and good character in a welcoming environment.",
    icon: FaBookQuran,
    gallery: [
      {
        src: "/programmes/madrasa/madrasa-01.jpg",
        alt: "Al-Muhsinoon Madrasa winter timetable",
      },
    ],
  },
  {
    slug: "eid-prayer",
    title: "Eid Prayer",
    summary: "One of the largest, most joyful gatherings on our calendar.",
    body: "Every year the community gathers for the Eid congregational prayer and celebration — one of the largest and most joyful events on our calendar, bringing together families from across Manchester. Our archive spans 2017, 2018, and 2019.",
    icon: FaMoon,
    gallery: [
      {
        src: "/programmes/eid-prayer/eid-prayer-01.jpg",
        alt: "Imam addressing the full congregation, Eid Prayer 2019",
      },
      {
        src: "/programmes/eid-prayer/eid-prayer-02.jpg",
        alt: "Father and son making du'a together, Eid Prayer 2017",
      },
      {
        src: "/programmes/eid-prayer/eid-prayer-03.jpg",
        alt: "Large community group photo under the Eid banner, 2018",
      },
      {
        src: "/programmes/eid-prayer/eid-prayer-04.jpg",
        alt: "Two women smiling together, Eid Prayer 2018",
      },
      {
        src: "/programmes/eid-prayer/eid-prayer-05.jpg",
        alt: "Group of women in colourful Eid attire, 2017",
      },
    ],
  },
  {
    slug: "lectures-ramadan-bayaan",
    title: "Lectures & Ramadan Bayaan",
    summary: "Visiting scholars on faith, family, law and community life.",
    body: "Throughout the year the centre hosts lectures and symposiums with visiting scholars and guest speakers, covering faith, family, law, and community life. The flagship event in this strand is our Annual Ramadan Bayaan, which brings respected scholars to deliver in-depth lectures during the blessed month — past editions have featured Prof. Mashood Baderin (Professor of Law, SOAS, University of London) on \"The Benefit of Zakat to Humanity,\" and Dr. Imran Alawiye. All events are open to the community — come one, come all.",
    icon: FaBookOpenReader,
    gallery: [
      {
        src: "/programmes/lectures-ramadan-bayaan/lectures-ramadan-bayaan-01.jpg",
        alt: "Annual Ramadan Bayaan lecture flyer",
      },
      {
        src: "/programmes/lectures-ramadan-bayaan/lectures-ramadan-bayaan-02.jpg",
        alt: "Guest speaker addressing the hall during a Ramadan lecture, 2017",
      },
      {
        src: "/programmes/lectures-ramadan-bayaan/lectures-ramadan-bayaan-03.jpg",
        alt: "1438 AH Ramadan Lecture flyer, 2017",
      },
    ],
  },
  {
    slug: "minding-and-mending",
    title: "Minding & Mending",
    summary: "Our flagship welfare programme — shaping the future of future leaders.",
    body: "Minding & Mending is our flagship welfare and community programme — the charitable heart of Al-Muhsinoon, billed as \"Monthly Family Bonding — shaping the future of future leaders.\" It combines on-the-ground outreach, monthly family-bonding sessions, certificate-awarding for young people, family day trips, and social events — and has grown into \"Minding & Mending on the Road — International.\"",
    icon: FaHandHoldingHeart,
    gallery: [
      {
        src: "/programmes/minding-and-mending/minding-and-mending-01.jpg",
        alt: "Minding & Mending volunteer outreach team in branded orange, 2018",
      },
      {
        src: "/programmes/minding-and-mending/minding-and-mending-02.jpg",
        alt: "Girls receiving their Minding & Mending certificates, 2018",
      },
      {
        src: "/programmes/minding-and-mending/minding-and-mending-03.jpg",
        alt: "Family day trip group at Gulliver's World",
      },
      {
        src: "/programmes/minding-and-mending/minding-and-mending-04.jpg",
        alt: "Volunteer sharing a warm moment with the coach driver, 2018",
      },
      {
        src: "/programmes/minding-and-mending/minding-and-mending-05.jpg",
        alt: "Toddler in a branded Minding & Mending polo shirt, 2018",
      },
    ],
  },
  {
    slug: "zakat-and-sadaqah",
    title: "Zakat & Sadaqah Support",
    summary: "Zakat collected and distributed within the local community.",
    body: "Zakat collected and distributed within the local community — food parcels and emergency hardship grants for the families who need them most.",
    icon: FaHandHoldingDollar,
    gallery: [],
  },
  {
    slug: "aqeeqah-naming-ceremony",
    title: "Aqeeqah & Naming Ceremony",
    summary: "Welcoming newborns into the community with the Sunnah of Aqeeqah.",
    body: "The centre supports families in observing the Sunnah of Aqeeqah and welcoming newborns with a naming ceremony. Our gallery features the naming ceremony of baby Amira — a joyful family occasion held with the community.",
    icon: FaBaby,
    gallery: [
      {
        src: "/programmes/aqeeqah-naming-ceremony/aqeeqah-naming-ceremony-01.jpg",
        alt: "Mother cradling newborn baby Amira at her naming ceremony",
      },
      {
        src: "/programmes/aqeeqah-naming-ceremony/aqeeqah-naming-ceremony-02.jpg",
        alt: "Parents with baby Amira at the naming ceremony",
      },
      {
        src: "/programmes/aqeeqah-naming-ceremony/aqeeqah-naming-ceremony-03.jpg",
        alt: "Naming ceremony moment under the banner for baby Amira",
      },
    ],
  },
  {
    slug: "nikkah",
    title: "Nikkah",
    summary: "Marriage solemnisation within the Islamic tradition.",
    body: "Al-Muhsinoon conducts Nikkah ceremonies, supporting couples to begin married life within the Islamic tradition and surrounded by community. Ceremonies are officiated by the Amir, Imam Munir Ajikanle M. Hussein.",
    icon: FaRing,
    gallery: [
      {
        src: "/programmes/nikkah/nikkah-01.jpg",
        alt: "Signing the Al-Muhsinoon marriage certificate, Nikkah 2016",
      },
      {
        src: "/programmes/nikkah/nikkah-02.jpg",
        alt: "The bride's side signing the marriage register, Nikkah 2016",
      },
      {
        src: "/programmes/nikkah/nikkah-03.jpg",
        alt: "Guests in colourful attire at the Nikkah ceremony, 2016",
      },
      {
        src: "/programmes/nikkah/nikkah-04.jpg",
        alt: "Wide shot of the high table at the Nikkah ceremony, 2016",
      },
    ],
  },
]
