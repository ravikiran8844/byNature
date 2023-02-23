class CalcTemp extends HTMLDivElement {
  constructor(){
    super();
    this.querySelector("#address_country").addEventListener('change', this.debounce((e) => {this.onevtCalc(e)}, 0).bind(this)),
    this.provincecon = this.querySelector("#address_province_container"),this.province = this.querySelector("#address_province"),this.querySelector(".calculat_ship").addEventListener('click', this.debounce((e) => {this.onCalRate(e)}, 0).bind(this))
  }
  onCalRate(e){
    this.address_zip = this.querySelector("#address_zip")
    if(this.address_zip.value.length>0){
      this.country_sel = this.querySelector('#address_country option:checked').value,this.province_sel = this.querySelector('#address_province option:checked').value;
      console.log(this.country_sel);
      console.log(this.province_sel);
      this.address_zip.classList.remove("frm_error")
      this.getrates = "/cart/async_shipping_rates.json?shipping_address[zip]="+this.address_zip.value+"&shipping_address[country]="+this.country_sel+"&shipping_address[province]="+this.province_sel;
      fetch(this.getrates, {
        method: 'GET'
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      })    
     // console.log(this.address_zip.value);      
    }
    else{this.address_zip.classList.add("frm_error")}
  }
  onevtCalc(e){
    this.provinces = JSON.parse(e.target.options[e.target.selectedIndex].getAttribute('data-provinces'));
    if(this.provinces.length>0){
      this.provincecon.style.display ="block",this.province.innerHTML = this.provinces.map(t => {return '<option value="'+t[0]+'">'+t[0]+'</option>'}).join();
      return;
    }
    this.provincecon.style.display ="none";  
  }
  debounce(f, w) {let t;return (...a) => {clearTimeout(t);t = setTimeout(() => f.apply(this, a), w);};}  
}
customElements.define("em-calc",CalcTemp,{extends:"div"}); 
