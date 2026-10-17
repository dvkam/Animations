import { test, expect } from "@playwright/test";
import { readdirSync } from "node:fs";

const demos = readdirSync("apps", { withFileTypes: true })
  .filter((item) => item.isDirectory())
  .map((item) => item.name);

for (const demo of demos) {
  test(`${demo} renders, fits, and supports motion controls`, async ({ page }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`/${demo}/`);
    await expect(page.locator(".demo-content > *").first()).toBeAttached();
    await page.getByRole("button", { name: "Pause autoplay" }).click();
    await expect(page.getByRole("button", { name: "Resume autoplay" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    const playing = await page
      .locator(".demo-content")
      .evaluate(
        (element) =>
          element
            .getAnimations({ subtree: true })
            .filter(
              (animation) => animation instanceof CSSAnimation && animation.playState === "running",
            ).length,
      );
    expect(playing).toBe(0);
    await page.getByRole("button", { name: "Resume autoplay" }).click();
    await page.getByRole("button", { name: "Restart demo" }).click();
    await page.waitForTimeout(3500);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth + 1,
    );
    expect(overflow).toBe(false);
    for (const img of await page.locator("img").all()) {
      await expect
        .poll(() =>
          img.evaluate(
            (element) =>
              element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
    await page.screenshot({
      path: testInfo.outputPath(`${demo}.png`),
      fullPage: true,
      timeout: 10000,
    });
    expect(errors).toEqual([]);
  });
  test(`${demo} respects reduced motion`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/${demo}/`);
    const running = await page
      .locator(".demo-content")
      .evaluate(
        (element) =>
          element
            .getAnimations({ subtree: true })
            .filter((animation) => animation.playState === "running").length,
      );
    expect(running).toBe(0);
    const hiddenText = await page
      .locator(".demo-content")
      .evaluate(
        (element) =>
          [...element.querySelectorAll("span, p")].filter(
            (node) => node.textContent?.trim() && getComputedStyle(node).opacity === "0",
          ).length,
      );
    expect(hiddenText).toBe(0);
  });
}

test("canvas ends a captured stroke and preserves it on resize", async ({ page, isMobile }) => {
  test.skip(isMobile, "Mouse capture is covered on desktop; touch has a separate test.");
  await page.goto("/canvas/");
  const canvas = page.locator("canvas");
  const bounds = await canvas.boundingBox();
  if (!bounds) throw new Error("Canvas is missing");
  await page.mouse.move(bounds.x + 30, bounds.y + 30);
  await page.mouse.down();
  await page.mouse.move(bounds.x + 100, bounds.y + 70, { steps: 8 });
  await page.mouse.move(5, 5);
  await page.mouse.up();
  const bitmap = () => canvas.evaluate((element: HTMLCanvasElement) => element.toDataURL());
  const before = await bitmap();
  await page.mouse.move(bounds.x + 180, bounds.y + 100);
  expect(await bitmap()).toBe(before);
  await page.setViewportSize({ width: 900, height: 700 });
  await expect
    .poll(() =>
      canvas.evaluate((element: HTMLCanvasElement) => {
        const context = element.getContext("2d");
        return context
          ? context
              .getImageData(0, 0, element.width, element.height)
              .data.some((value) => value > 0)
          : false;
      }),
    )
    .toBe(true);
  await page.getByRole("button", { name: "Clear drawing" }).click();
  expect(
    await canvas.evaluate((element: HTMLCanvasElement) =>
      element
        .getContext("2d")
        ?.getImageData(0, 0, element.width, element.height)
        .data.some((value) => value > 0),
    ),
  ).toBe(false);
});

test("canvas accepts touch input", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Touch device only");
  await page.goto("/canvas/");
  const canvas = page.locator("canvas");
  const bounds = await canvas.boundingBox();
  if (!bounds) throw new Error("Canvas is missing");
  await page.touchscreen.tap(bounds.x + 40, bounds.y + 40);
  expect(
    await canvas.evaluate((element: HTMLCanvasElement) =>
      element
        .getContext("2d")
        ?.getImageData(0, 0, element.width, element.height)
        .data.some((value) => value > 0),
    ),
  ).toBe(true);
});

test("gradient words remain visible without network access", async ({ page }) => {
  await page.route("https://**", (route) => route.abort());
  await page.goto("/underline-gradient/");
  await expect(page.getByText("Pretty", { exact: true })).toBeVisible();
  await expect(page.getByText("one is on Multiple Lines!", { exact: true })).toBeVisible();
});
