# The Delta Issue — Website Prototype

A working prototype of the Delta magazine issue as a website: tabbed chapter navigation, styled to match the print issue (cream stock, navy headlines, hairline-framed archival spreads, photographed marker plaques).

## Files

- `index.html` — page structure and content
- `style.css` — all styling
- `script.js` — tab navigation, pager, routing

No build step, no dependencies. It's plain HTML/CSS/JS.

## Preview it locally

Open `index.html` directly in a browser, or run a tiny local server from this folder (recommended, since some browsers restrict local file access):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publish a live preview with GitHub Pages

1. Push this folder to a GitHub repo (see commands below).
2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Under **Branch**, choose `main` (or `master`) and folder `/ (root)` — then **Save**.
5. GitHub will publish at `https://<your-username>.github.io/<repo-name>/`. It typically takes 1–2 minutes after each push; check the **Pages** settings tab for the live URL and deployment status.

Every time you push a commit to that branch, the live preview updates automatically — no extra config needed.

## First-time commit

From this folder:

```bash
git init
git add .
git commit -m "Initial site: tabbed layout matching print issue design"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

## Making changes later

```bash
git add .
git commit -m "Describe what changed"
git push
```

GitHub Pages will redeploy automatically after each push.

## Utility bar links to fill in

At the top of `index.html`, inside `<div id="utility-bar">`, replace these placeholder URLs with your real links:

- Spotify Playlist — `href="https://open.spotify.com/playlist/REPLACE_ME"`
- Share Feedback (Google Form) — `href="https://forms.gle/REPLACE_ME"`
- Research & Interviews (e.g. a shared Drive folder) — `href="https://drive.google.com/drive/folders/REPLACE_ME"`
- Editor Sheet (Google Sheet, in the dropdown) — `href="https://docs.google.com/spreadsheets/d/REPLACE_ME"`

## The Forum

The Forum tab is a **[Padlet](https://padlet.com)** board, embedded directly in the page via iframe. Padlet lets people post questions and comments to a shared wall, and others can reply — no separate account required to post unless you've set your specific Padlet board to require one.

To manage it:

1. Log into [padlet.com](https://padlet.com) with whatever account created the board (`j7jm1ndsqqq8w8w6`).
2. From there you can moderate posts, change who's allowed to post (public / people with the link / invite-only), turn on or off anonymous posting, and see all activity.
3. **If you ever swap to a different Padlet board**, go to that board → **Share → Embed** on padlet.com, copy the new `<iframe src="...">` URL, and swap it into `index.html` — search for `PADLET EMBED` to find the exact spot.

## Team headshots

In `index.html`, search for `HEADSHOTS`. Each team member currently has a dashed placeholder box. To add a real photo:

1. Upload the image as a plain file to the repo — same place as `index.html` (Add file → Upload files, no folder needed).
2. Replace that person's `<div class="photo-slot">...</div>` block with:
   ```html
   <img src="team-ariel.jpg" alt="Ariel Baiye" style="aspect-ratio:1; object-fit:cover; width:100%;">
   ```
   (matching whatever you actually named the uploaded file)
3. Repeat for Gabriela and Leila. Also fill in each person's "Role" text next to their name.

## Color palette

Defined at the top of `style.css` in the `:root` block:

- `--imperial-blue: #00296b` — darkest, used for the sidebar, back cover, and footer backgrounds
- `--french-blue: #003f88` — primary headline color and utility bar background
- `--steel-azure: #00509d` — secondary accent, used for hover states and small labels on the cream background
- `--school-bus-yellow: #fdc500` — solid accent fills (the forum's live dot, the active-page indicator, one highlighted bar-chart value)
- `--gold: #ffd500` — accent text/borders on dark-blue backgrounds (active nav label, marker plaque text, back-cover pull quotes)

`--navy` and `--navy-deep` still exist as aliases pointing to `--french-blue` and `--imperial-blue` respectively, so nothing else in the code had to change — if you want to retheme again, editing the five color values at the top of `style.css` updates the whole site.

## Editing text later

All the visible text lives directly in `index.html`, in plain readable sentences between HTML tags — there's no separate content file or CMS. To find something:

- Open `index.html` in GitHub's web editor (click the file, then the pencil icon)
- Use Ctrl+F / Cmd+F to search for a phrase you see on the site
- Each section is marked with a comment like `<!-- ============ CHAPTER I — MISSISSIPPI ============ -->` so you can jump around by scrolling or searching for `CHAPTER`
- Edit the text between the tags (e.g. `<p class="body-p">your text here</p>`) — leave the tags themselves alone, just change the words inside them
- Commit your changes the same way as before (see "Making changes later" above)

`style.css` only controls appearance (colors, spacing, fonts) — you won't find sentence content there. `script.js` only controls behavior (tab switching, the dropdown) — no visible text there either.

## Cover photo carousel

The cover now rotates through multiple photos automatically (every ~5.5 seconds), with small dots at the bottom people can click to jump to a specific photo directly. It pauses while your mouse is over it.

In `index.html`, search for `cover-carousel`. You'll see three slides:
```html
<div class="cover-slide active" style="background-image:url('IMG_6058.JPEG');"></div>
<div class="cover-slide" style="background-image:url('cover2.jpg');"></div>
<div class="cover-slide" style="background-image:url('cover3.jpg');"></div>
```
- The first slide is already live, using the photo you uploaded earlier.
- Upload two more photos to the repo root (same place as `index.html`, no folder needed) named `cover2.jpg` and `cover3.jpg` — or use different filenames and update them in the `url('...')` parts above to match exactly.
- **Want more than 3 photos?** Copy one of the `<div class="cover-slide" ...></div>` lines, paste it as a new line right after the others, and point it at another filename. The carousel and its dots automatically adjust to however many slides you have — no other code changes needed.

A dark gradient stays layered on top of every slide so the white title text stays readable — if your photos are already quite dark, search `style.css` for `.cover-overlay` and lower the `.18`/`.55`/`.78` opacity numbers there.

## What still needs to be done before publishing

- Replace every dashed placeholder box with real photography (see the inline suggestions in each one for sourcing/licensing notes).
- Transcribe and drop in real interview quotes wherever you see bracketed `[Transcribe: ...]` prompts.
- Verify every stat plaque's source is current before publication — sources are cited under each figure.
- Confirm photo/recording permissions with any museum, archive, or living photographer referenced (Emmett Till Interpretive Center, National Civil Rights Museum, Rory Doyle, etc.) before using their material.
