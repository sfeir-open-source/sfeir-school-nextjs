import { PageError } from '@sfeir/ui/server';

export default async function NotFound() {
  return <PageError code={404}>Oops, the page requested is not found</PageError>;
}
