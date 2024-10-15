import { revalidatePath, revalidateTag } from 'next/cache';

export const GET = (request: NextRequest) => {
  const tag = request.nextUrl.searchParams.get('tag');

  if (!tag) {
    return Response.json({ error: 'No tags to revalidate' }, { status: 400 });
  }

  if (tag === 'all') {
    revalidatePath('/', 'layout');
    return Response.json({ message: 'Revalidated all data', now: new Date() });
  }

  revalidateTag(tag);
  return Response.json({ message: `Revalidated tag "${tag}"`, now: new Date() });
};
