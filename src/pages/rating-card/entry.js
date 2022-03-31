import "./scss/main.scss";

const ratingCard = document.getElementById("rating");
const thankCard = document.getElementById("rating-done");
const rateResult = document.querySelector(".selected-rating");

ratingCard.addEventListener("submit", e => {
  e.preventDefault();

  const selectedRate = document.querySelector("input[type='radio']:checked");

  if (selectedRate) {
    ratingCard.classList.add("hidden");
    thankCard.classList.remove("hidden");

    rateResult.textContent = rateResult.textContent.replace(/"rate"/, selectedRate.value);
  }
});
