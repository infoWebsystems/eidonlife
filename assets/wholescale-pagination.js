/* * * * * * * * * * * * * * * * *
 * Initialization
 * * * * * * * * * * * * * * * * */

var init = function () {
  document.querySelectorAll("#review-pagination > *")?.forEach((item) => {
    item.addEventListener("click", (event) => {
        document.querySelector("[reviews-container]").classList.add("loading")
        window.fetchReviewsList(item.getAttribute("data-cursor"))
    })
  })
  document.querySelectorAll("#question-pagination > *")?.forEach((item) => {
    item.addEventListener("click", (event) => {
      document.querySelector("[questions-container]").classList.add("loading");
        window.fetchQuestionsList(item.getAttribute("data-cursor"))
    })
  })

};

document.addEventListener("DOMContentLoaded", init, false);
