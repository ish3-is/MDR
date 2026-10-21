import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { publicRoutes } from "../src/lib/seo";
const routes = [
  ...publicRoutes.map((r) => (r === "/" ? r : r + "/")),
  "/portfolio/",
];
test("localized routes load directly, survive reload, and have no broken images or runtime errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const lang of ["", "/en"])
    for (const route of routes) {
      const response = await page.goto(lang + route);
      expect(response?.status(), lang + route).toBe(200);
      await expect(page.locator("main h1")).toHaveCount(1);
      await expect(page.locator("html")).toHaveAttribute(
        "lang",
        lang ? "en" : "ar",
      );
      await expect(page.locator("html")).toHaveAttribute(
        "dir",
        lang ? "ltr" : "rtl",
      );
      const images = await page.locator("img").evaluateAll(async (images) => {
        for (const image of images) image.loading = "eager";
        await Promise.all(
          images.map((image) => image.decode().catch(() => {})),
        );
        return images
          .filter((i) => !i.complete || i.naturalWidth === 0)
          .map((i) => i.src);
      });
      expect(images, lang + route).toEqual([]);
    }
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Work with context",
  );
  expect(errors).toEqual([]);
});
test("language switch preserves current project and query parameters", async ({
  page,
}) => {
  await page.goto("/projects/?q=Wazuh&category=cyber");
  await page.getByRole("link", { name: "Switch to English" }).click();
  await expect(page).toHaveURL(/\/en\/projects\/?\?q=Wazuh&category=cyber/);
  await expect(page.getByLabel("Search projects")).toHaveValue("Wazuh");
  await page.goto("/projects/mizan/");
  await page.getByRole("link", { name: "Switch to English" }).click();
  await expect(page.locator("main h1")).toContainText("MIZAN");
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
});
test("search, combined filters and empty-state reset work", async ({
  page,
}) => {
  await page.goto("/en/projects/");
  await page.getByLabel("Search projects").fill("Wazuh");
  await expect(page.locator(".project-library .project-card")).toHaveCount(3);
  await page.getByLabel("Featured projects only").check();
  await expect(page.locator(".project-library .project-card")).toHaveCount(2);
  await page
    .getByRole("button", { name: "Artificial intelligence", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "No matching projects." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear all filters" }).click();
  await expect(page.locator(".project-library .project-card")).toHaveCount(13);
});
test("quote validation, service preselection, consent and encoded WhatsApp/email review", async ({
  page,
}) => {
  await page.goto("/en/services/cybersecurity/");
  await page.getByRole("link", { name: "Request a quotation" }).click();
  await expect(page.getByLabel("Service required")).toHaveValue(
    "cybersecurity",
  );
  await page.getByRole("button", { name: "Review quotation request" }).click();
  await expect(page.getByLabel("Name or organization")).toBeFocused();
  await expect(page.locator("[aria-invalid=true]")).toHaveCount(5);
  await page.getByLabel("Name or organization").fill("QA MADAR");
  await page.getByLabel("Email or phone number").fill("invalid");
  await page
    .getByLabel("Tell us about your project")
    .fill("A detailed test request with Arabic: مدار & reserved ? # symbols.");
  await page.getByLabel("Expected timeframe").selectOption("soon");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Review quotation request" }).click();
  await expect(
    page.getByText("Enter a valid email address or phone number."),
  ).toBeVisible();
  await page.getByLabel("Email or phone number").fill("qa@example.com");
  await page.getByRole("button", { name: "Review quotation request" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("Your message has not been sent to MADAR");
  const url = new URL(
    (await dialog
      .getByRole("link", { name: "Open WhatsApp" })
      .getAttribute("href"))!,
  );
  expect(url.origin + url.pathname).toBe("https://wa.me/966596073350");
  expect(url.searchParams.get("text")).toContain(
    "مدار & reserved ? # symbols.",
  );
  expect(url.searchParams.get("text")).toContain("Within one month");
  expect(url.searchParams.get("text")).toContain("Cybersecurity solutions");
  const email = new URL(
    (await dialog
      .getByRole("link", { name: "Open email app" })
      .getAttribute("href"))!,
  );
  expect(email.pathname).toBe("edubridge.tech@gmail.com");
  expect(
    await page.evaluate(() => ({
      local: localStorage.length,
      session: sessionStorage.length,
    })),
  ).toEqual({ local: 0, session: 0 });
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Review quotation request" }),
  ).toBeFocused();
});
test("mobile navigation traps focus, closes with Escape and follows links", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "فتح قائمة التنقل" });
  await toggle.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Shift+Tab");
  expect(
    await page.evaluate(() => !!document.activeElement?.closest("dialog")),
  ).toBe(true);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(toggle).toBeFocused();
  await toggle.click();
  await dialog.getByRole("link", { name: "أعمالنا" }).click();
  await expect(page).toHaveURL(/\/projects/);
  await expect(dialog).not.toBeVisible();
});
test("service dropdown supports keyboard, Escape and actual detail routes", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto("/en/");
  const trigger = page.getByRole("button", { name: "Open services menu" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#services-menu")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page
    .locator("#services-menu")
    .getByRole("link", { name: "Digital systems & web apps" })
    .click();
  await expect(page).toHaveURL(/\/en\/services\/digital-systems/);
});
test("team filter and authentic screenshot modal work", async ({ page }) => {
  await page.goto("/en/team/");
  await expect(page.locator(".founder-grid .team-card")).toHaveCount(3);
  await page
    .getByRole("button", { name: "Networks & systems", exact: true })
    .click();
  await expect(page.locator(".contributor-grid .team-card")).toHaveCount(1);
  await expect(page.locator(".contributor-grid")).toContainText("Moath");
  await page.goto("/en/projects/mizan/");
  await page.getByRole("button", { name: "View full screenshot" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator(".full-screenshot")).toHaveJSProperty(
    "naturalWidth",
    1280,
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
test("hero starts silent, pauses when requested and honors reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const video = page.locator("video");
  await expect(video).toHaveJSProperty("muted", true);
  await expect
    .poll(() => video.evaluate((v) => (v as HTMLVideoElement).readyState))
    .toBeGreaterThanOrEqual(2);
  await expect
    .poll(() => video.evaluate((v) => (v as HTMLVideoElement).currentTime), {
      timeout: 15000,
    })
    .toBeGreaterThan(0.3);
  await expect
    .poll(() => video.evaluate((v) => (v as HTMLVideoElement).paused))
    .toBe(false);
  await page.locator("#request-quote").scrollIntoViewIfNeeded();
  await expect(video).toHaveJSProperty("paused", true);
  await page.locator("main h1").scrollIntoViewIfNeeded();
  await expect(video).toHaveJSProperty("paused", false);
  await page.getByRole("button", { name: "إيقاف الفيديو مؤقتًا" }).click();
  await expect(video).toHaveJSProperty("paused", true);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await expect(page.locator("video source")).toHaveCount(0);
  await expect(video).toHaveJSProperty("paused", true);
  await expect(page.locator("video")).toHaveAttribute(
    "poster",
    /madar-poster-preview.webp/,
  );
});
test("a failed WebM source switches to the original MP4", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.route("**/videos/*.webm", (route) => route.abort());
  await page.goto("/");
  await expect(page.locator("video source")).toHaveAttribute(
    "src",
    /madar-welcome-12s.mp4/,
  );
  await expect
    .poll(
      () =>
        page
          .locator("video")
          .evaluate((v) => (v as HTMLVideoElement).currentTime),
      { timeout: 15000 },
    )
    .toBeGreaterThan(0.2);
});
test("skip link and mobile dialog are keyboard accessible", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
  await page.getByRole("button", { name: "Open navigation" }).click();
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(result.violations).toEqual([]);
});
test("media failure keeps poster and visible headings/CTAs", async ({
  page,
}) => {
  await page.route("**/videos/*.webm", (route) => route.abort());
  await page.route("**/videos/*.mp4", (route) => route.abort());
  await page.goto("/");
  await expect(page.locator("main h1")).toBeVisible();
  await expect(page.locator(".hero-actions a")).toHaveCount(2);
  await expect(
    page.locator(".cinema-screen img, .cinema-screen video[poster]"),
  ).toBeVisible();
});
test("responsive layouts have no horizontal overflow in both languages at all required widths", async ({
  page,
}) => {
  for (const width of [360, 390, 768, 1024, 1440, 1920])
    for (const lang of ["", "/en"]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const route of [
        "/",
        "/projects/",
        "/services/",
        "/team/",
        "/contact/",
        "/research/",
      ]) {
        await page.goto(lang + route);
        const result = await page.evaluate(() => ({
          screen: innerWidth,
          body: document.documentElement.scrollWidth,
          bad: [...document.querySelectorAll("main *")]
            .filter((e) => {
              const r = e.getBoundingClientRect();
              return r.width > 0 && (r.right > innerWidth + 2 || r.left < -2);
            })
            .slice(0, 5)
            .map((e) => e.className),
        }));
        expect(
          result.body,
          `${width}px ${lang}${route}: ${JSON.stringify(result.bad)}`,
        ).toBeLessThanOrEqual(width + 1);
      }
    }
});
test("WCAG A/AA automated checks on representative Arabic and English pages", async ({
  page,
}) => {
  for (const route of [
    "/",
    "/en/",
    "/projects/",
    "/en/contact/",
    "/team/",
    "/research/",
  ]) {
    await page.goto(route);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      result.violations,
      route +
        "\n" +
        JSON.stringify(
          result.violations.map((v) => ({
            id: v.id,
            nodes: v.nodes.map((n) => ({
              target: n.target,
              summary: n.failureSummary,
            })),
          })),
          null,
          2,
        ),
    ).toEqual([]);
  }
});
test("capture review screenshots", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.screenshot({
    path: "docs/qa/home-ar-desktop.png",
    fullPage: true,
  });
  await page.goto("/en/");
  await page.screenshot({
    path: "docs/qa/home-en-desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.screenshot({ path: "docs/qa/home-ar-mobile.png", fullPage: true });
  await page.goto("/projects/");
  await page.screenshot({
    path: "docs/qa/projects-mobile.png",
    fullPage: true,
  });
});
