$(document).ready(function() {
 	$('.myslider').camera({
 		height: '40%',
 		fx: 'mosaicSpiralReverse',
 		time: 3000,
 		loader: 'bar',
 		loaderColor: '#2196F3',
 		loaderPadding: 0,
 		loaderBgColor: '#d1eff0',
 		playPause: false,
            mobileNavHover: false
 	});  
});

$(".button-collapse").sideNav();

$('.dropdown-button').dropdown({
      belowOrigin: true,
      hover: true,
      outDuration : 500
});

$('#myform').validate({
      rules:{
            username:{ required: true, minlength: 4 },
            email: { required: true, email: true },
            password: { required: true, minlength: 4 },
            message: { required: true, minlength: 4 }
      },
      messages: {
            username: { required: "Este campo es requerido", minlength: "Debe contener más de 4 caracteres" },
            email: { required: "Este campo es requerido", email: "No parece un email" },
            password: { required: "Este campo es requerido", minlength: "Debe contener más de 4 caracteres" },
            message: { required: "Este campo es requerido", minlength: "Debe contener más de 4 caracteres" }
      }
});

$('#myform').on('keyup blur', function() {
      if ($('#myform').validate().checkForm())
            $('#btn_submit').removeClass('disabled');
      else
            $('#btn_submit').addClass('disabled');
});