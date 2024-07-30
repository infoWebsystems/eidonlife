document.addEventListener("DOMContentLoaded", function () {
  // do something here ...
  window["fetchCollectionProductStars"] = function (cursor) {
    const inlineRatingContainer = document.querySelectorAll(
      ".wholescale-inline-rating"
    );
    inlineRatingContainer?.forEach((item) => {
      let productID = item.getAttribute("data-collection-product-id");
      if (productID) {
        fetchData(productID)
          .then((result) => {
            console.log("Promise resolved:", result);
            result.total_reviews > 0 ? renderRatingStars(result, item) : null;
          })
          .catch((error) => {
            console.error("Promise rejected:", error);
          });
      }
    });
    async function fetchData(productID) {
      let url = `https://be.wholescale.net/shopifyWidget/reviewSummary?product=${productID}&shop_url=${Shopify.shop}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }
    // {% comment %} Render rating Stars {% endcomment %}
    function renderRatingStars(data, item) {
      console.log("item", item);
      let reviewStars = `
    <div class="wholescale-star-widget">
      <div class="rating-container-top">
        <div class="average-rating-and-star">
          <span class="star rating rating-${Math.round(
        data?.average_rating
      )}" rating-star style="fill:${localStorage.getItem(
        "star_color"
      )}; stroke:${localStorage.getItem("star_color")}">
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
            ? data?.total_reviews + " review"
            : "No Reviews"
        } </span>
        </div>
      </div>
    </div>
  `;
      const container = document.createElement("div");
      container.innerHTML = reviewStars;
      item.appendChild(container);
    }
  }
  window.fetchCollectionProductStars()
});
