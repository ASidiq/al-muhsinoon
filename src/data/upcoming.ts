// The next gathering, and the poster shown for it.
//
// The centre publishes a weekly countdown poster in the five weeks before the event
// ("5 Weeks to go!" … "1 Week to go!"). This picks the right one for the week the site
// is built in, and falls back to the save-the-date artwork outside that window —
// both before the countdown starts and after the event has passed.

// `file` names an image in src/assets/upcoming/ — deliberately not a URL. The build
// fingerprints those filenames, and this module stays free of Vite-only syntax so the
// test suite can import it under plain `node --test`. The page resolves file → URL.
export type Poster = { file: string; alt: string; width: number; height: number };

export const EVENT_NAME = '10th Year Anniversary & First Walimatul Qur’an';

/** Event day, as a UTC calendar date. The event itself starts 11:00am on this day. */
export const EVENT_DATE = Date.UTC(2026, 8, 12); // 12 September 2026

export const SAVE_THE_DATE: Poster = {
  file: 'walimatul-quran-save-the-date.jpg',
  alt: `${EVENT_NAME} — save the date, 12th September 2026`,
  width: 1400,
  height: 986,
};

/** Countdown posters, indexed by whole weeks remaining (1–5). */
export const COUNTDOWN_POSTERS: Record<number, Poster> = {
  1: countdown(1),
  2: countdown(2),
  3: countdown(3),
  4: countdown(4),
  5: countdown(5),
};

function countdown(weeks: number): Poster {
  const label = weeks === 1 ? '1wk' : `${weeks}wks`;
  return {
    file: `walimatul-quran-${label}-countdown.jpg`,
    alt: `${EVENT_NAME} — ${weeks} ${weeks === 1 ? 'week' : 'weeks'} to go, 12th September 2026`,
    width: 989,
    height: 1400,
  };
}

const MS_PER_DAY = 86_400_000;

/** Whole days from `now` to the event, counted in calendar days (negative once it has passed). */
export function daysUntilEvent(now: Date, eventDate = EVENT_DATE): number {
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.round((eventDate - today) / MS_PER_DAY);
}

/**
 * The poster to show at `now`:
 * - 0–7 days out  → "1 week to go" (the final week, including the day itself)
 * - 8–35 days out → the matching 2–5 week poster
 * - earlier than 5 weeks, or after the event → the save-the-date artwork
 */
export function posterFor(now: Date, eventDate = EVENT_DATE): Poster {
  const days = daysUntilEvent(now, eventDate);
  if (days < 0) return SAVE_THE_DATE;

  const weeks = Math.max(1, Math.ceil(days / 7));
  return COUNTDOWN_POSTERS[weeks] ?? SAVE_THE_DATE;
}
