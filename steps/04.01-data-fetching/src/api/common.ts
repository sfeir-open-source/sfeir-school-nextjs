import { ApiError } from './error';

export async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const requestOptions = {
    ...options,
    headers: {
      ...options?.headers,
      ['x-api-key']: process.env.API_KEY || 'not-set',
      ['content-type']: 'application/json',
    },
  };
  const response: Response = await fetch(url, requestOptions);
  const data: T | unknown = await response.json();
  if (response.ok) return data as T;

  throw new ApiError(response.statusText, data as unknown);
}
