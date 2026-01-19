import { QuestionCategory } from '../types';

export const questionsIntro = "Keeping the 6 tasks of a video in mind makes it possible to answer some common questions about video production.";

export const questionsData: QuestionCategory[] = [
  {
    title: "Format and Visual Style",
    questions: [
      {
        id: 1,
        question: "What should be the design of backgrounds / slides?",
        answer: [
          "The graphics should work towards the first three tasks of a video: 1. Direct attention, 2. Avoid distraction, 3. Support conceptualisation. This means:",
          "· place related graphics close together",
          "· make sure that there is some indicator for which part of a graphic you are talking about at any given moment",
          "· only show the graphic you are talking about",
          "· don’t put extraneous text that repeats what you are talking about, usually just a short summary line or a quote should be on the screen at once",
          "· simplify graphics",
          "· zoom in on images",
          "· use icons to support processing lists"
        ],
        relatedPrincipleIds: [1, 2, 3, 5, 4, 6] // Multimedia, Coherence, Signalling, Spatial, Redundancy, Temporal Contiguity
      },
      {
        id: 2,
        question: "How highly produced should videos be?",
        answer: [
          "“Production value” is the most visible aspect of a video. It includes things like lighting, picture quality, visual effects, props and backgrounds, as well as audio quality.",
          "Of these, only <strong>audio quality</strong> has any effect on learning. Background noise, hiss and other audio imperfections are very distracting and increase cognitive load.",
          "Also, the <strong>presenter being in front of a clear background</strong> without distracting elements is important. But this does not mean a professional set. A plain wall, plants or a bookshelf is sufficient.",
          "Other aspects of production that make videos appear ‘professional’ have almost no impact on learning. The lesson here can be summarised as “the biggest gain is in going from no video to having a video”."
        ],
        relatedPrincipleIds: [2, 4, 6] // Coherence, Redundancy, Temporal Contiguity
      },
      {
        id: 3,
        question: "Should I switch between angles and perspectives?",
        answer: [
          "Using multiple angles or levels of zoom and frequently switching between them is a common feature of documentary films. On the other hand, very many effective instructional videos do not do this.",
          "In general, this is not necessary for learning success, but it can be useful in some situations. For instance, a small study showed that students learned slightly better from videos that switched between overhead view and presenter view in explaining a technical procedure.",
          "In some situations, it can be distracting, such as when switching between the speaker and slides. On the one hand, this makes the video feel more dynamic, on the other hand it takes the control over what to pay attention away from the viewer."
        ],
        relatedPrincipleIds: [3, 4, 6] // Signalling, Redundancy, Temporal Contiguity
      },
      {
        id: 4,
        question: "Should I use animations?",
        answer: [
          "Animations are less useful and surprisingly can detract from learning. Animations make it more difficult for students to control their attention as they are watching the video.",
          "However, they are useful when they directly support conceptualisation or direct attention. And they improve learning in these two conditions:",
          "1. When they <strong>direct attention</strong> to an item on the screen – for instance an animated arrow or an animated entrance of a new item.",
          "2. When they <strong>illustrate a process involving motion</strong> or manipulation, for instance a flow of a liquid or assembling a machine.",
          "High quality animations are expensive to produce and they are almost never worth the effort and investment."
        ],
        relatedPrincipleIds: [1, 2, 3] // Multimedia, Coherence, Signalling
      }
    ]
  },
  {
    title: "Timing",
    questions: [
      {
        id: 5,
        question: "How long should a video be?",
        answer: [
          "There is no one set length of instructional video. It is a myth that videos have to be just a few minutes long.",
          "The appropriate length depends on: 1. the <strong>needs of the subject matter</strong>, 2. the level of <strong>prior knowledge</strong>, 3. the <strong>ability of the viewers to navigate</strong>.",
          "Some research suggests that most common points at which users stop watching is between <strong>6 and 12 minutes</strong>. However, context is very important.",
          "YouTube creators are increasingly <strong>adding navigation</strong> to the different sections of their videos. This shows the importance of being able to navigate longer videos.",
          "It is a good idea to <strong>split longer lectures into 10-20-minute chunks</strong>, but having too many videos of 2-3 minutes will just make it difficult for students to keep all the information together.",
          "You should add some sort of <strong>navigation</strong> to longer videos and combine shorter videos into a <strong>playlist</strong>."
        ],
        relatedPrincipleIds: [7] // Segmenting
      },
      {
        id: 6,
        question: "How frequently should I transition between backgrounds?",
        answer: [
          "There is no set time of how long a single background should stay on the screen. Is important to balance the need to <strong>direct attention</strong> with the needs to <strong>avoid distractions</strong> and support conceptualisation.",
          "An instructor <strong>should not</strong> just talk over a slide with <strong>multiple bullet points for several minutes</strong>. But it is also not helpful to <strong>change the background</strong> every few words.",
          "Switching to B-Roll is often used, but is almost certainly <strong>not worth the additional investment</strong> purely in terms of learning unless illustrating a procedure."
        ],
        relatedPrincipleIds: [2] // Coherence
      }
    ]
  },
  {
    title: "Delivery Style",
    questions: [
      {
        id: 7,
        question: "Do I need to use a script to deliver the video?",
        answer: [
          "One of the tasks of the video is to <strong>make a personal connection</strong>. Most people find it difficult to sound natural when reading a script.",
          "It is necessary to have a clear outline and supporting graphics, but <strong>a script can get in the way</strong>.",
          "Script is <strong>necessary for very short videos</strong> where it is important to meet a firm time target. But if you do use a script, you <strong>have to practice</strong> to make the delivery sound natural."
        ],
        relatedPrincipleIds: [10, 11] // Personalization, Voice
      },
      {
        id: 8,
        question: "Should I speak more slowly and enunciate every word?",
        answer: [
          "No. Speak at a natural pace. You should <strong>speak clearly and distinctly</strong> but don’t over-enunciate. If anything, <strong>speaking slightly faster</strong> than normal (about 10-20%) can be useful.",
          "Make sure that the videos are presented using a <strong>platform</strong> that allows the students to choose a <strong>slower or faster speed</strong>.",
          "It is also important to <strong>give students other ways to control</strong> the video."
        ],
        relatedPrincipleIds: [11, 4, 6] // Voice, Redundancy, Temporal Contiguity
      },
      {
        id: 9,
        question: "Should there be a face in the video?",
        answer: [
          "The task of the video is to build a personal connection. Having the instructor’s face in the video helps with that. Most students report that they feel better if the face is there. But for a significant minority it causes distraction (about 25%).",
          "The <strong>research has not shown any difference on learning outcomes</strong>.",
          "On balance it is best to have the instructor’s face in the video, but it is possible to build a personal connection with just voice or the approach to a topic."
        ],
        relatedPrincipleIds: [10, 4, 6] // Personalization, Redundancy, Temporal Contiguity
      },
      {
        id: 10,
        question: "Do I need to look directly at the camera or not?",
        answer: [
          "It is not necessary to always stare directly into the camera – students don’t always maintain an eye contact with the teacher in a lecture room. However, some eye contact is important for a personal connection.",
          "The common practice of filming a presenter from the side as in a documentary or TV interview is probably slightly detrimental and not worth the extra production expense."
        ],
        relatedPrincipleIds: [10] // Personalization
      },
      {
        id: 11,
        question: "Should we use an actor to present a script?",
        answer: [
          "Using an actor or a model to present a script goes against the task of <strong>establishing a personal connection</strong>.",
          "Using models presenting training videos is common in corporate trainings and it <strong>probably detracts from learning</strong> by making the content seem impersonal."
        ],
        relatedPrincipleIds: [10, 11] // Personalization, Voice
      }
    ]
  },
  {
    title: "Structure and Presentation",
    questions: [
      {
        id: 12,
        question: "Should I include asides, jokes, points of interest?",
        answer: [
          "Any additional material introduces <strong>additional cognitive load</strong>, but it may <strong>make the video more personal</strong>.",
          "The deciding factor here is whether the learner is <strong>a novice in the subject</strong>. For very <strong>technical videos</strong> or <strong>procedural explanations</strong>, it is best to only focus on the core what is to be learned.",
          "In general, many teachers are prone to <strong>over-adorn</strong> their explanations with additional points of interest, so less is probably better."
        ],
        relatedPrincipleIds: [2, 10] // Coherence, Personalization
      },
      {
        id: 13,
        question: "How important is it to have a story?",
        answer: [
          "“Every video has to tell a story” is advice appropriate for <strong>documentary makers targeting audiences not motivated to learn the subject</strong>. But the first principle must be “always be relevant and respond to your viewers’ needs”.",
          "Sometimes starting a video with the word ‘Imagine that …’ is a powerful trigger, but more often than not, it is a trigger for somebody to <strong>lose interest</strong>.",
          "If you use a metaphor, make sure you also explain when it does not work."
        ],
        relatedPrincipleIds: [10, 12] // Personalization, Generative Activity
      },
      {
        id: 14,
        question: "Should I use opening credits or pre-roll?",
        answer: [
          "No. Get to the point. The best way to start a video is to say ‘In this video…’.",
          "Opening credits are distracting and irritating when they are put on 5 minute videos in a series.",
          "Even on YouTube, the metrics say that the biggest drop off in viewership is in the first few seconds. That’s why most YouTubers start with what is called a <strong>‘cold open’</strong>."
        ],
        relatedPrincipleIds: [2, 7] // Coherence, Segmenting
      },
      {
        id: 15,
        question: "How should the video be presented to learners?",
        answer: [
          "<strong>How the students can access the video is often more important than how the video is produced</strong>.",
          "Important consumption modes include: Watching at higher/lower speed, Listening only (podcast mode), Watching with captions, Using bookmarks, Skipping back and forth.",
          "Different platforms allow different degrees to which these modes can be engaged (e.g., Panopto, YouTube, LinkedIn Learning)."
        ],
        relatedPrincipleIds: [7, 9, 12] // Segmenting, Modality, Generative Activity
      }
    ]
  }
];