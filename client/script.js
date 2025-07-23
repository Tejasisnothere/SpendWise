const API_BASE = 'http://localhost:5000/api/auth';

async function signup() {
  const name = document.getElementById('signup_name').value;
  const email = document.getElementById('signup_email').value;
  const password = document.getElementById('signup_password').value;

  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();

  if (res.ok) {
    alert('Signup successful!');
    window.location.href = 'index.html';
  } else {
    alert(data.message || 'Signup failed');
  }
}

async function login() {
  const email = document.getElementById('login_email').value;
  const password = document.getElementById('login_password').value;

  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }).then(res => res.json())
.then(data => {
  if (data.token) {
    localStorage.setItem('token', data.token);  
    window.location.href = 'dashboard.html';    
  } else {
    alert('Login failed');
  }
});
  

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    window.location.href = 'dashboard.html';
  } else {
    alert(data.message || 'Login failed');
  }
}
