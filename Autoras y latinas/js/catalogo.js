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

// Referencia al botón de categoría activo (para restaurar el foco al cerrar el panel)
let botonCategoriaActivo = null;

// --- Mapeo de slugs de URL a nombres de categoría ---
const CATEGORIAS_URL = {
  'cuido':          'Cuido y cuido, ¿quién me cuida a mí?',
  'arrancaron':     'Me arrancaron algo que era mío',
  'tierra':         'La tierra que habito',
  'desaparecieron': 'Desaparecieron y se fueron',
  'tranquilidad':   'Me dio tranquilidad'
};

// --- Colores del borde izquierdo del panel por categoría ---
const COLORES_CATEGORIA = {
  'Cuido y cuido, ¿quién me cuida a mí?': '#e1549d',
  'Me arrancaron algo que era mío':        '#4a539d',
  'La tierra que habito':                  '#7c3a60',
  'Desaparecieron y se fueron':            '#e89b21',
  'Me dio tranquilidad':                   '#8fc9c3'
};

// --- Textos de descripción por categoría ---
const DESCRIPCIONES_CATEGORIAS = {
  'Cuido y cuido, ¿quién me cuida a mí?': {
    titulo: 'Cuido y cuido, ¿quién me cuida a mí?',
    texto: 'El sistema económico en el que vivimos funciona extrayendo trabajo de cuidado sin reconocerlo ni remunerarlo. Alguien sostiene la vida mientras el mercado avanza. Estos libros hablan de ese trabajo invisible — el embarazo, los vínculos que agotan, la tensión de ser persona y ser para otros. Son textos que nombran lo que se da por descontado.'
  },
  'Me arrancaron algo que era mío': {
    titulo: 'Me arrancaron algo que era mío',
    texto: 'El capitalismo racial no solo explota: desposee. Arranca cuerpos de sus territorios, espiritualidades de sus linajes, identidades de sus genealogías. Estos libros hablan del despojo que no se cotiza en ningún mercado — el que borra lo que éramos para que seamos funcionales a lo que el sistema necesita.'
  },
  'La tierra que habito': {
    titulo: 'La tierra que habito',
    texto: 'Las crisis ecológicas no caen del cielo. Son el resultado de siglos de extracción, de tratar la naturaleza como fondo infinito de recursos. Estos libros piensan desde los cuerpos y los territorios — las ciudades enfermas, los suelos que ya no responden, las formas de vida que persisten a pesar de todo.'
  },
  'Desaparecieron y se fueron': {
    titulo: 'Desaparecieron y se fueron',
    texto: 'Cuando el Estado se pone al servicio de la acumulación y la represión, produce desaparición: física, política, simbólica. Estas historias son sobre los que tuvieron que irse, sobre lo que quedó atrás y sobre lo que no se puede nombrar todavía.'
  },
  'Me dio tranquilidad': {
    titulo: 'Me dio tranquilidad',
    texto: 'En una sociedad que expropió el tiempo contemplativo y convirtió la atención en mercancía, leer despacio es un acto político. Estos libros no resuelven nada — crean una pausa. Un espacio de atención lenta que el sistema no puede colonizar del todo.'
  }
};

// --- Inicialización ---

document.addEventListener('DOMContentLoaded', async () => {
  await cargarLibros();
  generarFiltros();
  leerParametrosURL();
  renderizarCatalogo();
  asignarEventoLimpiar();
  asignarEventoSelectPais();
  asignarEventoCerrarPanel();
});

function leerParametrosURL() {
  const params = new URLSearchParams(window.location.search);
  const categoriaSlug = params.get('categoria');

  if (categoriaSlug && CATEGORIAS_URL[categoriaSlug]) {
    const nombreCategoria = CATEGORIAS_URL[categoriaSlug];
    filtroActivo.categoria = nombreCategoria;

    const botones = document.querySelectorAll('.filtro-btn[data-tipo="categoria"]');
    botones.forEach(btn => {
      if (btn.dataset.valor === nombreCategoria) {
        btn.classList.add('activo');
        btn.setAttribute('aria-pressed', 'true');
      }
    });

    actualizarBotonLimpiar();
  }
}

async function cargarLibros() {
  try {
    const respuesta = await fetch('./books.json');
    todosLosLibros = await respuesta.json();
  } catch (error) {
    console.error('Error cargando books.json:', error);
    document.getElementById('catalogo-lista').innerHTML = `
      <p class="catalogo-vacio">No se pudo cargar el catálogo. Intentá de nuevo.</p>
    `;
  }
}

function generarFiltros() {
  // Las 5 categorías en orden de aparición en el catálogo
  const categoriasOrden = [
    'Cuido y cuido, ¿quién me cuida a mí?',
    'Me arrancaron algo que era mío',
    'La tierra que habito',
    'Desaparecieron y se fueron',
    'Me dio tranquilidad'
  ];

  const contenedorCategoria = document.getElementById('filtros-categoria');

  categoriasOrden.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filtro-btn';
    btn.textContent = cat;
    btn.dataset.tipo = 'categoria';
    btn.dataset.valor = cat;
    btn.setAttribute('aria-pressed', 'false');
    btn.addEventListener('click', () => toggleCategoria(cat, btn));
    contenedorCategoria.appendChild(btn);
  });
}

// --- Select de países ---

function asignarEventoSelectPais() {
  const select = document.getElementById('select-pais');
  select.addEventListener('change', (e) => {
    filtroActivo.pais = e.target.value || null;
    actualizarBotonLimpiar();
    renderizarCatalogo();
  });
}

// --- Toggle de filtro de categoría ---

function toggleCategoria(valor, btnClickeado) {
  const yaActivo = filtroActivo.categoria === valor;
  const panel = document.getElementById('panel-categoria');

  if (yaActivo) {
    // Si ya estaba activo: desactivar y cerrar panel
    filtroActivo.categoria = null;
    btnClickeado.classList.remove('activo');
    btnClickeado.setAttribute('aria-pressed', 'false');
    cerrarPanel();
  } else {
    // Desactivar cualquier otro botón activo
    document.querySelectorAll('.filtro-btn[data-tipo="categoria"]').forEach(btn => {
      btn.classList.remove('activo');
      btn.setAttribute('aria-pressed', 'false');
    });

    // Activar el nuevo
    filtroActivo.categoria = valor;
    btnClickeado.classList.add('activo');
    btnClickeado.setAttribute('aria-pressed', 'true');
    botonCategoriaActivo = btnClickeado;

    // Mostrar descripción en el panel
    abrirPanel(valor);
  }

  actualizarBotonLimpiar();
  renderizarCatalogo();
}

// --- Panel de descripción de categoría ---

function abrirPanel(nombreCategoria) {
  const panel = document.getElementById('panel-categoria');
  const titulo = document.getElementById('panel-cat-titulo');
  const texto = document.getElementById('panel-cat-texto');
  const desc = DESCRIPCIONES_CATEGORIAS[nombreCategoria];

  if (!desc) return;

  // Actualizar contenido
  titulo.textContent = desc.titulo;
  texto.textContent = desc.texto;

  // Color del borde izquierdo según la categoría
  const color = COLORES_CATEGORIA[nombreCategoria] || '#e1549d';
  panel.style.borderLeftColor = color;

  // Mostrar con animación (re-trigger forzando reflow)
  panel.hidden = false;
  panel.style.animation = 'none';
  panel.offsetHeight; // fuerza reflow
  panel.style.animation = '';

  // Mover el foco al panel para accesibilidad
  panel.focus();
}

function cerrarPanel() {
  const panel = document.getElementById('panel-categoria');
  panel.hidden = true;

  // Devolver foco al botón que abrió el panel
  if (botonCategoriaActivo) {
    botonCategoriaActivo.focus();
    botonCategoriaActivo = null;
  }
}

function asignarEventoCerrarPanel() {
  document.getElementById('cerrar-panel').addEventListener('click', () => {
    // Cerrar panel y desactivar filtro de categoría
    filtroActivo.categoria = null;
    document.querySelectorAll('.filtro-btn[data-tipo="categoria"]').forEach(btn => {
      btn.classList.remove('activo');
      btn.setAttribute('aria-pressed', 'false');
    });
    actualizarBotonLimpiar();
    renderizarCatalogo();
    cerrarPanel();
  });

  // Cerrar al hacer clic fuera del panel
  document.addEventListener('click', (e) => {
    const panel = document.getElementById('panel-categoria');
    const estaEnPanel = panel.contains(e.target);
    const esBotoCategoria = e.target.closest('.filtro-btn[data-tipo="categoria"]');
    if (!panel.hidden && !estaEnPanel && !esBotoCategoria) {
      cerrarPanel();
    }
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const panel = document.getElementById('panel-categoria');
      if (!panel.hidden) cerrarPanel();
    }
  });
}

function actualizarBotonLimpiar() {
  const btnLimpiar = document.getElementById('limpiar-filtros');
  const hayFiltros = filtroActivo.pais || filtroActivo.categoria;
  btnLimpiar.hidden = !hayFiltros;
}

function asignarEventoLimpiar() {
  document.getElementById('limpiar-filtros').addEventListener('click', () => {
    filtroActivo.pais = null;
    filtroActivo.categoria = null;

    // Resetear select
    document.getElementById('select-pais').value = '';

    // Resetear botones de categoría
    document.querySelectorAll('.filtro-btn').forEach(btn => {
      btn.classList.remove('activo');
      btn.setAttribute('aria-pressed', 'false');
    });

    cerrarPanel();
    actualizarBotonLimpiar();
    renderizarCatalogo();
  });
}

function filtrarLibros() {
  return todosLosLibros.filter(libro => {
    const coincidePais = !filtroActivo.pais || libro.pais === filtroActivo.pais;
    const coincideCategoria = !filtroActivo.categoria || libro.categoria === filtroActivo.categoria;
    return coincidePais && coincideCategoria;
  });
}

function renderizarCatalogo() {
  const lista = document.getElementById('catalogo-lista');
  const contador = document.getElementById('catalogo-contador');
  const librosFiltrados = filtrarLibros();

  const total = todosLosLibros.length;
  contador.textContent = librosFiltrados.length === total
    ? `${total} libros`
    : `${librosFiltrados.length} de ${total} libros`;

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

  librosFiltrados.forEach((libro, i) => {
    const tarjeta = crearTarjeta(libro, i);
    lista.appendChild(tarjeta);
  });

  if (typeof iniciarAnimacionesEntrada === 'function') {
    iniciarAnimacionesEntrada();
  }
}

// --- Crear una tarjeta de libro (layout horizontal) ---

function crearTarjeta(libro, indice) {
  const articulo = document.createElement('article');
  articulo.className = 'libro-card-h animar';
  articulo.setAttribute('role', 'listitem');

  const extracto = extraerExtracto(libro.sinopsis);

  // La etiqueta lleva data-categoria para que el CSS aplique el color correcto
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
        <span class="tag" data-categoria="${libro.categoria}">${libro.categoria}</span>
        <h2 class="libro-card-h__titulo">${libro.titulo}</h2>
        <p class="libro-card-h__autora">${libro.autora}</p>
        <p class="libro-card-h__meta">${libro.pais} · ${libro.anio}</p>
        <p class="libro-card-h__extracto">${extracto}</p>
      </div>
    </a>
  `;

  return articulo;
}

// --- Extraer las primeras ~120 caracteres de la sinopsis ---

function extraerExtracto(texto) {
  if (!texto) return '';
  if (texto.length <= 120) return texto;
  const corte = texto.lastIndexOf(' ', 120);
  return texto.substring(0, corte) + '…';
}
