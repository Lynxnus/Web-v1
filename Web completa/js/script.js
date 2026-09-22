// T&F Osorno — comportamiento del sitio (estilo Foundix)

document.addEventListener("DOMContentLoaded", function () {
  // Menú móvil
  var toggle = document.querySelector("[data-menu-toggle]");
  var nav = document.querySelector(".navbar__links");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("is-open");
      var expandido = nav.classList.contains("is-open");
      toggle.setAttribute("aria-expanded", expandido);
    });
  }

  // Filtro de proyectos (solo en proyectos.html)
  var filtros = document.querySelectorAll(".filtro");
  var tarjetas = document.querySelectorAll(".project-card");
  if (filtros.length && tarjetas.length) {
    filtros.forEach(function (filtro) {
      filtro.addEventListener("click", function () {
        filtros.forEach(function (f) { f.classList.remove("activo"); });
        filtro.classList.add("activo");
        var categoria = filtro.getAttribute("data-categoria");
        tarjetas.forEach(function (tarjeta) {
          var coincide = categoria === "todos" || tarjeta.getAttribute("data-categoria") === categoria;
          tarjeta.style.display = coincide ? "" : "none";
        });
      });
    });
  }

  // Año automático en el pie de página
  var anio = document.querySelector("#anio-actual");
  if (anio) anio.textContent = new Date().getFullYear();

  // Validación simple del formulario de contacto
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      var required = form.querySelectorAll("[required]");
      var valido = true;
      required.forEach(function (campo) {
        if (!campo.value.trim()) valido = false;
      });
      if (!valido) {
        e.preventDefault();
        alert("Por favor completa todos los campos obligatorios.");
      }
    });
  }

  // Revelado simple de elementos al hacer scroll (progresivo: solo con JS activo)
  var elementosRevelar = document.querySelectorAll(".reveal");
  if (elementosRevelar.length) {
    if ("IntersectionObserver" in window) {
      var observador = new IntersectionObserver(
        function (entradas) {
          entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
              entrada.target.classList.add("visible");
              observador.unobserve(entrada.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
      );
      elementosRevelar.forEach(function (el) { observador.observe(el); });
    } else {
      elementosRevelar.forEach(function (el) { el.classList.add("visible"); });
    }
  }
});
