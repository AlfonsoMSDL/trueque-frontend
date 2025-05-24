$(document).ready(function () {
  token = JSON.parse(localStorage.getItem("token"));
  tokenObj = JSON.parse(localStorage.getItem("tokenObj"));

  const ruta = "http://localhost:8181/api/v1/articulos";
  const rutaBack = "http://localhost:8181/api/v1/";
  let contenidoArticulos;
  const headers = token ? { Authorization: `Bearer ${token.jwt}` } : {};
  $.ajax({
    url: ruta,
    headers: headers,
    method: "GET",
    dataType: "json",
  })
    .done(function (data) {
      const articulos = Array.isArray(data.content)
        ? data.content
        : data.content.data; // Ajustamos si es necesario
      contenidoArticulos = $(".allArticles");
      articulos.forEach(function (articulo) {
        const articuloInsertar = `<div class="article">
                                        <div class="imagen">
                                            <img src="${
                                              rutaBack + articulo.urlImagen
                                            }" alt="Imagen articulo" />
                                        </div>
                                        
                                        <p>${articulo.nombre}</p>
                                        <button data-id="${
                                          articulo.id
                                        }" class="ver-articulo-btn">Ver</button>
                                    </div>`;

        contenidoArticulos.append(articuloInsertar);
      });
    })
    .fail(function () {
      contenidoCategorias.append(
        "<p>No hay ninguna categoria para mostrar.</p>"
      );
    });

  

});
