const testData = {
  userRegistration: {
    getEmail: () =>
      `sayo${Date.now()}${Math.floor(Math.random() * 10000)}@gmail.com`,
    name: "Sayoo",
    title: "Mr.",
    password: "password123!",
    dateOfBirth: {
      day: "17",
      month: "10",
      year: "2000",
    },
    firstName: "Sayoo",
    lastName: "Nara",
    company: "abcd",
    firstAddress: "Mirpur",
    secondAddress: "2",
    country: "Singapore",
    city: "Dhaka",
    state: "Dhaka",
    zipcode: "1210",
    mobile: "9998887776",
  },
  userLogin: {
    validLogin: {
      validEmail: "itsavalidemail123@gmail.com",
      validPassword: "password",
      name: "Sayonara",
    },
    invalidLogin: {
      invalidEmail: "invalidemail@gmail.com",
      invalidPassword: "invalid",
    },
  },
  contactUsInfo: {
    name: "Sayo",
    email: "sayo@gmail.com",
    subject: "This is a test subject",
    message: "Hello there",
  },
};

export { testData };
