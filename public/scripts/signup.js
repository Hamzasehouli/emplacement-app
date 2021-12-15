const signupForm = document.querySelector(".signup-form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const emailError = document.querySelector(".email-error");
const passwordError = document.querySelector(".password-error");
const signupBtn = document.querySelector(".signup-btn");

export default signupForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    signupBtn.innerText = "...wait";
    emailError.classList.add("hidden");
    passwordError.classList.add("hidden");
    let isEmailCorrect = true;
    let isPasswordCorrect = true;
    if (!email.value.trim()) {
      emailError.classList.remove("hidden");
      isEmailCorrect = false;
      signupBtn.innerText = "Signup";
    }

    if (!password.value.trim() || password.value.trim().length < 8) {
      passwordError.classList.remove("hidden");
      isPasswordCorrect = false;
      signupBtn.innerText = "Signup";
    }

    if (!isEmailCorrect && !isPasswordCorrect) return;

    const res = await fetch("http://localhost:3000/api/v1/auth/signup", {
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
    signupBtn.innerText = "Signup";
  } catch (err) {}
});
