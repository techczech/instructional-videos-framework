import { Task } from '../types';

export const tasksIntro = "Based on research evidence and a survey of the features of popular instructional videos, an effective instructional video should perform 6 tasks.";

export const tasksData: Task[] = [
  {
    id: 1,
    title: "Direct attention",
    description: "The video needs to help viewers know to what they should pay attention and keep a clear distinction between different attention spaces.",
    actionPoints: [
      "Always have pointers to what you're talking about at the moment (it may be a good idea to animate the pointers to help direct attention further)",
      "Have descriptions and labels of images close to the image they relate to",
      "Don't talk over a slide with 6 bullets - break down each bullet into a separate slide"
    ],
    principles: "Signalling principle, Spatial and Temporal Contiguity principles",
    relatedPrincipleIds: [3, 5, 6],
    icon: "Target",
    color: "rose"
  },
  {
    id: 2,
    title: "Minimise distraction and support processing",
    description: "There is only so much that the viewer can keep in their working memory at once. Don't introduce elements in the video that will overload their ability to process and integrate.",
    actionPoints: [
      "Only use relevant illustrations and images.",
      "Avoid decorative images without purpose (even logos on every slide).",
      "Avoid unnecessary animation. Even when the animation is used to direct attention, avoid any additional flourishes.",
      "Don't use side notes and anecdotes, particularly with beginners.",
      "Don't display large amounts of text and talk at the same time.",
      "Simplify graphics to only contain relevant information and focus on what is important.",
      "Crop into images to focus on what is important, reduce extraneous elements."
    ],
    principles: "Coherence principle, Redundancy principle, Modality principle",
    relatedPrincipleIds: [2, 4, 9],
    icon: "EyeOff",
    color: "amber"
  },
  {
    id: 3,
    title: "Support conceptualisation and integration",
    description: "Learning from video requires integrating new information presented with what the user already knows. Introduce elements that will support the viewer's ability to make sense of what is being presented. This often cannot be achieved by a single video or in the video alone. Think in terms of the whole sequence of learning.",
    actionPoints: [
      "IN VIDEO: Explain only one new concept at a time in a video or a navigable segment of a video.",
      "IN VIDEO: Make sure viewers understand all new or difficult words - start with a quick definition or provide a list before the video.",
      "IN VIDEO: Start with a brief summary of the video's purpose.",
      "IN VIDEO: Prime viewers' expectations with examples they can relate to.",
      "IN VIDEO: Illustrate concepts with relevant graphics and images.",
      "IN VIDEO: Use icons to help differentiate lists.",
      "OUTSIDE VIDEO: Present videos in such a way that viewers can control how they access the information, for example by adding a way to navigate.",
      "OUTSIDE VIDEO: Accompany a video with a short bullet list of key points and/or a list of sections.",
      "OUTSIDE VIDEO: Before the video, suggest learners perform a pre-test or some other task to prime their knowledge.",
      "OUTSIDE VIDEO: Add short comprehension quizzes to the video or in the middle of the video.",
      "OUTSIDE VIDEO: Encourage students to write independent summaries of what they learned in the video to facilitate free recall.",
      "OUTSIDE VIDEO: Don’t think of your video as the only one. Encourage students to seek out other videos or sources of information."
    ],
    principles: "Multimedia principle, Pre-training principle, Generative Activity Principle",
    relatedPrincipleIds: [1, 8, 12],
    icon: "Lightbulb",
    color: "emerald"
  },
  {
    id: 4,
    title: "Make a personal connection",
    description: "People learn best when they feel that they have a connection with the teacher. Make videos and other materials that directly address the user and that come from you as a human being talking to another.",
    actionPoints: [
      "Address the viewer directly, use ‘you’.",
      "Include the face of the speaker.",
      "Speak in a natural voice - don't overenunciate or slow down, slightly faster delivery is better than being too slow.",
      "Don't use a script unless you've taken the time to write it to sound natural and practiced reading it.",
      "Don't try to compress ideas too much just to keep the video short, give examples, explain why things are relevant.",
      "Give personal examples but be careful about too many digressions or anecdotes."
    ],
    principles: "Personalisation principle, Voice principle",
    relatedPrincipleIds: [10, 11],
    icon: "Users",
    color: "cyan"
  },
  {
    id: 5,
    title: "Enable navigation and give learners control",
    description: "Learners accessing videos or any other learning materials approach them strategically. They need to have a quick and easy way of getting the gist and a quick way of returning to specific parts. This is more difficult with video than with text.",
    actionPoints: [
      "Present information in small chunks.",
      "Number lists for reference.",
      "Keep topics clearly separated. For example, try to keep to only one topic per video.",
      "Keep videos between 5-15 minutes OR make sure longer videos have links to be able viewers to jump to different video sections.",
      "Don't make videos that are too short just to the sake of it. If the video is just 1 minute long, there's a good chance, a written paragraph or a bullet list would be better.",
      "Pay attention to how the video is presented to students (can they pause, jump around). Make sure you know the video platform well.",
      "Share with students features of the video presentation platform. Encourage them share how they learn from videos with each other.",
      "When available, provide an automatic transcript - let students download it. If possible, let them use it to navigate the video.",
      "Don't use pre-roll - the first thing the viewer should see is what the video is about - not who made it or what series it is part of.",
      "Let students download the videos, if possible."
    ],
    principles: "Segmenting principle, Pre-training principle",
    relatedPrincipleIds: [7, 8],
    icon: "Compass",
    color: "blue"
  },
  {
    id: 6,
    title: "Balance competing needs based on the learner's situation",
    description: "Always take the situation of the learner into account when balancing the competing demands of these principles. For example, complete beginners accessing very technical subjects may have very different demands from intermediate learners or even experts.",
    actionPoints: [
      "Beginners need much more chunking and reducing the demands of cognitive processing – shorter, less discursive videos with fewer examples.",
      "Having a face in the video makes it easier to build a personal connection but it also introduces a distracting element. Very technical subjects aimed at beginners may benefit from no face.",
      "Introducing anecdotes or additional visual elements may provide additional processing load but may make it easier to make a personal connection or to link the new concept with prior to knowledge."
    ],
    principles: "Balancing Principle",
    relatedPrincipleIds: [], // Balancing principle is not a standard Mayer principle in the list
    icon: "Scale",
    color: "violet"
  }
];