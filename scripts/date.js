// dynamic year and last modified
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  const lastModEl = document.getElementById('lastModText');

  if (yearEl) {
    const y = new Date().getFullYear();
    yearEl.textContent = y;
  }
  if (lastModEl) {
    lastModEl.textContent = document.lastModified || 'unknown';
  }
});
    