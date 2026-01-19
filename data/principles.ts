import { MultimediaPrinciple } from '../types';

export const mayerContext = {
  intro: "This guide draws heavily but critically on the often cited Principles of Multimedia Learning associated with Richard Mayer.",
  principles: [
      "Dual channels: people have separate channels for processing verbal and visual information",
      "Limited capacity: people can engage in only a limited amount of cognitive processing in each channel at one time",
      "Active learning: meaningful learning depends on the learner’s cognitive processing during learning"
  ]
};

export const mayerPrinciples: MultimediaPrinciple[] = [
  { id: 1, name: "Multimedia principle", definition: "People learn better from words and pictures than from words alone.", effectSize: "1.39" },
  { id: 2, name: "Coherence principle", definition: "People learn better from multimedia lessons when extraneous words, pictures, or sounds are excluded.", effectSize: "0.86" },
  { id: 3, name: "Signalling principle", definition: "People learn better from multimedia lessons when essential material is highlighted (such as by using an outline, headings, bolding, and pointer words).", effectSize: "1.39" },
  { id: 4, name: "Redundancy principle", definition: "People learn better from multimedia lessons that contain narration and graphics than from narration, graphics, and printed onscreen text.", effectSize: "0.86" },
  { id: 5, name: "Spatial contiguity principle", definition: "People learn better from multimedia lessons when corresponding printed words and graphics are presented near each other on the screen or page.", effectSize: "1.10" },
  { id: 6, name: "Temporal contiguity principle", definition: "People learn better from multimedia lessons when corresponding words and graphics are presented simultaneously.", effectSize: "1.10" },
  { id: 7, name: "Segmenting principle", definition: "People learn better when multimedia lessons are presented in user-paced segments rather than as a continuous unit.", effectSize: "0.79" },
  { id: 8, name: "Pretraining principle", definition: "People learn better from multimedia lessons after they receive pretraining in the names and characteristics of the main elements.", effectSize: "0.75" },
  { id: 9, name: "Modality principle", definition: "People learn better from graphics with narration than from graphics with printed words.", effectSize: "0.76" },
  { id: 10, name: "Personalization principle", definition: "People learn better from multimedia lessons when the words are in conversational style rather than in formal style.", effectSize: "0.79" },
  { id: 11, name: "Voice principle", definition: "People learn better from narrated graphics when the words are spoken in a likeable human voice rather than in a machine voice.", effectSize: "0.74" },
  { id: 12, name: "Generative Activity Principle", definition: "People learn better when they are guided in carrying out generative learning activities during learning.", effectSize: "0.71" }
];