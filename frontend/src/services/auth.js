// // services/auth.js
// export async function loginUser(email, password) {
//     const response = await fetch('/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//     });
//     const data = await response.json();
//     if (response.ok) {
//         localStorage.setItem('userEmail', email); // Store email
//         console.log('User email stored in localStorage:', email); // Debug log
//     }
//     return data;
// }
