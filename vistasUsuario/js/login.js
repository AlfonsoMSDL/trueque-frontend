$(document).ready(function () {
  $(document).on("click", "#btnLogin", function () {
    correo = $('#correo').val();
    clave = $('#clave').val();

    $.ajax({
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({
        "correo": correo,
        "clave": clave,
      }),
      type: "POST",
      url: "http://localhost:8181/api/v1/auth/login",
    })
      .done(function (token) {
        Swal.fire({
          text: "Inicio exitoso",
          icon: "success",
          title: "Inicio de Sesión",
        }).then((result) => {
          
          if (result.isConfirmed) {
            const partes = token.jwt.split("."); // [header, payload, signature]

            // 3. Decodificar el payload (que es la parte [1])
            const payload = JSON.parse(atob(partes[1])); //Guarda un objeto

            //Guardo en la memoria de navegador el token para poder usarlo en otras vistas y js
            localStorage.setItem("token",JSON.stringify(token));

            //Guardo el token pero como json legible
            localStorage.setItem("tokenObj",JSON.stringify(payload));
            localStorage.removeItem("seccionSeleccionada"); //Borra la seccion seleccionada anteriormente para que inicie desde el inicio de pagina

            
            ruta = "";
            if(payload.rol === "USUARIO"){
                ruta = "../index.html";
            }
            else{
                ruta = "../vistasAdmin/inicioAdmin.html";
            }
            $(location).attr('href',ruta); //Redireccinar a una ruta

          }
        });
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        // Si encuentra algun problema

        Swal.fire({
          title: "ALERTA",
          icon: "error",
          text: "La solicitud ha fallado: " + textStatus,
        });
      });
  });
});
