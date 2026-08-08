export type SortOrder = 'asc' | 'desc';

export function parsePositiveInt(value: string | undefined, fallback: number): number {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function parseSortOrder(value: string | undefined): SortOrder {
  return value?.toLowerCase() === 'desc' ? 'desc' : 'asc';
}
