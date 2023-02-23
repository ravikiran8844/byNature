class ProductTemp extends HTMLDivElement {
  constructor(){
    super();
      this.form = this.querySelector('form'),
      this.form.querySelector('[name=id]').disabled = false,
      this.form.addEventListener('submit', this.onSubmitHandler.bind(this)),
//      this.submitButton = this.querySelector('[type="submit"]'),  
      this.submitButton = this.querySelector('#add_to_cart'),          
      this.querySelectorAll('.sel_option1').forEach((button) => button.addEventListener('change', this.newOptionSelector.bind(this))),            
      this.querySelectorAll('.option_2').forEach((button) => button.addEventListener('click', this.onOptions2Click.bind(this))),            
      
      this.cartNotification = document.querySelector('em-drawer'),
      this.option2 = this.querySelectorAll('.option_2'),
      this.onVariantLoad();
  }
  onVariantLoad(){
    this.urlParams = new URLSearchParams(window.location.search),this.currentVariant = Shopify.currentVariant, 
    this.urlParams.get('variant')&&(this.currentVariant = Shopify.product.variants.find(e => e.id==this.urlParams.get('variant')));
    if(this.urlParams.get('variant')){
      this.currentVariant?this.onVariantAvailable():this.onVariantUnAvailable();
    }
  }
  onVariantSelector(){
    this.currentVariant = Shopify.product.variants.find((variant) => {
      return !variant.options.map((option, index) => {
        return this.options[index] === option;
      }).includes(false);
    });    
      if (!this.currentVariant) {
        this.onVariantUnAvailable();
        console.log("unavailable");
      }
      else{
        this.onVariantAvailable();
        console.log(this.currentVariant);
      }    
  }
  // onOptionSelector(event){
  //   event.currentTarget.value;
  //   console.log(event);
  //   this.options = [event.currentTarget.value];
  //   //console.log(this.options);
  //   // this.options=Array.from(this.querySelectorAll("fieldset")).map(e=>Array.from(e.querySelectorAll(".rliopt")).find(e=>e.checked).value);
    
  // }
  onVariantAvailable(){
    if(this.currentVariant.available){
      this.submitButton.setAttribute('aria-disabled', false),
      this.submitButton.value = "Add To Cart",
      this.submitButton.innerHTML = 'Add To Cart <i class="icon icon-marrow"></i>',
      //this.buynow.innerHTML = 'BUY NOW <i class="icon icon-marrow"></i>',
      this.querySelector(".product-select-id").value = this.currentVariant.id,
      this.querySelector("#product_price").innerHTML = Shopify.formatMoney(this.currentVariant.price,Shopify.moneyformat)+' <span class="cmp-price"><del>'+Shopify.formatMoney(this.currentVariant.compare_at_price,Shopify.moneyformat)+'</del></span>';
    }
    else{
      this.submitButton.setAttribute('aria-disabled', true),
      this.submitButton.value = "Unavailable",
      this.submitButton.innerHTML = 'Sold Out <i class="icon icon-marrow"></i>';
      //this.buynow.innerHTML = 'Sold Out <i class="icon icon-marrow"></i>',
    }    
    window.history.replaceState({ }, '', window.location.pathname+'?variant='+this.currentVariant.id);           
  }
  onVariantUnAvailable(){
    this.submitButton.setAttribute('aria-disabled', true),this.submitButton.value = "Unavailable";
  }
  newOptionSelector(event){
        this.options = [event.currentTarget.value];
    //this.onOptionSelector(),
      this.onVariantSelector();
  }  
  onSubmitHandler(evt) {
    evt.preventDefault();
    if (this.submitButton.getAttribute('aria-disabled') === 'true') return;
    this.handleErrorMessage(),
    this.submitButton.setAttribute('aria-disabled', true),
    this.submitButton.classList.add('loading');
    // this.cartNotification.setActiveElement(document.activeElement);
    // this.querySelector('.loading-overlay__spinner').classList.remove('hidden');
    const config = Shopify.fetchConfig('javascript'),formData = new FormData(this.form),drawer = new Array('drawer');
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    delete config.headers['Content-Type'];
    //"cart-notification-product", "cart-notification-button", "cart-icon-bubble"
    //formData.append('sections', this.cartNotification.getSectionsToRender().map((section) => section.id));
    formData.append('sections',drawer),
    formData.append('sections_url', window.location.pathname),
    config.body = formData;
    fetch(window.Shopify.routes.root + 'cart/add.js', config)
    .then((response) => response.json())
    .then((response) => {
      if (response.id) {
        this.handleErrorMessage(response.description);
        const soldOutMessage = this.submitButton.querySelector('.sold-out-message');
        document.querySelector('.cart-drawer').removeAttribute("itemsactive"),
        document.querySelector('.cart-btn').click();
        if (!soldOutMessage) return;
        soldOutMessage.classList.remove('hidden');
        this.submitButton.setAttribute('aria-disabled', true),
        this.submitButton.querySelector('span').classList.add('hidden'),
        this.error = true;
        return;
      }
      this.error = false;
    })
    .catch((e) => { console.error(e); }).finally(() => { this.submitButton.classList.remove('loading'); if (!this.error) this.submitButton.removeAttribute('aria-disabled'); });
}
  handleErrorMessage(errorMessage = false) {
    this.errorMessageWrapper = this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
    if (!this.errorMessageWrapper) return;
    this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');
    this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);
    if (errorMessage) {this.errorMessage.textContent = errorMessage;}
  }
}
customElements.define("em-product",ProductTemp,{extends:"div"}); 