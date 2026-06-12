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
    texto: 'Mi abuela me cuidaba todas las tardes, cuando mamá iba a trabajar. Mamá se apuraba a llegar para tener tiempo con nosotras, al mismo tiempo que ordenaba la casa, organizaba la cena y preparaba todo lo que tenía que estar listo para el día siguiente. No llegaba, siempre había una especie de desorden en una punta de la mesa, donde se acumulaban algunas cosas del día. Pero si ella nos cuidaba a nosotras, a mi hermana y a mi, ¿quién la cuidaba a ella?\n\nSu tarea de cuidado representaba algo clave en el capitalismo: sostener un trabajo de crianza y sostén para que en el futuro nosotras seamos la fuerza de trabajo. No tuvo una remuneración, ni tampoco se le reconoció. El sistema capitalista tan solo supone que ella iba a poner su cuerpo para absorber aquel trabajo, acumulándose con su propio trabajo como docente. Fraser define la reproducción social como todas aquellas formas de cuidado, provisión e interacción que producen y mantienen a los seres humanos. Esta actividad es absolutamente necesaria para la existencia del trabajo asalariado y el funcionamiento del propio sistema capitalista que, percibe el cuerpo de las mujeres como una fábrica, que reproduce mano de obra.\n\nEn este contexto, me parece fundamental encontrar voces que la lectora pueda identificarse, poner palabras a aquello que el patriarcado le exigió que deje oculto en la esfera privada del hogar: un embarazo no deseado como expone Guadalupe Nettel en el cuento "Felina" de su libro El matrimonio de los peces rojos, cuando Alia Trabucco Zerán expone la desigualdad dentro de la burguesía chilena en Limpia, o las capas de la novela desgarradora que escribió Lorena Salazar bajo el nombre Está herida llena de peces. Estas autoras dialogan con el acto del cuidado, encontrandose en un contexto vulnerable donde se pone sobre la mesa una conversación necesaria para ponerle nombre a algo que nos impusieron sin preguntarnos.'
  },
  'Me arrancaron algo que era mío': {
    titulo: 'Me arrancaron algo que era mío',
    texto: '"¿Bajar la voz? ¿Por qué tendría que hacerlo? Si uno murmura es porque teme o porque se avergüenza, pero yo no temo"\nLas Voladoras, Mónica Ojeda\n\nCuando estaba cursando Antropología en la carrera, sentía una fascinación por un texto de Brenda Canelo en donde ella analizaba como migrantes andinos llevan sus prácticas fúnebres al Cementerio de Flores y el Estado las marca como "inapropiadas". Entonces le conté a una persona cercana sobre lo que había leído y esta persona condenó estas prácticas, porque no eran prácticas católicas, como debían ser según nuestra constitución. Lo que Nancy Fraser teoriza como estructura, Canelo lo registra etnográficamente en un cementerio del suroeste porteño: el Estado no le arranca a los migrantes bolivianos sus prácticas espirituales en un acto único y violento, sino que les niega sistemáticamente legitimidad espacial, que es otra forma de decir que les niega el derecho a existir públicamente con lo que son.\n\nLas mujeres y su sexualidad, aparecen como una expropiación representada en lo que quiere un varón, analiza Verónica Boix, y menciona una docena de obras que dialogan con la cultura colonizadora de historias latinoamericanas, como el andino gótico de Monica Ojeda, para visibilizar la fuerza de otro mundo posible. Leer novelas como La hora de la estrella de Clarice Lispector nos da la oportunidad de indagar en la vulnerabilidad de cada narración, en lo que es propio pero es ajeno a lo que una siente. Aquellas historias que muestran cómo el cuerpo es expropiado mediante la pobreza, como también es el caso de La mucama de Omicunle, son tres autoras que intervienen en debates culturales actuales para poder liberarse como respuesta al despojo.'
  },
  'La tierra que habito': {
    titulo: 'La tierra que habito',
    texto: 'Me quejo, me quejo de que la caldera se rompe y no funciona. Sale el agua, tan fría como un hielo, la misma que tomo, ya que no compro agua embotellada. El agua mineral no me gusta, me gusta más el sabor al agua de la canilla. A veces dejo el agua corriendo ya caliente, porque tardo en entrar a la ducha. Me digo que no compro agua, pero sí que lo estoy haciendo, cuando pago la factura de la empresa proveedora del servicio. Consumo agua potable que gracias al gas puedo calentarla y tratarla como un recurso gratuito e ilimitado.\n\nPara Fraser, la crisis ecológica no es separable de la crisis de los cuidados ni de la crisis racial. Las tres son crisis de las mismas condiciones de fondo que el capital devora sin reponer. Hay un patrón: las poblaciones despojadas de poder político son también las más expuestas al daño ambiental.\n\nEn 2014, Fernanda Trías tuvo una idea: escribir una novela de una distopía que sucedía en Montevideo, Uruguay. Una epidemia que saturaba los hospitales. Su publicación fue programada para 2020, sin saber que iba a coincidir con una pandemia. Explora una crisis alimentaria desde la representación a través de la escritura, mostrando la interdependencia con el planeta, ejemplificando el concepto de ecocrítica, que surge en los años 90. No es terror, Samanta Schweblin utiliza el terror para examinar la violencia lenta de la contaminación agroquímica. Mediante cada cuento de Ustedes brillan en lo oscuro, Liliana Colanzi también utiliza el terror, pero no muestra el daño sobre los cuerpos, sino sobre el territorio mismo.\n\nLa literatura latinoamericana escrita por mujeres no solo denuncia la crisis ecológica: inventa formas de percepción para algo que el lenguaje ordinario no puede capturar. Desconocemos si mañana aquello se va a volver realidad, pero existe y no debe ser devorado.'
  },
  'Desaparecieron y se fueron': {
    titulo: 'Desaparecieron y se fueron',
    texto: 'Al principio se iba a llamar "El Estado no me protege, me persigue". Sonaba fuerte, causaba impacto pero no sobre lo que quería transmitir, sino en la desarmonía frente a las demás categorías. Quizás esta categoría es la que más me interpela dentro de mi trabajo y de la que surge todo. Arianna de Souza-García habla en Atrás queda la tierra de la escritura como memoria y no puedo evitar pensar en aquella mañana de marzo, en donde me dí cuenta que no estaban las mismas voces luego de 50 años para contarlo, y que las que quedaban tampoco estarían para siempre. Sentí que no había leído suficiente de lo que pasó entre la década de los 70 y los 80 en nuestro país. Sentí que no había leído suficientes voces, aunque cada vez que me sumerjo en los libros es como escuchar las voces en mi cabeza, en voz alta.\n\nExtraño el primer nombre de esta categoría, porque sonaba más directo: el Estado es una condición de fondo sin la cual el capitalismo no puede operar, según Fraser. Pero es contradictorio porque aquel Capital es el mismo que lo erosiona, lo privatiza y lo vacía de su capacidad de responder ante los ciudadanos. En Latinoamérica, particularmente, estas formas concretas son las dictaduras, exilios forzados, desapariciones, estados fallidos y autoritarismos. Esta categoría narra no solo la pérdida de un lugar físico, sino la ruptura del contrato entre el poder público y las personas que debía proteger. El Estado no falla accidentalmente, produce la condición de quien no puede quedarse. Desaparecieron y se fueron porque el poder político colapsó, se volvió represivo o simplemente abandonó a quienes no le resultan útiles al Capital.\n\nAtusparia habla de cómo las instituciones quieren mantener el orden social tradicional sin responder ante las demandas de las comunidades marginadas. Todos se van habla de cómo el Estado decide el destino y la libertad de movimiento de las personas. Atrás queda la tierra expone como una crisis sistémica obliga a las familias a huir para sobrevivir. Necesitamos conocer la memoria de nuestros paises vecinos, porque la trama política, el despojo y la violencia de Estado en Latinoamérica no son eventos aislados, sino un engranaje que opera bajo las mismas lógicas. Y retomando a Arianna: la escritura no es solo un registro, es un acto de supervivencia colectiva.'
  },
  'Me dio tranquilidad': {
    titulo: 'Me dio tranquilidad',
    texto: 'La escritura latinoamericana no escapa del mundo que Nancy Fraser describe, sino que repone algo que este sistema destruye: el tiempo propio, la atención lenta, el espacio íntimo. Esto no es una huída del análisis, es la condición de posibilidad para seguir habitando el mundo, la puerta de entrada para las mujeres que leen lo que les presentan las grandes editoriales, pero que necesitan leer algo que dialogue con lo que viven.\n\nCuando surgió la idea de un "buscador de lecturas" con categorías, la primera pregunta fue "¿Por qué categorías?" y esta es la lógica de dicha decisión: que podamos encontrar lecturas que no se sientan pesadas, sino que sean un acompañamiento de lo que vivimos fuera de un libro.\n\nSin embargo, Bourdieu advierte que el campo intelectual es producto de un proceso histórico y que no puede disociarse de las condiciones históricas y sociales de su entorno. Es por ello que el hecho de que una obra literaria no sea un manifiesto político ni denuncie explícitamente las crisis del sistema no significa que esté aislada, sino que es una respuesta directa a las condiciones históricas de nuestro entorno. Frente a un sistema capitalista que exige hiperproductividad, velocidad y que expropia el tiempo, estas obras dialogan con su época ofreciendo el antídoto: la lentitud, el refugio y el detenimiento.\n\nMe dio tranquilidad porque no escapan de la realidad, sino que construyen un territorio seguro dentro de ella, devolviendo a cada lectora el tiempo propio, la atención lenta y el espacio íntimo.'
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

// --- Mapeo de categoría a URL de página propia ---
const URLS_CATEGORIAS = {
  'Cuido y cuido, ¿quién me cuida a mí?': 'categorias/cuido.html',
  'Me arrancaron algo que era mío':        'categorias/arrancaron.html',
  'La tierra que habito':                  'categorias/tierra.html',
  'Desaparecieron y se fueron':            'categorias/desaparecieron.html',
  'Me dio tranquilidad':                   'categorias/tranquilidad.html'
};

// --- Clic en botón de categoría: navega a la página de esa categoría ---

function toggleCategoria(valor, btnClickeado) {
  const url = URLS_CATEGORIAS[valor];
  if (url) {
    window.location.href = url;
  }
}

// --- Panel de descripción de categoría ---

function abrirPanel(nombreCategoria) {
  const panel = document.getElementById('panel-categoria');
  const titulo = document.getElementById('panel-cat-titulo');
  const texto = document.getElementById('panel-cat-texto');
  const desc = DESCRIPCIONES_CATEGORIAS[nombreCategoria];

  if (!desc) return;

  // Actualizar contenido — convertir \n\n en párrafos HTML
  titulo.textContent = desc.titulo;
  texto.innerHTML = desc.texto
    .split('\n\n')
    .map(parrafo => `<p>${parrafo.replace(/\n/g, '<br>')}</p>`)
    .join('');

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
