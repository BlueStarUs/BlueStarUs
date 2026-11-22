import type { TeamMember } from "@/components/sections/TeamMembersGrid";

/** Blue Stars team: shared by the About page and the homepage team introduction. */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Dr. Amy Morgenstern",
    role: "Founder & Principal Consultant",
    credentials: "Ph.D. in Philosophy, MFA in Contemporary Art",
    bio: "Dr. Amy Morgenstern (“Dr. M”) is the Founder of Blue Stars Admissions Consulting, established in 2010 to serve students and families navigating complex and competitive college admissions landscapes. A first-generation college student, Dr. M holds a Ph.D. in philosophy and an MFA in contemporary art. She is a former professor of philosophy, honors program associate director, and assistant to the director of an international academic and cultural studies program. Fluent in German, she served as a dissertation fellow in Germany for two years. As an award-winning writer, cultural theorist, and interdisciplinary artist, she brings deep institutional insight to selective admissions, combining structural analysis with careful narrative development so each student’s application is coherent, intentional, and strategically positioned.",
    image: "/images/teams/Dr_Amy_Morgenstern.png",
    badge: "FOUNDER & PRINCIPAL CONSULTANT",
    affiliations: [
      { name: "HECA", image: "/images/badges/heca-v2.webp" },
      { name: "WACAC", image: "/images/badges/wacac-v2.webp" },
      { name: "IECA", image: "/images/badges/ieca-v2.webp" },
    ],
  },
  {
    name: "Helen Ingerson",
    role: "Senior Counselor & Editor",
    credentials:
      "B.A. Harvard University (Magna Cum Laude, Phi Beta Kappa), MBA Simmons College",
    bio: "A National Merit Scholar and Phi Beta Kappa, Magna Cum Laude graduate of Harvard University, Helen has worked for over a decade with students across the Bay Area as a tutor, coach, and admissions essay editor. Her students appreciate her ability to make them feel heard while preserving their authentic voice and producing concise, standout drafts that earn admission to top colleges. Helen holds California teaching credentials, was an administrator at St. Ann's in NYC (cited by The Wall Street Journal for unmatched admissions success), and brings senior leadership experience from venture capital.",
    image: "/images/teams/Helen-Ingerson-Upscaled.png",
    badge: "SENIOR COUNSELOR & EDITOR",
  },
  {
    name: "Wai Cheng",
    role: "Senior Counselor & Editor",
    credentials:
      "Wharton MBA & M.A. University of Pennsylvania, B.A. Tufts University",
    bio: "A native New Yorker, Wai brings over 10 years of college admissions experience to Blue Stars. Holding a Wharton MBA and Master of International Studies from UPenn and a B.A. in International Relations from Tufts, Wai has helped over 100 students majoring in engineering, natural sciences, and humanities enter dream universities like Yale, MIT, Stanford, Johns Hopkins, Amherst, and NYU. Having served on the Wharton Admissions Office team and in product management at Electronic Arts, Wai is celebrated for his warmth, humor, and empowering student-parent guidance.",
    image: "/images/teams/Wai-Cheng-Headshot.webp",
    badge: "SENIOR COUNSELOR & EDITOR",
  },
  {
    name: "Samuel Ortiz",
    role: "College Admissions Counselor & STEM Specialist",
    credentials: "B.A. & M.A. in English, Former Professor of English",
    bio: "Samuel has advised students who have gone on to attend highly selective universities, including Stanford, UC Berkeley, Yale, Columbia, Duke, Johns Hopkins, Northwestern, and Rice. In the past cycle alone, two of his students were admitted to Stanford in competitive STEM fields (Symbolic Systems, CS, Data Science, and Engineering). Drawing on his background as a college admissions counselor and former professor of English, Samuel helps students discover their unique strengths, build compelling extracurricular profiles, and articulate their intellectual interests through powerful, authentic essays.",
    image: "/images/teams/Samuel-Ortiz.png",
    badge: "COLLEGE ADMISSIONS COUNSELOR",
  },
];
