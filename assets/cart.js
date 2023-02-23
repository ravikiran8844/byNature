class CartTemp extends HTMLElement {
  constructor(){
    super();
    this.cartLoad();
    this.cartsubtotal = this.querySelector(".cart_subtotal"),
    this.carttotal = this.querySelector(".cart_total"),
      
      this.querySelectorAll('[name="updates[]"]').forEach((b)=>b.addEventListener('input',function(e){
      const config = Shopify.fetchConfig('javascript'),qty = this.value;
      config.body = JSON.stringify({"id": e.target.getAttribute("data_id"),"quantity": qty}),fetch(window.Shopify.routes.root + 'cart/change.js', config).then(response => { return response.json();}).then(data => {
        this.currentVariant = data.items.find(o => o.variant_id == parseInt(e.target.getAttribute("data_id"))),this.parentElement.closest("tr").querySelector(".line_price").innerHTML = Shopify.formatMoney(this.currentVariant.final_line_price, Shopify.moneyformat),
        document.querySelector(".cart_subtotal").innerHTML = Shopify.formatMoney(data.original_total_price, Shopify.moneyformat),
        document.querySelector(".cart_total").innerHTML = Shopify.formatMoney(data.total_price, Shopify.moneyformat);
        document.querySelector(".cart_items_count").innerHTML = data.item_count;
      });
    }));
    this.querySelectorAll('.cart_remove').forEach((b)=>b.addEventListener('click', function(e){
      e.preventDefault();
      const config = Shopify.fetchConfig('javascript');
      config.body = JSON.stringify({"id": e.target.getAttribute("data_id"),"quantity": 0}),fetch(window.Shopify.routes.root + 'cart/change.js', config).then(response => { return response.json();}).then(data => { this.parentElement.closest("tr").remove();});
    }));
  }
  cartLoad(){
   console.log("Cart Loaded..."); 
  }
  debounce(f, w) {let t;return (...a) => {clearTimeout(t);t = setTimeout(() => f.apply(this, a), w);};}  
}
customElements.define("em-cart",CartTemp);