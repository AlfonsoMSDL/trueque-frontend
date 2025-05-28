$(document).ready(function () {
    const token = JSON.parse(localStorage.getItem("token"));
    $.ajax({
      headers: { Authorization: `Bearer ${token.jwt}` },
      method: "GET",
      url: "http://localhost:8181/api/v1/notificaciones/mias",
    }).done(function(data){
        console.log(data);
        const notificaciones = Array.isArray(data) ? data : data.data; // Ajustamos si es necesario

        contenedorNotificaciones = $("#notificacion-1");
        if(notificaciones.length > 0){
            $("#notificacion-1-icon").show(); //Tiene notificacion
            $("#notificacion-2-icon").hide(); // NO tiene notificacion


            notificaciones.forEach(function (notificacion) {
                if(!notificacion.leida){
                    const notificacionInsertar = `  <ul>
                                                        <li><p><b>${notificacion.mensaje}</b></p></li>
                                                    </ul>
                    `;
                    contenedorNotificaciones.append(notificacionInsertar);
                }
                

                
            });


        }else{
            $("#notificacion-1-icon").hide(); //Tiene notificacion
            $("#notificacion-2-icon").show(); // NO tiene notificacion
        }
        
    })
});