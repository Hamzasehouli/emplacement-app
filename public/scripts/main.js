import signup from "./signup.js";
import login from "./login.js";
import askquestion from "./askquestion.js";
import logout from "./logout.js";
import searchQuestion from "./searchQuestion.js";
import { prev, nex } from "./paginate.js";
import { responding, toggleResponse, sendRes } from "./responding.js";

const test = document.querySelector(".test");
test?.addEventListener("click", async () => {
  if (navigator.geolocation) {
    const po = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((po) => {
        return resolve(po);
      });
    });

    const { latitude, longitude } = po.coords;
    window.location.href = `http://localhost:3000/search/lng/${longitude}/lat/${latitude}/page/1`;
  }
});
