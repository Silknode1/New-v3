# Drop-in tile images (optional)

The app generates themed SVG tiles automatically, so this folder can stay empty.

To use your own **AI-generated images**, add files named after each item's `tile`/`id`,
as `.png` (jpg/webp also work if you adjust the extension in `app.js`):

```
ultrasonic-radar.png   # project id from data/projects.js
temp-tft.png
s3.png                 # board id from data/boards.js
```

The app loads `assets/images/<id>.png` if present and falls back to the generated
SVG tile otherwise — no code changes required.
