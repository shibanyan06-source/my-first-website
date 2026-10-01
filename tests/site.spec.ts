import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [320, 375, 768, 1024, 1440]) {
  test(`layout and assets at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("response", (response) => {
      if (response.status() >= 400) errors.push(response.url());
    });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "人の可能性を",
    );
    for (const fontSize of ["100%", "200%"]) {
      await page.evaluate((size) => {
        document.documentElement.style.fontSize = size;
      }, fontSize);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
    expect(errors).toEqual([]);
  });
}

test("theme tabs support pointer and arrow-key navigation", async ({
  page,
}) => {
  await page.goto("/");
  const tabs = page.getByRole("tab");
  await tabs.nth(1).click();
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText(
    "すでにある価値を探す",
  );
  await tabs.nth(1).press("ArrowRight");
  await expect(tabs.nth(2)).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText(
    "受け取る側の間をつなぐ",
  );
  await tabs.nth(2).press("Home");
  await expect(tabs.nth(0)).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText(
    "ひとりの人から考える",
  );
  await tabs.nth(0).press("ArrowLeft");
  await expect(tabs.nth(2)).toBeFocused();
});

test("mobile navigation closes after selection and Escape returns focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const button = page.getByRole("button", { name: "メニューを開く" });
  await button.click();
  const nav = page.getByRole("navigation", { name: "モバイルナビゲーション" });
  await expect(nav).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(button).toBeFocused();
  await expect(nav).toBeHidden();
  await button.click();
  await nav.getByRole("link", { name: "Experience" }).click();
  await expect(page).toHaveURL(/#experience$/);
  await expect(nav).toBeHidden();
});

test("keyboard skip, FAQ and reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "本文へ移動" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  await page.getByText("仕事の相談はできますか？", { exact: true }).click();
  await expect(
    page.getByText(
      "公開用の連絡先は現在準備中です。受付方法が整い次第、このページでお知らせします。",
      { exact: true },
    ),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  expect(
    await page
      .locator(".orbit-satellite")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
});

test("no automated WCAG A/AA violations on default, changed tab and mobile menu", async ({
  page,
}) => {
  await page.goto("/");
  const audit = () =>
    new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
  expect((await audit()).violations).toEqual([]);
  await page.getByRole("tab").nth(2).click();
  expect((await audit()).violations).toEqual([]);
  await page.setViewportSize({ width: 375, height: 812 });
  await page.getByRole("button", { name: "メニューを開く" }).click();
  expect((await audit()).violations).toEqual([]);
});

test("metadata and contact represent the real profile", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/柴谷由佳/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /インフルエンサーマーケティング/,
  );
  const shareImage = await page.request.get("/share-image.png");
  expect(shareImage.ok()).toBe(true);
  expect(shareImage.headers()["content-type"]).toContain("image/png");
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
  await expect(page.locator("#contact")).toContainText(
    "お問い合わせ窓口は準備中です",
  );
});

test("core profile and FAQ remain available without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3000/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("#experience article")).toHaveCount(3);
  await page.getByText("どのような経験がありますか？", { exact: true }).click();
  await expect(page.locator("details[open]")).toContainText("小売");
  await context.close();
});

test("reading position follows navigation without covering the section heading", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const navigation = page.getByRole("navigation", {
    name: "メインナビゲーション",
    exact: true,
  });
  await navigation
    .getByRole("link", { name: "Experience", exact: true })
    .click();
  await expect(
    navigation.getByRole("link", { name: "Experience", exact: true }),
  ).toHaveAttribute("aria-current", "location");
  const heading = await page.locator("#experience-title").boundingBox();
  const header = await page.locator("header").boundingBox();
  expect(heading!.y).toBeGreaterThan(header!.y + header!.height);
  await navigation.getByRole("link", { name: "Contact", exact: true }).click();
  await expect(
    navigation.getByRole("link", { name: "Contact", exact: true }),
  ).toHaveAttribute("aria-current", "location");
  await expect
    .poll(() =>
      page
        .locator("[data-reading-progress]")
        .evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).a),
    )
    .toBeGreaterThan(0.8);
  await page.getByRole("link", { name: "Back to top", exact: true }).click();
  await expect
    .poll(() =>
      page
        .locator("[data-reading-progress]")
        .evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).a),
    )
    .toBeLessThan(0.01);
});

for (const width of [375, 1440]) {
  test(`every visible page link navigates and focuses its target at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const links = await page
      .locator('a[href^="#"]:visible:not(.skip-link)')
      .all();
    expect(links.length).toBeGreaterThan(4);
    for (const link of links) {
      const fragment = await link.getAttribute("href");
      expect(fragment).toBeTruthy();
      await link.click();
      await expect(page).toHaveURL(new RegExp(`${fragment}$`));
      await expect(page.locator(fragment!)).toBeFocused();
    }
  });
}

test("every mobile menu link works and closes the menu", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "モバイルナビゲーション" });
  for (const label of ["About", "Experience", "Perspective", "Contact"]) {
    await page.getByRole("button", { name: "メニューを開く" }).click();
    const link = nav.getByRole("link", { name: label, exact: true });
    const target = await link.getAttribute("href");
    await link.click();
    await expect(nav).toBeHidden();
    await expect(page.locator(target!)).toBeFocused();
  }
});

test("menu closes with toggle, outside click, logo and desktop resize", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "モバイルナビゲーション" });
  const open = () =>
    page.getByRole("button", { name: "メニューを開く" }).click();
  await open();
  await page.getByRole("button", { name: "メニューを閉じる" }).click();
  await expect(nav).toBeHidden();
  await open();
  await page
    .locator("header")
    .getByRole("link", { name: "Yuka トップへ" })
    .click();
  await expect(nav).toBeHidden();
  await open();
  await page.mouse.click(10, 750);
  await expect(nav).toBeHidden();
  await open();
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(nav).toBeHidden();
  await page.setViewportSize({ width: 375, height: 812 });
  await expect(
    page.getByRole("button", { name: "メニューを開く" }),
  ).toHaveAttribute("aria-expanded", "false");
});

test("all theme buttons have persistent panels and mobile arrow controls", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await expect(page.getByRole("tablist")).toHaveAttribute(
    "aria-orientation",
    "vertical",
  );
  const tabs = page.getByRole("tab");
  for (let index = 0; index < 3; index++) {
    const tab = tabs.nth(index);
    await tab.click();
    await expect(tab).toHaveAttribute("aria-selected", "true");
    const panelId = await tab.getAttribute("aria-controls");
    await expect(page.locator(`#${panelId}`)).toBeVisible();
    await expect(page.getByRole("tabpanel")).toHaveCount(1);
    await expect(page.locator('[role="tabpanel"]')).toHaveCount(3);
  }
  await tabs.nth(2).press("ArrowDown");
  await expect(tabs.nth(0)).toBeFocused();
  await tabs.nth(0).press("ArrowUp");
  await expect(tabs.nth(2)).toBeFocused();
  await tabs.nth(2).press("Home");
  await expect(tabs.nth(0)).toBeFocused();
  await tabs.nth(0).press("End");
  await expect(tabs.nth(2)).toBeFocused();
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(page.getByRole("tablist")).toHaveAttribute(
    "aria-orientation",
    "horizontal",
  );
});

test("every FAQ opens and closes with pointer and keyboard", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const details of await page.locator("details").all()) {
    const summary = details.locator("summary");
    await summary.click();
    await expect(details).toHaveAttribute("open", "");
    await expect(details.locator("p")).toBeVisible();
    await summary.press("Enter");
    await expect(details).not.toHaveAttribute("open");
    await summary.press("Space");
    await expect(details).toHaveAttribute("open", "");
    await summary.click();
    await expect(details).not.toHaveAttribute("open");
  }
});

test("404 recovery link returns to the working profile", async ({ page }) => {
  await page.goto("/404.html");
  await expect(
    page.getByRole("heading", { name: "ページが見つかりません。" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Yukaのプロフィールへ戻る" }).click();
  await expect(page).toHaveURL("http://127.0.0.1:3000/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "人の可能性を",
  );
});
