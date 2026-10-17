# Baseline fidelity verification

Baseline commit `99ecb5f`. Chromium, 1280 by 800 CSS pixels, default motion preference. Original React 18.2 and Vite 5 run from an isolated git archive in `/tmp/animations-baseline`. Current production builds run on a separate local server. No baseline files entered the working tree.

## Method

Each demo has original rest and active screenshots plus migrated captures. Measurements record node geometry, computed fonts, transforms, transitions, animation timings, and browser exceptions. Rest captures follow a 3.5 second wait. Active captures apply a pointer hover or scroll to the page middle. The captures are observational evidence, not a pixel-diff assertion. Parent browser tests cover reduced motion and mobile behavior separately.

## Corrections from direct comparison

- Restored page fonts, backgrounds, body margins, and vertical centering lost during CSS conversion.
- Restored the 3D headings to line-height 1.5 and zero margins. Their measured boxes match the original at x280, y24 and y48, width720, heights24 and 60.
- Restored Apple section width and normal line-height. All three text boxes now match the baseline at x335, y215,325,475, width691, height110. The original 1000ms and 500ms durations with 500ms and 1400ms delays match.
- Restored the word-fade flex layout, gap, font, and line-height. Its final box matches x390,y344,width500,height112. The 800ms fade and 100ms stagger remain.
- Restored dark backgrounds and typography for the scroll underline and text wave. Restored the overlap section heights. The overlap figure matches its original transformed size400 by299 and y1068, with about 1px horizontal difference.
- Fixed text-fade border-box sizing to prevent mobile padding overflow. Restored its centered dark page.
- Restored gradient underline font fallbacks, margins, and line-height. Kept the documented intentional 250ms ease timing instead of original ease-in.
- Restored typewriter heading margin. Its box matches the original y20 and 28px height. Both 1000ms caret and 3000ms typing cycles remain.

## Preserved mechanics and recorded differences

- Image rotation retains the 320 by427 image box and scale 1.3/rotate 5deg effect.
- Triple image hover retains 158 by158 image boxes and its individual rotation timing. The stack is 4px lower because the native button replaces the old image wrapper baseline. This small layout difference remains.
- Gradient button retains its 139 by50 box and heading placement. Pointer updates now use a DOM transform rather than React state.
- Canvas adds instructions and a clear button. The drawing area therefore differs from the original full-window canvas. Pointer capture, touch, and resize preservation are intentional behavior fixes.
- Scroll underline replaces nine repeated prompts with one viewport spacer and restores Roboto typography. Scroll thresholds now use the declared ratio.
- Houdini retains 4000ms rotation and 3000ms opacity animation. The explanatory text and support behavior changed intentionally. The original obsolete paint-worklet support gate is removed.
- Gradient colors can differ because the original selects a random palette. The current implementation restores the original palette data locally. This run did not fix Math.random to a shared seed.
- Text-fade now groups characters into words for readable wrapping. Character timing remains 1000ms with 6ms stagger. Desktop line breaks can differ from the original character-level flex layout.
- Controls add a visible pause/restart panel. Keyboard, touch, and reduced-motion states are intentional additions.

## Limits

The baseline source includes remote images and data. Captures depend on those responses. All recorded image elements loaded during this run, but CSS background loading is not included in that image assertion. The selector used for the original 3D hover did not identify its generated styled element reliably. Its rest state and source transform rules were inspected, but this run does not prove a matched active screenshot for that demo. A midpoint scroll is not a threshold-boundary test. Screenshots taken at elapsed wall-clock time cannot establish frame-exact parity for infinite animations. Only Chromium desktop was used for this comparison.

## Evidence

`/tmp/animations-fidelity/measurements.json` stores the first 14 original/migration pairs. `/tmp/animations-fidelity/postfix.json` stores post-fix observations. PNG names identify the demo, version, and state. `contact.png` is a visual inspection sheet. The Apple original and post-fix images were also inspected at full resolution.

## Per-demo capture status

- `3D-image-hover`: baseline captured, initial migration captured, post-fix captured.
- `animated-underline`: baseline captured, initial migration captured, post-fix captured.
- `apple-animation`: baseline captured, initial migration captured, post-fix captured.
- `canvas`: baseline captured, initial migration captured, post-fix captured.
- `fade-in-text`: baseline captured, initial migration captured, post-fix captured.
- `gradient-button`: baseline captured, initial migration captured, post-fix captured.
- `houdini-border`: baseline captured, initial migration captured, post-fix captured.
- `img-overlap`: baseline captured, initial migration captured, post-fix captured.
- `img-rotate`: baseline captured, initial migration captured, post-fix captured.
- `text-fade-in`: baseline captured, initial migration captured, post-fix captured.
- `text-wave`: baseline captured, initial migration captured, post-fix captured.
- `tripple-img-hover`: baseline captured, initial migration captured, post-fix captured.
- `typewriter`: baseline captured, initial migration captured, post-fix captured.
- `underline-gradient`: baseline captured, initial migration captured, post-fix captured.
