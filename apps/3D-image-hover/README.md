# 3D image hover

An image tilts in depth when you point at it.

## How it works

CSS perspective gives the square image depth. Its transform changes from 70 degrees to 20 degrees over 0.8 seconds. A rotated lower face adds thickness.

## Interaction

Hover over the image. To toggle the lifted state, tap it or focus its button and press Enter or Space.

## Accessibility

Reduced motion keeps the image at a fixed 20-degree angle. The image button has a visible focus outline.

## Development command

Run this command from the repository root after installation.

```sh
pnpm --filter @animations/3D-image-hover dev
```

## Credits

These links preserve the references in the original README.

- [Original source 1](https://codepen.io/kw7oe/pen/mPeepv)

The demo image is a local copy of the original remote image. Its original source remains credited above.
