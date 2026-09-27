import type { ImageMetadata } from 'astro';
import { pageFile } from '../data/anniversary';

// Kept apart from src/data/anniversary.ts because import.meta.glob is Vite-only and
// would stop that module loading under `node --test`.
const pages = import.meta.glob<{ default: ImageMetadata }>('../assets/magazine/page-*.jpg', { eager: true });
const graduands = import.meta.glob<{ default: ImageMetadata }>('../assets/anniversary/graduands/g-*.jpg', {
  eager: true,
});

/** Built image for magazine page `n` (1-based). */
export function magazinePage(n: number): ImageMetadata {
  const module = pages[`../assets/magazine/${pageFile(n)}`];
  if (!module) throw new Error(`No magazine page at src/assets/magazine/${pageFile(n)}`);
  return module.default;
}

/** Built portrait for the graduand with this slug. */
export function graduandPhoto(slug: string): ImageMetadata {
  const module = graduands[`../assets/anniversary/graduands/g-${slug}.jpg`];
  if (!module) throw new Error(`No graduand photo at src/assets/anniversary/graduands/g-${slug}.jpg`);
  return module.default;
}
