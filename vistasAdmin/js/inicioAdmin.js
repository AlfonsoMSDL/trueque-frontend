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

//Para cuando cierre la sesion
$(document).ready(function() {
  $(document).on('click','#cerrarSesion',function() {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenObj");
    localStorage.removeItem("seccionSeleccionada");
    
    $(location).attr('href','../index.html');
  });
  
});

