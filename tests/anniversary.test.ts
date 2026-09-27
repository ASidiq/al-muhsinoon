import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  AWARDEES_PAGE,
  AWARDS,
  BAND_FACES,
  FELICITATIONS,
  GRADUANDS,
  MAGAZINE_PAGE_COUNT,
  PAGE_LABELS,
  pageAlt,
  pageFile,
  wrapPage,
} from '../src/data/anniversary.ts';

describe('wrapPage', () => {
  it('leaves in-range indexes alone', () => {
    assert.equal(wrapPage(0), 0);
    assert.equal(wrapPage(MAGAZINE_PAGE_COUNT - 1), MAGAZINE_PAGE_COUNT - 1);
  });

  it('wraps past either end', () => {
    assert.equal(wrapPage(-1), MAGAZINE_PAGE_COUNT - 1);
    assert.equal(wrapPage(MAGAZINE_PAGE_COUNT), 0);
    assert.equal(wrapPage(-1, 5), 4);
  });
});

describe('page naming', () => {
  it('zero-pads filenames to match src/assets/magazine/', () => {
    assert.equal(pageFile(1), 'page-01.jpg');
    assert.equal(pageFile(32), 'page-32.jpg');
  });

  it('adds the label to alt text only where one exists', () => {
    assert.equal(pageAlt(24), 'Page 24 · Awardees');
    assert.equal(pageAlt(2), 'Page 2');
  });

  it('only labels pages that exist', () => {
    for (const n of Object.keys(PAGE_LABELS).map(Number)) {
      assert.ok(n >= 1 && n <= MAGAZINE_PAGE_COUNT, `label for page ${n}`);
    }
  });
});

describe('content', () => {
  it('has the nine graduands, and the band only shows some of them', () => {
    assert.equal(GRADUANDS.length, 9);
    const slugs = new Set(GRADUANDS.map((g) => g.slug));
    for (const face of BAND_FACES) assert.ok(slugs.has(face), face);
  });

  it('has all 18 award categories, patrons first', () => {
    assert.equal(AWARDS.length, 18);
    assert.equal(AWARDS[0].title, 'Grand Patron Award');
    assert.equal(AWARDS[1].title, 'Patron Award');
  });

  it('points felicitations and awardees at the pages that carry them', () => {
    assert.equal(PAGE_LABELS[AWARDEES_PAGE], 'Awardees');
    for (const f of FELICITATIONS) assert.match(PAGE_LABELS[f.page], /felicitations/i);
  });
});
