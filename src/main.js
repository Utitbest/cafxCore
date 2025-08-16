
document.querySelectorAll('.sidebar-item').forEach(item => {
  item.addEventListener('click', function() {
    const target = this.dataset.target;
    document.querySelectorAll('.sidebar-item').forEach(ee =>{
        ee.classList.remove('tabcolor')
    })
    item.classList.add('tabcolor')
    const existingSection = document.getElementById(target);
    if (existingSection) {
      document.querySelectorAll('.main-section').forEach(section => {
        section.style.display = 'none';
      });
      existingSection.style.display = 'block';
    } 
    else {
    //   fetch(`sections/${target}.html`)
    //     .then(response => response.text())
    //     .then(html => {
          const newSection = document.createElement('section');
          newSection.id = target;
          newSection.classList.add('main-section');
          newSection.innerHTML = `<h1 style="font-size:50px; width:100%; height:100%; align-items:center; justify-content:center; display:flex;">${target}</h1>`;
          document.getElementById('section-container').appendChild(newSection);

          document.querySelectorAll('.main-section').forEach(section => {
            section.style.display = 'none';
          });
          newSection.style.display = 'block';
        // })
        // .catch(err => {
        //   console.error(`Error loading ${target}.html`, err);
        // });
    }
  });
});
