import puppeteer from 'puppeteer';
import fs from 'node:fs';

const url = process.argv[2] || 'http://localhost:4321/';
const label = process.argv[3];

const dir = './temporary screenshots';
fs.mkdirSync(dir, { recursive: true });

let n = 1;
while (fs.existsSync(`${dir}/screenshot-${n}${label ? '-' + label : ''}.png`)) n++;
const file = `${dir}/screenshot-${n}${label ? '-' + label : ''}.png`;

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle0' });
await page.screenshot({ path: file, fullPage: true });
await browser.close();

console.log(file);
