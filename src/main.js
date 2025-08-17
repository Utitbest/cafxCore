
function showSection(target) {
  document.querySelectorAll('.main-section').forEach(section => {
    section.style.display = 'none';
  });

  let existingSection = document.getElementById(target);

  if (!existingSection) {
    fetch(`sections/${target}.html`)
      .then(res => res.text())
      .then(html => {
        const newSection = document.createElement('section');
        newSection.id = target;
        newSection.classList.add('main-section');
        newSection.innerHTML = html;
        document.getElementById('section-container').appendChild(newSection);

        newSection.style.display = 'flex';
      })
      .catch(err => {
        console.error(`Error loading ${target}.html`, err);

        const fallback = document.createElement('section');
        fallback.id = target;
        fallback.classList.add('main-section');
        fallback.innerHTML = `
          <h1 style="font-size:50px; width:100%; height:100%;
                     align-items:center; justify-content:center; display:flex;">
            ${target} (not found)
          </h1>`;
        document.getElementById('section-container').appendChild(fallback);
        fallback.style.display = 'flex';
      });
  } else {
    existingSection.style.display = 'flex';
  }
}

document.querySelectorAll('.sidebar-item').forEach(item => {
  item.addEventListener('click', function(e) {
    e.preventDefault();

    const target = this.dataset.target;

    document.querySelectorAll('.sidebar-item').forEach(ee => ee.classList.remove('tabcolor'));
    this.classList.add('tabcolor');

    history.pushState({ section: target }, "", "/" + target);

    showSection(target);
  });
});

window.addEventListener('popstate', (event) => {
  const target = event.state?.section || "dashboard"; 
  showSection(target);

  document.querySelectorAll('.sidebar-item').forEach(ee => ee.classList.remove('tabcolor'));
  const activeTab = document.querySelector(`[data-target="${target}"]`);
  if (activeTab) activeTab.classList.add('tabcolor');
});

window.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.replace("/", "") || "dashboard";
  showSection(path);
  console.log(path)
  const activeTab = document.querySelector(`[data-target="${path}"]`);
  if (activeTab) activeTab.classList.add('tabcolor');
});
