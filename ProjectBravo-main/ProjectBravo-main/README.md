## Hi there 👋
As a beginner developer I want to learn how to make proper web game so that I can expand my knowledge and skills. This game being a practice example.


Credit: 

W3Schools- helped with functions as needed.

CodeAcedemy- taught me how to do most of the things used in this site.

ChatGPT- helped debug code and made the javascript for the button

Maria: collaborated with to help each other throughout the project


Page Map:
- **index.html** – Homepage of the website.

#### docs/pages/
individual site pages

- **howToPlay.html** – how to play the game


#### docs/scripts/
JavaScript file with all site behavior changes

- **script.js** – has interactive elements (font change)

## docs/styles/
Styling sheet

- **style.css** – CSS file used to style with

## docs/images/
images used

- **pictureofcybersecuritylogo.jpg**



Wireframe link: ![Wireframe of the homepage](docs/images/wireframeindexpage.jpg)

To view(live link): [https://chickenalfredo1121.github.io/ChickenAlfredo1121/]

#Code Snippet
this javascript toggles the font of the main page with a button and keeps it persistant

````javascript
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("font-toggle");
  const body = document.body;

  // Load saved theme
  const savedTheme = localStorage.getItem("font-theme");
  if (savedTheme) body.className = savedTheme;

  button.addEventListener("click", () => {
    body.classList.toggle("font-theme-one");
    body.classList.toggle("font-theme-two");

    localStorage.setItem("font-theme", body.className);
    console.log("Font toggled:", body.className);
  });
});
````

#Code Snippet
This import gives the pages their fonts, sourced from google

```css
@import url('https://fonts.googleapis.com/css2?family=Edu+NSW+ACT+Cursive:wght@400..700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poiret+One&display=swap');
```