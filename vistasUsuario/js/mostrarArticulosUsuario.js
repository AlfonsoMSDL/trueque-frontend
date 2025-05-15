$(document).ready(function () {

    token = JSON.parse(localStorage.getItem("token"));
    tokenObj =JSON.parse(localStorage.getItem("tokenObj"));
  
    const ruta = "http://localhost:8181/api/v1/articulos/mis-articulos"; //Obtener los articulos de un usuario
    const rutaBack = "http://localhost:8181/api/v1/";
    let contenidoArticulos;
    $.ajax({
      url: ruta,
      headers:{"Authorization": `Bearer ${token.jwt}`},
      method: "GET",
      dataType: "json",
    })
      .done(function (data) {
          const articulos = Array.isArray(data.content) ? data.content : data.content.data; // Ajustamos si es necesario
        console.log(articulos);
        contenidoArticulos = $(".allArticles");
        articulos.forEach(function (articulo) {
          const articuloInsertar = `<div class="article">
                                        <img src="${rutaBack+articulo.urlImagen}" alt="Imagen articulo" />
                                        <p>${articulo.nombre}</p>
                                        <a href="#" class="intercambiar-btn">Intercambiar</a>
                                    </div>`;

          contenidoArticulos.append(articuloInsertar);
          console.log(rutaBack+articulo.urlImagen);
        });
      })
      .fail(function () {
        contenidoCategorias.append(
          "<p>No hay ninguna categoria para mostrar.</p>"
        );
      });
  
  
  
  });
  