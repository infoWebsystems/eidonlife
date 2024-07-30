function eventListners() {
  const widgetTabs = document.querySelectorAll(".review-question-inner > span");
  const openReviewForm = document.querySelector(".add-review-inner");
  const openQuestionForm = document.querySelector(".ask-question-inner");
  const closeFormDrawer = document.querySelectorAll(".widget-drawer-close");
  const reviewForm = document.querySelector("#review_form");
  const questionForm = document.querySelector("#question_form");
  const reviewFormVisibility = document.querySelector("[review-form]");
  const questionFormVisibility = document.querySelector("[question-form]");
  const searchInput = document.querySelector("#review-search");
  const sortBy = document.querySelector(".selected-sortby");
  const sortByItem = document.querySelectorAll(".sortby-dropdown > span");
  const sortByDropdown = document.querySelector(".sortby-dropdown");
  const reviewFileInput = document.querySelector(
    "[review-form] .wholescale-file-upload [name='images']"
  );
  const questionFileInput = document.querySelector(
    "[question-form] .wholescale-file-upload [name='images']"
  );
  const reviewImageListContainer = document.querySelector(
    "[review-form] .image-list"
  );
  const questionImageListContainer = document.querySelector(
    "[question-form] .image-list"
  );
  const reviewImagesArr = [];
  const questionImagesArr = [];
  const productId = document
    .querySelector("[data-product-id]")
    .getAttribute("data-product-id");
  // Review Submit Form
  reviewForm.addEventListener("submit", handleReviewSubmit);
  // Question Submit Form
  questionForm.addEventListener("submit", handleQuestionSubmit);

  function handleReviewSubmit(event) {
    event.preventDefault(); // Prevent the default form submission
    document.querySelector("[review-form]").classList.add("loading");
    // update images array
    const filteredArray = reviewImagesArr.map(({ img_url, ...rest }) => rest);
    // Retrieve form data or perform other actions
    const formData = new FormData(event.target);
    const reviewData = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
      star: formData.get("rating"),
      title: formData.get("title"),
      description: formData.get("detail"),
      images: filteredArray,
      platform: "Shopify",
      product: productId,
      shop_url: Shopify.shop,
      blackBox: encodeURIComponent(window.blackBoxStr),
    };
    console.log(reviewData);
    submitReview(reviewData);
  }

  function submitReview(reviewData) {
    const url =
      "https://be.wholescale.net/shopifyWidget/reviewSubmission";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    };
    fetch(url, requestOptions)
      .then((response) => console.log(response))
      .then((data) => {
        // Process the response data here
        document.querySelector(".wholescale-toast .toast-text").textContent =
          "Review Submitted Successfully";
        document.querySelector(".wholescale-toast").classList.add("active");
        reviewFormVisibility.classList.remove("active");
        document.querySelector("body").classList.remove("drawer-open");
        document.querySelector("[review-form]").classList.remove("loading");
        document.removeEventListener("click", updateReviewDrawer);
        setTimeout(function () {
          document
            .querySelector(".wholescale-toast")
            .classList.remove("active");
        }, 4000);
      })
      .catch((error) => {
        console.error("Error:", error);
        document.querySelector("[review-form]").classList.remove("loading");
        // Handle any errors that occurred during the request
      });
  }

  function handleQuestionSubmit(event) {
    event.preventDefault(); // Prevent the default form submission
    document.querySelector("[question-form]").classList.add("loading");
    // update images array
    const filteredArray = questionImagesArr.map(({ img_url, ...rest }) => rest);

    // Retrieve form data or perform other actions
    const formData = new FormData(event.target);
    const questionData = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
      question: formData.get("question"),
      images: filteredArray,
      platform: "Shopify",
      product: productId,
      shop_url: Shopify.shop,
      blackBox: encodeURIComponent(window.blackBoxStr),
    };
    console.log(questionData);
    submitQuestion(questionData);
  }
  function submitQuestion(reviewData) {
    const url =
      "https://be.wholescale.net/shopifyWidget/questionSubmission";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    };
    fetch(url, requestOptions)
      .then((response) => console.log(response))
      .then((data) => {
        // Process the response data here
        document.querySelector(".wholescale-toast .toast-text").textContent =
          "Question Submitted Successfully";
        document.querySelector(".wholescale-toast").classList.add("active");
        questionFormVisibility.classList.remove("active");
        document.querySelector("body").classList.remove("drawer-open");
        document.querySelector("[question-form]").classList.remove("loading");
        document.removeEventListener("click", updateQuestionDrawer);
        setTimeout(function () {
          document
            .querySelector(".wholescale-toast")
            .classList.remove("active");
        }, 4000);
      })
      .catch((error) => {
        console.error("Error:", error);
        document.querySelector("[question-form]").classList.remove("loading");
        // Handle any errors that occurred during the request
      });
  }
  widgetTabs?.forEach((item) => {
    item.addEventListener("click", (event) => {
      //handle click
      var selectedtab = event.target.getAttribute("data-tab-value");
      document
        .querySelector(".review-question-inner > span.active")
        .classList.remove("active");
      document
        .querySelector(".widget-container.active")
        .classList.remove("active");
      event.target.classList.add("active");
      document
        .querySelector("[" + selectedtab + "-container]")
        .classList.add("active");
    });
  });
  closeFormDrawer?.forEach((item) => {
    item.addEventListener("click", (event) => {
      //handle click
      event.target.closest(".active").classList.remove("active");
      document.querySelector("body").classList.remove("drawer-open");
      document.removeEventListener("click", updateQuestionDrawer);
      document.removeEventListener("click", updateReviewDrawer);
    });
  });

  openReviewForm?.addEventListener("click", (event) => {
    //handle click
    document.querySelector("[review-form]").classList.add("active");
    document.querySelector("body").classList.add("drawer-open");
    setTimeout(function () {
      document.addEventListener("click", updateReviewDrawer);
    }, 200);
  });
  openQuestionForm?.addEventListener("click", (event) => {
    //handle click
    document.querySelector("[question-form]").classList.add("active");
    document.querySelector("body").classList.add("drawer-open");
    setTimeout(function () {
      document.addEventListener("click", updateQuestionDrawer);
    }, 200);
  });

  // Close drawer when click outside of review drawer
  function updateReviewDrawer(event) {
    // Check if the clicked element is the element you want to keep visible
    if (
      event.target !== reviewFormVisibility &&
      !reviewFormVisibility.contains(event.target)
    ) {
      // Hide the element if it is not the element you want to keep visible
      reviewFormVisibility.classList.remove("active");
      document.querySelector("body").classList.remove("drawer-open");
      document.removeEventListener("click", updateReviewDrawer);
    }
  }
  // Close drawer when click outside of question drawer
  function updateQuestionDrawer(event) {
    // Check if the clicked element is the element you want to keep visible
    if (
      event.target !== questionFormVisibility &&
      !questionFormVisibility.contains(event.target)
    ) {
      // Hide the element if it is not the element you want to keep visible
      questionFormVisibility.classList.remove("active");
      document.querySelector("body").classList.remove("drawer-open");
      document.removeEventListener("click", updateQuestionDrawer);
    }
  }
  // Close dropdown when click outside of sortBy Dropdown
  function updateSortByDropdown(event) {
    // Check if the clicked element is the element you want to keep visible
    if (
      event.target !== sortByDropdown &&
      !sortByDropdown.contains(event.target)
    ) {
      // Hide the element if it is not the element you want to keep visible
      sortByDropdown.classList.remove("active");
      document.removeEventListener("click", updateSortByDropdown);
    }
  }
  // open sort by
  sortBy?.addEventListener("click", (event) => {
    //handle click
    sortByDropdown.classList.toggle("active");
    if (sortByDropdown.classList.value.includes("active")) {
      setTimeout(function () {
        document.addEventListener("click", updateSortByDropdown);
      }, 200);
    }
  });

  sortByItem?.forEach((item) => {
    item.addEventListener("click", (event) => {
      //handle click
      var selectedValue = event.target.getAttribute("data-value");
      document.querySelector("[sortby-value]").textContent = selectedValue;
      document
        .querySelector(".sortby-dropdown  > span.active")
        .classList.remove("active");
      event.target.classList.add("active");
      sortByDropdown.classList.remove("active");
      document.removeEventListener("click", updateSortByDropdown);
      defaultSortBy = selectedValue;
      window.fetchReviewsList();
    });
  });
  // Render Review Media Images
  function renderReviewImages() {
    document.querySelector("[review-form] .uploaded-images").innerHTML = "";
    reviewImagesArr.forEach(function (item, index) {
      console.log(item, index);
      let image = `
        <div class="image-item" data-index=${index}>
          <img src="${item.img_url}">
          <svg class="remove-image" data-index=${index} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CloseIcon" index="0"><path data-index=${index} class="remove-image" d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
        </div>`;
      document.querySelector("[review-form] .uploaded-images").innerHTML +=
        image;
    });
    document.querySelector("[review-form] .images-limit-text").style.display =
      "none";
    reviewFileInput.removeAttribute("disabled", true);
  }
  // Review Upload Image func
  reviewFileInput.addEventListener("change", (event) => {
    console.log(reviewFileInput.files);
    var files = reviewFileInput.files;
    console.log(reviewImagesArr.length);
    if (files.length && reviewImagesArr.length <= 3) {
      document.querySelector("[review-form] .images-limit-text").style.display =
        "none";
      reviewFileInput.removeAttribute("disabled", true);
      const reader = new FileReader();
      reader.onloadend = function () {
        const base64String = reader.result;
        // Perform actions with the Base64 encoded string here
        reviewImagesArr.push({
          image: base64String,
          img_url: window.URL.createObjectURL(files[0]),
        });
        renderReviewImages();
      };
      reader.readAsDataURL(files[0]);
    } else if (reviewImagesArr.length > 3) {
      document.querySelector("[review-form] .images-limit-text").style.display =
        "block";
      reviewFileInput.setAttribute("disabled", true);
      reviewFileInput.value = "";
    }
  });

  // Update Images grid
  reviewImageListContainer.addEventListener("click", (event) => {
    //handle click
    event.stopPropagation();
    console.log(event.target);
    if (event.target.classList.contains("remove-image")) {
      let currIndex = event.target.getAttribute("data-index");
      reviewImagesArr.splice(currIndex, 1);
      renderReviewImages();
      reviewFileInput.value = "";
    }
  });

  // Render Review Media Images
  function renderQuestionImages() {
    document.querySelector("[question-form] .uploaded-images").innerHTML = "";
    questionImagesArr.forEach(function (item, index) {
      console.log(item, index);
      let image = `
          <div class="image-item" data-index=${index}>
            <img src="${item.img_url}">
            <svg class="remove-image" data-index=${index} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CloseIcon" index="0"><path data-index=${index} class="remove-image" d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
          </div>`;
      document.querySelector("[question-form] .uploaded-images").innerHTML +=
        image;
    });
    document.querySelector("[question-form] .images-limit-text").style.display =
      "none";
    questionFileInput.removeAttribute("disabled", true);
  }
  // Review Upload Image func
  questionFileInput.addEventListener("change", (event) => {
    console.log(reviewFileInput.files);
    var questionFiles = questionFileInput.files;
    console.log(questionImagesArr.length);
    if (questionFiles.length && questionImagesArr.length <= 3) {
      document.querySelector(
        "[question-form] .images-limit-text"
      ).style.display = "none";
      questionFileInput.removeAttribute("disabled", true);
      const reader = new FileReader();
      reader.onloadend = function () {
        const base64String = reader.result;
        // Perform actions with the Base64 encoded string here
        questionImagesArr.push({
          image: base64String,
          img_url: window.URL.createObjectURL(questionFiles[0]),
        });
        renderQuestionImages();
      };
      reader.readAsDataURL(questionFiles[0]);
    } else if (questionImagesArr.length > 3) {
      document.querySelector(
        "[question-form] .images-limit-text"
      ).style.display = "block";
      questionFileInput.setAttribute("disabled", true);
      questionFileInput.value = "";
    }
  });

  // Update Images grid
  questionImageListContainer.addEventListener("click", (event) => {
    //handle click
    event.stopPropagation();
    console.log(event.target);
    if (event.target.classList.contains("remove-image")) {
      let currIndex = event.target.getAttribute("data-index");
      questionImagesArr.splice(currIndex, 1);
      renderQuestionImages();
      questionFileInput.value = "";
    }
  });

  // search event listener
  // Add the debounced change event listener
  // Debounce function
  function debounce(func, delay) {
    let timeoutId;

    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
  // Event handler function
  function handleChange(event) {
    // Handle input change here
    searchTerm = event.target.value;
    window.fetchReviewsList();
  }
  const debouncedHandleChange = debounce(handleChange, 300);
  searchInput.addEventListener("keyup", debouncedHandleChange);
}

document.addEventListener("DOMContentLoaded", function () {
  // do something here ...
  let defaultSortBy = "";
  let searchTerm = "";
  fetchWholescaleWidgetInfo();
  eventListners();
});
function renderReviews(data) {
  const reviewList = document.querySelector(".reviews-list-inner");
  reviewList.innerHTML = "";
  data.results.forEach(function (item, index) {
    console.log(item);
    let reviewItem = `
    <div class="reviews-list-item" data-index="${index}">
    <div class="review-alphabet-title">
      <span class="first-alphabet" style="background-color: ${localStorage.getItem(
      "star_color"
    )}"> ${item?.customer?.first_name?.charAt(0).toUpperCase()} </span>
    </div>
    <div class="review-content">
      <div class="review-content-top">
        <div class="name-rating">
          <span class="name"> ${item?.customer?.first_name
      } ${item?.customer?.last_name?.charAt(0).toUpperCase()} </span>
          <span class="rating rating-${item.stars}">
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.51667 1.0835L8.19042 4.47433L11.9333 5.02141L9.22501 7.65933L9.86417 11.386L6.51667 9.62558L3.16917 11.386L3.80834 7.65933L1.10001 5.02141L4.84292 4.47433L6.51667 1.0835Z" stroke="#F1C343" stroke-opacity="0.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.51667 1.0835L8.19042 4.47433L11.9333 5.02141L9.22501 7.65933L9.86417 11.386L6.51667 9.62558L3.16917 11.386L3.80834 7.65933L1.10001 5.02141L4.84292 4.47433L6.51667 1.0835Z" stroke="#F1C343" stroke-opacity="0.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.51667 1.0835L8.19042 4.47433L11.9333 5.02141L9.22501 7.65933L9.86417 11.386L6.51667 9.62558L3.16917 11.386L3.80834 7.65933L1.10001 5.02141L4.84292 4.47433L6.51667 1.0835Z" stroke="#F1C343" stroke-opacity="0.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.51667 1.0835L8.19042 4.47433L11.9333 5.02141L9.22501 7.65933L9.86417 11.386L6.51667 9.62558L3.16917 11.386L3.80834 7.65933L1.10001 5.02141L4.84292 4.47433L6.51667 1.0835Z" stroke="#F1C343" stroke-opacity="0.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.51667 1.0835L8.19042 4.47433L11.9333 5.02141L9.22501 7.65933L9.86417 11.386L6.51667 9.62558L3.16917 11.386L3.80834 7.65933L1.10001 5.02141L4.84292 4.47433L6.51667 1.0835Z" stroke="#F1C343" stroke-opacity="0.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>
        <div class="review-date">
          <span class="date"> ${item?.created_at} </span>
        </div>
      </div>
      <div class="review-content-bottom">
      ${item?.title ? `<p class="review-title">${item?.title}</p>` : ""}
      ${item.description
        ? `<p class="review-description">${item?.description}</p>`
        : ""
      }
      ${item.answer
        ? `<p class="review-answer"> <label> Reply: </label> ${item?.answer}</p>`
        : ""
      }
      </div>
      ${item?.submission_images.length > 0
        ? `<div class="media-images">
        <div class="images-list">
        ${item?.submission_images?.map(
          (obj, index) =>
            `<div class="images-item" data-index="${index}"> <img src="${obj.image}"/> </div>`
        )} 
        </div>
      </div>`
        : ""
      }
    </div>
  </div>
    `;
    reviewList.innerHTML += reviewItem;
    document.querySelector(".reviews-list-inner").style.fill =
      localStorage.getItem("star_color");
    document.querySelector(".reviews-list-inner").style.stroke =
      localStorage.getItem("star_color");
  });
}
function renderQuestions(data) {
  const questionList = document.querySelector(".question-list-inner");
  questionList.innerHTML = "";
  data.results.forEach(function (item, index) {
    console.log(item);
    let questionItem = `
    <div class="question-list-item" data-index="${index}">
    <div class="question-title">
    <span class="first-alphabet" style="background-color: ${localStorage.getItem(
      "star_color"
    )}"> ${item?.customer?.first_name?.charAt(0).toUpperCase()} </span>
    </div>
    <div class="question-content">
      <div class="question-content-top">
        <div class="name-rating">
        <span class="name"> ${item?.customer?.first_name
      } ${item?.customer?.last_name?.charAt(0).toUpperCase()} </span>
        </div>
        <div class="question-date">
          <span class="date"> ${item?.created_at} </span>
        </div>
      </div>
      <div class="question-content-bottom">
        <div class="question-content">
          <p><label> Question: </label> ${item?.question}</p>
        </div>
        ${item?.answer
        ? `
        <p class="answer">
          <label> Answer: </label>
          ${item?.answer}
        </p>
        `
        : ""
      }
        ${item?.question_images.length > 0
        ? `<div class="media-images">
          <div class="images-list">
          ${item?.question_images?.map(
          (obj, index) =>
            `<div class="images-item" data-index="${index}"> <img src="${obj.image}"/> </div>`
        )} 
          </div>
        </div>`
        : ""
      }
      </div>
    </div>
  </div>
    `;
    questionList.innerHTML += questionItem;
  });
  document.querySelector(".question-list-inner").style.fill =
    localStorage.getItem("star_color");
  document.querySelector(".question-list-inner").style.stroke =
    localStorage.getItem("star_color");
}
function renderRatingSummary(data) {
  const elements = document.querySelectorAll(".progress-width");
  // Loop through the elements and add styles
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.backgroundColor = localStorage.getItem("star_color");
  }
  document.querySelector("[average-rating]").textContent =
    data?.average_rating?.toFixed(1);
  document
    .querySelector("[rating-star]")
    .classList.add("rating-" + Math.round(data?.average_rating));
  document.querySelector("[rating-star]").style.fill =
    localStorage.getItem("star_color");
  document.querySelector("[rating-star]").style.stroke =
    localStorage.getItem("star_color");
  document.querySelector("[review-count]").textContent = data.total_reviews;
  document.querySelector(".rating-star-5 .progress-width").style.width =
    Math.round((data.reviews_summary[4].reviews * 100) / data.total_reviews) +
    "%";
  document.querySelector(".rating-star-5 .star-count").textContent =
    data.reviews_summary[4].reviews;
  document.querySelector(".rating-star-4 .progress-width").style.width =
    Math.round((data.reviews_summary[3].reviews * 100) / data.total_reviews) +
    "%";
  document.querySelector(".rating-star-4 .star-count").textContent =
    data.reviews_summary[3].reviews;
  document.querySelector(".rating-star-3 .progress-width").style.width =
    Math.round((data.reviews_summary[2].reviews * 100) / data.total_reviews) +
    "%";
  document.querySelector(".rating-star-3 .star-count").textContent =
    data.reviews_summary[2].reviews;
  document.querySelector(".rating-star-2 .progress-width").style.width =
    Math.round((data.reviews_summary[1].reviews * 100) / data.total_reviews) +
    "%";
  document.querySelector(".rating-star-2 .star-count").textContent =
    data.reviews_summary[1].reviews;
  document.querySelector(".rating-star-1 .progress-width").style.width =
    Math.round((data.reviews_summary[0].reviews * 100) / data.total_reviews) +
    "%";
  document.querySelector(".rating-star-1 .star-count").textContent =
    data.reviews_summary[0].reviews;
}
function renderRatingStars(data) {
  let reviewStars = `
    <div class="wholescale-star-widget">
      <div class="rating-container-top">
        <div class="average-rating-and-star">
          <span class="star rating rating-${Math.round(
    data?.average_rating
  )}" rating-star style="fill:${localStorage.getItem('star_color')}; stroke:${localStorage.getItem(
    'star_color'
  )}">
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.51667 1.0835L8.19042 4.47433L11.9333 5.02141L9.22501 7.65933L9.86417 11.386L6.51667 9.62558L3.16917 11.386L3.80834 7.65933L1.10001 5.02141L4.84292 4.47433L6.51667 1.0835Z" stroke="#F1C343" stroke-opacity="0.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.51667 1.0835L8.19042 4.47433L11.9333 5.02141L9.22501 7.65933L9.86417 11.386L6.51667 9.62558L3.16917 11.386L3.80834 7.65933L1.10001 5.02141L4.84292 4.47433L6.51667 1.0835Z" stroke="#F1C343" stroke-opacity="0.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.51667 1.0835L8.19042 4.47433L11.9333 5.02141L9.22501 7.65933L9.86417 11.386L6.51667 9.62558L3.16917 11.386L3.80834 7.65933L1.10001 5.02141L4.84292 4.47433L6.51667 1.0835Z" stroke="#F1C343" stroke-opacity="0.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.51667 1.0835L8.19042 4.47433L11.9333 5.02141L9.22501 7.65933L9.86417 11.386L6.51667 9.62558L3.16917 11.386L3.80834 7.65933L1.10001 5.02141L4.84292 4.47433L6.51667 1.0835Z" stroke="#F1C343" stroke-opacity="0.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.51667 1.0835L8.19042 4.47433L11.9333 5.02141L9.22501 7.65933L9.86417 11.386L6.51667 9.62558L3.16917 11.386L3.80834 7.65933L1.10001 5.02141L4.84292 4.47433L6.51667 1.0835Z" stroke="#F1C343" stroke-opacity="0.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>
        <div class="total-review-and-label">
        <span class="review-count"> ${data?.total_reviews == 1
      ? data?.total_reviews + " review"
      : data?.total_reviews > 0
        ? data?.total_reviews + " reviews"
        : "No reviews"
    } </span>
        </div>
      </div>
    </div>
  `;
  const container = document.createElement('div');
  container.innerHTML = reviewStars;
  document.querySelector('#product-price').insertAdjacentElement('afterend', container);
  document.querySelector(".rating-container-top").addEventListener("click", (event) => {
    document.querySelector(".wholescale-review-widget").scrollIntoView({ behavior: 'smooth' });
  });
}
// Wholescale Widget Api's
function fetchWholescaleWidgetInfo() {
  const productId = document
    .querySelector("[data-product-id]")
    .getAttribute("data-product-id");
  window["fetchReviewsList"] = function (cursor) {
    let url = "https://be.wholescale.net/shopifyWidget/reviewList";
    let params = `?product=${productId}&shop_url=${Shopify.shop}`;
    console.log("defaultSortBy", defaultSortBy);
    let cursorURI = encodeURIComponent(cursor);
    if (cursor) {
      params += `&cursor=${cursorURI}&limit=10`;
    } else {
      params += `&page=1&limit=10`;
    }
    if (defaultSortBy?.length > 0) {
      defaultSortBy = defaultSortBy.replace(/-/g, " ");
      params += `&sort_by=${defaultSortBy}`;
    }
    if (searchTerm?.length > 0) {
      params += `&search=${encodeURIComponent(searchTerm)}`;
    }
    url = url + params;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Response:", data);
        // Process the response data here
        if (data.results.length > 0) {
          renderReviews(data)
          document.querySelector(".no-reviews").style.display = "none";
        }
        else {
          document.querySelector(".no-reviews").style.display = "block";
          document.querySelector(".reviews-list-inner").innerHTML = "";
        }
        if (!data.next && !data.previous) {
          console.log("no next no prev")
          document.querySelector("#review-pagination").style.display = "none";
        }
        if (data.previous) {
          let url = new URL(data.previous);
          let urlParams = new URLSearchParams(url.search);
          let prevCursor = urlParams.get('cursor');
          document.querySelector("#review-pagination").style.display = "flex";
          document.querySelector("#review-pagination .prev")?.classList.remove("wholescale-disabled");
          document.querySelector("#review-pagination .prev")?.setAttribute('data-cursor', prevCursor);
        }
        else {
          document.querySelector("#review-pagination .prev")?.classList.add("wholescale-disabled");
        }
        if (data.next) {
          let url = new URL(data.next);
          let urlParams = new URLSearchParams(url.search);
          let nextCursor = urlParams.get('cursor');
          document.querySelector("#review-pagination").style.display = "flex";
          document.querySelector("#review-pagination .next")?.classList.remove("wholescale-disabled");
          document.querySelector("#review-pagination .next")?.setAttribute('data-cursor', nextCursor)
        }
        else {
          document.querySelector("#review-pagination .next")?.classList.add("wholescale-disabled");
        }
        document
          .querySelector("[reviews-container]")
          .classList.remove("loading");
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle any errors that occurred during the request
      });
  };
  window["fetchQuestionsList"] = function (cursor) {
    let url = "https://be.wholescale.net/shopifyWidget/questionList";
    let params = `?product=${productId}&shop_url=${Shopify.shop}&page=1&limit=10`;
    let cursorURI = encodeURIComponent(cursor);
    if (cursor) {
      params += `&cursor=${cursorURI}&limit=10`;
    } else {
      params += `&page=1&limit=10`;
    }
    url = url + params;
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Response:", data);
        // Process the response data here
        data.results.length > 0 ? renderQuestions(data) : document.querySelector(".no-questions").style.display = "block";
        if (!data.next && !data.previous) {
          document.querySelector("#question-pagination").remove();
        }
        if (data.previous) {
          let url = new URL(data.previous);
          let urlParams = new URLSearchParams(url.search);
          let prevCursor = urlParams.get('cursor');
          document.querySelector("#question-pagination .prev")?.classList.remove("wholescale-disabled");
          document.querySelector("#question-pagination .prev")?.setAttribute('data-cursor', prevCursor);
        }
        else {
          document.querySelector("#question-pagination .prev")?.classList.add("wholescale-disabled");
        }
        if (data.next) {
          let url = new URL(data.next);
          let urlParams = new URLSearchParams(url.search);
          let nextCursor = urlParams.get('cursor');
          document.querySelector("#question-pagination .next")?.classList.remove("wholescale-disabled");
          document.querySelector("#question-pagination .next")?.setAttribute('data-cursor', nextCursor)
        }
        else {
          document.querySelector("#question-pagination .next")?.classList.add("wholescale-disabled");
        }

        document
          .querySelector("[questions-container]")
          .classList.remove("loading");
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle any errors that occurred during the request
      });
  };
  function fetchRatingSummary() {
    let url = "https://be.wholescale.net/shopifyWidget/reviewSummary";
    const params = `?product=${productId}&shop_url=${Shopify.shop}`;
    url = url + params;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Response:", data);
        // Process the response data here
        renderRatingSummary(data);
        renderRatingStars(data);
        window.fetchReviewsList();
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle any errors that occurred during the request
      });
  }
  function fetchWidgetSettings() {
    let url = "https://be.wholescale.net/shopifyWidget/widgetSetting";
    const params = `?product=${productId}&shop_url=${Shopify.shop}`;
    url = url + params;
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // Process the response data here
        data.status
          ? handleWidgetSettings(data)
          : document.querySelector(".wholescale-review-widget").remove();
        localStorage.setItem("star_color", data.star_color);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle any errors that occurred during the request
      });
    function handleWidgetSettings(data) {
      defaultSortBy = data.sorting_type.toLowerCase().replace(/\s+/g, "-");
      searchTerm = "";
      if (defaultSortBy?.length > 0) {
        document
          .querySelector(".sortby-dropdown > span.active")
          .classList.remove("active");

        document
          .querySelector(".sortby-dropdown > span.sortby-" + defaultSortBy)
          .classList.add("active");
        document.querySelector("[sortby-value]").textContent = defaultSortBy;
      }
      if (data.add_reviews) {
        fetchRatingSummary();
        document.querySelector("[rating-star]").style.fill = window.star_color;
        document.querySelector("#review_form .add-photo").style.backgroundColor = data.button_background_color;
        document.querySelector("#review_form .add-photo").style.color = data.button_text_color;
        document.querySelector(".add-review-inner").style.backgroundColor = data.button_background_color;
        document.querySelector(".add-review-inner").style.color = data.button_text_color;
        document.querySelector(".write-review-inner .widget-drawer-close").style.backgroundColor = data.button_background_color;
        document.querySelector(".write-review-inner .widget-drawer-close").style.color = data.button_text_color;
        document.querySelector(".write-review-inner [type=submit]").style.backgroundColor = data.button_background_color;
        document.querySelector(".write-review-inner [type=submit]").style.color = data.button_text_color;
      } else if (data.add_reviews == false) {
        document
          .querySelector(".review-widget [data-tab-value='reviews']")
          .remove();
        document.querySelector("[reviews-container]").remove();
        document.querySelector(".rating-container").remove();
        document.querySelector("[questions-container]").classList.add("active");
        document
          .querySelector("[data-tab-value='questions']")
          .classList.add("active");
      }
      if (data.add_questions) {
        window.fetchQuestionsList();
        document.querySelector("#question_form .add-photo").style.backgroundColor = data.button_background_color;
        document.querySelector("#question_form .add-photo").style.color = data.button_text_color;
        document.querySelector(".ask-question-inner").style.backgroundColor = data.button_background_color;
        document.querySelector(".ask-question-inner").style.color = data.button_text_color;
        document.querySelector(".question-form-inner .widget-drawer-close").style.backgroundColor = data.button_background_color;
        document.querySelector(".question-form-inner .widget-drawer-close").style.color = data.button_text_color;
        document.querySelector(".question-form-inner [type=submit]").style.backgroundColor = data.button_background_color;
        document.querySelector(".question-form-inner [type=submit]").style.color = data.button_text_color;

      } else if (data.add_questions == false) {
        document
          .querySelector(".review-widget [data-tab-value='questions']")
          .remove();
      }
      if (!data.add_reviews_media) {
        document
          .querySelector("[review-form] .wholescale-file-upload")
          .remove();
      }
      if (!data.add_questions_media) {
        document
          .querySelector("[question-form] .wholescale-file-upload")
          .remove();
      }

    }
  }
  fetchWidgetSettings();
  // updateRatingInfo(data);
}
