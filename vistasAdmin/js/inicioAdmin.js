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
  const activeSection =
    localStorage.getItem("seccionSeleccionada") || "listar-usuarios"; // Sección por defecto
  showSection(activeSection);
});

/*$(document).ready(function () {
  function editarCategoria(id_categoria) {
    window.location.href = `editarCategoria.html?id=${id_categoria}`;
    getCategoria(id_categoria);
  }

  function getCategoria(id_categoria) {
    $.ajax({
      url: `http://localhost:8181/api/v1/categorias/${id_categoria}`,
      method: "GET",
      dataType: "json",
    })
    .done(function(respuesta){
      id = respuesta.id;
      nombre = respuesta.nombre;
      descripcion = respuesta.descripcion;


      $('#nombre').val(nombre);
      $('#descripcion').val(descripcion);


    });
  }
});*/
