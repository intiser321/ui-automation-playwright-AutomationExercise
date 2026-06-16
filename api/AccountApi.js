import { expect } from "@playwright/test";

class AccountApi {
  constructor(request) {
    this.request = request;
  }

  async createAccount(user) {
    const response = await this.request.post("/api/createAccount", {
      form: {
        name: user.name,
        email: user.email,
        password: user.password,
        title: user.title.replace(".", ""),
        birth_date: user.dateOfBirth.day,
        birth_month: user.dateOfBirth.month,
        birth_year: user.dateOfBirth.year,
        firstname: user.firstName,
        lastname: user.lastName,
        company: user.company,
        address1: user.firstAddress,
        address2: user.secondAddress,
        country: user.country,
        zipcode: user.zipcode,
        state: user.state,
        city: user.city,
        mobile_number: user.mobile,
      },
    });

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(201);
  }

  async deleteAccount(email, password) {
    return this.request.delete("/api/deleteAccount", {
      form: { email, password },
    });
  }
}

export { AccountApi };
