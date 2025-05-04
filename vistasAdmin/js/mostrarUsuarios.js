$(document).ready(function () {
    const ruta = "http://localhost:8181/api/v1/usuarios";

    $.ajax({
            url: ruta,
            method: "GET",
            dataType: "json"
        })
        .done(function (data) {
            console.log("Datos recibidos:", data); // <-- Agrega este console.log

            const usuarios = Array.isArray(data.content) ? data.content : data.content.data; // Ajustamos si es necesario
            console.log(usuarios);
            const tbody = $("#listar-usuarios table tbody");
            tbody.empty();

            usuarios.forEach(function (usuario) {
                const fila = `
                <tr>
                    <td>${usuario.nombre} ${usuario.apellido}</td>
                    <td>${usuario.correo}</td>
                    <td>

                        <!-- Aquí quitamos el input con id="id" y lo sustituimos por el atributo data-id -->
                        <button type="button" class="editarUsuario" data-id="${usuario.id}" title="Editar" style="background: transparent; border: none">
                            <img src="./img/iconos/iconoEditar.png" alt="Editar" width="25" height="25" />
                        </button>


                        <button type="button" class="eliminarUsuario" data-id="${usuario.id}" title="Eliminar" style="background: transparent; border: none">
                            <img src="./img/iconos/iconoEliminar.png" alt="Editar" width="25" height="25" />
                        </button>

                    </td>
                </tr>
            `;
                tbody.append(fila);
            });
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.error("Error al cargar los usuarios:", textStatus, errorThrown);
            Swal.fire("Error", "No se pudieron cargar los usuarios", "error");
            console.log(jqXHR.responseText);
        });

    // Usamos el atributo data-id para obtener el ID de la categoría
    $(document).on('click', '.editarUsuario', function () {
        const id_usuario = $(this).data('id');  // Obtener el ID de la categoría desde el atributo 'data-id'
        window.location.href = `editarUsuario.html?id=${id_usuario}`;
    });

    $(document).on('click', '.eliminarUsuario', function () {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esta acción",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "No, cancelar",
            reverseButtons: true,
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
          }).then((result) => {
            if (result.isConfirmed) {
                const id_usuario = $(this).data('id');  
              //Incluyo el ajax para poder hacer la solicitud de eliminacion
              $.ajax({
                type: 'DELETE',
                contentType: "application/json",
                url: `http://localhost:8181/api/v1/usuarios/${id_usuario}`
              })
              .done(function() {

                location.reload();// Recargo la pagina para que la tabla se actualice
              })
              .fail(function(jqXHR, textStatus, errorThrown) {  // Si encuentra algun problema
    
                Swal.fire({
                    title: "ALERTA",
                    icon: "error",
                    text: "La solicitud ha fallado: " +  errorThrown
                });
            })
    
    
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire({
                title: "Cancelado",
                text: "La operación fue cancelada",
                icon: "error",
                customClass: {
                  confirmButton: "btn btn-success",
                },
              });
            }
          });

    })
    
});
