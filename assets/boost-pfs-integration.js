/** Please don't modify or unzip this content. It will be updated regularly **/
    (function() {
      BoostPFS.inject(this);

      //Set global variable
      Globals.hasIntegration = true;
      // 3rd app compile template
      Integration.compileIntegrationTemplate = function (data, itemHtml) {
        var itemReviewsHtml = '';   itemReviewsHtml += "<div class='arv-collection arv-collection--" + data.id + "' product-id='" + data.id + "'></div>";itemHtml = itemHtml.replace(/{{itemReviews}}/g, itemReviewsHtml);
        return itemHtml;
      };

      // Integration.call3rdIntegrationFunc = function(data) {
      //   if ((typeof $ !== 'undefined' && typeof $.aliReviewsAddRatingCollection !== 'function') && (typeof jQ.aliReviewsAddRatingCollection !== 'function')) {console.log('The Ali review app is not installed in the theme');} else {if (typeof $ !== 'undefined') {$.aliReviewsAddRatingCollection();} else {jQ.aliReviewsAddRatingCollection();}}
      // }

    })();