$(document).ready(function () {
    const token = JSON.parse(localStorage.getItem("token"));
    const headers = token ? {
        Authorization: `Bearer ${token.jwt}`
    } : {};

    const ruta = "http://localhost:8181/api/v1/reportes";
    const rutaBack = "http://localhost:8181/api/v1/";

    $.ajax({
        url: ruta,
        headers: headers,
        method: "GET",
        dataType: "json",
    }).done(function (data) {
        const reportes = Array.isArray(data.content) ? data.content : data.content.data;
        const tbody = $("tbody");
        tbody.empty();

        reportes.forEach(function (reporte) {
            console.log(reporte);
            const articuloAjax = $.ajax({
                url: `http://localhost:8181/api/v1/articulos/${reporte.idArticulo}`,
                headers: headers,
                method: "GET",
                dataType: "json"
            });

            const autorAjax = $.ajax({
                url: `http://localhost:8181/api/v1/usuarios/${reporte.idAutor}`,
                headers: headers,
                method: "GET",
                dataType: "json"
            });

            $.when(articuloAjax, autorAjax).done(function (articuloResp, autorResp) {
                const articulo = articuloResp[0];
                const autor = autorResp[0];

                const fila = `
                <tr>
                    <td>${autor.nombre} ${autor.apellido}</td>
                    <td>
                        <img
                            src="${rutaBack + articulo.urlImagen}"
                            alt="Imagen artículo"
                        /><br />
                        ${articulo.nombre}
                    </td>
                    <td>${reporte.descripcion}</td>
                    <td>${reporte.estado}</td>
                    <td><button data-id="${reporte.id}" class="responder-btn">Responder</button></td>
                </tr>
                `;
                tbody.append(fila);
            });
        });

        $(document).on("click",".responder-btn",function(){
            const id = $(this).data("id");
            $(location).attr("href",`responderReporte.html?id=${id}`);
        })

    });
});
