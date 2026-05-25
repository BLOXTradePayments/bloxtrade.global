import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Handle Login Form (admin-login.html)
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const submitBtn = loginForm.querySelector('button[type="submit"]');

    try {
      submitBtn.innerText = 'Entrando...';
      submitBtn.disabled = true;
      await signInWithEmailAndPassword(auth, email, password);
      // Success, redirect to panel
      window.location.href = 'admin-panel.html';
    } catch (error) {
      console.error(error);
      alert('Erro ao fazer login: ' + error.message);
      submitBtn.innerText = 'Entrar no Painel';
      submitBtn.disabled = false;
    }
  });
}

// Handle Auth State and Protection (admin-panel.html)
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  // We are on the panel, check if user is logged in
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      // Not logged in, kick out
      window.location.href = 'admin-login.html';
    } else {
      console.log('Admin logado:', user.email);
    }
  });

  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
      window.location.href = 'admin-login.html';
    });
  });
}
