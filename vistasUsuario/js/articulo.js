$(document).ready(function () {
  const ruta = "http://localhost:8181/api/v1/categorias";
  let contenidoCategorias;
  $.ajax({
    url: ruta,
    method: "GET",
    dataType: "json",
  })
    .done(function (data) {
      const categorias = Array.isArray(data) ? data : data.data; // Ajustamos si es necesario
      contenidoCategorias = $("#categoria");
      categorias.forEach(function (categoria) {
        const categoriaInsertar = `<option value="${categoria.id}">${categoria.nombre}</option>`;
        contenidoCategorias.append(categoriaInsertar);
      });
    })
    .fail(function () {
      contenidoCategorias.append(
        "<p>No hay ninguna categoria para mostrar.</p>"
      );
    });


    //Agregar categoria
    $("#agregar").on("click", function (e) {
      e.preventDefault(); // Prevenir el envío normal del formulario

      // Obtener valores del formulario
      const nombre = $("#nombre").val();
      const categoria = $("#categoria").val();
      const descripcion = $("#descripcion").val();
      const imagen = $("#imagen")[0].files[0];

      // Validación básica (puedes extenderla)
      if (!nombre || !categoria || !descripcion || !imagen) {
          Swal.fire({
              icon: "warning",
              title: "Por favor, completa todos los campos",
              showConfirmButton: true
          });
          return;
      }

      // Crear el objeto FormData
      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("categoria", categoria);
      formData.append("descripcion", descripcion);
      formData.append("file", imagen); // importante: el nombre debe ser "file" para coincidir con el @RequestPart del backend

      // Enviar la solicitud AJAX
      $.ajax({
          url: "http://localhost:8181/api/v1/articulos",
          method: "POST",
          data: formData,
          contentType: false,
          processData: false,
          success: function () {
              Swal.fire({
                  icon: "success",
                  title: "Artículo creado correctamente",
                  showConfirmButton: false,
                  timer: 1500
              });
              $("form")[0].reset(); // Limpiar el formulario
          },
          error: function () {
              Swal.fire({
                  icon: "error",
                  title: "Error al crear el artículo",
                  showConfirmButton: false,
                  timer: 1500
              });
          }
      });
  });


});
