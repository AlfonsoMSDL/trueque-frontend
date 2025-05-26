$(document).ready(function () {

    // Obtén los parámetros de la URL
    const params = new URLSearchParams(window.location.search);
    // Obtener el valor del parámetro 'id'
    let id = params.get("id");
    const rutaBack = "http://localhost:8181/api/v1/";

    $(document).on("click", ".volver", function () {
        $(location).attr(
            "href",
            `../index.html?id=${id}`
        );
        localStorage.setItem("mostrarArticulo", true);
        localStorage.removeItem("datosArticuloDeseado");
    });

    $.get(`http://localhost:8181/api/v1/articulos/${id}`, function (articulo) {
        $(".imagen_articulo").attr("src", rutaBack + articulo.urlImagen);
        $(".nombre_articulo").text(articulo.nombre);
    });

    $(document).on("click", ".btn-reportar", function () {
        token = JSON.parse(localStorage.getItem("token"));
        const ruta = `http://localhost:8181/api/v1/reportes/articulos/${id}`;
        motivos = $("#motivos").val();
        tokenObj = JSON.parse(localStorage.getItem("tokenObj"));
        $.ajax({
                url: ruta,
                headers: {
                    "Authorization": `Bearer ${token.jwt}`
                },
                data: {
                    "descripcion": motivos,
                    "idAutor": tokenObj.id
                },
                method: "POST"
            })
            .done(function () {
                Swal.fire({
                    text: "Reporte enviado",
                    icon: "success",
                    title: "Reporte",
                }).then((result) => {

                    if (result.isConfirmed) {
                        localStorage.removeItem("seccionSeleccionada");
                        $(location).attr("href","../index.html");
                    }
                });
            })

    })


});