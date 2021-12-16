const responseForm = document.querySelector(".form-response");
const responseContent = document.querySelector(".response-area");
const responseShow = document.querySelector(".show-response");

export const toggleResponse = responseShow.addEventListener("click", (e) => {
  responseForm.classList.toggle("hidden");
  if (responseForm.classList.contains("hidden")) {
    responseShow.innerText = "Answer this question";
  } else {
    responseShow.innerText = "Collapse the reponse area";
  }
});

export const responding = responseForm?.addEventListener(
  "submit",
  async (e) => {
    console;
    log("rr");
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
