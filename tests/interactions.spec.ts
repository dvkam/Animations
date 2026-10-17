import { test, expect } from "@playwright/test";

for (const demo of ["animated-underline", "img-overlap"]) {
  test(`${demo} activates at the threshold and resets outside the viewport`, async ({ page }) => {
    await page.goto(`/${demo}/`);
    const target = page.locator("[data-active]");
    await expect(target).toHaveAttribute("data-active", "false");
    await (demo === "animated-underline" ? page.locator("h2") : target).scrollIntoViewIfNeeded();
    await expect(target).toHaveAttribute("data-active", "true");
    const observed = demo === "animated-underline" ? page.locator("h2") : target;
    await observed.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      window.scrollBy(0, rect.top - innerHeight + rect.height / 2);
    });
    await expect(target).toHaveAttribute("data-active", "false");
    await observed.scrollIntoViewIfNeeded();
    await expect(target).toHaveAttribute("data-active", "true");
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(target).toHaveAttribute("data-active", "false");
    await (demo === "animated-underline" ? page.locator("h2") : target).scrollIntoViewIfNeeded();
    await expect(target).toHaveAttribute("data-active", "true");
  });
}

const imageCases: [string, string][] = [
  ["3D-image-hover", "Lift the image"],
  ["img-rotate", "Rotate and zoom the image"],
  ["tripple-img-hover", "Fan out the three pictures"],
];
for (const [demo, label] of imageCases) {
  test(`${demo} supports activation and reversal`, async ({ page, isMobile }) => {
    await page.goto(`/${demo}/`);
    const button = page.getByRole("button", { name: label });
    await expect(button).toHaveAttribute("aria-pressed", "false");
    if (isMobile) await button.tap();
    else {
      await button.focus();
      await page.keyboard.press("Enter");
    }
    await expect(button).toHaveAttribute("aria-pressed", "true");
    if (isMobile) await button.tap();
    else await page.keyboard.press("Space");
    await expect(button).toHaveAttribute("aria-pressed", "false");
    if (!isMobile) {
      const moving = demo === "3D-image-hover" ? button : button.locator("img").first();
      const before = await moving.evaluate((element) => getComputedStyle(element).transform);
      await button.hover();
      await expect
        .poll(() => moving.evaluate((element) => getComputedStyle(element).transform))
        .not.toBe(before);
      await page.mouse.move(0, 0);
      await expect
        .poll(() => moving.evaluate((element) => getComputedStyle(element).transform))
        .toBe(before);
    }
  });
}

test("gradient highlight supports keyboard and touch activation", async ({ page, isMobile }) => {
  await page.goto("/underline-gradient/");
  const word = page.getByRole("button", { name: "Pretty" });
  if (isMobile) await word.tap();
  else {
    await word.focus();
    await page.keyboard.press("Enter");
  }
  await expect(word).toHaveAttribute("aria-pressed", "true");
});

test("pointer glow follows pointer without creating style tags", async ({ page, isMobile }) => {
  test.skip(isMobile, "Fine pointer interaction");
  await page.goto("/gradient-button/");
  const button = page.getByRole("button", { name: "Hover me" });
  const count = await page.locator("style").count();
  const position = button.locator("span[aria-hidden]");
  await button.hover({ position: { x: 10, y: 10 } });
  expect(
    Math.abs(
      (await position.evaluate(
        (element) => new DOMMatrix(getComputedStyle(element).transform).m41,
      )) - 10,
    ),
  ).toBeLessThan(1);
  await button.hover({ position: { x: 50, y: 15 } });
  expect(
    Math.abs(
      (await position.evaluate(
        (element) => new DOMMatrix(getComputedStyle(element).transform).m41,
      )) - 50,
    ),
  ).toBeLessThan(1);
  expect(await page.locator("style").count()).toBe(count);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const before = await position.getAttribute("style");
  await button.hover({ position: { x: 70, y: 20 } });
  expect(await position.getAttribute("style")).toBe(before);
});

for (const [demo, phrase] of [
  ["text-wave", "TEXT-WAVE!"],
  ["typewriter", "Lorem ipsum dolor sit amet."],
]) {
  test(`${demo} exposes the complete phrase to assistive technology`, async ({ page }) => {
    await page.goto(`/${demo}/`);
    expect(await page.locator(".demo-content").ariaSnapshot()).toContain(phrase);
  });
}
