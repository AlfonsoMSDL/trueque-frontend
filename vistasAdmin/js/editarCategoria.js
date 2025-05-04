// Obtén los parámetros de la URL
const params = new URLSearchParams(window.location.search);

// Obtener el valor del parámetro 'id'
const id = params.get('id');


$(document).ready(function () {



    function getCategoria(id_categoria) {
        $.ajax({
                url: `http://localhost:8181/api/v1/categorias/${id_categoria}`,
                method: "GET",
                dataType: "json",
            })
            .done(function (respuesta) {
                nombre = respuesta.nombre;
                descripcion = respuesta.descripcion;

                console.log(respuesta);


                $('#nombre').val(nombre);
                $('#descripcion').val(descripcion);


            });
    }

    getCategoria(id);


    $(document).on('click','#guardarCambios', function(){

        nuevoNombre = $('#nombre').val();
        nuevaDescripcion = $('#descripcion').val();

        $.ajax({
            data:JSON.stringify({"nombre": nuevoNombre,"descripcion": nuevaDescripcion}),
            contentType: "application/json",
            method: "PUT",
            url: `http://localhost:8181/api/v1/categorias/${id}`
        })
        .done(function () {
            Swal.fire("Editado correctamente", "Editado correctamente", "success");

        })

    })


})
