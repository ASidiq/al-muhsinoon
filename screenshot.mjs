import puppeteer from 'puppeteer';
import fs from 'node:fs';

const positional = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const flags = Object.fromEntries(
  process.argv
    .slice(2)
    .filter((a) => a.startsWith('--'))
    .map((a) => {
      const [key, value = 'true'] = a.slice(2).split('=');
      return [key, value];
    })
);

const url = positional[0] || 'http://localhost:4321/';
const label = positional[1];
const width = Number(flags.width) || 1440;
const height = Number(flags.height) || 900;
const scrollTo = flags['scroll-to'];

const dir = './temporary screenshots';
fs.mkdirSync(dir, { recursive: true });

let n = 1;
while (fs.existsSync(`${dir}/screenshot-${n}${label ? '-' + label : ''}.png`)) n++;
const file = `${dir}/screenshot-${n}${label ? '-' + label : ''}.png`;

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width, height });
await page.goto(url, { waitUntil: 'networkidle0' });

if (scrollTo) {
  await page.evaluate(
    (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' }),
    scrollTo
  );
  await new Promise((r) => setTimeout(r, 150));
} else {
  // fullPage capture resizes the viewport instantly, which races lazy-loaded
  // images that were below the fold — give them a beat to fetch and decode.
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise((r) => setTimeout(r, 400));
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 400));
}

await page.screenshot({ path: file, fullPage: !scrollTo });
await browser.close();

console.log(file);
