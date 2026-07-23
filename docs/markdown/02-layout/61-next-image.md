<!-- .slide: class="with-code" -->

# `next/image` fixes all four, for free

Swap `<img>` for the `Image` component from `next/image`, and Next.js takes
over: it resizes, re-encodes, and lazy-loads automatically, and reserves the
right amount of space so nothing jumps.

Here's the real component your `/employees` page will render, once the lab
wires it up — `PersonCard`, from the shared UI library:

```tsx
import Image from 'next/image';

<Image
  className="rounded-full"
  src={person.photo || photoPlaceholder}
  alt={`Picture of ${person.firstname} ${person.lastname}`}
  width="100"
  height="100"
/>
```

- `width` / `height` tell Next.js the aspect ratio **before** the image
  loads — that's what kills the layout shift.
- A statically-imported local image gets these automatically; here the sizes
  come from data, so they're passed explicitly.
- The same component works for **local** files (`public/`, static imports)
  and **remote** URLs — remote ones just need their domain allow-listed in
  `next.config.js`.

Notes:

Don't dive into remotePatterns config syntax here — just plant that remote images need an allow-list, this module's scope stays on local usage since that's all 01-layout needs. The PersonCard snippet is real, verbatim code from @sfeir/ui — point that out, it's not a toy example.
