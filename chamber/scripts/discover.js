import { places } from "../data/places.mjs";

// ---------- VISIT MESSAGE LOGIC ----------
const msgBox = document.getElementById("visit-message");

let lastVisit = localStorage.getItem("lastVisit");
let today = Date.now();

if (!lastVisit) {
    msgBox.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const diff = today - Number(lastVisit);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days < 1) {
        msgBox.textContent = "Back so soon! Awesome!";
    } else if (days === 1) {
        msgBox.textContent = "You last visited 1 day ago.";
    } else {
        msgBox.textContent = `You last visited ${days} days ago.`;
    }
}

localStorage.setItem("lastVisit", today);

// ---------- LOAD CARDS ----------
const cardContainer = document.getElementById("cards");

places.forEach(place => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
            <img src="${place.image}" alt="${place.name}">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button class="learn-btn">Learn More</button>
    `;

    cardContainer.appendChild(card);
});
