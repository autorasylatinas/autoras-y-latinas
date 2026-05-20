/* ============================================
   AUTORAS Y LATINAS — animations.js
   Pantalla de intro, menú hamburguesa y
   animaciones de entrada por scroll
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- PANTALLA DE INTRO (splash screen) ---
  const intro = document.getElementById('intro');
  if (intro) {
    setTimeout(() => {
      intro.style.display = 'none';
      intro.setAttribute('aria-hidden', 'true');
      iniciarAnimacionesEntrada();
    }, 3000);
  } else {
    iniciarAnimacionesEntrada();
  }

  // --- MENÚ HAMBURGUESA ---
  const hamburger = document.getElementById('hamburger');
  const menuMobile = document.getElementById('menu-mobile');

  if (hamburger && menuMobile) {
    hamburger.addEventListener('click', () => {
      const estaAbierto = menuMobile.classList.contains('abierto');
      if (estaAbierto) {
        menuMobile.classList.remove('abierto');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Abrir menú');
      } else {
        menuMobile.classList.add('abierto');
        hamburger.setAttribute('aria-expanded', 'true');
        hamburger.setAttribute('aria-label', 'Cerrar menú');
      }
    });

    // Submenú de categorías — colapsado por defecto, se abre al tocar "Catálogo ▾"
    const submenuToggle = document.getElementById('submenu-toggle');
    const submenuCategorias = document.getElementById('submenu-categorias');

    if (submenuToggle && submenuCategorias) {
      // Asegurarse que arranca colapsado
      submenuCategorias.classList.remove('abierto');
      submenuToggle.classList.remove('abierto');

      submenuToggle.addEventListener('click', (e) => {
        // Evitar que el click cierre el menú principal
        e.stopPropagation();
        const estaAbierto = submenuCategorias.classList.contains('abierto');
        submenuCategorias.classList.toggle('abierto', !estaAbierto);
        submenuToggle.classList.toggle('abierto', !estaAbierto);
        submenuToggle.setAttribute('aria-expanded', String(!estaAbierto));
      });
    }

    // Cerrar el menú al hacer clic en un link
    menuMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuMobile.classList.remove('abierto');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Cerrar el menú al presionar Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuMobile.classList.contains('abierto')) {
        menuMobile.classList.remove('abierto');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.focus();
      }
    });
  }

  // --- MARCAR ENLACE ACTIVO EN LA NAVEGACIÓN ---
  const paginaActual = window.location.pathname.split('/').pop() || 'index.html';
  const linksNav = document.querySelectorAll('.header__nav a, .header__menu-mobile a');
  linksNav.forEach(link => {
    const href = link.getAttribute('href');
    if (href === paginaActual) {
      link.classList.add('activo');
      link.setAttribute('aria-current', 'page');
    }
  });

});

// --- ANIMACIONES DE ENTRADA POR SCROLL ---
function iniciarAnimacionesEntrada() {
  const elementosAnimables = document.querySelectorAll('.animar, .animar-solo');
  if (!elementosAnimables.length) return;

  const observador = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observador.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  elementosAnimables.forEach(el => observador.observe(el));
}
