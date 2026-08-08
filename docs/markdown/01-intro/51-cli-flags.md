<!-- .slide: class="with-code" -->

# Skipping the prompts: `create-next-app` flags

Every question the CLI asks has a matching flag — useful for scripting a
project, or just skipping straight to what you want:

```bash
npx create-next-app@latest my-app --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
```

- `--ts` (or `--js`), `--tailwind`, `--eslint`, `--app` mirror the four
  yes/no prompts you'd otherwise answer by hand — `--no-eslint` flips any of
  them off the same way.
- `--src-dir` puts your code under `src/app` instead of a top-level `app/` —
  this is the layout every `/apps` workshop in this training uses.
- `--yes` skips every prompt and takes the recommended defaults in one go —
  the fastest way to bootstrap a throwaway project live.

Notes:

Keep this to "flags exist, here's the shape" — no need to enumerate every option (there's a --biome, --react-compiler, --empty and more). If someone asks for the full list, point them at the CLI reference in the official docs rather than reciting it here.
