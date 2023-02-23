new Glide('.home_slider',{type: 'carousel',autoplay: 5000,focusAt: 'center',perView: 1}).mount();

class CollectionListTemp extends HTMLDivElement {
  constructor(){
    super();
    this.querySelectorAll('.ctabact').forEach((button) => button.addEventListener('click', this.onTabAct.bind(this)));
    console.log("Hello");
  }
  onTabAct(e){
    var hurl = e.currentTarget.getAttribute("data_handle");
    fetch(hurl+ "/products.json?limit=8").then(res => res.json()).then(r =>this.onProductsUpdator(r,hurl))
  }
  onProductsUpdator(e,h){
    this.querySelector("#collectproducts").innerHTML = '';
    for (let i = 0;i<e['products'].length;i++) {
      this.querySelector("#collectproducts").innerHTML += `<div class="pu-md-6 pu-sm-6 pu-lg-3">
    <div class="productinnerwrapper">
    <div class="ht-80">
    <a href="/products/`+e['products'][i]['handle']+`">
        <img src="`+e['products'][i]['images'][0]['src']+`"/>
    </a>
    </div>
      <div class="ht-10">
      <a href="/products/`+e['products'][i]['handle']+`">
         <h4 class="re-prodcut_title">`+e['products'][i]['title'].substring(0,30)+`...</h4>      
      </a>
    </div>
      <div class="ht-10">
      <a class="re-prodcut_price" href="/products/`+e['products'][i]['handle']+`"><span class="btn-txt">BUY NOW</span><span class="btn-price">`+Shopify.formatMoney(e['products'][i].variants[0].price, Shopify.moneyformat)+`</span> <span class="btn-img"><img src="//cdn.shopify.com/s/files/1/0564/3157/5138/t/3/assets/btn-icon.svg?v=145787369496678575341663239668"></span></a>
      </div>
    </div>
  </div>`;
    }
  }
}
customElements.define("em-collectionlist",CollectionListTemp,{extends:"div"}); 