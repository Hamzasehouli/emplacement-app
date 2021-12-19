const leftBtn = document.querySelector(".left");
const rightBtn = document.querySelector(".right");
const pageNumber = document.querySelector(".pagination__page");
const po = await new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition((po) => {
    return resolve(po);
  });
});

const { latitude, longitude } = po.coords;
(function () {
  if (!latitude || !longitude) return;
})();
let page = pageNumber?.dataset.page * 1;
console.log(page);

export const prev = leftBtn?.addEventListener("click", async function () {
  page--;
  console.log(page);
  if (page < 1) {
    page = pageNumber.dataset.page * 1;
    return;
  }
  console.log(page);
  //   await fetch(
  //     `http://localhost:3000/search/lng/${longitude}/lat/${latitude}/page/${page}`
  //   );
  window.location.href = `http://localhost:3000/search/lng/${longitude}/lat/${latitude}/page/${page}`;
});

export const nex = rightBtn?.addEventListener("click", function () {
  page++;
  console.log(page);
  window.location.href = `http://localhost:3000/search/lng/${longitude}/lat/${latitude}/page/${page}`;
});
