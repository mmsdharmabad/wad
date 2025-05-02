const form = document.getElementById('registrationForm');
const userListDiv = document.getElementById('userList');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const user = {
    name: form.name.value,
    email: form.email.value,
    password: form.password.value
  };

  try {
    // Simulate AJAX call with fetch to dummy API
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });

    if (res.ok) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      alert('User registered!');
      form.reset();
    } else {
      alert('Server error.');
    }
  } catch {
    alert('Request failed.');
  }
});

function loadUsers() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  userListDiv.innerHTML = users.length
    ? users.map((u, i) => `<p><strong>${i + 1}.</strong> ${u.name} (${u.email})</p>`).join('')
    : '<p>No users found.</p>';
}
