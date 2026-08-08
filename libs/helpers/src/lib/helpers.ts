import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ApiError } from './error';

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}

export function debounce<T extends Array<unknown>>(fn: (...args: T) => void, delay: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function (this: unknown, ...args: T) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

export async function fetchData<T>(url: string, options: RequestInit = {}): Promise<T> {
  const requestOptions = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY ?? '',
      ...(options.headers ?? {}),
    },
  };

  const response = await fetch(url, requestOptions);
  if (response.ok) {
    return (await response.json()) as T;
  }

  const body = (await response.json().catch(() => undefined)) as { message?: string; errors?: Record<string, string> } | undefined;
  throw new ApiError(response.status, body?.message ?? `Failed to fetch data from ${url}`, body?.errors);
}

export const filterNullUndefinedValue = <T extends Record<string, unknown>>(filters: T) => {
  return Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== null && value !== undefined && value !== ''));
};

export const buildQueryParamsToString = <T extends Record<string, unknown>>(filters: T) => {
  return Object.entries(filterNullUndefinedValue(filters)).reduce((acc, [key, value]) => {
    return acc + `&${key}=${value}`;
  }, '');
};
