import type { PreguntaTrivia, Tipo, Dificultad } from "./utils/Interfaces";

interface Categoria {
  nombre: string;
  id: number;
}

const categorias: Categoria[] = [
  { nombre: "General Knowledge", id: 9 },
  { nombre: "Entertainment: Books", id: 10 },
  { nombre: "Entertainment: Film", id: 11 },
  { nombre: "Entertainment: Music", id: 12 },
  { nombre: "Entertainment: Musicals & Theatres", id: 13 },
  { nombre: "Entertainment: Television", id: 14 },
  { nombre: "Entertainment: Video Games", id: 15 },
  { nombre: "Entertainment: Board Games", id: 16 },
  { nombre: "Science & Nature", id: 17 },
  { nombre: "Science: Computers", id: 18 },
  { nombre: "Science: Mathematics", id: 19 },
  { nombre: "Mythology", id: 20 },
  { nombre: "Sports", id: 21 },
  { nombre: "Geography", id: 22 },
  { nombre: "History", id: 23 },
  { nombre: "Politics", id: 24 },
  { nombre: "Art", id: 25 },
  { nombre: "Celebrities", id: 26 },
  { nombre: "Animals", id: 27 },
  { nombre: "Vehicles", id: 28 },
  { nombre: "Entertainment: Comics", id: 29 },
  { nombre: "Science: Gadgets", id: 30 },
  { nombre: "Entertainment: Japanese Anime & Manga", id: 31 },
  { nombre: "Entertainment: Cartoon & Animations", id: 32 },
];

function rellenarCategorias(): void {
  const selector = document.getElementById("category") as HTMLSelectElement;
  if (!selector) return;

  const opcionPorDefecto = document.createElement("option");
  opcionPorDefecto.value = "";
  opcionPorDefecto.textContent = "— No elegir ninguna —";
  selector.appendChild(opcionPorDefecto);

  categorias.forEach((cat) => {
    const opcion = document.createElement("option");
    opcion.value = cat.id.toString();
    opcion.textContent = cat.nombre;
    selector.appendChild(opcion);
  });
}

async function obtenerPreguntas(): Promise<void> {
  const dificultad = (document.getElementById("difficulty") as HTMLSelectElement).value as Dificultad;
  const tipo = (document.getElementById("type") as HTMLSelectElement).value as Tipo;
  const categoria = (document.getElementById("category") as HTMLSelectElement).value;
  const cantidad = (document.getElementById("amount") as HTMLInputElement).value;

  let url = `https://opentdb.com/api.php?amount=${cantidad}`;
  if (dificultad) url += `&difficulty=${dificultad}`;
  if (tipo) url += `&type=${tipo}`;
  if (categoria) url += `&category=${categoria}`;

  try {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    mostrarPreguntas(datos.results as PreguntaTrivia[]);
  } catch (error) {
    console.error("Error al obtener preguntas:", error);
  }
}

function mostrarPreguntas(preguntas: PreguntaTrivia[]): void {
  const contenedor = document.getElementById("output")!;
  contenedor.innerHTML = "";

  preguntas.forEach((pregunta, i) => {
    const div = document.createElement("div");
    div.className = "tarjeta-pregunta";

    const opciones = [...pregunta.incorrect_answers, pregunta.correct_answer];
    // Mezclar opciones
    opciones.sort(() => Math.random() - 0.5);

    div.innerHTML = `
      <h3>Pregunta ${i + 1}</h3>
      <p><strong>${pregunta.question}</strong></p>
      <div class="opciones" id="opciones-${i}"></div>
    `;

    contenedor.appendChild(div);

    const contenedorOpciones = document.getElementById(`opciones-${i}`)!;

    opciones.forEach((opcion) => {
      const boton = document.createElement("button");
      boton.textContent = opcion;
      boton.className = "boton-opcion";

      boton.addEventListener("click", () => {
        const esCorrecta = opcion === pregunta.correct_answer;
        boton.classList.add(esCorrecta ? "correcta" : "incorrecta");

        // Desactivar todos los botones
        const botones = contenedorOpciones.querySelectorAll("button");
        botones.forEach((b) => (b.disabled = true));

        // Marcar la correcta si falló
        if (!esCorrecta) {
          botones.forEach((b) => {
            if (b.textContent === pregunta.correct_answer) {
              b.classList.add("correcta");
            }
          });
        }
      });

      contenedorOpciones.appendChild(boton);
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  rellenarCategorias();

  const formulario = document.getElementById("trivia-form")!;
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    obtenerPreguntas();
  });
});