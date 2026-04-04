# 🌐 Personal Portfolio Website

**Author:** Mustapha Abdulsalam  
**Internship:** CodeAlpha Frontend Development Internship  
**Repository:** `CodeAlpha_Portfolio`

---

## 📖 Description

A modern, fully responsive personal portfolio website built with pure **HTML5, CSS3, and vanilla JavaScript** — no frameworks, no dependencies. The site showcases my projects, skills, and contact information with a premium dark glassmorphism aesthetic, fullscreen video hero section, and smooth scroll-reveal animations.

---

## ✨ Features

- **🎥 Fullscreen Video Hero** — autoplay, muted, looping MP4 background with dark overlay and performance optimisations (pauses on tab-hide, pauses when off-screen).
- **💎 Glassmorphism CTA Buttons** — transparent glass effect with `backdrop-filter: blur`, subtle borders, soft shadows, and hover glow animations.
- **🧭 Sticky Responsive Navbar** — transparent on load, frosted-glass on scroll, mobile hamburger menu with animated toggle.
- **📜 Scroll Reveal Animations** — `IntersectionObserver`-powered fade + slide-up animations, with stagger effects on card grids.
- **📊 Animated Skill Bars** — progress bars animate when scrolled into view.
- **📁 Projects Section** — four project cards (including the CodeAlpha Calculator task) with tags, GitHub links, and demo links.
- **📬 Contact Form** — client-side validation with shake error animation and success feedback.
- **🔗 Social Links** — GitHub, LinkedIn, and email.
- **📥 CV Download Button** — in navbar.
- **♿ Accessibility** — respects `prefers-reduced-motion`, proper ARIA labels, semantic HTML.
- **📱 Mobile-First Responsive** — fluid at every breakpoint from 320px upward.

---

## 🛠 Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic markup structure |
| CSS3 | Glassmorphism design system, CSS variables, animations |
| JavaScript (ES6+) | Interactivity, scroll effects, form validation |
| CSS `backdrop-filter` | Glass blur effects |
| `IntersectionObserver` API | Scroll-triggered animations |
| Google Fonts (Syne + DM Sans) | Typography |

---

## 📁 Project Structure

```
CodeAlpha_Portfolio/
├── index.html          # Main HTML file
├── style.css           # Full stylesheet (glassmorphism design system)
├── script.js           # All JavaScript functionality
├── assets/
│   ├── video/
│   │   └── hero.mp4    # Place your hero background video here
│   ├── images/
│   │   ├── hero-poster.jpg   # Video fallback poster image
│   │   └── profile.jpg       # Your profile photo (optional)
│   └── cv/
│       └── Mustapha_Abdulsalam_CV.pdf   # CV for download button
└── README.md
```

---

## 🚀 How to Run

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MustaphaAbdulsalam/CodeAlpha_Portfolio.git
   cd CodeAlpha_Portfolio
   ```

2. **Add your assets:**
   - Place your hero video at `assets/video/hero.mp4`  
     *(Recommended: 10–30 sec loop, compressed to <10MB, 1920×1080 or lower)*
   - Optional: add a poster image at `assets/images/hero-poster.jpg`
   - Optional: add your photo at `assets/images/profile.jpg`
   - Optional: add your CV PDF at `assets/cv/Mustapha_Abdulsalam_CV.pdf`

3. **Open in browser:**
   - Simply open `index.html` in any modern browser, **or**
   - Use the **Live Server** extension in VS Code for hot reload

### Deploy to GitHub Pages

```bash
# Push to GitHub, then:
# Settings → Pages → Source: Deploy from branch → main / root
```

### Deploy to Netlify

Drag and drop the `CodeAlpha_Portfolio` folder at [netlify.com/drop](https://app.netlify.com/drop)

---

## 🎥 Video Tips

For best performance, compress your hero video:
- **Tool:** [HandBrake](https://handbrake.fr/) or FFmpeg
- **Resolution:** 1280×720 (HD) is sufficient
- **Codec:** H.264
- **Target size:** Under 8MB

```bash
# FFmpeg one-liner to optimise:
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -b:v 1500k -vf scale=1280:-1 assets/video/hero.mp4
```

---

## 🎨 Customisation

All design tokens live in CSS variables at the top of `style.css`:

```css
:root {
  --accent:   #00d4ff;   /* Primary cyan accent */
  --accent-2: #7c3aed;   /* Secondary purple accent */
  --bg:       #050810;   /* Main background */
  /* ... */
}
```

To personalise the content, update `index.html`:
- Replace `Mustapha Abdulsalam` with your name
- Update project titles, descriptions, and GitHub links
- Replace email and social media links
- Swap the profile image

---

## 📝 CodeAlpha Tasks Included

- ✅ **Task 1** — Personal Portfolio Website (this project)
- ✅ **Task 2** — JavaScript Calculator (linked in Projects section)

---

## 📄 License

MIT — feel free to use this as a starting point for your own portfolio.

---

*Crafted with ♥ during the CodeAlpha Frontend Development Internship.*
