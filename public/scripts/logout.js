const logout = document.querySelector(".logout");

export default logout?.addEventListener("click", () => {
  console.log("logout");
  document.cookie = "jwt=";
});
