
const ValueHider = document.getElementById('ValueHider')
const balances = document.getElementById('CurrentRupies')
let visible = JSON.parse(localStorage.getItem('balanceVisible') ?? "true")
const realBalance = "250,000";
const hiddenBalance = "*****";
const eyeOpen = `
  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 9.51389C12.7956 9.51389 13.5587 9.82996 14.1213 10.3926C14.6839 10.9552 15 11.7182 15 12.5139C15 13.3095 14.6839 14.0726 14.1213 14.6352C13.5587 15.1978 12.7956 15.5139 12 15.5139C11.2044 15.5139 10.4413 15.1978 9.87868 14.6352C9.31607 14.0726 9 13.3095 9 12.5139C9 11.7182 9.31607 10.9552 9.87868 10.3926C10.4413 9.82996 11.2044 9.51389 12 9.51389ZM12 5.01389C17 5.01389 21.27 8.12389 23 12.5139C21.27 16.9039 17 20.0139 12 20.0139C7 20.0139 2.73 16.9039 1 12.5139C2.73 8.12389 7 5.01389 12 5.01389ZM3.18 12.5139C3.98825 14.1642 5.24331 15.5546 6.80248 16.5271C8.36165 17.4996 10.1624 18.0152 12 18.0152C13.8376 18.0152 15.6383 17.4996 17.1975 16.5271C18.7567 15.5546 20.0117 14.1642 20.82 12.5139C20.0117 10.8636 18.7567 9.47314 17.1975 8.50063C15.6383 7.52812 13.8376 7.01257 12 7.01257C10.1624 7.01257 8.36165 7.52812 6.80248 8.50063C5.24331 9.47314 3.98825 10.8636 3.18 12.5139Z" fill="white"/>
  </svg>
`;
const eyeSlash = `
  <svg xmlns="http://www.w3.org/2000/svg" 
       fill="none" 
       viewBox="0 0 24 24" 
       stroke="white" 
       width="24" height="25">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M3 3l18 18M9.88 9.88A3 3 0 0015 12
             m-3-7c4.478 0 8.268 2.943 9.542 7
             a9.956 9.956 0 01-4.132 5.411
             M6.218 6.218A9.956 9.956 0 002.458 12
             c1.274 4.057 5.064 7 9.542 7 
             1.676 0 3.246-.41 4.632-1.137" />
  </svg>
`;
function showSection(target) {
  document.querySelectorAll('.main-section').forEach(section => {
    section.style.display = 'none';
  });

  let existingSection = document.getElementById(target);

  if (!existingSection) {
    fetch(`/sections/${target}.html`)
      .then(res => res.text())
      .then(html => {
        if (html.includes('<html') || html.includes('<head') || html.includes('<!DOCTYPE')) {
          throw new Error('Received full page HTML instead of section content');
        }
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
            ${target} (not found) ⚠️
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
  const target = event.state?.section || "Dashboard"; 
  showSection(target);

  document.querySelectorAll('.sidebar-item').forEach(ee => ee.classList.remove('tabcolor'));
  const activeTab = document.querySelector(`[data-target="${target}"]`);
  if (activeTab) activeTab.classList.add('tabcolor');
});
window.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.replace("/", "") || "Dashboard";
  showSection(path);
  
  const activeTab = document.querySelector(`[data-target="${path}"]`);
  if (activeTab) activeTab.classList.add('tabcolor');
  AboutBalance()
});
function AboutBalance(){
  function updateBalanceUI(){
  balances.textContent = visible ?  `$ ${realBalance}`: `$ ${hiddenBalance}` ;
  ValueHider.innerHTML = visible ? eyeOpen : eyeSlash;
}
function BalanceSlay(){
  if(ValueHider){
    ValueHider.onclick = () =>{
      visible = !visible;
      localStorage.setItem('balanceVisible', JSON.stringify(visible))
      updateBalanceUI()
    }
  }
}
updateBalanceUI()
BalanceSlay()
}


