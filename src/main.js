import { AboutBalance, DifferentBalance } from "./utilz/Wallets";


function showSection(target) {
  document.querySelectorAll('.main-section').forEach(section => {
    section.classList.remove('activeSection');
  });

  let existingSection = document.getElementById(target);

  if(existingSection) {
    existingSection.classList.add('activeSection');
    return;
  }

  fetch(`/sections/${target}.html`)
    .then(res => {
      if (!res.ok) throw new Error("Section not found");
      return res.text();
    })
    .then(html => {
      if (html.includes('<html') || html.includes('<head') || html.includes('<!DOCTYPE')) {
        throw new Error('Invalid HTML: expected partial content');
      }

      const newSection = document.createElement('section');
      newSection.id = target;
      newSection.className = 'main-section activeSection';
      newSection.innerHTML = html;

      document.getElementById('section-container').appendChild(newSection);
    })
    .catch(() => {
      const fallback = document.createElement('section');
      fallback.id = target;
      fallback.className = 'main-section activeSection';
      fallback.innerHTML = `
        <h1 style="font-size:50px; display:flex; align-items:center; justify-content:center; height:100%;">
          ${target} (not found) ⚠️
        </h1>`;
      document.getElementById('section-container').appendChild(fallback);
    });
}
document.querySelectorAll('.sidebar-item').forEach(item => {
  item.addEventListener('click', e => {
    const target = item.dataset.target;
    document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('tabcolor'));
    item.classList.add('tabcolor');
    window.location.hash = target;
  });
});
window.addEventListener('hashchange', () => {
  const target = window.location.hash.replace("#", "") || "Dashboard";
  showSection(target);
  document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('tabcolor'));
  document.querySelector(`[data-target="${target}"]`)?.classList.add('tabcolor');
});
window.addEventListener('DOMContentLoaded', () => {
  const target = window.location.hash.replace("#", "") || "Dashboard";
  showSection(target);
  document.querySelector(`[data-target="${target}"]`)?.classList.add('tabcolor');
  AboutBalance()
  DifferentBalance()
});


