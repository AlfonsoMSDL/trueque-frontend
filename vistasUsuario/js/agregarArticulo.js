$(document).ready(function () {
    $("#agregar").on("click", function (e) {
        e.preventDefault(); // Prevenir el envío normal del formulario

        // Obtener valores del formulario
        const nombre = $("#nombre").val();
        const idCategoria = $("#categoria").val();
        const descripcion = $("#descripcion").val();
        const imagen = $("#imagen")[0].files[0];
        const idPropietario = 1;

        // Validación básica (puedes extenderla)
        if (!nombre || !idCategoria || !descripcion || !imagen) {
            Swal.fire({
                icon: "warning",
                title: "Por favor, completa todos los campos",
                showConfirmButton: true
            });
            return;
        }

        const articulo = {
            nombre: nombre,
            idCategoria: idCategoria,
            descripcion: descripcion,
            idPropietario: idPropietario
        };

         // Crear FormData y adjuntar partes
         const formData = new FormData();
         formData.append("articulo", new Blob([JSON.stringify(articulo)], { type: "application/json" }));
         formData.append("file", imagen);

        token = JSON.parse(localStorage.getItem("token"));
        tokenObj =JSON.parse(localStorage.getItem("tokenObj"));

        // Enviar la solicitud AJAX
        $.ajax({
            url: "http://localhost:8181/api/v1/articulos",
            headers:{"Authorization": `Bearer ${token.jwt}`},
            method: "POST",
            data: formData,
            contentType: false,
            processData: false
        })
        .done(function () {
            Swal.fire({
                icon: "success",
                title: "Artículo creado correctamente",
                showConfirmButton: false,
                timer: 1500
            });
            $("form")[0].reset(); // Limpiar el formulario
        })
        .fail(function () {
            Swal.fire({
                icon: "error",
                title: "Error al crear el artículo",
                showConfirmButton: false,
                timer: 1500
            });
        });
    });
});
