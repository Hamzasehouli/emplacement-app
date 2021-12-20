const responseForm = document.querySelectorAll(".form-response");
const responseContent = document.querySelectorAll(".response-area");
const responseShow = document.querySelectorAll(".show-response");
const sendResponse = document.querySelectorAll(".send-response");
const likeBtn = document.querySelectorAll(".questions__like");

export const toggleResponse = responseShow?.forEach((t) => {
  t?.addEventListener("click", (e) => {
    console.log(e.target.dataset);
    responseForm?.forEach((k) => {
      if (k.dataset.questionid !== e.target.dataset.id) return;
      k.classList.toggle("hidden");
      if (k.classList.contains("hidden")) {
        t.innerText = "Answer this question";
      } else {
        t.innerText = "Collapse the reponse area";
      }
    });
  });
});

export const responding = responseForm?.forEach((t) => {
  t?.addEventListener("submit", async function (e) {
    e.preventDefault();
    try {
      const { questionId, userId } = responseForm.dataset;
      if (!responseContent.trim().value) {
        throw "Please response must not be empty";
      }
      const res = await fetch(
        `http://localhost:3000/api/v1/users/${userId}/questions/${questionId}/responses`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ content: responseContent.value }),
        }
      );
      const data = await res.json();
      console.log(res, data);
    } catch (err) {}
  });
});

export const sendRes = sendResponse?.forEach((t) => {
  t?.addEventListener("click", async function () {
    responseForm?.forEach(async (e) => {
      if (t.dataset.user === t.dataset.userid) {
        e.querySelector(".response-area").value =
          "Is not allowed to response your own question";
        return;
      }
      if (e.dataset.questionid !== t.dataset.questionid) return;
      console.log(e.querySelector(".response-area").value);
      console.log(t.dataset);

      const res = await fetch(
        `http://localhost:3000/api/v1/users/${e.dataset.userid}/questions/${e.dataset.questionid}/responses`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            content: e.querySelector(".response-area").value,
            location: {
              type: e.dataset.type,
              coordinates: [e.dataset.lng * 1, e.dataset.lat * 1],
            },
          }),
        }
      );
      e.querySelector(".response-area").value = "";
      // console.log(res);
      // if (res.ok) {
      //   window.location.reload();
      // }
    });
  });
});

likeBtn?.forEach((t) => {
  t.addEventListener("click", async function () {
    console.log(t.dataset);
    const res = await fetch(
      `http://localhost:3000/api/v1/users/${t.dataset.userid}/questions/${t.dataset.questionid}/favorites`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          dist: t.dataset.dist * 1,
        }),
      }
    );
    // console.log(res);
    if (res.ok) {
      window.location.reload();
    }
  });
});
