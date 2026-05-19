/* ============================================
   AUTORAS Y LATINAS — catalogo.js
   Carga el catálogo desde books.json,
   genera los filtros y renderiza las tarjetas
   ============================================ */

// --- Estado de los filtros activos ---
let filtroActivo = {
  pais: null,
  categoria: null
};

let todosLosLibros = [];

// --- Inicialización ---

document.addEventListener('DOMContentLoaded', async () => {
  await cargarLibros();
  generarFiltros();
  renderizarCatalogo();
  asignarEventoLimpiar();
});

// --- Cargar books.json ---

async function cargarLibros() {
  try {
    const respuesta = await fetch('books.json');
    todosLosLibros = await respuesta.json();
  } catch (error) {
    console.error('Error cargando books.json:', error);
    document.getElementById('catalogo-lista').innerHTML = `
      <p class="catalogo-vacio">No se pudo cargar el catálogo. Intentá de nuevo.</p>
    `;
  }
}

// --- Generar botones de filtro dinámicamente desde los datos ---

function generarFiltros() {
  // Obtener países únicos y ordenarlos alfabéticamente
  const paises = [...new Set(todosLosLibros.map(l => l.pais))].sort();

  // Obtener categorías únicas (mantener el orden definido en los datos)
  const categoriasOrden = [
    'Cuido y cuido, ¿quién me cuida a mí?',
    'Me arrancaron algo que era mío',
    'La tierra que habito',
    'Desaparecieron y se fueron'
  ];

  // Contenedores
  const contenedorPais = document.getElementById('filtros-pais');
  const contenedorCategoria = document.getElementById('filtros-categoria');

  // Generar botones de país
  paises.forEach(pais => {
    const btn = document.createElement('button');
    btn.className = 'filtro-btn';
    btn.textContent = pais;
    btn.dataset.tipo = 'pais';
    btn.dataset.valor = pais;
    btn.setAttribute('aria-pressed', 'false');
    btn.addEventListener('click', () => toggleFiltro('pais', pais, btn));
    contenedorPais.appendChild(btn);
  });

  // Generar botones de categoría
  categoriasOrden.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filtro-btn';
    btn.textContent = cat;
    btn.dataset.tipo = 'categoria';
    btn.dataset.valor = cat;
    btn.setAttribute('aria-pressed', 'false');
    btn.addEventListener('click', () => toggleFiltro('categoria', cat, btn));
    contenedorCategoria.appendChild(btn);
  });
}

// --- Toggle de un filtro ---

function toggleFiltro(tipo, valor, btnClickeado) {
  const yaActivo = filtroActivo[tipo] === valor;

  // Si el filtro ya estaba activo, lo apagamos (toggle)
  if (yaActivo) {
    filtroActivo[tipo] = null;
    btnClickeado.classList.remove('activo');
    btnClickeado.setAttribute('aria-pressed', 'false');
  } else {
    // Desactivar el botón anterior del mismo tipo
    const botonesDelTipo = document.querySelectorAll(`.filtro-btn[data-tipo="${tipo}"]`);
    botonesDelTipo.forEach(btn => {
      btn.classList.remove('activo');
      btn.setAttribute('aria-pressed', 'false');
    });

    // Activar el nuevo
    filtroActivo[tipo] = valor;
    btnClickeado.classList.add('activo');
    btnClickeado.setAttribute('aria-pressed', 'true');
  }

  // Mostrar u ocultar botón limpiar
  actualizarBotonLimpiar();

  // Re-renderizar
  renderizarCatalogo();
}

// --- Mostrar/ocultar el botón "Limpiar filtros" ---

function actualizarBotonLimpiar() {
  const btnLimpiar = document.getElementById('limpiar-filtros');
  const hayFiltros = filtroActivo.pais || filtroActivo.categoria;
  btnLimpiar.hidden = !hayFiltros;
}

// --- Asignar evento al botón limpiar ---

function asignarEventoLimpiar() {
  document.getElementById('limpiar-filtros').addEventListener('click', () => {
    filtroActivo.pais = null;
    filtroActivo.categoria = null;

    // Desactivar todos los botones
    document.querySelectorAll('.filtro-btn').forEach(btn => {
      btn.classList.remove('activo');
      btn.setAttribute('aria-pressed', 'false');
    });

    actualizarBotonLimpiar();
    renderizarCatalogo();
  });
}

// --- Filtrar libros según el estado activo ---

function filtrarLibros() {
  return todosLosLibros.filter(libro => {
    const coincidePais = !filtroActivo.pais || libro.pais === filtroActivo.pais;
    const coincideCategoria = !filtroActivo.categoria || libro.categoria === filtroActivo.categoria;
    return coincidePais && coincideCategoria;
  });
}

// --- Renderizar la grilla de tarjetas ---

function renderizarCatalogo() {
  const lista = document.getElementById('catalogo-lista');
  const contador = document.getElementById('catalogo-contador');
  const librosFiltrados = filtrarLibros();

  // Actualizar contador
  contador.textContent = librosFiltrados.length === 12
    ? '12 libros'
    : `${librosFiltrados.length} de 12 libros`;

  // Limpiar lista
  lista.innerHTML = '';

  if (librosFiltrados.length === 0) {
    lista.innerHTML = `
      <div class="catalogo-vacio" role="listitem">
        <p>No hay libros con esa combinación de filtros.</p>
        <button class="btn btn-secondary" onclick="document.getElementById('limpiar-filtros').click()">
          Limpiar filtros
        </button>
      </div>
    `;
    return;
  }

  // Crear tarjetas
  librosFiltrados.forEach((libro, i) => {
    const tarjeta = crearTarjeta(libro, i);
    lista.appendChild(tarjeta);
  });
}

// --- Crear una tarjeta de libro (layout horizontal) ---

function crearTarjeta(libro, indice) {
  const articulo = document.createElement('article');
  articulo.className = 'libro-card-h animar';
  articulo.setAttribute('role', 'listitem');

  // Extraer las primeras dos frases del texto curatorial para el extracto
  const extracto = extraerExtracto(libro.texto_curatorial);

  articulo.innerHTML = `
    <a href="libros/${libro.id}.html" class="libro-card-h__link" aria-label="Ver ficha de ${libro.titulo} de ${libro.autora}">
      <div class="libro-card-h__portada-wrap">
        <img
          class="libro-card-h__portada"
          src="${libro.portada}"
          alt="Portada de ${libro.titulo} de ${libro.autora}"
          loading="lazy"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        />
        <div class="libro-card-h__portada-placeholder" style="display:none;" aria-hidden="true">
          <span>Sin portada</span>
        </div>
      </div>
      <div class="libro-card-h__body">
        <span class="tag">${libro.categoria}</span>
        <h2 class="libro-card-h__titulo">${libro.titulo}</h2>
        <p class="libro-card-h__autora">${libro.autora}</p>
        <p class="libro-card-h__meta">${libro.pais} · ${libro.anio}</p>
        <p class="libro-card-h__extracto">${extracto}</p>
      </div>
    </a>
  `;

  return articulo;
}

// --- Extraer las primeras ~120 caracteres del texto curatorial ---

function extraerExtracto(texto) {
  if (!texto) return '';
  if (texto.length <= 120) return texto;
  // Cortar en el espacio más cercano a los 120 caracteres
  const corte = texto.lastIndexOf(' ', 120);
  return texto.substring(0, corte) + '…';
}
