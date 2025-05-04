$(document).ready(function () {
        // Obtén los parámetros de la URL
        const params = new URLSearchParams(window.location.search);
        // Obtener el valor del parámetro 'id'
        const id = params.get('id');

        //Ahora solicito al back el usuario que quiero editar para mostrar su informacion

        $.ajax({
            method:"GET",
            dataType:"json",
            url:`http://localhost:8181/api/v1/usuarios/${id}` 
        })
        .done(function (respuesta) {
            nombre = $('#nombre').val(respuesta.nombre);
            apellido = $('#apellido').val(respuesta.apellido);
            correo = $('#correo').val(respuesta.correo);
        });




    $(document).on('click','#btnEditarUsuario',function () {


        nombre = $('#nombre').val();
        apellido = $('#apellido').val();
        correo = $('#correo').val();

        console.log(nombre);
        console.log(apellido);
        console.log(correo);

        $.ajax({
            data: {
                "nombre":nombre,
                "apellido":apellido,
                "correo":correo
            },
            method:"PUT",
            url: `http://localhost:8181/api/v1/usuarios/${id}`
        })
        .done(function () {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Editado correctamente",
                showConfirmButton: false,
                timer: 1500
            });
        })
        .fail(function () {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Hubo un error",
                showConfirmButton: false,
                timer: 1500
            });
        });
    })
})