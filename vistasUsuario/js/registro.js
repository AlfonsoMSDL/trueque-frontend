$(document).ready(function(){

    $(document).on('click','#btnRegistrar', function(){

        nombre = $('#nombre').val();
        apellido = $('#apellido').val();
        correo = $('#correo').val();
        clave = $('#clave').val();

        $.ajax({
            data: JSON.stringify( { //Datos a enviar
                    "nombre" : nombre,
                    "apellido" : apellido,
                   "correo" : correo,
                   "clave": clave
            }),
            contentType: "application/json",
            type: "POST",
            url: "http://localhost:8181/api/v1/auth/registrar"
        })
        .done(function () {
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