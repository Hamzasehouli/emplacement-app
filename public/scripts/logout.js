const logout = document.querySelector(".logout");

export default logout?.addEventListener("click", () => {
  document.cookie = "jwt=";

  window.location.replace("/");
});
