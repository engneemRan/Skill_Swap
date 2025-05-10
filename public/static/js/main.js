document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById('navLinks');
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user) {
      // روابط المستخدم العادي
      nav.innerHTML = `
        <li><a href="index.html">Home</a></li>
        <li><a href="search.html">Search</a></li>
        <li><a href="profile.html">Profile</a></li>
        ${user.email === 'admin@skillswap.sa' ? `<li><a href="admin.html">Manage Users</a></li>` : ''}
        <li><a href="#" onclick="logout()">Logout</a></li>
      `;
    } else {
      // روابط الزائر
      nav.innerHTML = `
        <li><a href="index.html">Home</a></li>
        <li><a href="search.html">Search</a></li>
        <li><a href="login.html">Login</a></li>
        <li><a href="signup.html">Sign Up</a></li>
      `;
    }
  });
  
  function logout() {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
  }
  