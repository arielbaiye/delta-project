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

## Setting up the Forum

The Forum tab is wired to **GitHub Discussions** via [giscus](https://giscus.app) — free, no backend, comments live in your repo. One-time setup:

1. In your repo: **Settings → General → Features → enable Discussions.**
2. Go to [giscus.app](https://giscus.app), enter your repo (`arielbaiye/delta-project`), and follow its steps (it will ask you to install the giscus app on the repo).
3. giscus will generate a config snippet with a `data-repo-id` and `data-category-id`. Copy those two values into `index.html`, inside the `<section id="forum">` block, in the `<script src="https://giscus.app/client.js">` tag — replace the two `REPLACE_ME` values.

Once that's done, anyone visiting the Forum tab can post and reply, and it'll show up in your repo's **Discussions** tab too.

## Color palette

Defined at the top of `style.css` in the `:root` block:

- `--imperial-blue: #00296b` — darkest, used for the sidebar, back cover, and footer backgrounds
- `--french-blue: #003f88` — primary headline color and utility bar background
- `--steel-azure: #00509d` — secondary accent, used for hover states and small labels on the cream background
- `--school-bus-yellow: #fdc500` — solid accent fills (the forum's live dot, the active-page indicator, one highlighted bar-chart value)
- `--gold: #ffd500` — accent text/borders on dark-blue backgrounds (active nav label, marker plaque text, back-cover pull quotes)

`--navy` and `--navy-deep` still exist as aliases pointing to `--french-blue` and `--imperial-blue` respectively, so nothing else in the code had to change — if you want to retheme again, editing the five color values at the top of `style.css` updates the whole site.

## What still needs to be done before publishing

- Replace every dashed placeholder box with real photography (see the inline suggestions in each one for sourcing/licensing notes).
- Transcribe and drop in real interview quotes wherever you see bracketed `[Transcribe: ...]` prompts.
- Verify every stat plaque's source is current before publication — sources are cited under each figure.
- Confirm photo/recording permissions with any museum, archive, or living photographer referenced (Emmett Till Interpretive Center, National Civil Rights Museum, Rory Doyle, etc.) before using their material.
