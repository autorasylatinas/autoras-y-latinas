/* ============================================
   AUTORAS Y LATINAS — cuestionario.js
   Árbol de decisión del cuestionario de descubrimiento

   Flujo:
   Pregunta 1 (4 opciones: A/B/C/D)
     → cada rama tiene su Pregunta 2 (3 opciones)
       → cada opción desemboca en 1 libro
   ============================================ */

// --- Datos del árbol de decisión ---

const PREGUNTAS = {

  // Pregunta 2 según la rama elegida en la Pregunta 1
  A: {
    texto: '¿Qué aspecto del cuidado te interpela más?',
    opciones: [
      {
        texto: 'El cuerpo que cambia: el embarazo, la maternidad, lo físico',
        libro: 'nueve-lunas'
      },
      {
        texto: 'Los vínculos que sostienen y agotan al mismo tiempo',
        libro: 'el-matrimonio-de-los-peces-rojos'
      },
      {
        texto: 'La tensión entre ser persona y ser para otros',
        libro: 'primera-persona'
      }
    ]
  },

  B: {
    texto: '¿Qué tipo de despojo sentís más cercano?',
    opciones: [
      {
        texto: 'El despojo del cuerpo, la herencia y la espiritualidad negra o afro',
        libro: 'la-mucama-de-omicunle'
      },
      {
        texto: 'La identidad que se pierde o transforma entre generaciones',
        libro: 'la-cabeza-del-santo'
      },
      {
        texto: 'Lo que nos sacan cuando nos nombran desde afuera',
        libro: 'ustedes-brillan-en-lo-oscuro'
      }
    ]
  },

  C: {
    texto: '¿Qué relación con el mundo te moviliza?',
    opciones: [
      {
        texto: 'Las ciudades enfermas, los cuerpos contaminados, el colapso urbano',
        libro: 'mugre-rosa'
      },
      {
        texto: 'El derroche, el consumo, lo que tiramos sin ver',
        libro: 'derroche'
      },
      {
        texto: 'Lo sagrado, lo indígena y lo tecnológico entrelazados',
        libro: 'chamanes-electricos-en-la-fiesta-del-sol'
      }
    ]
  },

  D: {
    texto: '¿Qué forma tiene esa carga que llevás?',
    opciones: [
      {
        texto: 'El exilio, lo que quedó atrás, el país que se fue',
        libro: 'atras-queda-la-tierra'
      },
      {
        texto: 'La dictadura, los cuerpos, lo que no se puede nombrar',
        libro: 'marciano'
      },
      {
        texto: 'Irse para sobrevivir, lo que se pierde al salir',
        libro: 'todos-se-van'
      }
    ]
  }
};

// --- Estado del cuestionario ---
let ramaSeleccionada = null;
let librosData = [];

// --- Inicialización ---

// Cargar books.json y luego arrancar el cuestionario
async function inicializar() {
  try {
    const respuesta = await fetch('books.json');
    librosData = await respuesta.json();
  } catch (error) {
    console.error('Error cargando books.json:', error);
  }

  // Asignar eventos a las opciones de la Pregunta 1
  const opcionesP1 = document.querySelectorAll('#pregunta-1 .opcion');
  opcionesP1.forEach(btn => {
    btn.addEventListener('click', () => seleccionarRama(btn.dataset.rama));
    // Soporte teclado: Enter y Espacio ya funcionan nativamente en <button>
  });
}

// --- Paso 1: el usuario elige una rama en la Pregunta 1 ---

function seleccionarRama(rama) {
  ramaSeleccionada = rama;

  // Marcar visualmente la opción seleccionada
  const opcionesP1 = document.querySelectorAll('#pregunta-1 .opcion');
  opcionesP1.forEach(btn => {
    const esEsta = btn.dataset.rama === rama;
    btn.classList.toggle('seleccionada', esEsta);
    btn.setAttribute('aria-pressed', esEsta ? 'true' : 'false');
  });

  // Actualizar indicador de progreso
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

// --- Paso 2: mostrar la Pregunta 2 según la rama ---

function mostrarPregunta2(rama) {
  const datos = PREGUNTAS[rama];
  const contenedor = document.getElementById('pregunta-2');

  // Construir el HTML de la pregunta 2
  const opcionesHTML = datos.opciones.map((opcion, i) => `
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

  // Asignar eventos a las nuevas opciones
  const opcionesP2 = contenedor.querySelectorAll('.opcion');
  opcionesP2.forEach(btn => {
    btn.addEventListener('click', () => seleccionarLibro(btn.dataset.libro, btn));
  });

  // Limpiar clase de animación después de que termine
  setTimeout(() => contenedor.classList.remove('entrando'), 300);

  // Scroll suave hacia el cuestionario en mobile
  contenedor.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// --- Paso 3: el usuario elige un libro ---

function seleccionarLibro(slug, btnSeleccionado) {
  // Marcar visualmente la opción elegida
  const opciones = document.querySelectorAll('#pregunta-2 .opcion');
  opciones.forEach(btn => {
    const esEsta = btn === btnSeleccionado;
    btn.classList.toggle('seleccionada', esEsta);
    btn.setAttribute('aria-pressed', esEsta ? 'true' : 'false');
  });

  // Actualizar progreso
  document.getElementById('paso-2').classList.remove('activo');
  document.getElementById('paso-2').classList.add('completado');
  actualizarProgressbar(3); // completado

  // Breve pausa para que se vea la selección antes de mostrar resultado
  setTimeout(() => mostrarResultado(slug), 400);
}

// --- Paso 4: mostrar el resultado ---

function mostrarResultado(slug) {
  const libro = librosData.find(l => l.id === slug);
  if (!libro) {
    console.error('Libro no encontrado:', slug);
    return;
  }

  // Ocultar pregunta 2
  const p2 = document.getElementById('pregunta-2');
  p2.classList.add('saliendo');
  setTimeout(() => {
    p2.hidden = true;
    p2.classList.remove('saliendo');
    renderizarResultado(libro);
  }, 200);
}

function renderizarResultado(libro) {
  const contenedor = document.getElementById('resultado');

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
        <p class="resultado__curatorial">${libro.texto_curatorial}</p>
        <div class="resultado__acciones">
          <a href="libros/${libro.id}.html" class="btn btn-primary">
            Ver ficha completa
          </a>
          <a href="catalogo.html" class="btn btn-secondary">
            Ver catálogo completo
          </a>
          <button class="btn btn-secondary" id="btn-reiniciar" aria-label="Volver a empezar el cuestionario">
            Volver a empezar
          </button>
        </div>
      </div>
    </div>
  `;

  contenedor.hidden = false;
  contenedor.classList.add('visible');

  // Asignar evento al botón de reinicio
  document.getElementById('btn-reiniciar').addEventListener('click', reiniciarCuestionario);

  // Scroll suave al resultado
  contenedor.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// --- Reiniciar el cuestionario ---

function reiniciarCuestionario() {
  ramaSeleccionada = null;

  // Resetear progreso
  document.getElementById('paso-1').className = 'cuestionario__paso activo';
  document.getElementById('paso-2').className = 'cuestionario__paso';
  actualizarProgressbar(1);

  // Resetear opciones de la pregunta 1
  const opcionesP1 = document.querySelectorAll('#pregunta-1 .opcion');
  opcionesP1.forEach(btn => {
    btn.classList.remove('seleccionada');
    btn.setAttribute('aria-pressed', 'false');
  });

  // Ocultar pregunta 2 y resultado
  const p2 = document.getElementById('pregunta-2');
  p2.hidden = true;
  p2.innerHTML = '';

  const resultado = document.getElementById('resultado');
  resultado.hidden = true;
  resultado.classList.remove('visible');
  resultado.innerHTML = '';

  // Mostrar pregunta 1 con animación
  const p1 = document.getElementById('pregunta-1');
  p1.hidden = false;
  p1.classList.add('entrando');
  setTimeout(() => p1.classList.remove('entrando'), 300);

  // Scroll al inicio del cuestionario
  document.getElementById('cuestionario').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// --- Actualizar el progressbar de accesibilidad ---

function actualizarProgressbar(pasoActual) {
  const progressbar = document.querySelector('[role="progressbar"]');
  if (progressbar) {
    progressbar.setAttribute('aria-valuenow', Math.min(pasoActual, 2));
  }
}

// --- Arrancar cuando el DOM esté listo ---
document.addEventListener('DOMContentLoaded', inicializar);
