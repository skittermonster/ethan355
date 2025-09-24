// Main site interactions: nav toggle, smooth scroll, form validation
(function(){
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if(navToggle && nav){
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth'});
      }
    });
  });

  // Contact form validation (basic)
  const form = document.getElementById('contact-form');
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  const nameErr = document.getElementById('name-error');
  const emailErr = document.getElementById('email-error');
  const messageErr = document.getElementById('message-error');
  const success = document.getElementById('form-success');

  const setYear = () => {
    const y = document.getElementById('year');
    if(y) y.textContent = new Date().getFullYear();
  };
  setYear();

  function validateEmail(value){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;

      if(!name.value.trim()){
        nameErr.textContent = 'Please enter your name.';
        ok = false;
      }else{
        nameErr.textContent = '';
      }

      if(!validateEmail(email.value)){
        emailErr.textContent = 'Please enter a valid email.';
        ok = false;
      }else{
        emailErr.textContent = '';
      }

      if(message.value.trim().length < 5){
        messageErr.textContent = 'Message should be at least 5 characters.';
        ok = false;
      }else{
        messageErr.textContent = '';
      }

      if(ok){
        success.hidden = false;
        form.reset();
        setTimeout(() => success.hidden = true, 4000);
      }
    });
  }
})();
