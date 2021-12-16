const responseForm = document.querySelector(".form-response");
const responseContent = document.querySelector(".response-area");
const responseShow = document.querySelector(".show-response");
const sendResponse = document.querySelector(".send-response");
const likeBtn = document.querySelector(".questions__like");

export const toggleResponse = responseShow?.addEventListener("click", () => {
  responseForm.classList.toggle("hidden");
  if (responseForm.classList.contains("hidden")) {
    responseShow.innerText = "Answer this question";
  } else {
    responseShow.innerText = "Collapse the reponse area";
  }
});

export const responding = responseForm?.addEventListener(
  "submit",
  async function (e) {
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
  }
);

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

likeBtn?.addEventListener("click", function () {
  console.log(this.dataset);
});
