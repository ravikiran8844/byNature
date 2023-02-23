class ContactTemp extends HTMLElement {
  constructor(){
    super();
    this.contactform = this.querySelector('#contact_form'),    
      this.name = this.querySelector('[name="contact[name]"]'),
      this.emailId = this.querySelector('[name="contact[email]"]'),
      this.phone = this.querySelector('[name="contact[phone]"]'), 
      this.body = this.querySelector('[name="contact[body]"]'), 
      this.querySelector('.btn-contact').addEventListener('click', this.onSubmitHandler.bind(this));
  }
  onSubmitHandler(event){
    event.preventDefault(),this.name.classList.remove("frm_error"),this.emailId.classList.remove("frm_error"),this.phone.classList.remove("frm_error"),this.body.classList.remove("frm_error");
    var emailrg = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
    if(this.name.value<4){
      this.name.classList.add("frm_error");
    }  
    if(!emailrg.test(this.emailId.value)){
      this.emailId.classList.add("frm_error");
    }  
    if(this.phone.value<10){
      this.phone.classList.add("frm_error");
    }  
    if(this.body.value<100){
      this.body.classList.add("frm_error");
    }  

    if((emailrg.test(this.emailId.value))&&(this.phone.value.length>=10)){
      this.contactform.submit();
    }    
  }
  debounce(fn, wait) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }
}
customElements.define("em-contact",ContactTemp);
