export interface Trivia {
    type:              Type;
    difficulty:        Difficulty;
    category:          string;
    question:          string;
    correct_answer:    string;
    incorrect_answers: string[];
}

export type Type = "boolean" | "multiple";
export type Difficulty = "easy" | "medium" | "hard";