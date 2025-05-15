$(document).ready(function(){

    $(document).on('click','#btnRegistrar', function(){

        nombre = $('#nombre').val();
        apellido = $('#apellido').val();
        telefono = $('#telefono').val();
        correo = $('#correo').val();
        clave = $('#clave').val();
        repetirClave = $('#repetir_clave').val();

        $.ajax({
            data:{ //Datos a enviar
                    "nombre" : nombre,
                    "apellido" : apellido,
                    "telefono": telefono,
                   "correo" : correo,
                   "clave": clave,
                   "repetirClave":repetirClave
            },
            type: "POST",
            url: "http://localhost:8181/api/v1/auth/registrar"
        })
        .done(function (response) {
            console.log(response)
            Swal.fire({
                text:"Agregado correctamente",
                icon: "success",
                title: "Registro"

            }).then((result) => {
                if (result.isConfirmed) {
                $(location).attr('href',"login.html"); //Redireccinar a una ruta
                }
              })
            
        })
        .fail(function () {
            Swal.fire("Error", "Error al agregar", "error");
        });
        
    });
})