
const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_vx1nv8e';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Enviar solicitud';
      Swal.fire({
        icon: 'success',
        title: 'Solicitud enviada',
        text: 'Su solicitud fue enviada con exito nos contactaremos en breve con usted',
      })
    }, (err) => {
      btn.value = 'Enviar solicitud';
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: (JSON.stringify(err)),
        footer: '<a href="">Why do I have this issue?</a>'
      })
    });
});
