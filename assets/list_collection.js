class CollectionListTemp extends HTMLDivElement {
  constructor(){
    super();
    this.querySelectorAll('.ctabact').forEach((button) => button.addEventListener('click', this.onTabAct.bind(this))),this.onTabLoad()
  }
  onTabLoad(){
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.get('tab')){
    [].forEach.call(document.querySelectorAll(".ctabact"),function (e){e.classList.remove("ctabact_active")}),[].forEach.call(document.querySelectorAll(".allcollect"),function (e){e.style.display = 'none'}),[].forEach.call(document.querySelectorAll(".ctab_"+urlParams.get('tab')),function (e){e.style.display = 'block'});                
    this.querySelector(".cab_"+urlParams.get('tab')).classList.add("ctabact_active");
    }
  }
  onTabAct(e){
    [].forEach.call(document.querySelectorAll(".ctabact"),function (j){j.classList.remove("ctabact_active")});  
    e.currentTarget.classList.add("ctabact_active");
    [].forEach.call(document.querySelectorAll(".allcollect"),function (e){e.style.display = 'none'}),    
    [].forEach.call(document.querySelectorAll(".ctab_"+e.currentTarget.getAttribute("data_handle")),function (e){e.style.display = 'block'});          
    window.history.replaceState({ }, '', window.location.pathname+'?tab='+e.currentTarget.getAttribute("data_handle"));
  }
}

customElements.define("em-collectionlist",CollectionListTemp,{extends:"div"}); 