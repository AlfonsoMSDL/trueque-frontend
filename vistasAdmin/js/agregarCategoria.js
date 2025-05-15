$(document).ready(function(){
    
    $(document).on('click','#agregarCategoria', function(){
        token = JSON.parse(localStorage.getItem("token"));
        tokenObj =JSON.parse(localStorage.getItem("tokenObj"));
        nombre = $('#nombre').val();
        descripcion = $('#descripcion').val();

        $.ajax({
            url: "http://localhost:8181/api/v1/categorias",
            headers:{"Authorization": `Bearer ${token.jwt}`},
            type: "POST",
            data: {
                "nombre": nombre,
                "descripcion": descripcion
            }
        })
        .done(function () {
            Swal.fire("Agregado correctamente", "Editado correctamente", "success");
        })
        .fail(function () {
            Swal.fire("Error", "Error al agregar", "error");
        });
        
        
    });
})