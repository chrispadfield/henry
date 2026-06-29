# The Classics Time Machine — Static Site

An interactive landing page introducing 10-year-olds to the world of Classics
through a gamified "Time Machine" cockpit interface.

Built with plain HTML, CSS, and vanilla JavaScript.
Uses Tailwind CSS via CDN — no build step, no dependencies to install.

---

## Running locally

Just open `index.html` in any modern web browser. No server needed.

---

## Deploying as a live website

### Option A — GitHub Pages (free, simplest)

1. Create a free account at https://github.com if you don't have one
2. Click **New repository**, name it `classics-site`, set it to **Public**, click **Create**
3. Open Terminal (Mac) or Command Prompt (Windows) inside this folder and run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/classics-site.git
git push -u origin main
```

4. In your GitHub repository, go to **Settings → Pages**
5. Under **Source**, select **Deploy from a branch**
6. Set branch to **main** and folder to **/ (root)**, click **Save**

Your site will be live within a minute at:
`https://YOUR-USERNAME.github.io/classics-site`

### Option B — Netlify (free, custom domain easier)

1. Create a free account at https://netlify.com — sign in with GitHub
2. Click **Add new site → Import an existing project → GitHub**
3. Select the `classics-site` repository
4. Leave build settings blank (it's a static site — no build needed)
5. Click **Deploy site**

Live within 60 seconds at a URL like `https://classics-site-abc123.netlify.app`.
Custom domains (e.g. myclassicssite.com) are set under Domain settings, ~£10/year.

---

## Updating the site later

Edit `index.html`, then push to GitHub:

```bash
git add .
git commit -m "Describe what changed"
git push
```

GitHub Pages and Netlify both republish automatically.

---

## Project structure

```
classics-static/
├── index.html    ← Everything: HTML, CSS, and JavaScript in one file
├── .gitignore    ← Tells Git to ignore system files
└── README.md     ← This file
```

## Adding destination pages

When you are ready to build out the three destinations, create:
- `greece.html`
- `rome.html`
- `classics.html`

Then in `index.html`, find the `launchTravel` function in the JavaScript section
and add navigation after the overlay closes:

```javascript
function closeOverlay(destId) {
  overlay.classList.remove('active');
  traveling = false;
  window.location.href = destId + '.html';  // Navigate to destination page
}
```
