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
  await expect(page.locator("#submit")).toBeVisible();

  // Navigate to Book Store
  await page.click("text=Book Store");

  // Search book
  await page.fill("#searchBox", "Learning JavaScript Design Patterns");

  // Validate search result
  const bookRow = page.locator(".rt-tr-group");
  await expect(bookRow).toContainText("Learning JavaScript Design Patterns");

  // Capture book details
  const title = await page
    .locator('a[href*="Learning-JavaScript-Design-Patterns"]')
    .textContent();
  const author = await bookRow.locator(".rt-td").nth(2).textContent();
  const publisher = await bookRow.locator(".rt-td").nth(3).textContent();

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
