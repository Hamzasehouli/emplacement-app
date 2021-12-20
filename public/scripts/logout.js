const logout = document.querySelector(".logout");

export default logout?.addEventListener("click", () => {
  document.cookie = "jwt=''; path=/";

  window.location.replace("/");
});
