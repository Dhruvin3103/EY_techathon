export interface Example {
    example: string;
    outcome: string;
  }
  
  export interface Concept {
    concept_name: string;
    description: string;
    examples: Example[];
  }
  
  export interface Step {
    step_number: number;
    description: string;
  }
  
  export interface DetailedExample {
    example_id: string;
    title: string;
    steps: Step[];
    expected_result: string;
  }
  
  export interface UseCase {
    case_id: string;
    description: string;
    benefits: string;
  }
  
  export interface RelatedTopic {
    topic: string;
    description: string;
  }
  
  export interface CodeSnippet {
    code_id: string;
    code: string;
    explanation: string;
  }
  
  export interface Instruction {
    instruction_number: number;
    description: string;
  }
  
  export interface Exercise {
    exercise_title: string;
    instructions: Instruction[];
    expected_outcome: string;
  }
  
  export interface ChapterData {
    key_concepts: {
      overview: string;
      details: Concept[];
    };
    examples: {
      overview: string;
      detailed_examples: DetailedExample[];
    };
    applications: {
      overview: string;
      real_world_use_cases: UseCase[];
    };
    code_snippets: CodeSnippet[];
    practical_exercise: Exercise;
    explanation_style: string;
    additional_notes: {
      overview: string;
      related_topics: RelatedTopic[];
    };
  }