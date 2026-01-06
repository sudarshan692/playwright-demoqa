const { test, expect, request } = require("@playwright/test");

let userId;

test.describe.serial("ReqRes API tests", () => {
  test("Create User - POST", async ({ request }) => {
    const response = await request.post("https://reqres.in/api/users", {
      data: {
        email: "sudarshan.bluth@reqres.in",
        first_name: "Sudarshan",
        last_name: "Bluth",
        avatar: "https://reqres.in/img/faces/1-image.jpg",
      },
    });
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    userId = responseBody.id;
    expect(responseBody.first_name).toBe("Sudarshan");
    console.log("User created with ID:", userId);
  });

  test("Get Created User - GET", async ({ request }) => {
    // ensure a user was created in the previous test
    expect(userId).toBeTruthy();
    const response = await request.get(`https://reqres.in/api/users/${userId}`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.data).toBeTruthy();
  });

  test("Update User - PUT", async ({ request }) => {
    expect(userId).toBeTruthy();
    const response = await request.put(
      `https://reqres.in/api/users/${userId}`,
      {
        data: {
          first_name: "Sudarshan Updated",
          last_name: "patil",
        },
      }
    );
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.first_name).toBe("Sudarshan Updated");
  });
});
