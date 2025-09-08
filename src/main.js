import { AboutBalance, DifferentBalance, WalletTransferPopUp } from "./utilz/Wallets";
import { showToast } from "./utilz/Toastify";
let currentFetchController = null;

function showSection(target) {

  if(currentFetchController){
    currentFetchController.abort()
  }

  currentFetchController = new AbortController();
  const { signal } = currentFetchController;

  document.querySelectorAll('.main-section').forEach(section => {
    section.classList.remove('activeSection');
  });

  let existingSection = document.getElementById(target);

  if(existingSection) {
    existingSection.classList.add('activeSection');
    return;
  }

  fetch(`/sections/${target}.html`, { signal })
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
    .catch(err => {
      if(err.name === "AbortError") {
        console.log(`Fetch for "${target}" was aborted`);
        return;
      }
      console.error("Fetch error:", err);
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
  dropDown()
  WalletTransferPopUp()
  BottonStatus()
});
function dropDown(){
  const select = document.querySelector(".custom-select");
  const selected = select.querySelector(".selected");
  const options = select.querySelector(".options")

  selected.addEventListener("click", () => {
    options.style.display = options.style.display === "block" ? "none" : "block";
  });

  options.addEventListener("click", (e) => {
    if (e.target.closest("li")) {
      const li = e.target.closest("li");
      selected.innerHTML = li.innerHTML;
      options.style.display = "none";
    }
  });

  document.addEventListener("click", (e) => {
    if (!select.contains(e.target)) {
      options.style.display = "none";
    }
  });

}
function BottonStatus(){
  document.getElementById('BotStatus')?.addEventListener('click', ()=>{
    showToast('Say Hello to the World', 'WalletPaused')
  })
}