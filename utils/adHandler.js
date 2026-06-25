const AD_URL_PATTERNS = [
  /googlesyndication\.com/i,
  /googleads\.g\.doubleclick\.net/i,
  /doubleclick\.net/i,
  /adservice\.google\./i,
  /googletagservices\.com/i,
  /googletagmanager\.com/i,
  /google-analytics\.com/i,
  /fundingchoicesmessages\.google\.com/i,
  /\/pagead\//i,
];

const AD_HIDE_CSS = `
  ins.adsbygoogle,
  .adsbygoogle,
  iframe[id*="google_ads"],
  iframe[id*="aswift"],
  iframe[src*="googleads"],
  iframe[src*="doubleclick"],
  [id^="google_ads"],
  [id*="google_ads"],
  [id*="aswift"],
  [aria-label="Advertisement"] {
    display: none !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }
`;

function shouldBlockRequest(url) {
  return AD_URL_PATTERNS.some((pattern) => pattern.test(url));
}

async function blockThirdPartyAds(page) {
  await page.route("**/*", async (route) => {
    const url = route.request().url();

    if (shouldBlockRequest(url)) {
      await route.abort("blockedbyclient");
      return;
    }

    await route.continue();
  });
}

async function installAdStyles(page) {
  await page.addInitScript((css) => {
    function hideAdElements() {
      const selectors = [
        "ins.adsbygoogle",
        ".adsbygoogle",
        'iframe[id*="google_ads"]',
        'iframe[id*="aswift"]',
        'iframe[src*="googleads"]',
        'iframe[src*="doubleclick"]',
        '[id^="google_ads"]',
        '[id*="google_ads"]',
        '[id*="aswift"]',
        '[aria-label="Advertisement"]',
      ];

      for (const selector of selectors) {
        for (const element of document.querySelectorAll(selector)) {
          element.style.setProperty("display", "none", "important");
          element.style.setProperty("visibility", "hidden", "important");
          element.style.setProperty("pointer-events", "none", "important");
        }
      }
    }

    const style = document.createElement("style");
    style.textContent = css;
    document.documentElement.appendChild(style);

    hideAdElements();

    const observer = new MutationObserver(hideAdElements);
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }, AD_HIDE_CSS);
}

async function clickIfVisible(locator) {
  try {
    const firstMatch = locator.first();

    if (await firstMatch.isVisible({ timeout: 500 })) {
      await firstMatch.click({ force: true, timeout: 1_000 });
      return true;
    }
  } catch {
    return false;
  }

  return false;
}

async function dismissBlockingAds(page) {
  const closeLocators = [
    page.getByText("Close", { exact: true }),
    page.getByRole("button", { name: /close/i }),
    page.locator('[aria-label*="Close" i]'),
    page.locator("#dismiss-button"),
    page.locator(".modal button.close"),
    page.locator('button:has-text("×")'),
  ];

  for (let attempt = 0; attempt < 3; attempt++) {
    for (const locator of closeLocators) {
      if (await clickIfVisible(locator)) {
        await page.waitForTimeout(250);
      }
    }

    await page.evaluate((css) => {
      let style = document.querySelector("style[data-test-ad-hide]");

      if (!style) {
        style = document.createElement("style");
        style.setAttribute("data-test-ad-hide", "true");
        document.documentElement.appendChild(style);
      }

      style.textContent = css;
    }, AD_HIDE_CSS).catch(() => {});
  }
}

export { blockThirdPartyAds, dismissBlockingAds, installAdStyles };
