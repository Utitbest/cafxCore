import {showToast} from './Toastify'
const ValueHider = document.getElementById('ValueHider');
const balances = document.getElementById('CurrentRupies');
const HotwalletpopNotify = document.getElementsByClassName('HotwalletpopNotify')[0];
const typeofwallet = document.getElementById('typeofwallet');
const TransferFormElement = document.getElementById('OnclickTransferBudPopUp')

let visible = JSON.parse(localStorage.getItem('balanceVisible') ?? "true");
let activeWallet = localStorage.getItem("activeWallet") || "Hotwallet";
const coldBalance = "150,000";
const hotBalance  = "250,000";
const walletBalances = {
  Hotwallet: hotBalance,
  Coldwallet: coldBalance,
};

const hiddenBalance = "*****";

const eyeOpen = `
<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 9.51389C12.7956 9.51389 13.5587 9.82996 14.1213 10.3926C14.6839 10.9552 15 11.7182 15 12.5139C15 13.3095 14.6839 14.0726 14.1213 14.6352C13.5587 15.1978 12.7956 15.5139 12 15.5139C11.2044 15.5139 10.4413 15.1978 9.87868 14.6352C9.31607 14.0726 9 13.3095 9 12.5139C9 11.7182 9.31607 10.9552 9.87868 10.3926C10.4413 9.82996 11.2044 9.51389 12 9.51389ZM12 5.01389C17 5.01389 21.27 8.12389 23 12.5139C21.27 16.9039 17 20.0139 12 20.0139C7 20.0139 2.73 16.9039 1 12.5139C2.73 8.12389 7 5.01389 12 5.01389ZM3.18 12.5139C3.98825 14.1642 5.24331 15.5546 6.80248 16.5271C8.36165 17.4996 10.1624 18.0152 12 18.0152C13.8376 18.0152 15.6383 17.4996 17.1975 16.5271C18.7567 15.5546 20.0117 14.1642 20.82 12.5139C20.0117 10.8636 18.7567 9.47314 17.1975 8.50063C15.6383 7.52812 13.8376 7.01257 12 7.01257C10.1624 7.01257 8.36165 7.52812 6.80248 8.50063C5.24331 9.47314 3.98825 10.8636 3.18 12.5139Z" fill="white"/>
</svg>
`;

const eyeSlash = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" width="24" height="25">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
    d="M3 3l18 18M9.88 9.88A3 3 0 0015 12
        m-3-7c4.478 0 8.268 2.943 9.542 7
        a9.956 9.956 0 01-4.132 5.411
        M6.218 6.218A9.956 9.956 0 002.458 12
        c1.274 4.057 5.064 7 9.542 7 
        1.676 0 3.246-.41 4.632-1.137" />
</svg>
`;
const HotpopNotification = `
<div>
  <div>
    <p>🔥 Hot Wallet</p>

    <span style="cursor:pointer;">
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.4 17.5139L12 13.9139L15.6 17.5139L17 16.1139L13.4 12.5139L17 8.91389L15.6 7.51389L12 11.1139L8.4 7.51389L7 8.91389L10.6 12.5139L7 16.1139L8.4 17.5139ZM12 22.5139C10.6167 22.5139 9.31667 22.2512 8.1 21.7259C6.88334 21.2006 5.825 20.4882 4.925 19.5889C4.025 18.6896 3.31267 17.6312 2.788 16.4139C2.26333 15.1966 2.00067 13.8966 2 12.5139C1.99933 11.1312 2.262 9.83122 2.788 8.61389C3.314 7.39655 4.02633 6.33822 4.925 5.43889C5.82367 4.53955 6.882 3.82722 8.1 3.30189C9.318 2.77655 10.618 2.51389 12 2.51389C13.382 2.51389 14.682 2.77655 15.9 3.30189C17.118 3.82722 18.1763 4.53955 19.075 5.43889C19.9737 6.33822 20.6863 7.39655 21.213 8.61389C21.7397 9.83122 22.002 11.1312 22 12.5139C21.998 13.8966 21.7353 15.1966 21.212 16.4139C20.6887 17.6312 19.9763 18.6896 19.075 19.5889C18.1737 20.4882 17.1153 21.2009 15.9 21.7269C14.6847 22.2529 13.3847 22.5152 12 22.5139ZM12 20.5139C14.2333 20.5139 16.125 19.7389 17.675 18.1889C19.225 16.6389 20 14.7472 20 12.5139C20 10.2806 19.225 8.38889 17.675 6.83889C16.125 5.28889 14.2333 4.51389 12 4.51389C9.76667 4.51389 7.875 5.28889 6.325 6.83889C4.775 8.38889 4 10.2806 4 12.5139C4 14.7472 4.775 16.6389 6.325 18.1889C7.875 19.7389 9.76667 20.5139 12 20.5139Z" fill="#161616"/>
      </svg>
    </span>
  </div>

  <p style="margin-bottom: .6em;">This wallet lets you <b>store, send,</b> and <b>receive crypto</b> online for fast and easy access. Please note:</p>

  <ul>
    <li>It's connected to the internet and may be <b>vulnerable</b> to <b>online threats.</b></li>
    <li>We secure your wallet, but you must also use strong passwords and 2FA.</li>
  </ul>

  <p>
    For larger or long-term storage, we recommend using a cold wallet (offline).
    By using this wallet, you agree to use it responsibly and understand the risks. 
    <b>Need help?</b> Contact CAFX Support.
  </p>
</div>
`
const ColdpopNotification = `
 <div>
  <div>
    <p>🕸 Cold Wallet</p>

    <span style="cursor:pointer;">
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.4 17.5139L12 13.9139L15.6 17.5139L17 16.1139L13.4 12.5139L17 8.91389L15.6 7.51389L12 11.1139L8.4 7.51389L7 8.91389L10.6 12.5139L7 16.1139L8.4 17.5139ZM12 22.5139C10.6167 22.5139 9.31667 22.2512 8.1 21.7259C6.88334 21.2006 5.825 20.4882 4.925 19.5889C4.025 18.6896 3.31267 17.6312 2.788 16.4139C2.26333 15.1966 2.00067 13.8966 2 12.5139C1.99933 11.1312 2.262 9.83122 2.788 8.61389C3.314 7.39655 4.02633 6.33822 4.925 5.43889C5.82367 4.53955 6.882 3.82722 8.1 3.30189C9.318 2.77655 10.618 2.51389 12 2.51389C13.382 2.51389 14.682 2.77655 15.9 3.30189C17.118 3.82722 18.1763 4.53955 19.075 5.43889C19.9737 6.33822 20.6863 7.39655 21.213 8.61389C21.7397 9.83122 22.002 11.1312 22 12.5139C21.998 13.8966 21.7353 15.1966 21.212 16.4139C20.6887 17.6312 19.9763 18.6896 19.075 19.5889C18.1737 20.4882 17.1153 21.2009 15.9 21.7269C14.6847 22.2529 13.3847 22.5152 12 22.5139ZM12 20.5139C14.2333 20.5139 16.125 19.7389 17.675 18.1889C19.225 16.6389 20 14.7472 20 12.5139C20 10.2806 19.225 8.38889 17.675 6.83889C16.125 5.28889 14.2333 4.51389 12 4.51389C9.76667 4.51389 7.875 5.28889 6.325 6.83889C4.775 8.38889 4 10.2806 4 12.5139C4 14.7472 4.775 16.6389 6.325 18.1889C7.875 19.7389 9.76667 20.5139 12 20.5139Z" fill="#161616"/>
      </svg>
    </span>
  </div>

  <p style="margin-bottom: .6em;">This wallet stores your crypto offline, offering maximum security for long-term holding. Please note:</p>

  <ul>
    <li>It is not <b>connected to the internet</b>, so it's safer but not ideal for frequent transactions.</li>
    <li>You'll need to <b>connect manually</b> to send or move funds.</li>
  </ul>

  <p>
    For larger or long-term storage, we recommend using a cold wallet (offline).
    By using this wallet, you agree to use it responsibly and understand the risks.
    <b>Need help?</b> Contact CAFX Support
  </p>
</div>
`

function updateBalanceUI() {
  const real = walletBalances[activeWallet] ?? "0";
  if (balances) balances.textContent = visible ? `$ ${real}` : `$ ${hiddenBalance}`;
  if (ValueHider) ValueHider.innerHTML = visible ? eyeOpen : eyeSlash;
  if (typeofwallet) typeofwallet.textContent = activeWallet === "Hotwallet" ? 'Hot Wallet' : 'Cold Wallet';
  if (HotwalletpopNotify) {
    HotwalletpopNotify.innerHTML =
      activeWallet === "Hotwallet" ? HotpopNotification : ColdpopNotification;
  }

  document.querySelectorAll('.targetbalance').forEach(btn => {
    btn.classList.toggle('selectedbutton', btn.getAttribute('data-balance') === activeWallet);
  });
}

export function AboutBalance() {
  if (ValueHider) {
    ValueHider.onclick = () => {
      visible = !visible;
      localStorage.setItem('balanceVisible', JSON.stringify(visible));
      updateBalanceUI();
    };
  }
  updateBalanceUI();
}

export function DifferentBalance() {
  document.querySelectorAll('.targetbalance').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetType = btn.getAttribute('data-balance'); 
      if (!targetType) return;

      activeWallet = targetType;
      localStorage.setItem('activeWallet', activeWallet);

      updateBalanceUI();
    });
  });
  updateBalanceUI();
}

export function WalletTransferPopUp(){
  document.querySelector('.transferButton')?.addEventListener('click', ()=>{
    TransferFormElement.style.display = 'flex';
  })

  document.querySelector('.Xmark_Close')?.addEventListener('click', ()=>{
    TransferFormElement.style.display = 'none';
  })
  // TransferFormElement.addEventListener('dblclick', ()=>{
  //   TransferFormElement.style.display = 'none'
  // })
}