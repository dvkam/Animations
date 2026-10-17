# Animated underline

A curved underline draws beneath text as the section enters view.

## How it works

An IntersectionObserver activates the heading at 75% visibility. CSS changes the SVG stroke dash offset from 390 to 60 over one second.

## Interaction

Scroll down to draw the underline. Scroll away, then return to replay it.

## Accessibility

Reduced motion shows the complete underline without a transition.

## Development command

Run this command from the repository root after installation.

```sh
pnpm --filter @animations/animated-underline dev
```

## Credits

These links preserve the references in the original README.

- [Original source 1](https://coolcssanimation.com/scroll-animation-handbook/)
