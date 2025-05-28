$(document).ready(function () {
  const datosIntercambio = JSON.parse(localStorage.getItem("datosIntercambio"));

  console.log(datosIntercambio);

  $(document).on("click", ".btn-cancelar", function () {
    $(location).attr(
      "href",
      `../index.html?id=${datosIntercambio.datosArticuloDeseado.idArticuloIntercambio}`
    );

    localStorage.removeItem("datosIntercambio");
    localStorage.setItem("mostrarArticulo", true);
  });

  const rutaBack = "http://localhost:8181/api/v1/";
  const idArticuloOfrecido = parseInt(
    datosIntercambio.datosArticuloOfrecido.idArticuloOfrecer
  );

  const idArticuloIntercambio = parseInt(
    datosIntercambio.datosArticuloDeseado.idArticuloIntercambio
  );
  const idPropietarioArtDeseado = parseInt(
    datosIntercambio.datosArticuloDeseado.idPropietario
  );

  $.get(
    `http://localhost:8181/api/v1/articulos/${idArticuloIntercambio}`,
    function (articulo) {
      $("#articuloDeseado img").attr("src", rutaBack + articulo.urlImagen);
      $("#articuloDeseado .nombre-articulo").text(articulo.nombre);
    }
  );
  $.get(
    `http://localhost:8181/api/v1/articulos/${idArticuloOfrecido}`,
    function (articulo) {
      $("#articuloOfrecido img").attr("src", rutaBack + articulo.urlImagen);
      $("#articuloOfrecido .nombre-articulo").text(articulo.nombre);
    }
  );

  $(document).on("click", ".btn-intercambiar", function () {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token.jwt);

    console.log({
      idUsuarioDos: idPropietarioArtDeseado,
      idArticuloUno: idArticuloOfrecido,
      idArticuloDos: idArticuloIntercambio,
    });

    //Enviar notificacion de la solitud de intercambio
    $.ajax({
      headers: { Authorization: `Bearer ${token.jwt}` },
      method: "POST",
      data: {
        idUsuarioDos: idPropietarioArtDeseado,
        idArticuloUno: idArticuloOfrecido,
        idArticuloDos: idArticuloIntercambio,
      },
      url: "http://localhost:8181/api/v1/intercambios",
    }).done(function () {
      Swal.fire({
        text: "Solicitud enviada",
        icon: "success",
        title: "Solicitar intercambio",
      }).then((result) => {
        if (result.isConfirmed) {
          $(location).attr(
            "href",
            `../index.html?id=${datosIntercambio.datosArticuloDeseado.idArticuloIntercambio}`
          );
          localStorage.removeItem("datosIntercambio");
            localStorage.setItem("mostrarArticulo", true);
        }
      });
    });
  });
});
