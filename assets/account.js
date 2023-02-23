class LoginTemp extends HTMLElement {
  constructor(){
    super();
    this.loginform = this.querySelector('#customer_login'),    
    this.recoverform = this.querySelector('#customer_lrecover'),    
    this.emailId = this.querySelector('[name="customer[email]"]'),
    this.recoverEmail = this.querySelector('[name="email"]'),
    this.PassId = this.querySelector('[name="customer[password]"]'), 
    this.loginBase = this.querySelector('.loginbase'),
    this.recoverBase = this.querySelector('.recoverbase'),  
    this.querySelector('.btn-login').addEventListener('click', this.onSubmitHandler.bind(this)),
    this.querySelector('.recoverclose').addEventListener('click', this.onRecoverClose.bind(this)),
    this.querySelector('.recoveropen').addEventListener('click', this.onRecoverOpen.bind(this)),
    this.querySelector('.btn-recover').addEventListener('click', this.onRecoveryHandler.bind(this)),          
    this.hashChecker();
  }
  hashChecker(){if(window.location.hash=="#recover"){this.onRecoverOpen()}}
  onRecoverClose(){this.loginBase.style.display = "block",this.recoverBase.style.display = "none"}
  onRecoverOpen(){this.loginBase.style.display = "none",this.recoverBase.style.display = "block"}
  onRecoveryHandler(event){
    event.preventDefault(),this.recoverEmail.classList.remove("frm_error"),this.emailrg = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
    if(!this.emailrg.test(this.recoverEmail.value)){this.recoverEmail.classList.add("frm_error")}  
    if(this.emailrg.test(this.recoverEmail.value)){this.recoverEmail.classList.remove("frm_error"),this.recoverform.submit()}  
  }
  onSubmitHandler(event){
    event.preventDefault(),this.emailId.classList.remove("frm_error"),this.PassId.classList.remove("frm_error"),this.emailrg = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
    if(!this.emailrg.test(this.emailId.value)){this.emailId.classList.add("frm_error")}  
    if(this.PassId.value<6){this.PassId.classList.add("frm_error")}  
    if((this.emailrg.test(this.emailId.value))&&(this.PassId.value.length>=6)){this.loginform.submit()}    
  }
  debounce(f, w) {let t;return (...a) => {clearTimeout(t);t = setTimeout(() => f.apply(this, a), w);};}
}
customElements.define("em-login",LoginTemp);
class RegisterTemp extends HTMLElement {
  constructor(){
    super();
    this.form = this.querySelector('#create_customer'),    
    this.firstName = this.querySelector('[name="customer[first_name]"]'),
    this.lastName = this.querySelector('[name="customer[last_name]"]'),      
    this.emailId = this.querySelector('[name="customer[email]"]'),
    this.PassId = this.querySelector('[name="customer[password]"]'),      
    this.querySelector('.btn-register').addEventListener('click', this.onSubmitHandler.bind(this));
  }
  onSubmitHandler(event){
    this.firstName.classList.remove("frm_error"),this.lastName.classList.remove("frm_error"),this.emailId.classList.remove("frm_error"),this.PassId.classList.remove("frm_error"),this.emailrg = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
    if(!this.emailrg.test(this.emailId.value)){this.emailId.classList.add("frm_error")}  
    if(this.firstName.value<4){this.firstName.classList.add("frm_error")}  
    if(this.lastName.value<1){this.lastName.classList.add("frm_error")}  
    if(this.PassId.value<6){this.PassId.classList.add("frm_error")}  
    if((this.firstName.value.length>=4)&&(this.lastName.value.length>=1)&&(this.emailrg.test(this.emailId.value))&&(this.PassId.value.length>=6)){this.form.submit()}    
  }
}
customElements.define("em-register",RegisterTemp);
class ResetTemp extends HTMLElement {
  constructor(){
    super();
    this.form = this.querySelector('#resetaccount'),    
    this.PassId = this.querySelector('[name="customer[password]"]'),      
    this.ConfPassId = this.querySelector('[name="customer[password_confirmation]"]'),
    this.ErrorMessager = this.querySelector('.error_messager'),            
    this.querySelector('.btn-reset').addEventListener('click', this.onSubmitHandler.bind(this));
  }
  onSubmitHandler(event){
	event.preventDefault(),this.PassId.classList.remove("frm_error"),this.ConfPassId.classList.remove("frm_error"),this.ErrorMessager.innerHTML='',this.passreg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/;
    if((this.PassId.value.length<6)||(!this.passreg.test(this.PassId.value))){this.PassId.classList.add("frm_error"),this.ErrorMessager.innerHTML='<div class="errors"><ul><li>Password & Confirm Password invalid!.</li></ul></div>';}  
    if((this.ConfPassId.value.length<6)||(!this.passreg.test(this.ConfPassId.value))){this.ConfPassId.classList.add("frm_error"),this.ErrorMessager.innerHTML='<div class="errors"><ul><li>Password & Confirm Password invalid!.</li></ul></div>';}      
    if (this.PassId.value != this.ConfPassId.value) {
      this.PassId.classList.add("frm_error"),this.ConfPassId.classList.add("frm_error"),this.ErrorMessager.innerHTML='<div class="errors"><ul><li>Password and confirm password not same</li></ul></div>';
      return false;
    }
    if ((this.PassId.value.length>=6)&&(this.ConfPassId.value.length>=6)&&(this.PassId.value == this.ConfPassId.value)) {this.ErrorMessager.innerHTML='',this.form.submit()}    
  }
}
customElements.define("em-resetpass",ResetTemp);
class ActAccountTemp extends HTMLElement {
  constructor(){
    super();
    this.form = this.querySelector('#actaccount'),    
    this.PassId = this.querySelector('[name="customer[password]"]'),      
    this.ConfPassId = this.querySelector('[name="customer[password_confirmation]"]'),
    this.ErrorMessager = this.querySelector('.error_messager'),            
    this.querySelector('.btn-actacc').addEventListener('click', this.onSubmitHandler.bind(this));
  }
  onSubmitHandler(event){
	event.preventDefault(),this.PassId.classList.remove("frm_error"),this.ConfPassId.classList.remove("frm_error"),this.ErrorMessager.innerHTML='',this.passreg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/;
    if((this.PassId.value.length<6)||(!passreg.test(this.PassId.value))){this.PassId.classList.add("frm_error"),this.ErrorMessager.innerHTML='<div class="errors"><ul><li>Password & Confirm Password invalid!.</li></ul></div>';}  
    if((this.ConfPassId.value.length<6)||(!passreg.test(this.ConfPassId.value))){this.ConfPassId.classList.add("frm_error"),this.ErrorMessager.innerHTML='<div class="errors"><ul><li>Password & Confirm Password invalid!.</li></ul></div>';}      
    if (this.PassId.value != this.ConfPassId.value) {this.PassId.classList.add("frm_error"),this.ConfPassId.classList.add("frm_error"),this.ErrorMessager.innerHTML='<div class="errors"><ul><li>Password and confirm password not same</li></ul></div>';return false;}
    if ((this.PassId.value.length>=6)&&(this.ConfPassId.value.length>=6)&&(this.PassId.value == this.ConfPassId.value)){this.ErrorMessager.innerHTML='',this.form.submit()} 
  }
}
customElements.define("em-activateaccount",ActAccountTemp);