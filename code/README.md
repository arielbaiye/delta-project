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

## Speaker audio (embedded interview clips)

Rather than one audio player per page, audio is embedded right next to each speaker's own bio block — so it plays in context with their photo and quote, not as a generic page soundtrack.

**Maggie Crawford's interview is already wired up and included in this download** — it's in the `audio` folder as `maggie-crawford.m4a`, and embedded in her section under Chapter VIII (Civil Rights) → "Freedom Riders & the history of the penitentiary." Just upload the whole `audio` folder to your repo the same way you did `images` (drag-and-drop the folder into GitHub's upload box), and it'll play immediately — no filename changes needed.

**To add audio for the other speakers your outline marks as having recordings** — Reggie Barnes, Kathy Wong, and the Emmett Till panel discussion currently have named voice-slots but no audio yet. To wire one up:

1. Upload the clip to the `audio` folder, named however you like (e.g. `audio/reggie-barnes.m4a`).
2. Find that speaker's `<div class="voice-slot">` in `index.html` and add this markup right after it, copying the pattern from Maggie Crawford's section:
   ```html
   <div class="page-audio" style="margin-top:8px; padding-left:0; padding-right:0; border-bottom:none;">
     <span class="page-audio-label">Interview: Reggie Barnes</span>
     <audio controls preload="none" src="audio/reggie-barnes.m4a">Your browser doesn't support inline audio — <a href="audio/reggie-barnes.m4a">download the interview</a> instead.</audio>
   </div>
   ```
3. Swap the label text and both `src`/`href` values to match your filename.

**A note on file size:** GitHub's drag-and-drop upload tops out around 25MB per file. Full-length recordings (especially anything hours long) won't fit — trim to a representative clip (30 seconds to a few minutes) for the embed, and keep the full recording linked from Google Drive or wherever it already lives if people want the whole thing.

**If any of these are recordings of copyrighted music** rather than your own interviews, hosting the audio file itself requires a mechanical/master use license from the rights holder — the same category of permission as using song lyrics. Original recordings (your own interviews, participant readings) don't have this issue.

## Introduction spread (photo + line-by-line lyric reveal)

The Introduction tab is a full-bleed photo (`images/introphoto.JPG`) with a sticky-pinned parallax drift as you scroll, and a translucent card that reveals the song's lines one at a time as you keep scrolling.

**The lines are placeholders.** Search `index.html` for `LYRICS PLACEHOLDER` — you'll find 14 bracketed `<p class="poem-line">` lines plus a credit line reading `— "A Change is Gonna Come" by Sam Cooke`. **Using the real lyrics requires a lyric/sync license from the rights holder before publishing** — song lyrics are copyrighted whether it's print or web. Licensing is usually arranged through the song's publisher, a performing rights organization (ASCAP/BMI), or a clearinghouse like the Harry Fox Agency. Once that's sorted, swap each bracketed line for the real one — the layout and scroll reveal don't need to change. Add or remove `<p class="poem-line">` elements freely; the reveal timing automatically adjusts to however many lines exist.

Accessibility: anyone with "reduce motion" turned on in their OS/browser settings gets a fully static version instead — full photo, full lyrics, no parallax, no scroll-triggered reveal. That's automatic, no setup needed.

On mobile, the photo crops toward the right side of the frame (assuming that's roughly where the plane/flag sits in your photo) — if your actual photo's subject is positioned differently, search `style.css` for `78% center` (inside the mobile media query, under `.intro-photo`) and adjust that percentage until it frames correctly on a phone-sized screen.

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
