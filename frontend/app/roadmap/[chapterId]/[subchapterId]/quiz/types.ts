export type QuestionType = 'multipleChoice' | 'trueFalse' | 'shortAnswer' | 'codeChallenge';

export interface Option {
  optionId: string;
  text: string;
}

export interface BaseQuestion {
  id: number;
  questionType: QuestionType;
  questionText: string;
  explanation: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  questionType: "multipleChoice";
  options: Option[];
  correctAnswer: string;
}

export interface TrueFalseQuestion extends BaseQuestion {
  questionType: 'trueFalse';
  correctAnswer: boolean;
}

export interface ShortAnswerQuestion extends BaseQuestion {
  questionType: 'shortAnswer';
  expectedAnswer: string;
}

export interface CodeChallengeQuestion extends BaseQuestion {
  questionType: 'codeChallenge';
  placeholder: string;
  expectedAnswer: string;
}

export type Question = 
  | MultipleChoiceQuestion 
  | TrueFalseQuestion 
  | ShortAnswerQuestion 
  | CodeChallengeQuestion;

export interface Quiz {
  quizId: string;
  quizTitle: string;
  description: string;
  questions: Question[];
}

export type FeedbackStatus = 'correct' | 'incorrect' | 'partial';

export interface QuestionResponse {
  questionId: number;
  userAnswer: string | boolean;
  feedback?: {
    isCorrect: boolean | 'partial';
    message: string;
  };
}

export interface QuizResponse {
  quizId: string;
  responses: QuestionResponse[];
}