$(document).ready(function () {

    token = JSON.parse(localStorage.getItem("token"));
    tokenObj = JSON.parse(localStorage.getItem("tokenObj"));

    const ruta = "http://localhost:8181/api/v1/articulos/mis-articulos"; //Obtener los articulos de un usuario
    const rutaBack = "http://localhost:8181/api/v1/";
    let contenidoArticulos;
    $.ajax({
            url: ruta,
            headers: {
                "Authorization": `Bearer ${token.jwt}`
            },
            method: "GET",
            dataType: "json",
        })
        .done(function (data) {
            const articulos = Array.isArray(data.content) ? data.content : data.content.data; // Ajustamos si es necesario
            contenidoArticulos = $(".allArticlesByUser");
            articulos.forEach(function (articulo) {
                const articuloInsertar = `<div class="article">
                                        <div class="imagen">
                                            <img src="${rutaBack+articulo.urlImagen}" alt="Imagen articulo" />
                                        </div>
                                        
                                        <p>${articulo.nombre}</p>
                                        <button data-id="${articulo.id}" class="editar-btn">Editar</button>
                                        <button data-id="${articulo.id}" class="eliminar-btn">Eliminar</button>
                                    </div>`;

                contenidoArticulos.append(articuloInsertar);
            });
        })
        .fail(function () {
            contenidoCategorias.append(
                "<p>No hay ninguna categoria para mostrar.</p>"
            );
        });



    //Editar articulo
    $(document).on("click",".editar-btn",function () {
        const idArticulo = $(this).data();
        window.location.href=`editarArticulo.html?id=${idArticulo.id}`;
    });


    //Eliminar articulo
    $(document).on("click",".eliminar-btn",function () {
        
        const idArticulo = $(this).data();
        token = JSON.parse(localStorage.getItem("token"));




        Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esta acción",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "No, cancelar",
            reverseButtons: true,
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        }).then((result) => {
            if (result.isConfirmed) {
                const id_categoria = $(this).data('id');
                //Incluyo el ajax para poder hacer la solicitud de eliminacion
                $.ajax({
                        url: `http://localhost:8181/api/v1/articulos/${idArticulo.id}`,
                        headers: {
                            "Authorization": `Bearer ${token.jwt}`
                        },
                        method: "DELETE",
                    })
                    .done(function () {
                        location.reload();
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) { // Si encuentra algun problema

                        Swal.fire({
                            title: "ALERTA",
                            icon: "error",
                            text: "La solicitud ha fallado: " + errorThrown
                        });
                    })


            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: "Cancelado",
                    text: "La operación fue cancelada",
                    icon: "error",
                    customClass: {
                        confirmButton: "btn btn-success",
                    },
                });
            }
        });


    });



});