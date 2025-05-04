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
});
