const { test, expect } = require("@playwright/test");
const fs = require("fs");

test("DemoQA Book Store UI Assignment", async ({ page }) => {
  // Navigate to DemoQA
  await page.goto("https://demoqa.com/login");

  // Login (use manually created credentials)
  await page.fill("#userName", "sud@123");
  await page.fill("#password", "Test@123");
  await page.click("#login");

  // Validate username & logout button
  await expect(page.locator("#userName-value")).toHaveText("sud@123");
  await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();

  // Navigate to Book Store
  await page.waitForTimeout(5000);
  await page.getByText('Book Store', { exact: true }).click();

  // Search book
  await page.fill("#searchBox", "Learning JavaScript Design Patterns");

  // Validate search result with book title
  const bookTitle = await page.locator(':text-is("Learning JavaScript Design Patterns")').textContent();
  expect(bookTitle).toBe("Learning JavaScript Design Patterns");

  // Capture book details
  const title = bookTitle;
  const author = await page.locator(':text-is("Addy Osmani")').textContent();
  const publisher = await page.locator("(//div[@class='rt-td'])[4]").textContent();

  // Write details to file
  const data = `
Title: ${title}
Author: ${author}
Publisher: ${publisher}
`;

  fs.writeFileSync("bookDetails.txt", data);
  console.log("Book details written to file");

  // Logout
  await page.click("#submit");
  await expect(page).toHaveURL(/login/);
});
