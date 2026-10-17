# Word fade

Words become visible in sequence as their blur clears.

## How it works

Each word fades from zero opacity and 4px blur over 0.8 seconds. Words start 0.1 seconds apart through inline animation delays.

## Interaction

Open the page to play the sequence. Select Restart demo to replay it.

## Accessibility

Reduced motion shows every word without blur. A complete heading label provides the phrase to assistive technology.

## Development command

Run this command from the repository root after installation.

```sh
pnpm --filter @animations/fade-in-text dev
```

## Credits

These links preserve the references in the original README.

- [Original source 1](https://codepen.io/alvarotrigo/pen/ExvqdNa)
