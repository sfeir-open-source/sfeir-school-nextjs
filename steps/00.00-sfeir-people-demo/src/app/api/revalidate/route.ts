import { revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

import { Tags as PeopleTags } from '@/api/people';
import { Tags as ExpenseTags } from '@/api/expenses';

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag');
  if (!tag) return Response.json({ error: 'No tags to revalidate' }, { status: 400 });

  const revalidatedTags = [];

  if (tag === 'all') {
    [...Object.values(PeopleTags), ...Object.values(ExpenseTags)].forEach((t) => {
      revalidateTag(t);
      revalidatedTags.push(t);
    });
  } else {
    revalidateTag(tag);
    revalidatedTags.push(tag);
  }

  return Response.json({ revalidated: revalidatedTags, now: Date.now() });
}
