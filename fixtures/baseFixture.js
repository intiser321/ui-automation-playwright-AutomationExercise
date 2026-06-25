import { expect, test as base } from "@playwright/test";
import {
  blockThirdPartyAds,
  dismissBlockingAds,
  installAdStyles,
} from "../utils/adHandler";

const test = base.extend({
  page: async ({ page }, use) => {
    await blockThirdPartyAds(page);
    await installAdStyles(page);

    page.on("framenavigated", async () => {
      await dismissBlockingAds(page);
    });

    await use(page);
  },
});

export { expect, test };
