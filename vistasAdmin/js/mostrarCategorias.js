$(document).ready(function () {
  const ruta = "http://localhost:8181/api/v1/categorias";
  //Obtengo el token del usuario logueado
  token = JSON.parse(localStorage.getItem("token"));

  $.ajax({
      headers: {
        "Authorization": `Bearer ${token.jwt}`
      },
      url: ruta,
      method: "GET",
      dataType: "json"
    })
    .done(function (data) {
      console.log("Datos recibidos:", data); // <-- Agrega este console.log

      const categorias = Array.isArray(data) ? data : data.data; // Ajustamos si es necesario
      const tbody = $("#gestionar-categorias table tbody");
      tbody.empty();

      categorias.forEach(function (categoria) {
        const fila = `
                <tr>
                    <td>${categoria.nombre}</td>
                    <td>${categoria.descripcion}</td>
                    <td>

                        <!-- Aquí quitamos el input con id="id" y lo sustituimos por el atributo data-id -->
                        <button type="button" class="editarCategoria" data-id="${categoria.id}" title="Editar" style="background: transparent; border: none">
                            <img src="./img/iconos/iconoEditar.png" alt="Editar" width="25" height="25" />
                        </button>


                        <button type="button" class="eliminarCategoria" data-id="${categoria.id}" title="Eliminar" style="background: transparent; border: none">
                            <img src="./img/iconos/iconoEliminar.png" alt="Editar" width="25" height="25" />
                        </button>

                    </td>
                </tr>
            `;
        tbody.append(fila);
      });
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Error al cargar categorías:", textStatus, errorThrown);
      Swal.fire("Error", "No se pudieron cargar las categorías", "error");
      console.log(jqXHR.responseText);
    });

  // Usamos el atributo data-id para obtener el ID de la categoría
  $(document).on('click', '.editarCategoria', function () {
    const id_categoria = $(this).data('id'); // Obtener el ID de la categoría desde el atributo 'data-id'
    window.location.href = `editarCategoria.html?id=${id_categoria}`;
  });

  $(document).on('click', '.eliminarCategoria', function () {
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
        const id_categoria = $(this).data('id');
        //Incluyo el ajax para poder hacer la solicitud de eliminacion
        $.ajax({
            headers: {
              "Authorization": `Bearer ${token.jwt}`
            },
            type: 'DELETE',
            contentType: "application/json",
            url: `http://localhost:8181/api/v1/categorias/${id_categoria}`
          })
          .done(function () {

            location.reload(); // Recargo la pagina para que la tabla se actualice
          })
          .fail(function (jqXHR, textStatus, errorThrown) { // Si encuentra algun problema

            Swal.fire({
              title: "ALERTA",
              icon: "error",
              text: "La solicitud ha fallado: " + errorThrown
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