$(document).ready(function () {
  // Obtén los parámetros de la URL
  const params = new URLSearchParams(window.location.search);
  // Obtener el valor del parámetro 'id'
  const id = params.get("id");
  const token = JSON.parse(localStorage.getItem("token"));

  const headers = token
    ? {
        Authorization: `Bearer ${token.jwt}`,
      }
    : {};

  const ruta = "";
  const rutaBack = "http://localhost:8181/api/v1/";

  $.ajax({
    url: `http://localhost:8181/api/v1/reportes/${id}`,
    headers: headers,
    method: "GET",
    dataType: "json",
  }).done(function (reporte) {
    const articuloAjax = $.ajax({
      url: `http://localhost:8181/api/v1/articulos/${reporte.idArticulo}`,
      headers: headers,
      method: "GET",
      dataType: "json",
    });

    const autorAjax = $.ajax({
      url: `http://localhost:8181/api/v1/usuarios/${reporte.idAutor}`,
      headers: headers,
      method: "GET",
      dataType: "json",
    });

    $.when(articuloAjax, autorAjax).done(function (articuloResp, autorResp) {
      const articulo = articuloResp[0];
      const autor = autorResp[0];

      $(".imagen img").attr("src",rutaBack+articulo.urlImagen);
      $(".nombre-articulo").text(articulo.nombre);
      $(".descripcion").text(reporte.descripcion);
      $(".fecha").text(procesarFecha(reporte.fecha));
      $(".autor").text(autor.nombre+" "+autor.apellido);


    });
  });
});

function procesarFecha(fecha) {
    var fechaList = fecha.split("T");
    fechaBonita = fechaList[0];
    return fechaBonita;
}
