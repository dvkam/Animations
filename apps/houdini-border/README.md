# Animated gradient border

A colored border rotates around a panel while its background changes opacity.

## How it works

CSS registers an angle and an opacity property. Keyframes rotate the four-color conic gradient over four seconds and alternate the background opacity over three seconds. The gradient paints a real border.

## Interaction

Open the page to start the repeating effect. Use Pause autoplay to stop it at its current point.

## Accessibility

Reduced motion shows a fixed gradient border and an opaque background.

## Development command

Run this command from the repository root after installation.

```sh
pnpm --filter @animations/houdini-border dev
```

## Credits

These links preserve the references in the original README.

- [Original source 1](https://codepen.io/web-dot-dev/pen/oNqoeXo)
- [Original source 2](https://web.dev/articles/css-border-animations?hl=en)
