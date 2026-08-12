import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { COUNTDOWN_POSTERS, EVENT_DATE, SAVE_THE_DATE, daysUntilEvent, posterFor } from '../src/data/upcoming.ts';

/** A Date `days` before the event, at the given UTC hour. */
const before = (days: number, hour = 12) => new Date(EVENT_DATE - days * 86_400_000 + hour * 3_600_000);

describe('daysUntilEvent', () => {
  it('counts calendar days, not elapsed hours', () => {
    assert.equal(daysUntilEvent(before(10, 0)), 10);
    assert.equal(daysUntilEvent(before(10, 23)), 10);
  });

  it('is 0 on the day of the event and negative after it', () => {
    assert.equal(daysUntilEvent(before(0)), 0);
    assert.equal(daysUntilEvent(before(-1)), -1);
  });
});

describe('posterFor', () => {
  it('shows the save-the-date poster before the countdown starts', () => {
    assert.equal(posterFor(before(36)).src, SAVE_THE_DATE.src);
    assert.equal(posterFor(before(90)).src, SAVE_THE_DATE.src);
    assert.equal(posterFor(new Date('2026-01-01T09:00:00Z')).src, SAVE_THE_DATE.src);
  });

  it('shows the matching countdown poster in each of the five weeks before', () => {
    const cases: [days: number, weeks: number][] = [
      [35, 5],
      [29, 5],
      [28, 4],
      [22, 4],
      [21, 3],
      [15, 3],
      [14, 2],
      [8, 2],
      [7, 1],
      [1, 1],
    ];

    for (const [days, weeks] of cases) {
      assert.equal(
        posterFor(before(days)).src,
        COUNTDOWN_POSTERS[weeks].src,
        `${days} days out should show the ${weeks}-week poster`,
      );
    }
  });

  it('still shows the 1-week poster on the day of the event', () => {
    assert.equal(posterFor(before(0)).src, COUNTDOWN_POSTERS[1].src);
    assert.equal(posterFor(before(0, 23)).src, COUNTDOWN_POSTERS[1].src);
  });

  it('falls back to the save-the-date poster once the event has passed', () => {
    assert.equal(posterFor(before(-1)).src, SAVE_THE_DATE.src);
    assert.equal(posterFor(before(-7)).src, SAVE_THE_DATE.src);
    assert.equal(posterFor(new Date('2027-03-01T00:00:00Z')).src, SAVE_THE_DATE.src);
  });

  it('crosses each week boundary exactly once', () => {
    const seen = new Set<string>();
    for (let days = 40; days >= -2; days--) seen.add(posterFor(before(days)).src);

    assert.deepEqual(
      [...seen].sort(),
      [SAVE_THE_DATE.src, ...Object.values(COUNTDOWN_POSTERS).map((p) => p.src)].sort(),
      'every poster should be reachable across the run-up',
    );
  });

  it('works against any event date, not just the hard-coded one', () => {
    const eid = Date.UTC(2027, 2, 20);
    const twoWeeksBefore = new Date(eid - 14 * 86_400_000);

    assert.equal(posterFor(twoWeeksBefore, eid).src, COUNTDOWN_POSTERS[2].src);
    assert.equal(posterFor(new Date(eid + 86_400_000), eid).src, SAVE_THE_DATE.src);
  });
});
