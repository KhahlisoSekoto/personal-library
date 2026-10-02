# Personal Library Web App

A dynamic web application built as part of **The Odin Project's** JavaScript course curriculum. This project demonstrates foundational Object-Oriented Programming (OOP) concepts by managing a virtual bookshelf database using JavaScript constructors, arrays, and native DOM manipulation.

## 🚀 Live Demo
<!-- Once you deploy this via GitHub Pages later, you can add your live link right here! -->
[View Live Project](https://github.com) 

## ✨ Features
* **Object Blueprinting:** Utilizes a custom `Book` constructor function to instantiate book entities with unique cryptographic tracking IDs.
* **Array-Driven Layout:** Dynamically loops over a library database array to generate and inject custom HTML card components on the fly.
* **Modal Forms:** Leverages the native HTML5 `<dialog>` element to provide a clean pop-up UI for creating new books without requiring page refreshes.
* **State Interactivity:** Includes custom element listeners on each individual card allowing real-time deletion and instantaneous toggling of read/unread states.

## 🛠️ Technologies Used
* **HTML5:** Semantic document markup and structural dialog models.
* **JavaScript (ES6+):** Object constructors, arrays, string interpolation templates, and event manipulation.

## 🧠 What I Learned
* How to use the `this` keyword effectively inside custom constructors to create discrete object blueprints.
* Passing specific iteration indexes (`index`) inside `.forEach()` loops to tie action handlers (like array splicing) to isolated user interface elements.
* Implementing `crypto.randomUUID()` to reliably manage state synchronization across backend arrays and front-end interface cards.