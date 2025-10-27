export type Tipo = "boolean" | "multiple";
export type Dificultad = "easy" | "medium" | "hard";

export interface PreguntaTrivia {
  type: Tipo;
  difficulty: Dificultad;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}