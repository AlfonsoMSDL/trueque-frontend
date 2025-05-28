$(document).ready(function () {
  // Se cargan los archivos html en las secciones
  $("#inicio").load("./vistasUsuario/articulosPublicos.html");
  $("#misArticulos").load("./vistasUsuario/misArticulos.html");
  $("#verArticulo").load("./vistasUsuario/verArticulo.html");

  // Obtén los parámetros de la URL
  const params = new URLSearchParams(window.location.search);
  // Obtener el valor del parámetro 'id'
  let id = params.get("id");
  if (id != null) {
    showSection("verArticulo");
  }

  //Mostrar el nombre del usuario si esta registrado

  $(".auth-links").hide();
  $(".auth-user").hide();
  token = JSON.parse(localStorage.getItem("token"));
  tokenObj = JSON.parse(localStorage.getItem("tokenObj"));


  if (tokenObj != null) {
    console.log(tokenObj);
    $(".auth-user").show();
    $("#nombreUsuarioLog").text(tokenObj.nombre);
  } else {
    $(".auth-links").show();
    $("#misArticulosLink").hide();
  }

  //Para cuando cierre la sesion
  $(document).on("click", "#cerrarSesion", function () {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenObj");
    localStorage.removeItem("seccionSeleccionada");

    $(location).attr("href", "index.html");
  });

  const ruta = "http://localhost:8181/api/v1/categorias";
  let contenidoCategorias;
  $.ajax({
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
        const categoriaInsertar = `<button class="categoria-btn" data-id="${categoria.id}" >${categoria.nombre}</button>`;
        contenidoCategorias.append(categoriaInsertar);
      });
    })
    .fail(function () {
      contenidoCategorias.append(
        "<p>No hay ninguna categoria para mostrar.</p>"
      );
    });

  //Filtrar por categorias
  $(document).on("click", ".categoria-btn", function () {
    $(".allArticles").empty();
    const idCategoria = $(this).data("id");
    const rutaBack = "http://localhost:8181/api/v1/";
    const headers = token
      ? {
          Authorization: `Bearer ${token.jwt}`,
        }
      : {};
    $.ajax({
      url: "http://localhost:8181/api/v1/articulos",
      headers: headers,
      data: {
        idCategoria: idCategoria,
      },
      method: "GET",
      dataType: "json",
    })
      .done(function (data) {
        const articulos = Array.isArray(data.content)
          ? data.content
          : data.content.data; // Ajustamos si es necesario
        contenidoArticulos = $(".allArticles");
        articulos.forEach(function (articulo) {
          const articuloInsertar = `<div class="article">
                                        <div class="imagen">
                                            <img src="${
                                              rutaBack + articulo.urlImagen
                                            }" alt="Imagen articulo" />
                                        </div>
                                        
                                        <p>${articulo.nombre}</p>
                                        <button data-id="${
                                          articulo.id
                                        }" class="ver-articulo-btn">Ver</button>
                                    </div>`;

          contenidoArticulos.append(articuloInsertar);
        });
      })
      .fail(function () {
        contenidoCategorias.append(
          "<p>No hay ninguna categoria para mostrar.</p>"
        );
      });
  });

  //Fltrar por nombre
  $(document).on("click", ".bnt-search", function () {
    $(".featured-articles").hide();
    $(".allArticles").empty();
    const nombre = $(".search-input").val();
    const rutaBack = "http://localhost:8181/api/v1/";
    const headers = token
      ? {
          Authorization: `Bearer ${token.jwt}`,
        }
      : {};
    $.ajax({
      url: "http://localhost:8181/api/v1/articulos",
      headers: headers,
      data: {
        nombre: nombre,
      },
      method: "GET",
      dataType: "json",
    })
      .done(function (data) {
        const articulos = Array.isArray(data.content)
          ? data.content
          : data.content.data; // Ajustamos si es necesario
        contenidoArticulos = $(".allArticles");
        articulos.forEach(function (articulo) {
          const articuloInsertar = `<div class="article">
                                        <div class="imagen">
                                            <img src="${
                                              rutaBack + articulo.urlImagen
                                            }" alt="Imagen articulo" />
                                        </div>
                                        
                                        <p>${articulo.nombre}</p>
                                        <button data-id="${
                                          articulo.id
                                        }" class="ver-articulo-btn">Ver</button>
                                    </div>`;

          contenidoArticulos.append(articuloInsertar);
        });
      })
      .fail(function () {
        contenidoCategorias.append(
          "<p>No hay ninguna categoria para mostrar.</p>"
        );
      });
  });

  //Ver articulo

  $(document).on("click", ".ver-articulo-btn", function () {
    
    const idArticulo = $(this).data("id");
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("id", idArticulo);
    window.history.pushState({}, "", newUrl); // Cambia la URL sin recargar

    showSection("verArticulo"); // Muestra la sección
    cargarArticuloIndividual(idArticulo); // Llama manualmente la función
  });

  //desde la vista de ver articulo, redireccionar a reportar cuando le de click en su enlace
  $(document).on("click", ".reportar-link", function () {
    // Obtén los parámetros de la URL
    const params = new URLSearchParams(window.location.search);
    // Obtener el valor del parámetro 'id'
    let id = params.get("id");
    $(location).attr("href",`vistasUsuario/reportarArticulo.html?id=${id}`);
  })
});



//Para mostrar la seccion que se elija
function showSection(sectionId) {

  // Obtén los parámetros de la URL
  const params = new URLSearchParams(window.location.search);
  // Obtener el valor del parámetro 'id'
  let id = params.get("id");

  if (id != null) {
    if (sectionId == "inicio" || sectionId == "misArticulos") {
      location.reload();
      window.location.href = "index.html";
    }
  }

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

function cargarArticuloIndividual(id) {
  const rutaBack = "http://localhost:8181/api/v1/";
  token = JSON.parse(localStorage.getItem("token"));

  $.ajax({
    method: "GET",
    dataType: "json",
    url: `${rutaBack}articulos/${id}`,
  }).done(function (respuesta) {
    console.log(respuesta);
    $(".contenido h2").text(respuesta.nombre);
    $(".contenido p").text(respuesta.descripcion);
    $(".idArticulo").val(respuesta.id);
    $(".idPropietario").val(respuesta.idPropietario);
    $(".product-image").attr("src", rutaBack + respuesta.urlImagen);
    

    $.ajax({
        method: "GET",
        dataType: "json",
        url: `${rutaBack}usuarios/${respuesta.idPropietario}`
      }).done(function (respuesta) {
        nombreCompleto = respuesta.nombre+" "+respuesta.apellido;
        $(".offered-by p").text(nombreCompleto);

    });


  });
}

window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  // Obtener el valor del parámetro 'id'
  let id = params.get("id");
  let mostrarArticulo = localStorage.getItem("mostrarArticulo");
  if(mostrarArticulo != null){
    cargarArticuloIndividual(id);
    localStorage.removeItem("mostrarArticulo");
  }

  
};
