$(document).ready(function(){
    token = JSON.parse(localStorage.getItem("token"));
    tokenObj = JSON.parse(localStorage.getItem("tokenObj"));
    //Cuando le de click al boton de intercambio se manda el id del articulo y el id del usuario logueado

    $(document).on("click",".btn-intercambiar",function () {
        const idArticulo = $(".idArticulo").val();
        const idPropietario = $(".idPropietario").val();
        datos={
            "idArticuloIntercambio":idArticulo,
            "idPropietario":idPropietario
        }

        localStorage.setItem("datosArticuloDeseado",JSON.stringify(datos));
        $(location).attr('href', 'vistasUsuario/elegirArticulo.html');
    });

});