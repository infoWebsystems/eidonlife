// cart height element
    function calcHeight(){
            const slideoutAjaxCart = document.getElementById('slideout-ajax-cart');
            if (slideoutAjaxCart) {
                const products = document.querySelector('.ajax-cart__cart-items');
                const height1 = document.querySelector('.ajax-cart__header-wrapper').offsetHeight;
                const height2 = document.querySelector('.ajax-cart__summary-wrapper').offsetHeight;
                const height3 = document.querySelector('.ajax-cart__info-wrapper').offsetHeight;
                const height4 = document.querySelector('.ajax-cart__footer-wrapper').offsetHeight;
                const windowHeight = window.innerHeight;
                const height = windowHeight - (height1 + height2 + height3 + height4 + 40);
                products.style.maxHeight = `${height}px`;

            }


    }

// cart height
//markets selector
function updateLocalization(value,e) {
    let form = e.closest('form');
    console.log('form', form)
    switch(value) {
        case 'usd_en_us':
            // form.innerHTML += '<input type="hidden" name="currency" value="USD">';
            form.innerHTML += '<input type="hidden" name="language_code" value="en">';
            form.innerHTML += '<input type="hidden" name="country_code" value="US">';
            break;
        case 'cad_en_us':
            // form.innerHTML += '<input type="hidden" name="currency" value="CAD">';
            form.innerHTML += '<input type="hidden" name="language_code" value="en">';
            form.innerHTML += '<input type="hidden" name="country_code" value="CA">';
            break;
        case 'cad_fr_fr':
            // form.innerHTML += '<input type="hidden" name="currency" value="CAD">';
            form.innerHTML += '<input type="hidden" name="language_code" value="fr">';
            form.innerHTML += '<input type="hidden" name="country_code" value="CA">';
            break;
    }

    form.submit();
}
//markets selector
