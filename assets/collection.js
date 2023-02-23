Shopify.queryParams = {};
if(location.search.length)for(var aKeyValue,i=0,aCouples=location.search.substr(1).split("&");i<aCouples.length;i++)1<(aKeyValue=aCouples[i].split("=")).length&&(Shopify.queryParams[decodeURIComponent(aKeyValue[0])]=decodeURIComponent(aKeyValue[1]));
function qP(n){var o,e=[];for(o in n)e.push(encodeURIComponent(o)+"="+encodeURIComponent(n[o]));return e.join("&")}
class CollectionTemp extends HTMLElement {
  constructor(){
    super();
    this.querySelector('[name="sort_by"]').addEventListener('change', this.debounce((event) => {this.collectSort(event)}, 50).bind(this));
    this.querySelectorAll('.gridview').forEach((button) => button.addEventListener('click', this.collectGrid.bind(this)));
    this.filterToggle = this.querySelector('.coll-filter');
    this.jsdrawer = document.querySelector('.js-drawer');
    this.filterToggle.addEventListener('click', this.debounce((event) => {this.collectFilter(event)}, 50).bind(this));
  	this.querySelector('.filter-close').addEventListener('click', this.debounce((event) => {this.collectFilter(event)}, 50).bind(this))

  }
  collectFilter(e){
   console.log("filter_opened"); 
   this.filterToggle.classList.toggle('active'),this.jsdrawer.classList.toggle('collection-filter-open') 
  }
  collectGrid(e){
    Shopify.queryParams.view = e.currentTarget.getAttribute("data_list"),location.search = qP(Shopify.queryParams)
  }
  collectSort(e){
    Shopify.queryParams.sort_by = e.target.options[e.target.selectedIndex].value,location.search = qP(Shopify.queryParams)
  }
  debounce(f, w) {let t;return (...a) => {clearTimeout(t);t = setTimeout(() => f.apply(this, a), w);};}  
}
customElements.define("em-collection",CollectionTemp);
  (function () {
  const headings = document.querySelectorAll(".accordion__heading"),
  triggers = [],
  accordionContents = document.querySelectorAll(".accordion__copy"),
  copyOpenClass = "accordion__copy--open";
  headings.forEach((h, i) => {
    let btn = h.querySelector("button"),target = h.nextElementSibling;
    triggers.push(btn);
    btn.onclick = (e) => {
      e.preventDefault();
      console.log(btn.getAttribute("aria-expanded"));
      let expanded = btn.getAttribute("aria-expanded") === "true";
      if (expanded) {
        closeItem(target, btn);
      } else {
        openItem(target, btn);
      }
    };
  });
  function closeItem(target, btn) {
      btn.setAttribute("aria-expanded", false),target.classList.remove(copyOpenClass);
  }
  function openItem(target, btn) {
    btn.setAttribute("aria-expanded", true),target.classList.add(copyOpenClass);
  }
})();
