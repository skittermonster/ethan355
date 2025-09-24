# Personal Website — Assignment 2

This repository contains my personal website for **Assignment 2**. It is built with semantic **HTML**, responsive **CSS**, and vanilla **JavaScript**. A separate page showcases **SVG visualizations** created with JavaScript.

## Structure

```
A2-Personal-Website/
├── index.html
├── visualizations.html
├── style.css
├── main.js
├── vis.js
└── README.md
```

## Pages

- **index.html** — Home page with intro, education, skills, experience, projects, and a contact form (with JS validation).
- **visualizations.html** — Contains two SVG works:
  - A responsive **bar chart** (generated with JS).
  - **Creative SVG art** (spiral circles with animation).

## How to view locally

1. Download this folder or clone your repo.
2. Open `index.html` in your browser (double-click or drag into a tab).
3. Navigate to the **Visualizations** page via the top navigation.

## Deploying on GitHub Pages

1. Create a repo named `yourusername.github.io` *or* use any repo and enable **Settings → Pages** with the `main` branch and `/ (root)` folder.
2. Push these files to the repo:
   ```bash
   git init
   git add .
   git commit -m "A2: personal website"
   git branch -M main
   git remote add origin https://github.com/YOURUSERNAME/YOURREPO.git
   git push -u origin main
   ```
3. Visit `https://yourusername.github.io/` (user site) or `https://yourusername.github.io/YOURREPO/` (project site).

## Technologies used

- HTML5, CSS3 with responsive units (clamp, vw), and modern layout (Grid/Flex)
- JavaScript (ES6) for interactivity and SVG generation
- Accessible markup (labels, aria attributes), cohesive, responsive design

## Validation

- Ensure HTML/CSS/JS have no errors using the course validator and standard linters.
- Semantic tags used: `header`, `nav`, `main`, `section`, `article`, `footer`, etc.

## Credits

- Placeholder image from [picsum.photos](https://picsum.photos).
- Generated on 2025-09-24.
