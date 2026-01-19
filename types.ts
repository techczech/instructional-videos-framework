

export interface ProsConsRow {
  label: string;
  pros: string[];
  cons: string[];
}

export interface ProsConsSection {
  title: string;
  data: ProsConsRow[];
}

export type ComparisonCategory = 'cognitive-load' | 'pedagogy' | 'pace-control';

export interface ComparisonPoint {
  text: string;
  category: ComparisonCategory;
}

export interface ComparisonGroup {
  pros: ComparisonPoint[];
  cons: ComparisonPoint[];
}

export interface ModeComparison {
  mode: string;
  perspectives: {
    student: ComparisonGroup;
    lecturer: ComparisonGroup;
  };
}

export interface TaskPoint {
  text: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  actionPoints: string[];
  principles: string;
  relatedPrincipleIds?: number[];
  icon: string;
  color: string;
}

export interface Question {
  id: number;
  question: string;
  answer: string[]; // Array of paragraphs/HTML strings
  relatedPrincipleIds?: number[];
}

export interface QuestionCategory {
  title: string;
  questions: Question[];
}

export interface TableData {
  title: string;
  headers: string[];
  rows: (string | number)[][];
}

export interface ToolCategory {
  type: string;
  purpose: string;
  tools: string[]; // HTML strings allowed for lists
}

export interface MultimediaPrinciple {
  id: number;
  name: string;
  definition: string;
  effectSize?: string;
}

export interface NavItem {
  id: string;
  label: string;
  path: string;
  description: string;
  iconName: string;
}

export interface VideoItem {
  title: string;
  url: string;
  description: string;
  iconName?: string;
}

export interface ResourceCategory {
  heading: string;
  content: string;
  videos: VideoItem[];
}

export interface Tip {
  title: string;
  content: string;
}

export interface TipSection {
  id: string;
  title: string;
  intro: string[];
  outro?: string;
  tips: Tip[];
  icon: string;
  color: string;
}

export interface ReflectionSection {
  title: string;
  content: string[];
}

export type SlideVariant = 
  | 'text-heavy' 
  | 'structured-sequence' 
  | 'small-graphic' 
  | 'zoomed-graphic' 
  | 'split-attention' 
  | 'immersive';

export interface SlideData {
  title?: string;
  items?: string[];
  labels?: string[];
  imageSrc?: string;
}

export interface SlideSimulationProps {
  variant: SlideVariant;
  data: SlideData;
  caption?: string;
  feedback?: 'positive' | 'negative';
}

export interface SlideDesignSection {
  id: string;
  title: string;
  description: string;
  examples: SlideSimulationProps[];
}

export interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  path: string;
  type: string;
  icon?: string;
}

// New Types for Semantic Content Refactor
export interface ReferenceItem {
  text: string;
  link?: string;
}

export interface ReadingSection {
  intro: string; // HTML allowed
  referencesLink: string;
  keyReferencesTitle: string;
  references: ReferenceItem[];
}

export interface ContentBlock {
  title: string;
  content: string[]; // HTML allowed
  colSpan?: number; // For layout hints
}

export interface PlatformPageData {
  title: string;
  intro: string; // HTML
  questionLink: {
    text: string;
    questionId: number;
    description: string;
  };
  modesListTitle: string;
  modes: { icon: string; text: string }[];
  sectionsTitle: string;
  sectionsIntro: string;
  sections: ContentBlock[];
}

export interface UIContent {
  home: {
    heroTitle: string;
    startBtn: string;
    whyVideoBtn: string;
    browseTitle: string;
    aboutTitle: string;
    visitAuthor: string;
  };
  common: {
    backToAll: string;
    viewDetails: string;
    readAnswer: string;
    viewExample: string;
    keyboardNav: string;
    searchPlaceholder: string;
  };
  headers: {
    tasks: string;
    prosCons: string;
    questions: string;
    principles: string;
    tools: string;
    resources: string;
    slideDesign: string;
    learningTips: string;
    appendices: string;
  }
}