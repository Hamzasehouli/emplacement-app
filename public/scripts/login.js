const loginForm = document.querySelector(".login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const emailError = document.querySelector(".email-error");
const passwordError = document.querySelector(".password-error");
const loginBtn = document.querySelector(".login-btn");

export default loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    loginBtn.innerText = "...wait";
    emailError.classList.add("hidden");
    passwordError.classList.add("hidden");

    let isEmailCorrect = true;
    let isPasswordCorrect = true;

    if (!email.value.trim()) {
      emailError.classList.remove("hidden");
      isEmailCorrect = false;
      loginBtn.innerText = "Login";
    }

    if (!password.value.trim() || password.value.trim().length < 8) {
      passwordError.classList.remove("hidden");
      isPasswordCorrect = false;
      loginBtn.innerText = "Login";
    }

    if (!isEmailCorrect && !isPasswordCorrect) return;

    const res = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    if (res.ok) {
      location.replace("/");
    } else {
      loginBtn.innerText = "Login";
    }

    loginBtn.innerText = "Login";
  } catch (err) {}
});
