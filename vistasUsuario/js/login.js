$(document).ready(function(){

    $(document).on('click','#btnLogin', function(){

        email = $('#Correo').val();
        pass = $('#Contrasena').val();

        $.ajax({ // sin utilizar XML,... usar json
            data: { //Datos a enviar
                   "email" : email,
                   "pass": pass
            },
            type: "POST",
            dataType: "json",
            url: "/proyecto_web/controlador/ajax_login.php"
        })
        .done(function(response) {
            
            Swal.fire({
                text:response.msg,
                icon: response.type,
                title: "Inicio de Sesión"

            }).then((result) => {
                if (result.isConfirmed) {
                $(location).attr('href',response.ruta); //Redireccinar a una ruta
                }
              })
            
        })
        .fail(function(jqXHR, textStatus, errorThrown) {  // Si encuentra algun problema

            Swal.fire({
                title: "ALERTA",
                icon: "error",
                text: "La solicitud ha fallado: " +  errorThrown
            });
        });
        
    });
})