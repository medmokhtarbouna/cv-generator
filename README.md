# 📄 CV Generator Web App

A modern, customizable **CV generator** built with **React** and **Tailwind CSS**. This project helps users easily create, preview, and export professional resumes — with full control over style, layout, and language.

---

## 🚀 Features

- 📝 Dynamic CV form with real-time preview  
- 🎨 Template customization (fonts, colors, layout)  
- 📄 Export to PDF in high quality  
- 🌐 Bilingual support (English & Arabic with RTL)  
- 💾 Save progress using Local Storage  
- 🧑‍🎨 Multiple template styles: classic, modern, RTL  
- 🌙 Light / Dark mode toggle

---

## 📸 Screenshots

> Add screenshots or a demo GIF here

---

## 🛠 Tech Stack

| Layer       | Technology              |
|-------------|--------------------------|
| Frontend    | React, Tailwind CSS     |
| PDF Export  | html2pdf.js / react-to-print / pdf-lib |
| State Mgmt  | useContext / Zustand (optional) |
| Deployment  | Vercel / Netlify        |

---


## 📁 Project Structure

```
cv-generator/
│
├── public/                 # Static assets (images, sample-cv.json)
│
├── src/
│   ├── components/         # Reusable UI components (FormFields, Buttons, etc.)
│   ├── templates/          # Template definitions and themes
│   ├── pages/              # Main pages (Home, Preview)
│   ├── utils/              # Helper functions (PDF export, JSON loaders)
│   ├── context/            # Global state (theme, CV data)
│   └── App.tsx             # Root component
│
├── docs/                   # Documentation, assets, and screenshots
├── sample-cv.json          # Sample CV data for demo/testing
├── tailwind.config.js      # Tailwind configuration
├── package.json            # Project metadata and dependencies
├── README.md               # Project documentation
└── LICENSE                 # License information
```

---

## ⚙️ Getting Started

To run this project locally:

```bash
git clone https://github.com/medmokhtarbouna/cv-generator.git
cd cv-generator
npm install
npm run dev
```

To build for production:

```bash
npm run build
```

---

## ✨ Customization Options

Users can personalize their resume with:

* 🎨 Template **style** (classic, modern, RTL)
* 🖋 **Font family** (Poppins, Roboto, Amiri…)
* 🌈 **Color theme** (primary color palette)
* 🧭 Text **direction** (LTR/RTL)
* 🧑‍💼 **Profile photo** toggle
* 🌙 **Dark/Light mode**

---

## 📦 Sample CV Data

A ready-to-use `sample-cv.json` is provided in the `/public` directory for quick testing and prototyping. See [`sample-cv-json-readme`](./docs/sample-cv-json-readme.md) for more info.

---

## 🧠 Inspiration

This app was inspired by the real-world needs of students, developers, and job seekers who want a free, accessible, and stylish tool to generate professional resumes — in both English and Arabic.

---

## 🤝 Contributing

We welcome contributions! Please open issues or submit PRs to:

* Add new template styles
* Improve accessibility or RTL support
* Enhance PDF export quality
* Translate interface to other languages

---

## 📜 License

This project is licensed under the **MIT License**. See [LICENSE](./LICENSE) for details.
