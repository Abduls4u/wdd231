const spotlightContainer = document.getElementById("spotlight-container");

async function loadSpotlights() {
    const response = await fetch("data/members.json");
    const members = await response.json();

    // Filter gold (3) & silver (2)
    const qualified = members.filter(m => m.membership === 2 || m.membership === 3);

    // Randomly select 2–3 members
    const count = Math.floor(Math.random() * 2) + 2; // 2 or 3
    const selected = qualified.sort(() => 0.5 - Math.random()).slice(0, count);

    selected.forEach(m => {
        const card = document.createElement("div");
        card.classList.add("spotlight-card");

        card.innerHTML = `
            <img src="${m.image}" alt="${m.name} logo">
            <h3>${m.name}</h3>
            <p>${m.address}</p>
            <p>${m.phone}</p>
            <a href="${m.url}" target="_blank">Visit Website</a>
        `;

        spotlightContainer.appendChild(card);
    });
}

loadSpotlights();