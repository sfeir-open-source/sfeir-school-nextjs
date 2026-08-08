# Common slide classes

| Class                 | Effect                                                              |
| --------------------- | ------------------------------------------------------------------- |
| `with-code`           | Code/typography styling for the slide                               |
| `tc-multiple-columns` | Enables the `##++##` column layout                                  |
| `exercice`            | Lab/exercise slide styling                                          |
| `transition`          | Section-divider slide (combine with color/position modifiers)       |
| `first-slide`         | Deck opening slide                                                  |
| `speaker-slide`       | Speaker bio slide                                                   |
| `bg-blur`             | Frosted "pause" slide                                               |
| `title-margin-sm`     | Reduces top margin before the title (dense slides)                  |
| `contrast-opposite`   | Inverts text color inside a `tc-multiple-columns` column            |

### Transition modifiers

Combine with `transition` as needed:

- Underline color: `blue` / `green`
- Text position: `left` / `right` / `top` / `bottom`
- Backgrounds: `bg-white` / `bg-blue` / `bg-green` / `bg-pink`
- Theme backgrounds: `transition-bg-sfeir-1..3`, `transition-bg-green-1..6`, `transition-bg-blue-1..3`

Only use classes that already appear in the codebase — don't invent new ones. Grep `docs/markdown/` for a class name to find a real example before using it.
