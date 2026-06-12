/* ============================================
   AUTORAS Y LATINAS — categoria-page.js
   Carga los libros de una categoría específica
   desde books.json y los renderiza en la página.
   La variable CATEGORIA se define en cada HTML.
   ============================================ */

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const respuesta = await fetch('../books.json');
    const todosLosLibros = await respuesta.json();

    const librosDeLaCategoria = todosLosLibros.filter(
      libro => libro.categoria === CATEGORIA
    );

    const contenedor = document.getElementById('cat-libros-lista');

    if (!contenedor) return;

    if (librosDeLaCategoria.length === 0) {
      contenedor.innerHTML = '<p>No hay libros en esta categoría todavía.</p>';
      return;
    }

    librosDeLaCategoria.forEach(libro => {
      const tarjeta = crearTarjeta(libro);
      contenedor.appendChild(tarjeta);
    });

    if (typeof iniciarAnimacionesEntrada === 'function') {
      iniciarAnimacionesEntrada();
    }

  } catch (error) {
    console.error('Error cargando books.json:', error);
  }
});

function crearTarjeta(libro) {
  const article = document.createElement('article');
  article.className = 'cat-libro-card animar';

  article.innerHTML = `
    <a href="../libros/${libro.id}.html" class="cat-libro-card__link" aria-label="Ver ficha de ${libro.titulo} de ${libro.autora}">
      <div class="cat-libro-card__portada-wrap">
        <img
          class="cat-libro-card__portada"
          src="../${libro.portada}"
          alt="Portada de ${libro.titulo} de ${libro.autora}"
          loading="lazy"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        />
        <div class="cat-libro-card__portada-placeholder" style="display:none;" aria-hidden="true">
          <span>Sin portada</span>
        </div>
      </div>
      <div class="cat-libro-card__body">
        <h3 class="cat-libro-card__titulo">${libro.titulo}</h3>
        <p class="cat-libro-card__autora">${libro.autora}</p>
        <p class="cat-libro-card__meta">${libro.pais} · ${libro.anio}</p>
      </div>
    </a>
  `;

  return article;
}
