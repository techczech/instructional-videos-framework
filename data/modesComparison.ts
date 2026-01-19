import { ModeComparison } from '../types';

export const sectionIntro = "When compared to other traditional modes of learning – reading and listening to lectures, videos have many advantages. But they also have some disadvantages. These vary depending on whether you look at them from the perspective of the learner or the teacher.";

export const modesComparisonData: ModeComparison[] = [
  {
    mode: "Videos",
    perspectives: {
      student: {
        pros: [
          { text: "Combine text, speech and moving illustration", category: "cognitive-load" },
          { text: "Explain complicated processes", category: "pedagogy" },
          { text: "Express emotion", category: "pedagogy" },
          { text: "More informal language", category: "cognitive-load" },
          { text: "Pause, rewind and speed up", category: "pace-control" }
        ],
        cons: [
          { text: "Takes longer", category: "pace-control" },
          { text: "Cannot skim", category: "cognitive-load" },
          { text: "Limited scanning", category: "cognitive-load" },
          { text: "Needs interface to control", category: "pace-control" }
        ]
      },
      lecturer: {
        pros: [
          { text: "Can chunk content into smaller segments", category: "cognitive-load" },
          { text: "Can refine explanations", category: "pedagogy" },
          { text: "Can offer more flexible learning opportunities", category: "pace-control" },
          { text: "Can be reused", category: "pace-control" }
        ],
        cons: [
          { text: "Takes longer to prepare", category: "pace-control" },
          { text: "Requires technology", category: "cognitive-load" },
          { text: "Expensive to deliver", category: "pace-control" },
          { text: "Requires additional skill", category: "cognitive-load" },
          { text: "Difficult to edit", category: "pace-control" },
          { text: "Harder to reuse others", category: "pedagogy" },
          { text: "Ages quickly", category: "pace-control" }
        ]
      }
    }
  },
  {
    mode: "Lectures",
    perspectives: {
      student: {
        pros: [
          { text: "Can ask questions", category: "pedagogy" },
          { text: "Can adjust to audience reaction", category: "pedagogy" },
          { text: "Can modify language and rephrase", category: "cognitive-load" }
        ],
        cons: [
          { text: "Lack of control: No rewind, no pause, no slow down", category: "pace-control" },
          { text: "Length determined by schedule not need", category: "pace-control" },
          { text: "Cannot choose time and place", category: "pace-control" },
          { text: "Too much information at once", category: "cognitive-load" }
        ]
      },
      lecturer: {
        pros: [
          { text: "Easier to prepare and deliver", category: "pace-control" },
          { text: "Easy to modify at the last minute", category: "pace-control" },
          { text: "Can answer student questions", category: "pedagogy" },
          { text: "Expected at university level", category: "pedagogy" }
        ],
        cons: [
          { text: "Fixed time commitment", category: "pace-control" },
          { text: "Not always popular with students", category: "pedagogy" },
          { text: "Cannot be reused", category: "pace-control" },
          { text: "Illusion of learning", category: "pedagogy" }
        ]
      }
    }
  },
  {
    mode: "Readings",
    perspectives: {
      student: {
        pros: [
          { text: "Can skim and scan", category: "cognitive-load" },
          { text: "Can skip as needed", category: "pace-control" },
          { text: "Easier to control interaction", category: "pace-control" }
        ],
        cons: [
          { text: "‘Unnatural’ language", category: "cognitive-load" },
          { text: "Lack of movement", category: "pedagogy" },
          { text: "No personal connection", category: "pedagogy" },
          { text: "Only one mode", category: "cognitive-load" }
        ]
      },
      lecturer: {
        pros: [
          { text: "Easy to create and edit", category: "pace-control" },
          { text: "Easy to modify other resources", category: "pace-control" },
          { text: "Cheap and quick to distribute and deliver", category: "pace-control" }
        ],
        cons: [
          { text: "Limited ability to illustrate", category: "pedagogy" },
          { text: "Many students don’t read", category: "pedagogy" }
        ]
      }
    }
  }
];
