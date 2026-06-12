/* ============================================
   AUTORAS Y LATINAS — cuestionario.js
   Árbol de decisión del cuestionario de descubrimiento

   Flujo:
   Pregunta 1 (5 opciones: A/B/C/D/E)
     → cada rama tiene su Pregunta 2 (3 opciones)
       → cada opción desemboca en 1 libro

   Versión: 2.0 (Junio 2026)
   Fuente de verdad: CUESTIONARIO.md + Libros_autoras_y_latinas.xlsx
   ============================================ */


// ─── Árbol de decisión ────────────────────────────────────────────────────────
//
// Cada clave del objeto PREGUNTAS corresponde a una de las 5 ramas posibles
// (A, B, C, D, E) que se activa según la elección en la Pregunta 1.
//
// Cada rama define:
//   texto   → el enunciado de la Pregunta 2 para esa rama
//   opciones → array de 3 objetos { texto, libro }
//              donde `libro` es el slug del libro resultado (coincide con
//              el campo `id` en books.json y con la URL libros/[slug].html)

const PREGUNTAS = {

  // ── Rama A — CUIDO Y CUIDO, ¿QUIÉN ME CUIDA A MÍ? ──────────────────────────
  // Se activa cuando la lectora llega desde un momento de cuidado:
  // de otros, de sí misma, o de ambos al mismo tiempo.
  A: {
    texto: '¿Qué aspecto del cuidado te interpela más?',
    opciones: [
      {
        // Sostener sin red → Limpia (Alia Trabucco Zerán, Chile, 2022)
        // La empleada doméstica que cuida a toda una familia sin que nadie la cuide a ella.
        texto: 'Sostener a otros sin que nadie te sostenga a vos',
        libro: 'limpia'
      },
      {
        // Vínculos ambivalentes → El matrimonio de los peces rojos (Guadalupe Nettel, México, 2013)
        // Cinco cuentos sobre el desgaste y la necesidad de los lazos íntimos.
        texto: 'Los vínculos que agotan tanto como alimentan',
        libro: 'el-matrimonio-de-los-peces-rojos'
      },
      {
        // Cuerpo puesto sin pedido → Esta herida llena de peces (Lorena Salazar Meza, Colombia, 2021)
        // Una madre que pone el cuerpo en un viaje que no eligió del todo.
        texto: 'Poner el cuerpo por otros sin que te lo hayan pedido',
        libro: 'esta-herida-llena-de-peces'
      }
    ]
  },

  // ── Rama B — ME ARRANCARON ALGO QUE ERA MÍO ─────────────────────────────────
  // Se activa cuando la lectora siente que algo propio fue quitado,
  // ignorado o borrado: identidad, cuerpo, historia, nombre.
  B: {
    texto: '¿Qué tipo de despojo sentís más cercano?',
    opciones: [
      {
        // Pobreza que invisibiliza → La hora de la estrella (Clarice Lispector, Brasil, 1977)
        // Macabea, la chica del nordeste que la miseria hace invisible en la ciudad.
        texto: 'Que la pobreza te borre, te haga invisible',
        libro: 'la-hora-de-la-estrella'
      },
      {
        // Espiritualidad e identidad arrancadas → La mucama de Omicunlé (Rita Indiana, R. Dominicana, 2015)
        // La herencia afroantillana, la religiosidad caribeña y lo que se niega o roba.
        texto: 'Que te arranquen la espiritualidad y la identidad que heredaste',
        libro: 'la-mucama-de-omicunle'
      },
      {
        // Nombrada desde el miedo → Las voladoras (Mónica Ojeda, Ecuador, 2020)
        // El terror como forma de nombrar y borrar a las mujeres en los Andes.
        texto: 'Que te nombren desde el miedo y eso te quite algo que era tuyo',
        libro: 'las-voladoras'
      }
    ]
  },

  // ── Rama C — LA TIERRA QUE HABITO ───────────────────────────────────────────
  // Se activa cuando la lectora llega preocupada por el mundo:
  // el ambiente, el territorio, el futuro colectivo.
  C: {
    texto: '¿Qué relación con el mundo te moviliza?',
    opciones: [
      {
        // Colapso urbano y cuerpos enfermos → Mugre rosa (Fernanda Trías, Uruguay, 2020)
        // Una ciudad portuaria devastada por una plaga; el cuerpo como territorio contaminado.
        texto: 'Las ciudades enfermas, los cuerpos contaminados, el colapso urbano',
        libro: 'mugre-rosa'
      },
      {
        // Agrotóxicos y violencia silenciosa → Distancia de rescate (Samanta Schweblin, Argentina, 2014)
        // Los campos envenenados del interior argentino y el daño que no se ve hasta que es tarde.
        texto: 'Los campos envenenados, la violencia silenciosa del agro',
        libro: 'distancia-de-rescate'
      },
      {
        // Territorio, tiempo geológico y memoria → Ustedes brillan en lo oscuro (Liliana Colanzi, Bolivia, 2022)
        // La tierra como cuerpo que absorbe la radiación, el extractivismo y la historia.
        texto: 'El daño sobre el territorio mismo, lo que la tierra absorbe y no olvida',
        libro: 'ustedes-brillan-en-lo-oscuro'
      }
    ]
  },

  // ── Rama D — DESAPARECIERON Y SE FUERON ─────────────────────────────────────
  // Se activa cuando la lectora carga con algo del pasado:
  // personal, familiar o colectivo. Memoria, exilio, pérdida.
  D: {
    texto: '¿Qué forma tiene esa carga que llevás?',
    opciones: [
      {
        // Exilio y país perdido → Atrás queda la tierra (Arianna de Sousa-García, Venezuela, 2024)
        // Una madre venezolana en Chile le cuenta a su hijo la catástrofe de su nación.
        texto: 'El exilio, lo que quedó atrás, el país que se fue',
        libro: 'atras-queda-la-tierra'
      },
      {
        // Instituciones que aplastan → Atusparia (Gabriela Wiener, Perú, 2024)
        // Una líder política víctima del lawfare; el Estado como enemigo histórico.
        texto: 'Las instituciones que prometieron protegerte y en cambio te aplastaron',
        libro: 'atusparia'
      },
      {
        // Irse para sobrevivir → Todos se van (Wendy Guerra, Cuba, 2006)
        // Crecer en Cuba viendo cómo todos los que amás se van, y lo que eso quiebra.
        texto: 'Irse para sobrevivir, lo que se pierde al salir',
        libro: 'todos-se-van'
      }
    ]
  },

  // ── Rama E — ME DIO TRANQUILIDAD ────────────────────────────────────────────
  // NUEVA en v2.0. Se activa cuando la lectora necesita distancia
  // del ruido del mundo y busca algo que la aquiete o la lleve a otro lugar.
  // La pregunta "¿Quién te gustaría ser?" invita a una identificación
  // positiva con un personaje, en lugar de partir del dolor.
  E: {
    texto: '¿Quién te gustaría ser?',
    opciones: [
      {
        // La mujer que se va al campo → Tanto (Nurit Kasztelan, Argentina, 2023)
        // Helena abandona la ciudad, aprende a escuchar el campo, descansa de sí misma.
        texto: 'Una mujer que se va a vivir al campo',
        libro: 'tanto'
      },
      {
        // La maestra jubilada que habla con pájaros → Budín del Cielo (María Luque, Argentina, 2025)
        // Rosa: matemática, fanática de Sandro, amiga de sus vecinas y de los pájaros del balcón.
        texto: 'Una profesora de matemáticas jubilada que habla con los pájaros',
        libro: 'budin-del-cielo'
      },
      {
        // La escritora y su biblioteca → Bibliotecas (AA.VV., Editorial Godot, Argentina, 2023)
        // Escritoras latinoamericanas reflexionan sobre sus colecciones y lo que los libros guardan.
        texto: 'Una escritora que escribe sobre la relación con su biblioteca',
        libro: 'bibliotecas'
      }
    ]
  }

};


// ─── Estado del cuestionario ──────────────────────────────────────────────────

// Guarda la rama elegida en la Pregunta 1 (null hasta que la lectora elija)
let ramaSeleccionada = null;

// Caché de los datos de libros cargados desde books.json
let librosData = [];


// ─── Inicialización ───────────────────────────────────────────────────────────

/**
 * Punto de entrada principal.
 * Carga books.json y asigna los listeners a las opciones de la Pregunta 1.
 * Se llama cuando el DOM está listo (ver final del archivo).
 */
async function inicializar() {
  try {
    const respuesta = await fetch('books.json');
    librosData = await respuesta.json();
  } catch (error) {
    console.error('Error cargando books.json:', error);
  }

  // Asignar eventos a las 5 opciones de la Pregunta 1 (A, B, C, D, E)
  const opcionesP1 = document.querySelectorAll('#pregunta-1 .opcion');
  opcionesP1.forEach(btn => {
    btn.addEventListener('click', () => seleccionarRama(btn.dataset.rama));
  });
}


// ─── Paso 1: la lectora elige una rama en la Pregunta 1 ──────────────────────

/**
 * Registra la rama elegida, marca visualmente la opción seleccionada,
 * actualiza el progressbar y hace la transición hacia la Pregunta 2.
 *
 * @param {string} rama - Letra de la rama: 'A', 'B', 'C', 'D' o 'E'
 */
function seleccionarRama(rama) {
  ramaSeleccionada = rama;

  // Marcar visualmente la opción seleccionada y desmarcar las demás
  const opcionesP1 = document.querySelectorAll('#pregunta-1 .opcion');
  opcionesP1.forEach(btn => {
    const esEsta = btn.dataset.rama === rama;
    btn.classList.toggle('seleccionada', esEsta);
    btn.setAttribute('aria-pressed', esEsta ? 'true' : 'false');
  });

  // Actualizar indicadores de progreso
  document.getElementById('paso-1').classList.remove('activo');
  document.getElementById('paso-1').classList.add('completado');
  document.getElementById('paso-2').classList.add('activo');
  actualizarProgressbar(2);

  // Fade out Pregunta 1 → fade in Pregunta 2
  const p1 = document.getElementById('pregunta-1');
  p1.classList.add('saliendo');

  setTimeout(() => {
    p1.hidden = true;
    p1.classList.remove('saliendo');
    mostrarPregunta2(rama);
  }, 200);
}


// ─── Paso 2: mostrar la Pregunta 2 según la rama elegida ─────────────────────

/**
 * Renderiza dinámicamente la Pregunta 2 con el enunciado y las 3 opciones
 * correspondientes a la rama seleccionada. Cada opción tiene como atributo
 * data-libro el slug del libro resultado.
 *
 * @param {string} rama - Letra de la rama activa
 */
function mostrarPregunta2(rama) {
  const datos = PREGUNTAS[rama];
  const contenedor = document.getElementById('pregunta-2');

  const opcionesHTML = datos.opciones.map((opcion) => `
    <button class="opcion" data-libro="${opcion.libro}" aria-pressed="false">
      <span class="opcion__texto">${opcion.texto}</span>
    </button>
  `).join('');

  contenedor.innerHTML = `
    <p class="cuestionario__pregunta">${datos.texto}</p>
    <div class="cuestionario__opciones" role="group" aria-label="Elegí una opción">
      ${opcionesHTML}
    </div>
  `;

  contenedor.hidden = false;
  contenedor.classList.add('entrando');

  // Asignar listeners a las 3 opciones de la Pregunta 2
  const opcionesP2 = contenedor.querySelectorAll('.opcion');
  opcionesP2.forEach(btn => {
    btn.addEventListener('click', () => seleccionarLibro(btn.dataset.libro, btn));
  });

  setTimeout(() => contenedor.classList.remove('entrando'), 300);
  contenedor.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}


// ─── Paso 3: la lectora elige un libro ───────────────────────────────────────

/**
 * Marca la opción elegida, actualiza el progressbar y dispara
 * la visualización del resultado tras una breve pausa.
 *
 * @param {string} slug          - Slug del libro elegido (clave `id` en books.json)
 * @param {HTMLElement} btnSeleccionado - Botón que disparó el evento
 */
function seleccionarLibro(slug, btnSeleccionado) {
  const opciones = document.querySelectorAll('#pregunta-2 .opcion');
  opciones.forEach(btn => {
    const esEsta = btn === btnSeleccionado;
    btn.classList.toggle('seleccionada', esEsta);
    btn.setAttribute('aria-pressed', esEsta ? 'true' : 'false');
  });

  document.getElementById('paso-2').classList.remove('activo');
  document.getElementById('paso-2').classList.add('completado');
  actualizarProgressbar(3);

  setTimeout(() => mostrarResultado(slug), 400);
}


// ─── Paso 4: mostrar el resultado ────────────────────────────────────────────

/**
 * Busca el libro en el caché de librosData por su slug y
 * hace la transición de salida de la Pregunta 2 antes de renderizar.
 *
 * @param {string} slug - Slug del libro a mostrar
 */
function mostrarResultado(slug) {
  const libro = librosData.find(l => l.id === slug);
  if (!libro) {
    console.error('Libro no encontrado en books.json:', slug);
    return;
  }

  const p2 = document.getElementById('pregunta-2');
  p2.classList.add('saliendo');
  setTimeout(() => {
    p2.hidden = true;
    p2.classList.remove('saliendo');
    renderizarResultado(libro);
  }, 200);
}

/**
 * Construye el HTML del resultado con los datos del libro
 * y lo inyecta en el contenedor #resultado.
 * El botón de Buscalibre solo aparece si el libro tiene ese campo en books.json.
 *
 * @param {Object} libro - Objeto libro proveniente de books.json
 */
function renderizarResultado(libro) {
  const contenedor = document.getElementById('resultado');

  // Botón de compra: solo se muestra si el libro tiene enlace de Buscalibre
  const btnBuscalibre = libro.buscalibre
    ? `<a href="${libro.buscalibre}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
         Comprar en Buscalibre
       </a>`
    : '';

  contenedor.innerHTML = `
    <div class="resultado__libro">
      <img
        class="resultado__portada"
        src="${libro.portada}"
        alt="Portada de ${libro.titulo} de ${libro.autora}"
        loading="lazy"
      />
      <div class="resultado__info">
        <div class="resultado__tag">
          <span class="tag">${libro.categoria}</span>
        </div>
        <h3 class="resultado__titulo">${libro.titulo}</h3>
        <p class="resultado__autora">${libro.autora}</p>
        <p class="resultado__meta">${libro.pais} · ${libro.anio}</p>
        <p class="resultado__curatorial">${libro.sinopsis}</p>
        <div class="resultado__acciones">
          <a href="libros/${libro.id}.html" class="btn btn-secondary">
            Ver ficha completa
          </a>
          ${btnBuscalibre}
        </div>
      </div>
    </div>
  `;

  contenedor.hidden = false;
  contenedor.classList.add('visible');
  contenedor.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}


// ─── Progressbar de accesibilidad ────────────────────────────────────────────

/**
 * Actualiza el atributo aria-valuenow del progressbar.
 * El progreso se mide en 2 pasos posibles (Pregunta 1 y Pregunta 2).
 *
 * @param {number} pasoActual - Número del paso actual (1, 2 o 3)
 */
function actualizarProgressbar(pasoActual) {
  const progressbar = document.querySelector('[role="progressbar"]');
  if (progressbar) {
    progressbar.setAttribute('aria-valuenow', Math.min(pasoActual, 2));
  }
}


// ─── Arrancar cuando el DOM esté listo ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', inicializar);
