const loginForm = document.querySelector(".login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");

export default loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    console.log(email.value, password.value);

    const res = await fetch("http://localhost:3000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    if (res.ok) {
      setTimeout(() => {
        location.replace("/");
      }, 2000);
    }

    console.log(res);
  } catch (err) {}
});
