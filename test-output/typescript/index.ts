// Auto-generated SDK for Test API v1.0.0
// Do not edit manually

const BASE_URL = "https://api.test.com";

let _apiKey: string | null = null;
let _bearerToken: string | null = null;

export function setApiKey(key: string): void {
  _apiKey = key;
}

export function setBearerToken(token: string): void {
  _bearerToken = token;
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function request<T>(method: string, path: string, body?: Record<string, unknown>, params?: Record<string, string>, retries = 3): Promise<T> {
  let url = BASE_URL + path;
  if (params) {
    const query = new URLSearchParams(params).toString();
    if (query) url += "?" + query;
  }
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (_apiKey) headers["X-API-Key"] = _apiKey;
  if (_bearerToken) headers["Authorization"] = "Bearer " + _bearerToken;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });
      if (res.status === 429 || res.status >= 500) {
        if (attempt < retries) { await sleep(attempt * 1000); continue; }
      }
      if (!res.ok) throw new Error(`API Error ${res.status}: ${res.statusText}`);
      return res.json() as Promise<T>;
    } catch (err) {
      if (attempt === retries) throw err;
      await sleep(attempt * 1000);
    }
  }
  throw new Error("Request failed after " + retries + " retries");
}

/** Fetch all pages automatically */
export async function paginate<T>(fn: (page: number) => Promise<T[]>, maxPages = 10): Promise<T[]> {
  const results: T[] = [];
  for (let page = 1; page <= maxPages; page++) {
    const data = await fn(page);
    if (!data || data.length === 0) break;
    results.push(...data);
  }
  return results;
}

/** List users */
export async function getUsers(): Promise<unknown> {
  return request<unknown>("GET", `/users`);
}
