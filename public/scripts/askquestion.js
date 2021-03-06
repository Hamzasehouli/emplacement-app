const askForm = document.querySelector(".ask-form");
const title = document.getElementById("title");
const content = document.getElementById("content");
const titleError = document.querySelector(".title-error");
const contentError = document.querySelector(".content-error");
const askBtn = document.querySelector(".ask-btn");

export default askForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    askBtn.innerText = "...wait";
    titleError.classList.add("hidden");
    contentError.classList.add("hidden");

    let isTitleCorrect = true;
    let isContentCorrect = true;

    if (!title.value.trim()) {
      titleError.classList.remove("hidden");
      isTitleCorrect = false;
      askBtn.innerText = "Add";
    }
    if (!content.value.trim()) {
      contentError.classList.remove("hidden");
      isContentCorrect = false;
      askBtn.innerText = "Add";
    }

    const po = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((po) => {
        return resolve(po);
      });
    });

    const { latitude, longitude } = po.coords;

    if ((!isTitleCorrect && !isContentCorrect) || !latitude || !longitude)
      return;

    const res = await fetch(
      `/api/v1/users/${askForm.dataset.userid}/latitude/${latitude}/longitude/${longitude}/questions`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ title: title.value, content: content.value }),
      }
    );

    if (res.ok) {
      window.location.pathname = "/";
    }
  } catch (err) {}
});
