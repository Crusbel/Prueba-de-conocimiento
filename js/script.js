$(document).ready(function() {
      $('.modal').modal();
      slider_images();
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
      },
      submitHandler: function(){

            var myemail = $('#email').val();
            var myusername = $('#username').val();
            var mypassword = $('#password').val();
            var mymessage = $('#message').val();

            var form = new FormData();
            form.append("email", myemail);
            form.append("username", myusername);
            form.append("password", mypassword);
            form.append("message", mymessage);

            var settings = {
              "async": true,
              "crossDomain": true,
              "url": "http://test.masuno.pe/form.php",
              "method": "POST",
              "headers": {
                "authorization": "Basic cHJ1ZWJhOnBydWViYQ==",
                "cache-control": "no-cache",
                "postman-token": "464a3f03-3633-5214-c3e6-802b7679165d"
              },
              "processData": false,
              "contentType": false,
              "mimeType": "multipart/form-data",
              "data": form,
              "dataType": "json",
              "success" : function(response){
                    if (response.status_code === 0) {
                         var   template = '<div class="modal-content">';
                              template +=       '<h4> Success !! <i class="fa fa-smile-o" aria-hidden="true"></i></h4>';
                              template +=       '<p>Your username :</p><p><span>'+response.data.username+'</span></p>';
                              template +=       '<p>Your email :</p><p><span>'+response.data.email+'</span></p>';
                              template +=       '<p>Your password :</p><p><span>'+response.data.password+'</span></p>';
                              template +=       '<p>Your message :</p><p><span>'+response.data.message+'</span></p>';
                              template += '</div>';
                        $('#template_msg').html(template);
                        $('#template_msg').modal('open');
                        clear_input();
                    }
                    else{
                         var  tmpl = '<div class="modal-content">';
                              tmpl +=       '<h5> Houston, we have a problem !! <i class="fa fa-frown-o" aria-hidden="true"></i></h5>';
                              tmpl += '</div>';
                        $('#template_msg').html(tmpl);
                        $('#template_msg').modal('open');
                        clear_input();
                    }                    
              }
            }
            $.ajax(settings);
      }
});

$('#myform').on('keyup blur', function() {
      if ($('#myform').validate().checkForm())
            $('#btn_submit').removeClass('disabled');
      else
            $('#btn_submit').addClass('disabled');
});

function clear_input(){
      $('#username').val('');
      $('#email').val('');
      $('#password').val('');
      $('#message').val('');
}

function slider_images(){
      $.ajax({
            type: "GET",
            url: "http://test.masuno.pe/images.php",
            data: "data",
            dataType: "json",
            success: function (response) {
                  for (var i = 0; i < response.length; i++) {
                        $('#myslider').append('<div data-src="'+response[i]+'" class="responsive-img"></div>');
                  }
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
            }
      });
}


/**
 * Filtro de palabras soeces
 */
var soeces_array = [];

$.ajax({
    type: "GET",
    url: "json/soeces.json",
    dataType: "json",
    success: function (response) {
        soeces_array = response.soeces;
    }
});

$('.keyup_input').on('keyup blur',function(){
    var cont = -1;

    for (var i = 0; i < soeces_array.length; i++) {
        cont = $(this).val().toLowerCase().indexOf(soeces_array[i]);
            if (cont >= 0) {
                $(this).val('');
                break;
            } 
    }
});
