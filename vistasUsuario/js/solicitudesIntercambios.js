$(document).ready(function () {
  token = JSON.parse(localStorage.getItem("token"));
  tokenObj = JSON.parse(localStorage.getItem("tokenObj"));

  const ruta =
    "http://localhost:8181/api/v1/intercambios/usuarios/solicitudes-recibidas/";
  const rutaBack = "http://localhost:8181/api/v1/";
  const headers = token ? { Authorization: `Bearer ${token.jwt}` } : {};
  $.ajax({
    url: ruta + tokenObj.id,
    headers: headers,
    method: "GET",
    data: {
      estado: "SOLICITADO",
    },
    dataType: "json",
  }).done(function (data) {
    console.log(data);
    const intercambios = Array.isArray(data) ? data : data.data; // Ajustamos si es necesario
    let contenedorIntercambios = $(".contenido");

    intercambios.forEach(function (intercambio) {
      const idArticuloOfrecido = parseInt(intercambio.articuloUno);

      const idArticuloSolicitado = parseInt(intercambio.articuloDos);

      const articuloOfrecidoAjax = $.ajax({
        url: `http://localhost:8181/api/v1/articulos/${idArticuloOfrecido}`,
        method: "GET",
        headers: headers,
        dataType: "json",
      });

      const articuloSolicitadoAjax = $.ajax({
        url: `http://localhost:8181/api/v1/articulos/${idArticuloSolicitado}`,
        method: "GET",
        headers: headers,
        dataType: "json",
      });

      $.when(articuloOfrecidoAjax, articuloSolicitadoAjax).done(function (
        articuloOfrecidoResp,
        articuloSolicitadoResp
      ) {

        const articuloOfrecido = articuloOfrecidoResp[0];
        const articuloSolicitado = articuloSolicitadoResp[0];
        const intercambioInsertar = `
        <section class="intercambioItem">
            <div id="articuloDeseado" class="columna">
                <p class="titulo-columna"><b>Artículo ofrecido</b></p>
                <img src="${rutaBack+articuloOfrecido.urlImagen}" alt="Artículo" class="icono" />
                <p class="nombre-articulo">${articuloOfrecido.nombre}</p>
            </div>

            <div class="intercambio-icono">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
            >
                <path
                fill="#00374A"
                d="M14.293 2.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L16.586 8H5a1 1 0 0 1 0-2h11.586l-2.293-2.293a1 1 0 0 1 0-1.414m-4.586 10a1 1 0 0 1 0 1.414L7.414 16H19a1 1 0 1 1 0 2H7.414l2.293 2.293a1 1 0 0 1-1.414 1.414l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0"
                />
            </svg>
            </div>

            <div id="articuloOfrecido" class="columna">
            <p class="titulo-columna"><b>Articulo solicitado</b></p>
            <img src="${rutaBack+articuloSolicitado.urlImagen}" alt="Tu artículo" class="icono" />
            <p class="nombre-articulo">${articuloSolicitado.nombre}</p>
            </div>
        </section>`;
        contenedorIntercambios.append(intercambioInsertar);
      });
    });
  });
});
