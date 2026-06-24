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
  firstProduct: {
    id: 1,
    name: "Blue Top",
    category: "Women > Tops",
    price: "Rs. 500",
    availability: "In Stock",
    condition: "New",
    brand: "Polo",
  },
  anyProduct: {
    id: 4,
    name: "Stylish Dress",
    quantity: 4,
  },
  singleProductSearch: {
    term: "Blue Top",
    expectedProducts: ["Blue Top"],
  },
  multipleProductSearch: {
    term: "White",
    expectedProducts: [
      "Summer White Top",
      "Sleeves Printed Top - White",
      "Printed Off Shoulder Top - White",
    ],
    expectedCartProducts: [
      {
        id: 6,
        name: "Summer White Top",
        price: "Rs. 400",
        quantity: "1",
        total: "Rs. 400",
      },
      {
        id: 11,
        name: "Sleeves Printed Top - White",
        price: "Rs. 499",
        quantity: "1",
        total: "Rs. 499",
      },
      {
        id: 15,
        name: "Printed Off Shoulder Top - White",
        price: "Rs. 315",
        quantity: "1",
        total: "Rs. 315",
      },
    ],
  },
  productReview: {
    name: "Sayo",
    email: "sayo.review@example.com",
    message: "This is a test product review submitted through Playwright.",
  },
  recommendedProduct: {
    id: 4,
    name: "Stylish Dress",
    price: "Rs. 1500",
    quantity: "1",
    total: "Rs. 1500",
  },
  categoryProducts: {
    women: {
      parent: "Women",
      subcategory: "Dress",
      id: 1,
    },
    men: {
      parent: "Men",
      subcategory: "Tshirts",
      id: 3,
    },
  },
  brandProducts: {
    first: {
      name: "Polo",
      path: "/brand_products/Polo",
    },
    second: {
      name: "Biba",
      path: "/brand_products/Biba",
    },
  },
  cartProducts: [
    {
      id: 1,
      name: "Blue Top",
      price: "Rs. 500",
      quantity: "1",
      total: "Rs. 500",
    },
    {
      id: 2,
      name: "Men Tshirt",
      price: "Rs. 400",
      quantity: "1",
      total: "Rs. 400",
    },
  ],
  subscription: {
    email: "sayo.subscription@gmail.com",
  },
  checkout: {
    comment: "Please deliver this order carefully.",
  },
  payment: {
    nameOnCard: "Sayoo Nara",
    cardNumber: "4111111111111111",
    cvc: "123",
    expiryMonth: "12",
    expiryYear: "2030",
  },
  invoice: {
    fileName: "invoice.txt",
  },
};

export { testData };
