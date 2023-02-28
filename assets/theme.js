/*Shopify money Format*/
if(!Shopify.formatMoney) Shopify.formatMoney=function(a,e){var t="",r=/\{\{\s*(\w+)\s*\}\}/,o=e||this.money_format;function n(a,e){return void 0===a?e:a}function c(a,e,t,r){if(e=n(e,2),t=n(t,","),r=n(r,"."),isNaN(a)||null==a)return 0;var o=(a=(a/100).toFixed(e)).split(".");return o[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1"+t)+(o[1]?r+o[1]:"")}switch("string"==typeof a&&(a=a.replace(".","")),o.match(r)[1]){case"amount":t=c(a,2);break;case"amount_no_decimals":t=c(a,0);break;case"amount_with_comma_separator":t=c(a,2,".",",");break;case"amount_no_decimals_with_comma_separator":t=c(a,0,".",",")}return o.replace(r,t)};
Shopify.fetchConfig=function(a="json"){return{method:"POST",headers:{"Content-Type":"application/json",Accept:`application/${a}`}}}
Shopify.hasClass=function(a,b){return a.className.split(" ").indexOf(b)> -1}
class HeaderTemp extends HTMLElement {
  constructor(){
    super();
    (this.querySelector('[name="q"]'))&&this.querySelector('[name="q"]').addEventListener('input', this.debounce((e) => {this.onSearch(e)}, 0).bind(this)),
    this.predictiveSearchResults = this.querySelector('#predictive-search')
  }
  onSearch(e){
    const s = this.search.value.trim();
    if (!s.length) {
      //this.close();
      return;
    }
    this.getSearchResults(s);
  }
  close(){
    
  }
  getSearchResults(searchTerm){
    fetch(`/search/suggest?q=${searchTerm}&resources[type]=product&resources[limit]=4&section_id=predictive-search`)
    .then((r) => { if (!r.ok) {var error = new Error(r.status);this.close();throw error;}return r.text();})
    .then((t) => {
      this.predictiveSearchResults.innerHTML = new DOMParser().parseFromString(t, 'text/html').querySelector('#shopify-section-predictive-search').innerHTML;
      //this.open();
    }).catch((error) => {this.close();throw error;});    
  }
  debounce(f, w) {let t;return (...a) => {clearTimeout(t);t = setTimeout(() => f.apply(this, a), w);};}  
}
class FooterTemp extends HTMLElement {
  constructor(){
    super();
    this.newsform = this.querySelector('#news_form'),    
    (this.querySelector(".btn-news"))&&this.querySelector(".btn-news").addEventListener('click', this.debounce((event) => {this.onSubmitHandle(event)}, 50).bind(this)),
    this.querySelector(".backtotop").addEventListener('click', this.debounce((event) => {this.onBacktotop(event)}, 50).bind(this)),
    this.EmailId = this.querySelector('[name="contact[email]"]')
  }
  onBacktotop(){document.documentElement.scrollTo({top: 0,behavior: "smooth"})}
  onSubmitHandle(e){
    e.preventDefault(),this.EmailId.classList.remove("frm_error"),this.emailrg = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
    if(!this.emailrg.test(this.EmailId.value)){this.EmailId.classList.add("frm_error");return false}  
	this.newsform.submit()
  }
  debounce(f, w) {let t;return (...a) => {clearTimeout(t);t = setTimeout(() => f.apply(this, a), w);};}  
}
class DrawerTemp extends HTMLElement {
  constructor(){
    super();
    this.jsdrawer = document.querySelector('.js-drawer'),
    this.navToggle = document.querySelector('.nav-btn'),   
    this.navDrawer = document.querySelector('.nav-drawer'), 
    // this.cartToggle = document.querySelector('.cart-btn'),  
    // this.cartDrawer = this.querySelector('.cart-drawer'),
    this.navToggle.addEventListener('click', this.debounce((event) => {this.onNavDrawer(event)}, 50).bind(this)),    
    // this.cartToggle.addEventListener('click', this.debounce((event) => {this.onCartDrawer(event)}, 0).bind(this)),    
    document.querySelector('[href="/cart"]').addEventListener('click', function(event) {event.preventDefault()});
    //this.querySelector('.close-btn').addEventListener('click', this.debounce((event) => {this.onCartDrawer(event)}, 50).bind(this)),
    //document.querySelector('.close-btn').addEventListener('click',function(e){e.preventDefault();console.log(e);}),
    //document.querySelectorAll('.close-btn').forEach((button) => button.addEventListener('click',function(e){e.preventDefault();console.log(e);})),
    // document.querySelectorAll('.close-btn').forEach((button) => button.addEventListener('click',this.onCartDrawer.bind(this))),      
    // document.addEventListener('click',this.debounce((event) => {this.onCartRemover(event)}, 50).bind(this), false),
  	document.querySelector('.nav-close').addEventListener('click', this.debounce((event) => {this.onNavDrawer(event)}, 50).bind(this))
  }
  onCartRemover(e){
    if(Shopify.hasClass(e.target, 'catimrem')){
      let a = Shopify.fetchConfig('javascript');
      a.body = JSON.stringify({"id": e.target.getAttribute("data_id"),"quantity": 0}),fetch(window.Shopify.routes.root + 'cart/change.js', a).then(r => { return r.json();}).then(d => { this.onFetchCart(d)})
    }    
  }
  onNavDrawer(e){this.navToggle.classList.toggle('active'),this.jsdrawer.classList.toggle('nav-drawer-open')}
  OnCartParser(c){this.p = new DOMParser(),this.querySelector('.cartMerger').innerHTML = this.p.parseFromString(c, "text/html").querySelector('.cartMerger').innerHTML}
  onFetchCart(d){fetch(window.location.origin+"?section_id=drawer").then(s =>s.text()).then(r =>this.OnCartParser(r)).catch(e => console.error(e)),document.querySelector(".cart_items_count").innerHTML = d.item_count;}
  onCartDrawer(e){
    e.preventDefault();
    this.cartToggle.classList.toggle('active'),this.jsdrawer.classList.toggle('cart-drawer-open'),this.cartDrawer.hasAttribute("itemsactive") || (fetch(window.Shopify.routes.root+'cart.js').then(r => r.json()).then(d => {this.onFetchCart(d)}),this.cartDrawer.setAttribute("itemsactive",true))
  }
  debounce(f, w) {let t;return (...a) => {clearTimeout(t);t = setTimeout(() => f.apply(this, a), w);};}  
}
customElements.define("em-header",HeaderTemp),customElements.define("em-footer",FooterTemp),customElements.define("em-drawer",DrawerTemp),
document.querySelectorAll('[data="alpha"]').forEach(e=>e.addEventListener("input",function(e){return e.currentTarget.value=e.currentTarget.value.replace(/[^.%a-zA-Z0-9 ]/g,"")})),
document.querySelectorAll('[data="char"]').forEach(a=>a.addEventListener("input",function(a){return a.currentTarget.value=a.currentTarget.value.replace(/[^A-Za-z]/g,"")})),
document.querySelectorAll('[data="number"]').forEach(a=>a.addEventListener("input",function(a){return a.currentTarget.value=a.currentTarget.value.replace(/[^0-9]/g,"")})),
window.onscroll = function(){this.backtotop = document.querySelector(".backtotop");if(window.scrollY >= 200 && window.scrollY <= (document.documentElement.scrollHeight - 500)){this.backtotop.classList.remove('hidden')}else{this.backtotop.classList.add('hidden')} };