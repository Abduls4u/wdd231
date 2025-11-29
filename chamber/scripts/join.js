document.getElementById("timestamp").value = new Date().toLocaleString();

// Modal open
document.querySelectorAll("[data-open]").forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        const modal = document.getElementById(btn.dataset.open);
        modal.showModal();
    });
});

// Modal close
document.querySelectorAll(".close").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.closest("dialog").close();
    });
});