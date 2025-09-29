// Año dinámico en footer (si existe el span)
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// WhatsApp (solo aplica en index donde existe el formulario)
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

// Número en formato internacional sin +
const WA_PHONE = '5694082 5491 '; // +56 9 4082 5491

function buildWAText({ nombre, email, telefono, mensaje }) {
  let base = `Hola, soy ${nombre}. `;
  if (email) base += `Email: ${email}. `;
  if (telefono) base += `Tel: ${telefono}. `;
  base += `Quisiera información: ${mensaje}`;
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(base)}`;
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const url = buildWAText(data);
    window.open(url, '_blank'); // abre WhatsApp Web / App
    if (statusEl) statusEl.textContent = 'Abriendo WhatsApp…';
    form.reset();
  });
}

/// ===== Categorías expandibles (delegación segura)
(function () {
  console.log("[GLOBAL SMA] toggle categorías listo");

  // Capturamos clicks en todo el documento y buscamos la cabecera
  document.addEventListener("click", function (ev) {
    const head = ev.target.closest(".category__head[data-toggle]");
    if (!head) return;

    const sel = head.getAttribute("data-toggle");
    const cat = document.querySelector(sel);
    if (!cat) {
      console.warn("No encuentro el selector de categoría:", sel);
      return;
    }

    const isOpen = cat.getAttribute("aria-expanded") === "true";

    // Cerrar otras
    document.querySelectorAll(".category[aria-expanded='true']").forEach(c => {
      if (c !== cat) c.setAttribute("aria-expanded", "false");
    });

    // Alternar la actual
    cat.setAttribute("aria-expanded", isOpen ? "false" : "true");

    if (!isOpen) {
      // Scroll suave al abrir
      cat.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  // Si vienen con hash (#cat-seguridad, etc.) abrimos esa
  if (location.hash) {
    const cat = document.querySelector(location.hash);
    if (cat && cat.classList.contains("category")) {
      cat.setAttribute("aria-expanded", "true");
      setTimeout(() => cat.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }
  }
})();


