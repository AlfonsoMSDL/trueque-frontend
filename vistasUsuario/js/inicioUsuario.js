$(document).ready(function () {
   // Se cargan los archivos html en las secciones
  $("#inicio").load("articulosPublicos.html");
  $("#misArticulos").load("misArticulos.html");

  //Mostrar el nombre del usuario si esta registrado

  $('.auth-links').hide();
  $('.auth-user').hide();
  token = JSON.parse(localStorage.getItem("token"));
  tokenObj =JSON.parse(localStorage.getItem("tokenObj"));
 

  if(tokenObj != null){
    console.log(tokenObj);
    $('.auth-user').show();
    $('#nombreUsuarioLog').text(tokenObj.nombre);
  }
  else{
    $('.auth-links').show();
  }

  //Para cuando cierre la sesion
  $(document).on('click','#cerrarSesion',function() {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenObj");
    
    $(location).attr('href','login.html');
  });





  const ruta = "http://localhost:8181/api/v1/categorias";
  let contenidoCategorias;
  $.ajax({
    headers:{"Authorization": `Bearer ${token.jwt}`},
    url: ruta,
    method: "GET",
    dataType: "json",
  })
    .done(function (data) {
      const categorias = Array.isArray(data) ? data : data.data; // Ajustamos si es necesario
      contenidoCategorias = $(".categories");
      contenidoCategorias.empty();
      if (categorias.length === 0) {
        contenidoCategorias.append(
          "<p>No hay ninguna categoria para mostrar.</p>"
        );
        return;
      }
      categorias.forEach(function (categoria) {
        const categoriaInsertar = `<button>${categoria.nombre}</button>`;
        contenidoCategorias.append(categoriaInsertar);
      });
    })
    .fail(function () {
      contenidoCategorias.append(
        "<p>No hay ninguna categoria para mostrar.</p>"
      );
    });
});

//Para mostrar la seccion que se elija
function showSection(sectionId) {
  // Ocultar todas las secciones
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.style.display = "none";
  });

  // Mostrar la sección seleccionada
  const selectedSection = document.getElementById(sectionId);
  selectedSection.style.display = "block";

  // Guardar la sección activa en localStorage
  localStorage.setItem("seccionSeleccionada", sectionId);
}

// Mostrar la sección de listar usuarios por defecto al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const activeSection = localStorage.getItem("seccionSeleccionada") || "inicio"; // Sección por defecto
  showSection(activeSection);
});


