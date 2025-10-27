document.getElementById("trivia-form")!.addEventListener("submit", async (e) => {
  e.preventDefault();

  const difficulty = (document.getElementById("difficulty") as HTMLSelectElement).value;
  const type = (document.getElementById("type") as HTMLSelectElement).value;
  const category = (document.getElementById("category") as HTMLSelectElement).value;
  const amount = (document.getElementById("amount") as HTMLInputElement).value;

  let url = `https://opentdb.com/api.php?amount=${amount}`;
  if (difficulty) url += `&difficulty=${difficulty}`;
  if (type) url += `&type=${type}`;
  if (category) url += `&category=${category}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const output = document.getElementById("output")!;
    output.innerHTML = "";

    data.results.forEach((q: any, i: number) => {
      output.innerHTML += `
        <div>
          <h3>Pregunta ${i + 1}</h3>
          <p><strong>${q.question}</strong></p>
          <p>✔️ ${q.correct_answer}</p>
          <p>❌ ${q.incorrect_answers.join(", ")}</p>
        </div>
      `;
    });
  } catch (err) {
    console.error("Error al obtener preguntas:", err);
  }
});/*  */