const searchInput = document.querySelector(".searchInput");

document.querySelector(".search__list").innerHTML = "";

export default searchInput?.addEventListener("input", async function (e) {
  e.preventDefault();
  if (this.value.trim() === "") {
    document.querySelector(".search__list").innerHTML = "";
    return;
  }
  console.log(this.dataset.userid, "sss");
  document.querySelector(".search__list").innerHTML = "...fetching";

  const res = await fetch(
    `http://localhost:3000/api/v1/users/${this.dataset.userid}/questions?term=${this.value}`
  );
  const data = await res.json();
  console.log(data);
  if (data.data.questions.length === 0) {
    return (document.querySelector(".search__list").innerHTML =
      "No question found");
  }
  const markup = `${data.data.questions
    ?.map((question) => {
      return `<li class="search__item">
        <a class="search__anch" href=/questions/${question._id}>
        <p  class="search__title">${question.title}</p>
        <p  class="search__content">${question.content}</p>
        </a>
    </li>`;
    })
    .join("")}`;
  console.log(markup);
  document.querySelector(".search__list").innerHTML = "";
  document
    .querySelector(".search__list")
    .insertAdjacentHTML("afterbegin", markup);
});
