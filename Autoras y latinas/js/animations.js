/* ============================================
   AUTORAS Y LATINAS — animations.js
   Pantalla de intro, menú hamburguesa y
   animaciones de entrada por scroll
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- PANTALLA DE INTRO (splash screen) ---
  const intro = document.getElementById('intro');
  if (intro) {
    // La intro dura ~4s (duración del video de Canva) + 500ms de fade out
    setTimeout(() => {
      intro.classList.add('saliendo');
      // Cuando termina la animación de salida, ocultar del DOM
      intro.addEventListener('animationend', () => {
        intro.style.display = 'none';
        intro.setAttribute('aria-hidden', 'true');
        // Lanzar animaciones de entrada del contenido principal
        iniciarAnimacionesEntrada();
      }, { once: true });
    }, 4500);
  } else {
    // Si no hay intro (páginas internas), animar de todas formas
    iniciarAnimacionesEntrada();
  }

  // --- MENÚ HAMBURGUESA (mobile) ---
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
  // Observar todos los elementos con clase .animar y .animar-solo
  const elementosAnimables = document.querySelectorAll('.animar, .animar-solo');
  if (!elementosAnimables.length) return;

  // Usar IntersectionObserver para activar animaciones al entrar en viewport
  const observador = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Dejar de observar una vez que ya animó
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
