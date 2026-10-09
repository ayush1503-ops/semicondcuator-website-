import puppeteer from "puppeteer-core";
const exe = "/app/chrome-headless-shell/linux-155.0.8059.39/chrome-headless-shell-linux64/chrome-headless-shell";
const browser = await puppeteer.launch({
  executablePath: exe,
  args: ["--no-sandbox", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--hide-scrollbars"],
});
const page = await browser.newPage();
page.on("pageerror", e => console.log("PAGE EXCEPTION:", String(e).slice(0, 180)));
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 45000 });
await new Promise(r => setTimeout(r, 9000));
const geo = await page.evaluate(() => {
  const el = document.querySelector("section[aria-label^=\"Inside the package\"]");
  if (!el) return null;
  return { top: el.offsetTop, h: el.offsetHeight - window.innerHeight, hasCanvas: !!el.querySelector("canvas") };
});
console.log("geometry:", JSON.stringify(geo));
if (geo && geo.hasCanvas) {
  const stops = [0.28, 0.6, 0.8, 0.94];
  for (const s of stops) {
    await page.evaluate((v) => window.scrollTo({ top: v, behavior: "instant" }), geo.top + geo.h * s);
    await new Promise(r => setTimeout(r, 1500));
    const name = `/tmp/v4_${String(Math.round(s*100)).padStart(2,"0")}.png`;
    await page.screenshot({ path: name });
    console.log("saved", name);
  }
}
await browser.close();
console.log("DONE");
