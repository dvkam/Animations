import { test, expect } from "@playwright/test";
import { readdirSync } from "node:fs";

test("playground navigates every demo under the Pages project path", async ({ page, isMobile }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/Animations/");
  for (const slug of readdirSync("apps").filter((name) => name !== "playground")) {
    if (isMobile) await page.getByRole("button", { name: "Choose a demo" }).click();
    const link = page.locator(`nav a[href="#${slug}"]`);
    await link.click();
    await expect(link).toHaveAttribute("aria-current", "page");
    await expect(page.locator("iframe")).toHaveCount(1);
    await expect(page.frameLocator("iframe").locator(".demo-content > *").first()).toBeAttached();
    expect(page.frames()[1]?.url()).toContain(`/Animations/${slug}/`);
    await expect(page.getByRole("link", { name: "Open demo" })).toHaveAttribute(
      "href",
      `./${slug}/`,
    );
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test("deep links, history, width, reload, and reduced motion work", async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/Animations/#text-wave");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Text wave");
  const frame = page.frameLocator("iframe");
  // Scroll the host page before targeting fixed controls inside the nested viewport.
  await page.locator("iframe").scrollIntoViewIfNeeded();
  await frame.getByRole("button", { name: "Pause autoplay" }).click();
  await page.getByRole("button", { name: "Reload preview" }).click();
  await expect(frame.getByRole("button", { name: "Pause autoplay" })).toBeVisible();
  expect(
    await frame
      .locator(".demo-content")
      .evaluate(
        (el) =>
          el
            .getAnimations({ subtree: true })
            .filter((animation) => animation.playState === "running").length,
      ),
  ).toBe(0);
  await page.getByRole("button", { name: "390px", exact: true }).click();
  expect((await page.locator("iframe").boundingBox())?.width).toBeLessThanOrEqual(390);
  if (isMobile) await page.getByRole("button", { name: "Choose a demo" }).click();
  await page.getByRole("link", { name: "Canvas drawing" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Canvas drawing");
  await page.goBack();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Text wave");
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Text wave");
});

test("skip navigation preserves the selected demo and mobile focus stays visible", async ({
  page,
  isMobile,
}) => {
  await page.goto("/Animations/#canvas");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to preview" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("region", { name: "Interactive preview" })).toBeFocused();
  await expect(page).toHaveURL(/#canvas$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Canvas drawing");
  if (isMobile) {
    const menu = page.getByRole("button", { name: "Choose a demo" });
    await menu.click();
    await page.getByRole("link", { name: "Text wave", exact: false }).click();
    await expect(menu).toBeFocused();
    await expect(menu).toHaveAttribute("aria-expanded", "false");
  }
});
