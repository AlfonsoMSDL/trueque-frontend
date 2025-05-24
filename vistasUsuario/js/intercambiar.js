$(document).ready(function () {
    const datosIntercambio = JSON.parse(
        localStorage.getItem("datosIntercambio")
    );

    console.log(datosIntercambio);

    $(document).on("click", ".btn-cancelar", function () {
        $(location).attr(
            "href",
            `../index.html?id=${datosIntercambio.datosArticuloDeseado.idArticuloIntercambio}`
        );
        localStorage.setItem("mostrarArticulo", true);
    });

    const rutaBack = "http://localhost:8181/api/v1/";
    const idArticuloIntercambio = datosIntercambio.datosArticuloDeseado.idArticuloIntercambio;
    const idArticuloOfrecido = datosIntercambio.datosArticuloOfrecido.idArticuloOfrecer;
    

    $.get(`http://localhost:8181/api/v1/articulos/${idArticuloIntercambio}`, function (articulo) {
       $("#articuloDeseado img").attr("src", rutaBack + articulo.urlImagen);
       $("#articuloDeseado .nombre-articulo").text(articulo.nombre);
    });

})