import { supabase } from './supabase-config.js';

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
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

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
  // Check if session exists on load
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (!session) {
      window.location.href = 'admin-login.html';
    } else {
      console.log('Admin logado:', session.user.email);
    }
  });

  // Listen for auth changes
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT' || (!session && event !== 'INITIAL_SESSION')) {
      window.location.href = 'admin-login.html';
    }
  });

  logoutBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    await supabase.auth.signOut();
    window.location.href = 'admin-login.html';
  });
}

