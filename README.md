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

## What still needs to be done before publishing

- Replace every dashed placeholder box with real photography (see the inline suggestions in each one for sourcing/licensing notes).
- Transcribe and drop in real interview quotes wherever you see bracketed `[Transcribe: ...]` prompts.
- Verify every stat plaque's source is current before publication — sources are cited under each figure.
- Confirm photo/recording permissions with any museum, archive, or living photographer referenced (Emmett Till Interpretive Center, National Civil Rights Museum, Rory Doyle, etc.) before using their material.
