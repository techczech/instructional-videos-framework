

import { TableData, TipSection, ReflectionSection, PlatformPageData } from '../types';

export const platformPageData: PlatformPageData = {
  title: "Giving access to videos for learning",
  intro: "This is frequently neglected but <strong>how the students can access the video is often more important than how the video is produced</strong>. A very long video is much easier to consume with easy navigation. A video that can be downloaded or played offline is much more convenient for students to access regardless of location.",
  questionLink: {
    text: "How should the video be presented to learners?",
    questionId: 15,
    description: "Read Question 15 for more details on how video should be presented to learners."
  },
  modesListTitle: "These are some of the video consumption modes students use:",
  modes: [
    { icon: 'Gauge', text: "Watching at higher or lower speed" },
    { icon: 'Headphones', text: "Listening only (podcast mode)" },
    { icon: 'Type', text: "Watching only with captions on" },
    { icon: 'Search', text: "Using captions to navigate" },
    { icon: 'Bookmark', text: "Using bookmarks to navigate" },
    { icon: 'RotateCcw', text: "Skipping back and forth" },
    { icon: 'Smartphone', text: "Watching on a mobile device" }
  ],
  sectionsTitle: "Different platforms",
  sectionsIntro: "Different platforms allow different degrees to which these modes can be engaged.",
  sections: [
    {
      title: "Commercial Providers (Gold Standard)",
      content: [
        "Commercial video learning providers can be seen as the gold standard in supporting all possible modes, for instance <strong>LinkedIn Learning</strong> or <strong>Coursera</strong> could be viewed as the best in class both on the desktop and in their mobile applications. Even if they are not available for video sharing, they can be used to judge the quality of other platforms."
      ],
      colSpan: 2
    },
    {
      title: "Public Platforms",
      content: [
        "<strong>YouTube</strong> now also supports most of these modes even if offline playback requires a paid subscription.",
        "<strong>Vimeo’s</strong> business model is to allow distributors to restrict access to videos and as such does not always offer the best experience. For example, its multiple speed watching is not on by default."
      ]
    },
    {
      title: "Education Focused",
      content: [
        "Of the services aimed at education, <strong>Panopto</strong> supports all of the modes except offline viewing but it is possible to make videos downloadable, including as audio only for podcast mode listening. Its standout feature is the possibility to search inside a video by transcript or text on the slides.",
        "<strong>Panopto</strong> also makes it easy to insert interactive elements such as quizzes into the video."
      ]
    },
    {
      title: "Interactive Tools",
      content: [
        "<strong>H5P</strong> is an open source tool that makes it possible to add interactivity to a video without compromising other viewing modes."
      ],
      colSpan: 1
    },
    {
      title: "LMS Integration",
      content: [
        "It is also possible to upload a video directly to a page in <strong>Canvas</strong> or <strong>Moodle</strong>, but these provide almost none of the options for navigation or control of the viewing experience."
      ],
      colSpan: 1
    }
  ]
};

export const platformComparisonTable: TableData = {
  title: "Comparison of video presentation platforms",
  headers: ["Feature", "LinkedIn Learning", "Panopto", "Canvas (embed)", "YouTube", "H5P"],
  rows: [
    ["Video playlists", "⭐⭐⭐⭐⭐", "⭐⭐⭐⭐⭐", "👎", "⭐⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"],
    ["In video navigation", "⭐⭐⭐⭐⭐", "⭐⭐⭐⭐⭐", "👎", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"],
    ["Bookmarking", "⭐⭐⭐⭐⭐", "⭐⭐⭐⭐", "👎", "⭐⭐", "⭐⭐⭐"],
    ["Skip by transcript", "⭐⭐⭐⭐⭐", "⭐⭐⭐⭐⭐", "👎", "⭐⭐⭐⭐⭐", "👎"],
    ["Speed of playback", "⭐⭐⭐⭐⭐", "⭐⭐⭐⭐⭐", "⭐", "⭐⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"],
    ["Keyboard shortcuts", "⭐⭐⭐⭐⭐", "⭐⭐⭐⭐", "👎", "⭐⭐⭐⭐⭐", "⭐⭐⭐"],
    ["Captions as text", "⭐⭐⭐⭐⭐", "⭐⭐⭐⭐⭐", "👎", "⭐⭐⭐", "⭐⭐⭐"],
    ["Mobile accessibility", "⭐⭐⭐⭐⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐"],
    ["Offline mode", "⭐⭐⭐⭐⭐", "⭐⭐", "👎", "⭐⭐⭐", "👎"],
    ["Podcast playback mode", "⭐⭐⭐⭐⭐", "⭐⭐⭐", "👎", "⭐⭐⭐", "⭐⭐"],
    ["Silent playback", "⭐⭐⭐", "⭐⭐⭐", "👎", "⭐⭐⭐⭐⭐", "⭐⭐"],
    ["Interactivity", "⭐⭐⭐", "⭐⭐⭐", "👎", "⭐⭐", "⭐⭐⭐⭐⭐"],
    ["Searchability", "⭐⭐⭐", "⭐⭐⭐⭐⭐", "👎", "⭐⭐", "⭐⭐⭐⭐⭐"]
  ]
};

export const learningTips: TipSection[] = [
  {
    id: "cognitive-load",
    title: "5 tips for learning from video and managing the cognitive load",
    icon: "Brain",
    color: "indigo",
    intro: [
      "Compared to reading, video can put more demands on your working memory. Working memory is how much you can keep in your mind at once to do mental operations. <strong>Everybody's working memory is limited.</strong> There are only so many chunks of information it can hold. But the <strong>chunks you put in working memory can be very large and rich</strong>. That's how mnemonic devices or metaphors work. You associate something that's already rich in meaning with something with which you don't have any meaningful association. So paradoxically, you can remember a new thing better by putting more things in your memory with it.",
      "Video is a continuous stream of sounds and images which can put an extra load on your working memory. This is called <strong>cognitive load</strong>. But because video is also rich and full of useful signals, it can give your working memory the richness it needs to process bigger chunks of information.",
      "Here are some tips for managing your cognitive load while watching the video."
    ],
    tips: [
      {
        title: "Reduce distractions",
        content: "This sounds obvious. Distractions make you lose focus, so, of course, you should avoid them. But they also saturate your working memory. That's why you may find it better to watch a video with headphones on."
      },
      {
        title: "Build up more background knowledge",
        content: "If every bit of information is new, it puts a higher load on your working memory. That's why you may find it better to watch a video with headphones on. Read short bios of people mentioned, look up their pictures. Try the formulas or watch the experiments online before the lecture. Find related videos online."
      },
      {
        title: "Watch in smaller chunks",
        content: "Lectures are scheduled in hours because of the limits of time and space. But you don't have to watch them in one go. Take a break after a meaningful chunk every 10-20 minutes. Pause to do the exercises, work out a problem, look up an answer to a question posed in the video."
      },
      {
        title: "Notice the confusion break",
        content: "Often, there's a point in a lecture when understanding turns into confusion. That's when too many new things combine and you can't keep them in your working memory at once any more. That's the time to pause and go back. Write down the difficult concepts, work out a technical problem, draw a concept map. Don't just power through."
      },
      {
        title: "Seek out the challenging parts and formulate questions",
        content: "Things that are easy to understand make us feel good and are comfortable or even pleasant to watch. Not understanding something, on the other hand, is stressful and often makes you question yourself. Use those feelings as a signal to rewatch the parts of the video you find more difficult to understand. There is no shame in watching a complicated explanation or exercise assignment multiple times. But don't just leave it at that, use that to formulate questions to ask of your peers or of the lecturer online or in person."
      }
    ]
  },
  {
    id: "revising",
    title: "5 tips for revising from recorded lectures",
    icon: "GraduationCap",
    color: "emerald",
    intro: [
      "All students like the idea of having recorded lectures. But we know from the view numbers that most of them don't watch most of the videos. This is partly because it seems like such a daunting task to go through so much material again. And even if you only go to watch a part of the video, it's much harder to skim for gist or to scan to get to the most important parts. Here are some tips."
    ],
    tips: [
      {
        title: "Learn with others",
        content: "If you're planning to rewatch the entire lecture, do not do it alone. <strong>Schedule time with others</strong>. Like a movie night. This will make it more likely you will actually do it. But more importantly, you will be able to check your understanding with others. Agree on rules on how often you want to stop."
      },
      {
        title: "Pause and rewind",
        content: "After watching, think about how often you paused, fast forwarded, or rewound the video. All of these activities are signs that you are actively engaging with the content. And research shows that you will learn more. This is a great advantage of recorded lectures."
      },
      {
        title: "Change the speed",
        content: "It is easy to train yourself to listen at an increased speed. You can go through the same lecture in less time. Some people say that it helps them focus. This works best in quiet environments with headphones on. But don't be afraid to slow down for certain parts. Maybe English isn't your first language or the topic relies on a lot of technical language. Those are some situations when you will learn more if you listen at a lower speed."
      },
      {
        title: "Annotate the video",
        content: "Did you know you can bookmark parts of the video? You can also take notes in the video and share those with others. Ask and answer questions."
      },
      {
        title: "Watch strategically",
        content: "Often, you only want to rewatch certain parts of the video. Take advantage of the <strong>search feature</strong> that will find what was said as well as text on slides or use the slide view to navigate."
      }
    ],
    outro: "Following these tips will help you <strong>avoid binge watching</strong> your lectures at the last minute. This is the least effective way of learning difficult concepts because you are increasing the cognitive load. See next section for more tips on how to manage this."
  },
  {
    id: "player-features",
    title: "5 features to learn about in your video player",
    icon: "Settings",
    color: "blue",
    intro: [
      "Learn the interface of your video player. Here are some features to look for in your video player to make it easier to get most out of the videos while learning."
    ],
    tips: [
      {
        title: "Changing the size of the video",
        content: "can you make it full screen, can you remove distractions"
      },
      {
        title: "Modifying speed of videos",
        content: "how can you increase or decrease the speed of the video"
      },
      {
        title: "Searching and navigating through video",
        content: "are there chapters, how can you click on them to get to a specific place"
      },
      {
        title: "Using captions and transcripts",
        content: "can you turn on captions or download the transcript?"
      },
      {
        title: "Keyboard shortcuts",
        content: "does the video player make it easy to jump and forth with arrow keys, can you pause and play again with the space bar?"
      }
    ]
  },
  {
    id: "lecture-tips",
    title: "Five tips for learning from lectures in general",
    icon: "BookOpen",
    color: "amber",
    intro: [
      "You should go to lectures. Students who attend lectures are more successful at learning than those who don't. But do not confuse attending the lecture with learning. Attending is better than not attending but you also need to engage. Here five ways of making the most out of your lectures:"
    ],
    tips: [
      {
        title: "Don't go into your lectures cold",
        content: "Find out a little bit about the topic. Read the readings. Write down questions you are expecting the lecture to answer."
      },
      {
        title: "Take notes in any way that helps you",
        content: "But don't think you have to take notes word for word. Try to summarise as you write notes, consider using mind maps, concept maps or outlines."
      },
      {
        title: "Ask and answer questions",
        content: "Take the opportunity to ask questions during live lectures or online. Whenever possible, try to answer other people’s questions. That will help you clarify your understanding."
      },
      {
        title: "Write a summary of key points after the lecture without consulting your notes to check how much you've retained",
        content: "Often, you will realise that you're able to write down less than you thought. Compare your summary with somebody else's and reconcile any differences."
      },
      {
        title: "Follow up by doing the readings, working through problems, etc.",
        content: "For every hour you spend in a lecture, you should spend at least two more studying."
      }
    ],
    outro: "Remember, lectures are an important part of the learning process but you still need to spend time making what you heard your own.<br><br>Attending a lecture gives you a chance to focus, block time when you're doing nothing else, and be with others doing the same activity. These are powerful signals for learning.<br><br>But you can never say, I've attended a lecture, I've learned. Most of the actual learning will happen before and after the lecture, as you're planning, reflecting, taking notes, or revising. Make sure all of these activities are a part of your routine."
  }
];

export const reflectionData: ReflectionSection = {
  title: "Reflect on your process, ask others about theirs",
  content: [
    "<strong>Learning is a skill</strong> and you can get better at it. One way to improve at any skill is to pause and reflect on your practice. How well is what you're doing working for you? Are there areas where you struggle and a change could help? And most importantly keep track of what you're doing and how you're progressing. Do not rely on your memory. Keep a learning diary.",
    "<strong>You are not alone.</strong> Make talking to other students a part of your reflection. Ask them how they study, what works for them. Share what you do. See if you can learn from each other but remember almost everything works for someone and nothing works for everyone. So experiment with what works for you.",
    "There are many people online sharing their process. Take advantage of the advice but always consult more than one source to get more points of view."
  ]
};
