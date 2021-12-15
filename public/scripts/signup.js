const signupForm = document.querySelector(".signup-form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const emailError = document.querySelector(".email-error");
const passwordError = document.querySelector(".password-error");

export default signupForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    emailError.classList.add("hidden");
    passwordError.classList.add("hidden");
    let isEmailCorrect = true;
    let isPasswordCorrect = true;
    if (!email.value.trim()) {
      emailError.classList.remove("hidden");
      isEmailCorrect = false;
    }

    if (!password.value.trim() || password.value.trim().length < 8) {
      passwordError.classList.remove("hidden");
      isPasswordCorrect = false;
    }

    if (!isEmailCorrect && !isPasswordCorrect) return;

    const res = await fetch("http://localhost:3000/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });
    console.log(res);
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      setTimeout(() => {
        location.replace("/");
      }, 2000);
    }
  } catch (err) {}
});
