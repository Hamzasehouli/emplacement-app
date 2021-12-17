const responseForm = document.querySelectorAll(".form-response");
const responseContent = document.querySelector(".response-area");
const responseShow = document.querySelectorAll(".show-response");
const sendResponse = document.querySelector(".send-response");
const likeBtn = document.querySelectorAll(".questions__like");

export const toggleResponse = responseShow?.forEach((t) => {
  t?.addEventListener("click", (e) => {
    console.log(e.target.dataset);
    responseForm?.forEach((k) => {
      if (k.dataset.questionid !== e.target.dataset.id) return;
      k.classList.toggle("hidden");
      if (t.classList.contains("hidden")) {
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

export const sendRes = sendResponse?.addEventListener(
  "click",
  async function () {
    console.log(responseForm.dataset);

    const res = await fetch(
      `http://localhost:3000/api/v1/users/${responseForm.dataset.userid}/questions/${responseForm.dataset.questionid}/responses`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ content: responseContent.value }),
      }
    );

    console.log(res);
    if (res.ok) {
      window.location.reload();
    }
  }
);

likeBtn?.forEach((t) => {
  t?.addEventListener("click", async function () {
    console.log(this.dataset);
    const res = await fetch(
      `http://localhost:3000/api/v1/users/${this.dataset.userid}/questions/${this.dataset.questionid}/favorites`,
      {
        method: "POST",
        // headers: {
        //   "content-type": "application/json",
        // },
        // body: JSON.stringify({ content: responseContent.value }),
      }
    );
    console.log(res);
  });
});
