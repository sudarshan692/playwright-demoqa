const { test, expect, request } = require('@playwright/test');

let userId;

test('Create User - POST', async ({ request }) => {
  const response = await request.post('https://reqres.in/', {
    data: {
      name: 'Sudarshan',
      job: 'QA Engineer'
    }
  });

  expect(response.status()).toBe(201);

  const responseBody = await response.json();
  userId = responseBody.id;

  expect(responseBody.name).toBe('Sudarshan');
  console.log('User created with ID:', userId);
});

test('Get Created User - GET', async ({ request }) => {
  const response = await request.get(`https://reqres.in/api/users/${userId}`);

  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.data).toBeTruthy();
});

test('Update User - PUT', async ({ request }) => {
  const response = await request.put(`https://reqres.in/api/users/${userId}`, {
    data: {
      name: 'Sudarshan Updated',
      job: 'Senior QA'
    }
  });

  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.name).toBe('Sudarshan Updated');
});
