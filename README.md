# 🌌 Space Odyssey Interactive

## Project Overview

**Space Odyssey Interactive** is a dynamic front-end web application that allows users to explore, manage, and interact with **space missions**.
Built using **HTML**, **CSS**, and **JavaScript**, the website transforms static design into an **interactive experience** through **DOM manipulation**, **event handling**, and **data persistence** using `localStorage`.

The project was developed as part of the **AstroTech Studio – Brief 4** exercise to demonstrate JavaScript integration, CRUD functionality, and UI/UX design mastery.

---

## Features Implemented

### 1. Mission Management (CRUD System)

Users can:

* **Add new missions** through a dynamic modal form.
* **Edit existing missions** directly from the interface.
* **Delete missions** with confirmation prompts.
* View all missions displayed in **responsive, automatically generated cards**.

All mission data is stored in `localStorage`, ensuring persistence even after closing the browser.

---

### 2. Search & Filtering

* Real-time **search bar** to find missions by *name* or *agency*.
* **Filter options** by *agency* and *year*.
* Combined filtering logic allowing simultaneous search + filters.
* Results update **instantly** without page reloads.

---

### 3. Favorites System

* Heart icon ❤️ to **mark missions as favorites**.
* Dedicated **sidebar** showing only favorite missions.
* Ability to **remove from favorites** directly inside the sidebar.
* Sidebar **auto-refreshes** dynamically when favorites are updated.
* Favorites and mission data are saved persistently using `localStorage`.

---

### 4. Form Validation & UX

* Validation for all required fields (name, agency, date, description).
* Dynamic error feedback and input highlighting.
* Smooth modal and sidebar transitions with modern layout.

---

### 5. Data Persistence

The project uses **localStorage** to:

* Save user-created missions.
* Store favorite missions.
* Initialize default missions on first load.
---

## Technologies Used

| **Category**             | **Technologies / Tools**      |
| ------------------------ | ----------------------------- |
| Front-End                | HTML5, CSS3, JavaScript (ES6) |
| Data Storage             | Browser LocalStorage          |
| Planning & Task Tracking | Notion                        |
| Version Control          | Git & GitHub                  |
| Deployment               | GitHub Pages                  |
| Icons                    | Font Awesome                  |

---

## 🗂️ Project Structure

```
📁 Space-Odyssey/
│
├── index.html                # Main missions page
├── style.css                 # Styles and responsiveness
├── script.js                 # JavaScript logic (CRUD, filters, favorites)
├── /images/                  # Mission and UI images
└── README.md                 # Documentation file
```

---

## How to Use

1. **Open the Website**
   Visit the deployed GitHub Pages link.

2. **View Missions**
   Default missions load automatically if none exist.

3. **Add or Edit Missions**
   Use the “Add Mission” button to open the form modal.

4. **Search & Filter**
   Type in the search bar or use dropdowns for agency/year filters.

5. **Favorites**
   Click the heart icon to favorite a mission — open the sidebar to view favorites.

6. **Persistent Data**
   All changes are saved automatically in your browser’s `localStorage`.

---
## Learning Outcomes

Through this project, I practiced and improved:

* DOM manipulation and dynamic rendering
* Event-driven JavaScript and modular logic
* CRUD operations without backend
* UI/UX design consistency and animation control
* Data handling using `localStorage`
* Front-end deployment workflow (Git + GitHub Pages)

---

## Demo Links

* 🔗 **Live Site:** [saikyouboi.github.io/Brief4/]
* 💻 **Repository:** [https://github.com/SaiKYouBoi/Brief4.git]

---

> *"Exploration begins with curiosity — and a few lines of JavaScript."*
