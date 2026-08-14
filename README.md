# Tricombinator website

Static one-page site for [tricombinator.com](https://tricombinator.com).

Plain HTML, CSS, and a small contact-form script. No build step.

## Local preview

Open `index.html` in a browser, or from this folder:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Contact form (Web3Forms)

Submissions go to **business@tricombinator.com** once an access key is in place.

1. Open [web3forms.com](https://web3forms.com) and create a free access key with `business@tricombinator.com`.
2. Confirm the email they send you.
3. In `script.js`, replace `YOUR_WEB3FORMS_ACCESS_KEY` with that key.

Until the key is set, the form shows a fallback to email the same address.

## Deploy (GitHub Pages)

This is the lowest-friction host for a static site already in git.

1. Create a public GitHub repo (recommended name: `tricombinator-tec.github.io` so Pages turns on automatically).
2. Push this folder to the `main` branch.
3. In the repo: **Settings → Pages**
   - Source: **Deploy from a branch**
   - Branch: `main` / `/ (root)`
   - Custom domain: `tricombinator.com`
   - Enable **Enforce HTTPS** after DNS resolves (can take a few minutes to a few hours).

A `CNAME` file is already in the repo (`tricombinator.com`).

### DNS at Zoner (or your registrar)

Keep Zoner as the registrar. Point the domain at GitHub Pages:

**Apex (`tricombinator.com`) — A records**

| Type | Name | Value |
|------|------|--------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

**www — CNAME**

| Type | Name | Value |
|------|------|--------|
| CNAME | `www` | `tricombinator-tec.github.io` |

Remove the existing A record that points at Zoner hosting (`5.44.245.24`) so it does not conflict.

Optional IPv6 (AAAA): `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.

After DNS updates, reopen Pages settings and confirm the domain shows as verified, then turn on HTTPS.
