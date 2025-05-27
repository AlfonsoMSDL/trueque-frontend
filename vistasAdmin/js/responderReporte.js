$(document).ready(function () {


  var idArticuloActivar;

  // Obtén los parámetros de la URL
  const params = new URLSearchParams(window.location.search);
  // Obtener el valor del parámetro 'id'
  const id = params.get("id");
  const token = JSON.parse(localStorage.getItem("token"));

  const headers = token
    ? {
        Authorization: `Bearer ${token.jwt}`,
      }
    : {};


  const rutaBack = "http://localhost:8181/api/v1/";

  //Ajax para traer el reporte
  $.ajax({
    url: `http://localhost:8181/api/v1/reportes/${id}`,
    headers: headers,
    method: "GET",
    dataType: "json",
  }).done(function (reporte) {
    //Ajax para traer el articulo del reporte
    const articuloAjax = $.ajax({
      url: `http://localhost:8181/api/v1/articulos/${reporte.idArticulo}`,
      headers: headers,
      method: "GET",
      dataType: "json",
    });

    //Ajax para traer el usuario del reporte
    const autorAjax = $.ajax({
      url: `http://localhost:8181/api/v1/usuarios/${reporte.idAutor}`,
      headers: headers,
      method: "GET",
      dataType: "json",
    });

    $.when(articuloAjax, autorAjax).done(function (articuloResp, autorResp) {
      const articulo = articuloResp[0];
      const autor = autorResp[0];

      idArticuloActivar = articulo.id;

      if(articulo.estado == "DISPONIBLE"){
        $(".btn-activar").hide();
        $(".btn-desactivar").show();
        $(".btn-descartar").show();
      }
      else{
        $(".btn-activar").show();
        $(".btn-desactivar").hide();
        $(".btn-descartar").hide();
      }

      $(".imagen img").attr("src",rutaBack+articulo.urlImagen);
      $(".nombre-articulo").text(articulo.nombre);
      $(".descripcion p").text(reporte.descripcion);
      $(".fecha").text(procesarFecha(reporte.fecha));
      $(".autor").text(autor.nombre+" "+autor.apellido);


    });
  });


  $(document).on("click",".btn-desactivar",function(){
    $.ajax({
        url: `http://localhost:8181/api/v1/reportes/${id}/desactivar-articulo`,
        method: "PUT",
        headers: headers
    }).done(function(){
        Swal.fire({
          text: "Se ha desactivado",
          icon: "success",
          title: "Se ha desactivado",
        }).then((result) => {

          if (result.isConfirmed) {
            location.reload();

          }
        });
    })
  });

  $(document).on("click",".btn-activar",function(){
    
    $.ajax({
        url: `http://localhost:8181/api/v1/articulos/${idArticuloActivar}/cambiar-estado`,
        data:{
            estado:"DISPONIBLE"
        },
        method: "PUT",
        headers: headers
    }).done(function(){
        Swal.fire({
          text: "Se ha activado",
          icon: "success",
          title: "Se ha activado",
        }).then((result) => {

          if (result.isConfirmed) {
            location.reload();

          }
        });
    })

  });

  $(document).on("click",".btn-descartar",function(){
    
    $.ajax({
        url: `http://localhost:8181/api/v1/reportes/${id}/descartar`,
        method: "PUT",
        headers: headers
    }).done(function(){
        Swal.fire({
          text: "Se ha descartado",
          icon: "success",
          title: "Se ha descartado",
        }).then((result) => {

          if (result.isConfirmed) {
            $(location).attr("href","listarReportes.html");

          }
        });
    })

  });

});

function procesarFecha(fecha) {
    var fechaList = fecha.split("T");
    fechaBonita = fechaList[0];
    return fechaBonita;
}
