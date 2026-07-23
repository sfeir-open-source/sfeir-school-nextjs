# Slide templates

Read 2–3 sibling files in the target module before writing — match depth, tone, and which classes are already in use. For class names and modifiers, see [classes.md](classes.md). For separator rules, see [separators.md](separators.md).

## Basic content slide (no columns)

```markdown
<!-- .slide: class="with-code" -->

# Title

## Subtitle

Content here, optionally with a code block or a single image.
```

## Title / section-divider slide

```markdown
<!-- .slide: class="transition bg-pink" -->

# Routing and navigating
```

Other transition modifiers (combine as needed): `blue` / `green` (underline color), `left` / `right` / `top` / `bottom` (text position), `bg-white` / `bg-blue` / `bg-green`, `transition-bg-sfeir-1..3`, `transition-bg-green-1..6`, `transition-bg-blue-1..3`.

## First slide of the whole deck

```markdown
<!-- .slide: class="first-slide" sfeir-level="2" sfeir-techno="Next.js" -->

# **Welcome to SFEIR School**

## **Next.js**
```

`sfeir-level` is 1-3 (stars badge); `sfeir-techno` is the badge label.

## Speaker slide

```markdown
<!-- .slide: class="speaker-slide" -->

<div class="speaker-slide">

# Présentation

![](./assets/images/speaker-photo.jpeg 'speaker')

![](./assets/images/logo-tech.svg 'badge')

![](./assets/images/logo-sfeir-blanc.png 'company')

## Full Name

### Role

### email@sfeir.com

</div>
```

Up to 4 sub-info lines (`###`) and up to 6 `'badge'`-tagged images.

## Two/three-column slide (`tc-multiple-columns`)

Every column is wrapped between a pair of `##++##`. The class tag on the _opening_ `##++##` of a column is optional (defaults apply); use it to add per-column attributes like `data-background` or extra classes.

````markdown
<!-- .slide: class="tc-multiple-columns with-code" -->

##++##

# Concept name

Explanation text for the left column.

<img src="./assets/images/02-routing/schema.png" class="my-schema-img" />

##++##

##++##

<br/> <br/>

```js
// Right column: a code sample
const example = () => {};
```

##++##

Notes:

Explanation in English, short and oriented towards presentation.
````

Key points:

- `##++##` immediately followed by another `##++##` just marks "end of column N / start of column N+1" — this is expected and correct, not a typo.
- Each column becomes a flex child (`div.tc-column`), so columns are equal-width side by side; put a title in the first column only, or repeat titles per column as needed.
- Add `data-background="red"` or `data-background="./assets/images/x.jpg" class="mask"` on the opening `##++##` of a column for a colored/image background column (only colors and images are supported as column backgrounds).
- For inverted (light-on-dark) text in one column, add `contrast-opposite` to that column's class list.
- `Notes:` goes once, after the final `##++##` of the whole slide.

## Multiple sibling slides from one file (`##==##`)

Useful for an image-first slide immediately followed by its bullet-point recap, without creating a second file/registry entry:

```markdown
<!-- .slide: class="tc-multiple-columns with-code" -->

##++##

# Caching

## 1/4 Request memoization

<img src="./assets/images/04-data-fetching/request-memoization.png" class="memoization-schema" />
##++##

##==##

# Caching

## 1/4 Request memoization

- Where ? On the server
- What is cached ? Return value of functions
- How long ? One cache per request
- Why ? Sharing data in the component tree
```

## Lab / exercise slide

```markdown
<!-- .slide: class="exercice" -->

<h1 id="routing" style="margin-bottom: 30px;">02.01 - Routing</h1>

## Lab

**1. Create the application pages**

- Homepage
- Login page

**ℹ️ Running the lab**<br/>
`npm run dev -- 02-navigation`
```

Wrap long lab bodies in `<small>...</small>` if they overflow. Always verify the referenced app folder name against `/apps` (e.g. `02-navigation`, not the module slug `02-routing`).

## Progressive reveal (fragments) inside any slide/column

```markdown
<div>

**What for?**

- To handle form submissions
- To handle data mutation

</div>
<!-- .element: class="fragment" data-fragment-index="2"-->
```

Increment `data-fragment-index` across the elements you want revealed in order; elements without this comment are visible immediately.
