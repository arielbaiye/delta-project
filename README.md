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

The Forum tab runs on **[Cusdis](https://cusdis.com)** — a free, lightweight comment widget. Unlike GitHub Discussions/giscus, **visitors don't need any account at all** to comment (just an optional name) — comments are held in a moderation queue and you approve them by email, which also means no login-wall and no spam problem. It supports real threaded replies, so people can respond to each other under a comment, not just post one-off messages.

One-time setup:

1. Go to [cusdis.com](https://cusdis.com) and create a free account.
2. On your dashboard, click **Create New Website**, name it (e.g. "Delta Issue"), and enter your site's URL.
3. Cusdis gives you an **App ID** (a short code). Copy it.
4. In `index.html`, find `REPLACE_ME_APP_ID` (inside `<section id="forum">`) and replace it with your real App ID.
5. New comments will email you for approval — click the "Quick Approve" link in that email, no login needed on your end either.

## Team headshots

In `index.html`, search for `HEADSHOTS`. Each team member currently has a dashed placeholder box. To add a real photo:

1. Put the image in the `images/` folder (e.g. `images/team-ariel.jpg`).
2. Replace that person's `<div class="photo-slot">...</div>` block with:
   ```html
   <img src="images/team-ariel.jpg" alt="Ariel Baiye" style="aspect-ratio:1; object-fit:cover; width:100%;">
   ```
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

## Cover photo

In `style.css`, search for `/* COVER PHOTO`. Drop your image in the `images/` folder as `cover.jpg` (or update the filename in that CSS rule to match whatever you name it). A dark gradient stays layered on top of the photo so the white title text stays readable — if your photo is already quite dark, you can lower the `.15`/`.55`/`.75` opacity numbers right above it.

## What still needs to be done before publishing

- Replace every dashed placeholder box with real photography (see the inline suggestions in each one for sourcing/licensing notes).
- Transcribe and drop in real interview quotes wherever you see bracketed `[Transcribe: ...]` prompts.
- Verify every stat plaque's source is current before publication — sources are cited under each figure.
- Confirm photo/recording permissions with any museum, archive, or living photographer referenced (Emmett Till Interpretive Center, National Civil Rights Museum, Rory Doyle, etc.) before using their material.
