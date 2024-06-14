document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
  
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value;
        
        const response = await fetch('/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
  
        const result = await response.json();
        if (response.ok) {
          localStorage.setItem('token', result.token);
          window.location.href = '/game.html';
        } else {
          alert(result.error);
        }
      });
    }
  
    if (registerForm) {
      registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = registerForm.username.value;
        const email = registerForm.email.value;
        const password = registerForm.password.value;
  
        const response = await fetch('/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, email, password })
        });
  
        const result = await response.json();
        if (response.ok) {
          window.location.href = '/login.html';
        } else {
          alert(result.error);
        }
      });
    }
  
    const startGameButton = document.getElementById('start-game');
    if (startGameButton) {
      startGameButton.addEventListener('click', () => {
        const difficulty = document.getElementById('difficulty').value;
        window.location.href = `/game.html?difficulty=${difficulty}`;
      });
    }
  });
  