<div align="center">

# 🧙‍♂️ ResumeWizard

**A browser-based, interactive resume editor with live preview, dual templates, and print-to-PDF — built with pure HTML, CSS & JavaScript. No frameworks. No installs. Just open and build.**
---

## 📌 Overview

**ResumeWizard** is a zero-dependency, browser-based resume builder that runs entirely from a single HTML file. No accounts, no npm, no backend — just open `resume.html` in any browser and start building a professional resume instantly.

It features a split-panel layout: a **structured sidebar** for filling in your details, and a **live resume canvas** that updates in real time as you type. When you're done, print directly to PDF — with full color preservation.

---

## ✨ Features

### 🖊️ Two Ways to Edit
- **Sidebar Panel** — Structured form fields for personal info, experience, education, skills, languages, references, and more
- **Inline Editing** — Toggle Edit Mode and click directly on any text in the resume to edit it in place

### 🎨 Two Professional Templates
| Template | Description |
|---|---|
| **Modern** | Two-column layout with a dark sidebar, photo circle, Playfair Display typography, color-coded dot timeline for experience, and reference grid |
| **ATS** | Clean single-column, keyword-friendly format optimized for Applicant Tracking Systems — no colors or sidebars to confuse parsers |

### 🎨 5 Color Themes (Modern Template)
Switch sidebar accent colors with one click:
`Navy` · `Teal` · `Burgundy` · `Forest` · `Slate`

### 📄 Sections Supported
- Personal Info (Name, Title, Summary)
- Contact (Phone, Email, Address)
- Profile Photo (upload your own image)
- Education
- Work Experience (with dot-timeline layout in Modern)
- Expertise / Skills
- Languages
- References
- Certifications *(ATS template)*
- Declaration (with Place & Signature name)
- **Custom Blocks** — add any freeform section you need

### 👁️ Toggle Sections
Each section has a visibility toggle — hide any section that doesn't apply to you without deleting your data.

### 🖨️ Print / Save as PDF
One-click `Print / Save PDF` button triggers browser print with full print CSS:
- Sidebar, topbar, and editor controls are hidden automatically
- Background colors preserved (`print-color-adjust: exact`)
- Outputs a clean A4 portrait layout

---

## 🚀 Getting Started

### Option 1 — Live Demo
> *(Link will be updated once deployed to GitHub Pages)*

### Option 2 — Run Locally

```bash
# Clone the repo
git clone https://github.com/darkdevil1613/ResumeWizard.git

# Navigate into the folder
cd ResumeWizard

# Open directly in your browser — no server needed
open resume.html
```

> Works on Chrome, Firefox, Edge, and Safari. No installations required.

---

## 🗂️ Project Structure

```
ResumeWizard/
│
├── resume.html       # App shell — topbar, sidebar panel, resume canvas (Modern + ATS)
├── style.css         # All styles — layout, templates, print rules, color themes
└── index.js          # All logic — live updates, edit mode, template switching, photo upload
```

Three files. That's it.

---

## 🛠️ How It Works

```
Sidebar Input  ──► updateField() / addExp() / addEdu() ...
                        │
                        ▼
              DOM fields update in real time
                        │
                        ▼
        Resume canvas reflects changes instantly
                        │
              [Toggle Edit Mode ON]
                        │
                        ▼
       contenteditable="true" on resume elements
       — click any text to edit directly on canvas
                        │
              [Print / Save PDF]
                        │
                        ▼
       window.print() + @media print CSS
       — hides UI chrome, preserves colors, A4 output
```

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| **HTML5** | App structure, `contenteditable` for inline editing, semantic layout |
| **CSS3** | Flexbox & Grid layouts, CSS variables, `@media print`, accent theming |
| **Vanilla JavaScript** | DOM manipulation, real-time updates, template switching, photo handling |
| **Google Fonts** | `Playfair Display` (headings) + `Source Sans 3` (body text) |

---

## 🗺️ Roadmap

- [x] Live sidebar-to-resume sync
- [x] Inline click-to-edit mode
- [x] Modern template with dark sidebar & dot timeline
- [x] ATS-friendly clean template
- [x] 5 accent color themes
- [x] Profile photo upload
- [x] Section visibility toggle
- [x] Custom blocks (add any section)
- [x] Print to PDF with color preservation
- [ ] LocalStorage auto-save
- [ ] Export to DOCX
- [ ] More resume templates
- [ ] Dark mode for the editor UI
- [ ] Mobile-friendly layout

---

## 🤝 Contributing

Got an idea or found a bug? Contributions are welcome!

1. Fork this repository
2. Create your branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add: your feature"`
4. Push and open a Pull Request

---

## 👥 Built By

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/darkdevil1613">
        <img src="https://github.com/darkdevil1613.png" width="80" style="border-radius:50%"/><br/>
        <sub><b>Rohit</b></sub>
      </a><br/>
      <sub>Co-developer</sub>
    </td>
    <td align="center">
      <a href="https://github.com/asenaislive">
        <img src="https://github.com/asenaislive.png" width="80" style="border-radius:50%"/><br/>
        <sub><b>Akhil Mycherla</b></sub>
      </a><br/>
      <sub>Co-developer</sub>
    </td>
  </tr>
</table>

---

<div align="center">

Made by two B.Tech students who learn best by building things.

⭐ **Found this useful? Drop a star — it genuinely helps!** ⭐

</div>
