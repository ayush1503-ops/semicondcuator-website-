import puppeteer from "puppeteer-core";
const exe = "/app/chrome-headless-shell/linux-155.0.8059.39/chrome-headless-shell-linux64/chrome-headless-shell";
const browser = await puppeteer.launch({
  executablePath: exe,
  args: ["--no-sandbox", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--hide-scrollbars"],
});
const page = await browser.newPage();
page.on("pageerror", e => console.log("PAGE ERROR:", String(e).slice(0, 160)));
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 45000 });
await new Promise(r => setTimeout(r, 9000));
const geo = await page.evaluate(() => {
  const el = document.querySelector("section[aria-label^=\"Inside the package\"]");
  if (!el) return null;
  return { top: el.offsetTop, h: el.offsetHeight - window.innerHeight };
});
console.log("geometry:", JSON.stringify(geo));
if (geo) {
  for (const s of [0.8]) {
    await page.evaluate((v) => window.scrollTo({ top: v, behavior: "instant" }), geo.top + geo.h * s);
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: `/tmp/v5_${Math.round(s*100)}.png` });
    console.log("saved", s);
  }
}
await browser.close();
console.log("DONE");
