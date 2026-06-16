import { test as base } from "@playwright/test";
import { AccountApi } from "../api/AccountApi";
import { testData } from "../test-data/testData";

function buildRegisteredUser() {
  return {
    ...testData.userRegistration,
    email: testData.userRegistration.getEmail(),
    deleted: false,
  };
}

async function cleanupAccount(accountApi, user) {
  if (user.deleted) {
    return;
  }

  await accountApi.deleteAccount(user.email, user.password);
}

const test = base.extend({
  registeredUser: async function registeredUserFixture({ request }, use) {
    const accountApi = new AccountApi(request);
    const user = buildRegisteredUser();

    await accountApi.createAccount(user);

    try {
      await use(user);
    } finally {
      await cleanupAccount(accountApi, user);
    }
  },
});

export { test };
