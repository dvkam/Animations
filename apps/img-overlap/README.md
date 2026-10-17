# Overlapping images

Three overlapping images grow and tilt as their section enters view.

## How it works

An IntersectionObserver activates the image group at 75% visibility. CSS transforms scale the cards to 1.2 and adjust their angles. The cards start 0.1 seconds apart, with a 0.4-second transition.

## Interaction

Scroll down to expand the image stack. Scroll away, then return to replay it.

## Accessibility

Reduced motion keeps the cards in a fixed overlapping arrangement. A section label describes the decorative images.

## Development command

Run this command from the repository root after installation.

```sh
pnpm --filter @animations/img-overlap dev
```

## Credits

These links preserve the references in the original README.

- [Original source 1](https://codepen.io/nickcil/pen/OJvWvXy)
- [Original source 2](https://codesandbox.io/s/overlapping-images-animation-effect-while-scrolling-334ein?file=/src/OverlappingImages.tsx) The review could not fetch this page.
