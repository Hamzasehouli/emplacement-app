const askForm = document.querySelector(".ask-form");
const title = document.getElementById("title");
const content = document.getElementById("content");

export default askForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    // console.log(title.value, content.value);
    // console.log(askForm.dataset.userid);

    const po = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((po) => {
        return resolve(po);
      });
    });
    // console.log(po.coords);

    const { latitude, longitude } = po.coords;

    // console.log(latitude);
    // console.log(longitude);

    const res = await fetch(
      `http://localhost:3000/api/v1/users/${askForm.dataset.userid}/latitude/${latitude}/longitude/${longitude}/questions`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ title: title.value, content: content.value }),
      }
    );
    console.log(res);

    if (res.ok) {
      setTimeout(() => {
        location.replace("/questions");
      }, 2000);
    }
  } catch (err) {}
});
