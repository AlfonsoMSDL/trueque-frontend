$(document).ready(function () {
  const datosArticuloDeseado = JSON.parse(
    localStorage.getItem("datosArticuloDeseado")
  );

  $(document).on("click", ".volver", function () {
    $(location).attr(
      "href",
      `../index.html?id=${datosArticuloDeseado.idArticuloIntercambio}`
    );
    localStorage.setItem("mostrarArticulo", true);
  });

  token = JSON.parse(localStorage.getItem("token"));
  tokenObj = JSON.parse(localStorage.getItem("tokenObj"));

  const ruta = "http://localhost:8181/api/v1/articulos/mis-articulos"; //Obtener los articulos de un usuario
  const rutaBack = "http://localhost:8181/api/v1/";
  let contenidoArticulos;

  $.ajax({
      url: ruta,
      headers: {
        Authorization: `Bearer ${token.jwt}`,
      },
      method: "GET",
      dataType: "json",
    })
    .done(function (data) {
      const articulos = Array.isArray(data.content) ?
        data.content :
        data.content.data; // Ajustamos si es necesario
      contenidoArticulos = $(".items");
      articulos.forEach(function (articulo) {
        const articuloInsertar = `<div class="article" data-id="${articulo.id}">
                                        <div class="imagen">
                                            <img src="${
                                              rutaBack + articulo.urlImagen
                                            }" alt="Imagen articulo" />
                                        </div>
                                        
                                        <p>${articulo.nombre}</p>
                                        
                                    
                                    </div>`;

        contenidoArticulos.append(articuloInsertar);
      });

    })

  $(document).on("click", ".article", function () {
    const datosArticuloDeseadoStr = localStorage.getItem("datosArticuloDeseado");

    // Convertimos la cadena a objeto
    const datosArticuloDeseado = JSON.parse(datosArticuloDeseadoStr);

    const idArticuloOfrecer = $(this).data("id");
    const idUsuarioLogueado = tokenObj.id;

    const datosArticuloOfrecido = {
      idArticuloOfrecer: idArticuloOfrecer,
      idUsuarioLogueado: idUsuarioLogueado
    };

    // Ahora anidas los objetos directamente
    const datosIntercambio = {
      datosArticuloDeseado: datosArticuloDeseado,
      datosArticuloOfrecido: datosArticuloOfrecido
    };


    // Si necesitas enviarlo como JSON (por ejemplo para un fetch o ajax)
    const datosIntercambioJSON = JSON.stringify(datosIntercambio);

    localStorage.setItem("datosIntercambio",datosIntercambioJSON);
    localStorage.removeItem("datosArticuloDeseado");
    $(location).attr("href","intercambiar.html");

  })
});