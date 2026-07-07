import { test, expect } from '@playwright/test';

const BASE_URL = 'https://reqres.in';

const API_KEY = process.env.REQRES_API_KEY ?? '';

const authHeaders = {
  'x-api-key': API_KEY,
};

interface ReqresUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

test.describe('Reqres users API', () => {
  test.beforeAll(() => {
    if (!API_KEY) {
      throw new Error(
        'Missing REQRES_API_KEY env var. Sign up at https://reqres.in/signup, ' +
          'then set it before running tests, e.g.\n' +
          '  PowerShell:  $env:REQRES_API_KEY="your-key-here"\n' +
          '  bash/zsh:    export REQRES_API_KEY="your-key-here"'
      );
    }
  });

  test('GET /api/users?page=2 returns a well-formed list of users', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/users?page=2`, {
      headers: authHeaders,
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body.data)).toBeTruthy();
    expect(body.data.length).toBeGreaterThan(0);

    for (const user of body.data as ReqresUser[]) {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('first_name');
      expect(user).toHaveProperty('last_name');
    }
  });

  test('POST /api/users creates a user and echoes the submitted fields', async ({ request }) => {
    const payload = { name: 'morpheus', job: 'leader' };

    const response = await request.post(`${BASE_URL}/api/users`, {
      headers: authHeaders,
      data: payload,
    });
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.name).toBe(payload.name);
    expect(body.job).toBe(payload.job);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('createdAt');
  });
});