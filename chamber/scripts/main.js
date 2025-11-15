
const membersContainer = document.getElementById('members');
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');
const filterSelect = document.getElementById('filterSelect');

// store data locally after fetch
let membersData = [];

// utility: convert membership number to label + class
function membershipInfo(level){
  switch (Number(level)){
    case 3: return {label:'Gold', cls:'gold'};
    case 2: return {label:'Silver', cls:'silver'};
    default: return {label:'Member', cls:'member'};
  }
}

function createMemberCard(member){
  const div = document.createElement('article');
  div.className = 'member';
  div.setAttribute('data-membership', member.membership);

  const img = document.createElement('img');
  img.src = member.image || 'images/placeholder.png';
  img.alt = `${member.name} logo`;

  const details = document.createElement('div');
  details.className = 'member-details';

  const title = document.createElement('h3');
  title.textContent = member.name;

  const meta = document.createElement('p');
  meta.className = 'meta';
  meta.innerHTML = `
    <strong>${member.address}</strong><br/>
    <a href="tel:${member.phone.replace(/\D/g,'')}">${member.phone}</a> &middot;
    <a href="${member.url}" target="_blank" rel="noopener">${new URL(member.url).hostname}</a>
  `;

  const desc = document.createElement('p');
  desc.textContent = member.description || '';

  const badgeInfo = membershipInfo(member.membership);
  const badge = document.createElement('span');
  badge.className = `badge ${badgeInfo.cls}`;
  badge.textContent = badgeInfo.label;

  details.appendChild(title);
  details.appendChild(badge);
  details.appendChild(meta);
  details.appendChild(desc);

  div.appendChild(img);
  div.appendChild(details);
  return div;
}

async function fetchMembers(){
  try {
    const res = await fetch('data/members.json', {cache: "no-store"});
    if (!res.ok) throw new Error('Network response not ok');
    membersData = await res.json();
    renderMembers(membersData);
  } catch (err){
    membersContainer.innerHTML = `<p class="error">Unable to load directory: ${err.message}</p>`;
    console.error(err);
  }
}

function renderMembers(data){
  membersContainer.innerHTML = '';
  if (!Array.isArray(data) || data.length === 0) {
    membersContainer.innerHTML = '<p>No members to display.</p>';
    return;
  }
  const fragment = document.createDocumentFragment();
  data.forEach(m => fragment.appendChild(createMemberCard(m)));
  membersContainer.appendChild(fragment);
}

function setView(view){
  if (view === 'grid'){
    membersContainer.classList.remove('list');
    membersContainer.classList.add('grid');
    gridBtn.setAttribute('aria-pressed','true');
    listBtn.setAttribute('aria-pressed','false');
  } else {
    membersContainer.classList.remove('grid');
    membersContainer.classList.add('list');
    gridBtn.setAttribute('aria-pressed','false');
    listBtn.setAttribute('aria-pressed','true');
  }
}

// filter by membership level (value 'all' or numeric string)
function applyFilter(value){
  const cards = Array.from(membersContainer.children);
  cards.forEach(card => {
    const level = card.getAttribute('data-membership');
    if (value === 'all' || value === String(level)){
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

/* Event listeners */
gridBtn.addEventListener('click', () => setView('grid'));
listBtn.addEventListener('click', () => setView('list'));
filterSelect.addEventListener('change', (e) => applyFilter(e.target.value));

// accessible menu toggle for small screens
document.querySelectorAll('.menu-toggle').forEach(btn => {
  btn.addEventListener('click', e => {
    const nav = document.getElementById('main-navigation');
    const isOpen = nav.style.display === 'flex' || nav.classList.contains('open');
    nav.style.display = isOpen ? 'none' : 'flex';
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
});

/* Footer: automatic dates */
document.addEventListener('DOMContentLoaded', () => {
  // set copyright year
  const yearEl = document.getElementById('copyrightYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // set last modified
  const modifiedEl = document.getElementById('lastModified');
  if (modifiedEl) modifiedEl.textContent = document.lastModified || new Date().toLocaleString();

  // set student name (replace placeholder)
  const studentName = document.getElementById('studentName');
  if (studentName) studentName.textContent = 'Abdulsalam Abdulsomad .A.';

  // default view and fetch members
  setView('grid');
  fetchMembers();
});
