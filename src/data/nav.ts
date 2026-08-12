// Single source of truth for the primary nav — consumed by Nav.astro and Footer.astro
// so the two can never drift out of sync.
export type NavLink = { href: string; label: string; match?: string };

export const navLinks: NavLink[] = [
  { href: '/#mission', label: 'Our Mission' },
  { href: '/programmes', label: 'Programmes', match: '/programmes' },
  { href: '/upcoming', label: 'Upcoming', match: '/upcoming' },
  { href: '/#rhythm', label: 'Weekly Rhythm' },
  { href: '/#visit', label: 'Visit' },
];

export const giveLink: NavLink = { href: '/#give', label: 'Give Sadaqah' };

export function isActive(link: NavLink, pathname: string): boolean {
  if (!link.match) return false;
  const path = pathname.replace(/\/+$/, '') || '/';
  return path === link.match || path.startsWith(`${link.match}/`);
}
