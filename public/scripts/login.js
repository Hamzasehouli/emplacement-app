const loginForm = document.querySelector(".login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");

export default loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    console.log(email.value, password.value);
    return;
    const res = fetch("", {
      method: "POST",
      header: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  } catch (err) {}
});
