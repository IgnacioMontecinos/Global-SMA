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

// ===== Toggle categorías en la misma página =====
(function(){
  const heads = document.querySelectorAll('.category__head[data-toggle]');
  heads.forEach(h => {
    h.addEventListener('click', () => {
      const sel = h.getAttribute('data-toggle');
      const cat = document.querySelector(sel);
      const isOpen = cat.getAttribute('aria-expanded') === 'true';
      // Cerrar las demás (opcional: comenta si quieres múltiples abiertas)
      document.querySelectorAll('.category[aria-expanded="true"]').forEach(c => {
        if (c !== cat) c.setAttribute('aria-expanded','false');
      });
      // Alternar la seleccionada
      cat.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      // Scroll suave a la categoría
      if (!isOpen) cat.scrollIntoView({behavior:'smooth', block:'start', inline:'nearest'});
    });
  });

  // Abrir por hash (#cat-seguridad, #cat-mantenimiento, #cat-aseo)
  if (location.hash) {
    const cat = document.querySelector(location.hash);
    if (cat && cat.classList.contains('category')) {
      cat.setAttribute('aria-expanded','true');
      setTimeout(()=>cat.scrollIntoView({behavior:'smooth', block:'start'}), 120);
    }
  }
})();

