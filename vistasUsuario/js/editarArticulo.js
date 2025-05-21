$(document).ready(function () {
  // Obtén los parámetros de la URL
  const params = new URLSearchParams(window.location.search);
  // Obtener el valor del parámetro 'id'
  const id = params.get("id");

  //Ahora solicito al back el usuario que quiero editar para mostrar su informacion
  token = JSON.parse(localStorage.getItem("token"));

  $.ajax({
    url: "http://localhost:8181/api/v1/categorias",
    headers: { Authorization: `Bearer ${token.jwt}` },
    method: "GET",
    dataType: "json",
  }).done(function (data) {
    const categorias = Array.isArray(data) ? data : data.data; // Ajustamos si es necesario
    contenidoCategorias = $("#categoria");
    categorias.forEach(function (categoria) {
      const categoriaInsertar = `<option value="${categoria.id}">${categoria.nombre}</option>`;
      contenidoCategorias.append(categoriaInsertar);
    });

    $.ajax({
      headers: { Authorization: `Bearer ${token.jwt}` },
      method: "GET",
      dataType: "json",
      url: `http://localhost:8181/api/v1/articulos/${id}`,
    }).done(function (respuesta) {
      console.log(respuesta);
      $("#nombre").val(respuesta.nombre);
      $("#descripcion").val(respuesta.descripcion);
      $("#categoria").val(respuesta.idCategoria);
      console.log($("#categoria").val());
    });
  });

  $(document).on("click", "#editar", function () {
    // Obtener valores del formulario
    const nombre = $("#nombre").val();
    const idCategoria = $("#categoria").val();
    console.log($("#categoria").val());
    const descripcion = $("#descripcion").val();
    const imagen = $("#imagen")[0].files[0];

    const articulo = {
      nombre: nombre,
      idCategoria: idCategoria,
      descripcion: descripcion,
    };

    // Crear FormData y adjuntar partes
    const formData = new FormData();
    formData.append(
      "articulo",
      new Blob([JSON.stringify(articulo)], { type: "application/json" })
    );
    formData.append("file", imagen);

    token = JSON.parse(localStorage.getItem("token"));

    $.ajax({
      url: `http://localhost:8181/api/v1/articulos/${id}`,
      headers: { Authorization: `Bearer ${token.jwt}` },
      method: "PUT",
      data: formData,
      contentType: false,
      processData: false,
    })
      .done(function () {
        Swal.fire({
          text: "Editado Correctamente",
          icon: "success",
          title: "Editado Correctamente",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = `editarArticulo.html?id=${id}`;
          }
        });
      })
      .fail(function () {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Hubo un error",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  });
});
