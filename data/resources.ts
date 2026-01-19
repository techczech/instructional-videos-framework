import { ResourceCategory } from '../types';

export const resourceCategories: ResourceCategory[] = [
  {
    heading: "Samples of instructional videos",
    content: "Selection of real instructional videos to illustrate different types of videos for different educational purposes",
    videos: []
  },
  {
    heading: "Mini lectures",
    content: "Low production value vs high production value mini lectures comparing requirements and information/motivational value.",
    videos: [
      {
        title: "Sample Lecture: Why Research?",
        url: "https://www.youtube.com/embed/t1od0p7TLKs",
        description: "Low production value. Requires only an outline and basic equipment. High information value."
      },
      {
        title: "Ancient Egypt: Crash Course World History #4",
        url: "https://www.youtube.com/embed/Z3Wvw6BivVI",
        description: "High production value. Requires a production team with effective production workflows, dedicated studio, extensive scripting. High motivational value."
      }
    ]
  },
  {
    heading: "Typical MOOC-style mini lectures",
    content: "Different uses of background.",
    videos: [
      {
        title: "14.1 - Probability: Monty Hall",
        url: "https://www.youtube.com/embed/15BPf-0RQOE",
        description: "Presentation as background. Low production value. Minimal editing requirements."
      },
      {
        title: "",
        url: "https://www.youtube.com/embed/6oo-442B0KA",
        description: "Combination of background, illustrations and demonstrations. Low production demands but requires extensive editing."
      }
    ]
  },
  {
    heading: "Typical MOOC mini lecturers",
    content: "Shows lecturer with simple background and slideshow as background.",
    videos: [
      {
        title: "",
        url: "https://www.youtube.com/embed/n_seJV-_YDw",
        description: "Lecturer with simple background. Info slides added in editing instead of background with information."
      },
      {
        title: "",
        url: "https://www.youtube.com/embed/b814RCw5WI8",
        description: "Slideshow as background. Simple background but adds dynamism through multiple shots. Different types of backgrounds and shot angles."
      }
    ]
  },
  {
    heading: "Uses of transparent (white) board",
    content: "Relatively low production value but very high information value. Requires iterative development but not an extensive production team. The technology details are available on learning.glass.",
    videos: [
      {
        title: "",
        url: "https://www.youtube.com/embed/FJxAkFSsPoI",
        description: "Humanities: Using the glass board to project content."
      },
      {
        title: "",
        url: "https://www.youtube.com/embed/QtxIG7xHFyI",
        description: "STEM Subjects: Using the glassboard for interaction and presentation."
      }
    ]
  },
  {
    heading: "Comparing a promotional and instructional video",
    content: "",
    videos: [
      {
        title: "",
        url: "https://www.youtube.com/embed/9XDUs18ktFU",
        description: "Video from the promoted MOOC: Lower production value (and cost), higher information and pedagogic value. Works as part of an educational programme."
      },
      {
        title: "",
        url: "https://www.youtube.com/embed/U3FVZG67mik",
        description: "Video to promote a MOOC: Documentary approach, multiple shots, high production value (and cost). Stand‑alone, aims to capture attention and give broad information. Not aimed at learning the content."
      }
    ]
  },
  {
    heading: "Shooting on location",
    content: "",
    videos: [
      {
        title: "The Ethics of Memory / Week 1 / The Annmary Brown Memorial",
        url: "https://www.youtube.com/embed/lFpoJHG0dWg",
        description: "Location as background: location used only as background and additional information is edited in. (Part of a MOOC)"
      },
      {
        title: "Outdoor Portraits Essentials: Natural Light Photography, Fill Flash & Diffusers",
        url: "https://www.youtube.com/embed/V9w5E9I5bW4",
        description: "Location as part of content: video shot in various locations to illustrate the subject being explained. (Standalone tutorial on YouTube)"
      }
    ]
  },
  {
    heading: "Screencasting",
    content: "Explaining how to do something on the screen.",
    videos: [
      {
        title: "Základy kontingenční tabulky | EduTV",
        url: "https://www.youtube.com/embed/IWse9RPLDgM",
        description: "Live demonstration of procedures. High quality sound, well‑thought‑through approach. No script but following a clear outline."
      },
      {
        title: "Using PDFs accessibly with Adobe Reader - Load2Learn Screencast",
        url: "https://www.youtube.com/embed/srXAlhHlS2E",
        description: "Illustration through screenshots. Using PowerPoint makes it possible to show what’s on screen with annotations and additional information without the need for extensive editing."
      }
    ]
  },
  {
    heading: "6 approaches to explaining the same mathematical concept",
    content: "Six different videos illustrate different approaches to explaining one concept.",
    videos: [
      {
        title: "",
        url: "https://www.youtube.com/embed/riXcZT2ICjA",
        description: ""
      },
      {
        title: "",
        url: "https://www.youtube.com/embed/UukVP7Mg3TU",
        description: ""
      },
      {
        title: "",
        url: "https://www.youtube.com/embed/cRsptYEK1G4",
        description: ""
      },
      {
        title: "",
        url: "https://www.youtube.com/embed/WUvTyaaNkzM",
        description: ""
      },
      {
        title: "",
        url: "https://www.youtube.com/embed/w3GV9pumczQ",
        description: ""
      },
      {
        title: "",
        url: "https://www.youtube.com/embed/0Be_6Qaq1es",
        description: ""
      }
    ]
  },
  {
    heading: "Animation",
    content: "",
    videos: [
      {
        title: "The Demand Curve",
        url: "https://www.youtube.com/embed/kUPm2tMCbGE",
        description: "Academic subject: animation through motion of static objects across the screen. Infotainment type videos focused on short, compact pieces of information."
      },
      {
        title: "Everyone Confuses the UK, Great Britain, and England",
        url: "https://www.youtube.com/embed/rNu8XDBSn10",
        description: "Popular subject: animation through cuts."
      }
    ]
  },
  {
    heading: "Text animation",
    content: "Specific type of animation growing in popularity.",
    videos: [
      {
        title: "",
        url: "https://www.youtube.com/embed/zDZFcDGpL4U",
        description: "Summary of a book."
      },
      {
        title: "",
        url: "https://www.youtube.com/embed/sWctLEdIgi4",
        description: "Illustrated lecture."
      }
    ]
  },
  {
    heading: "Demonstration of technical skills",
    content: "",
    videos: [
      {
        title: "How To Park (The Secret You Have To Know!)",
        url: "https://www.youtube.com/embed/wfXQ2YWB34Y",
        description: "Self‑produced demonstration with minimal editing and only a few static camera angles."
      },
      {
        title: "Front Load Washer Repair - Not Draining or Spinning - How to Unclog the Drain Pump",
        url: "https://www.youtube.com/embed/KixjQQdGNF4",
        description: "Higher production value demonstration with multiple camera angles and extensive editing."
      }
    ]
  },
  {
    heading: "Lecture recordings",
    content: "Recorded lectures: traditional university lectures.",
    videos: [
      {
        title: "",
        url: "https://www.youtube.com/embed/XPEJg_6Cg6o",
        description: "Normally scheduled lecture: simple production; lecture not structured for video."
      },
      {
        title: "",
        url: "https://www.youtube.com/embed/kBdfcR-8hEY",
        description: "Lecture organised for recording: lecture structured to fit the needs of the video; high production quality and extensive logistics."
      }
    ]
  },
  {
    heading: "TED Talk videos",
    content: "",
    videos: [
      {
        title: "Anant Agarwal: Why massively open online courses (still) matter",
        url: "https://www.youtube.com/embed/rYwTA5RA9eU",
        description: "TED Talk: its own format. High production value, special kind of video‑friendly presentation. TED Talks are a special kind of lecture."
      },
      {
        title: "O učení | Adam Herout | TEDxBrno",
        url: "https://www.youtube.com/embed/rUyxom1fj7M",
        description: "Non‑traditional lectures. TED Talk in a language other than English."
      }
    ]
  },
  {
    heading: "Language skills",
    content: "Different approaches to language teaching.",
    videos: [
      {
        title: "",
        url: "https://www.youtube.com/embed/rVBhaNmf_Ik",
        description: ""
      },
      {
        title: "",
        url: "https://www.youtube.com/embed/GgkRoYPLhts",
        description: ""
      },
      {
        title: "",
        url: "https://www.youtube.com/embed/zOW1qSES9kA",
        description: ""
      },
      {
        title: "",
        url: "https://www.youtube.com/embed/ndfdF1Vsg98",
        description: ""
      },
      {
        title: "",
        url: "https://www.youtube.com/embed/SazwsvWIK4M",
        description: ""
      }
    ]
  },
  {
    heading: "Production values",
    content: "YouTube videos from different periods of Marginal Revolution University. What is the difference in learning outcomes?",
    videos: [
      {
        title: "The Marginal Product of Labor",
        url: "https://www.youtube.com/embed/G7ai5LAehqg",
        description: "Lower production value: simple PowerPoint with a voice over introduced by a person; has had 85 thousand views on YouTube."
      },
      {
        title: "Premature Deindustrialization",
        url: "https://www.youtube.com/embed/xsAjHzAGZDU",
        description: "High production value: mini lecture with key concepts animated and frequent switching of perspective; has had 10,000 views on YouTube."
      }
    ]
  },
  {
    heading: "Production values - Using a script",
    content: "Two videos by the same speaker. One without a script and one scripted. What is the difference in engagement and learning?",
    videos: [
      {
        title: "Trish Greenhalgh - ‘Real v Rubbish EBM’",
        url: "https://www.youtube.com/embed/qYvdhA697jI",
        description: "Live lecture without a script: engaging recording of a lecture – 30 mins long with 20 thousand views; speaker clearly facing audience."
      },
      {
        title: "Professor Trish Greenhalgh talks about why technology projects in health and social care fail",
        url: "https://www.youtube.com/embed/rBqcOt-vHgo",
        description: "Recorded video with a script: scripted presentation condensed to 10 mins; engagement simulated by different camera angles with speaker often facing away; 1.7 thousand views on YouTube."
      }
    ]
  },
  {
    heading: "Production values - Length and illustration",
    content: "Two videos on the same highly technical topic. They take a very different production approach and different approach to explanation.",
    videos: [
      {
        title: "The rotation problem and Hamilton's discovery of quaternions I | Famous Math Problems 13a",
        url: "https://www.youtube.com/embed/uRKZnFAR7yw",
        description: "Learning as a process – low production: presenter with whiteboard talking for 58 mins with 73 thousand views; part of a series and building foundations for maths and a personal relationship with the speaker."
      },
      {
        title: "Visualizing the 4d numbers Quaternions",
        url: "https://www.youtube.com/embed/d4EgbgTm0Bg",
        description: "Learning as an event – high production: scripted presentation with animations and visualisations lasting 30 mins; this is more focused on one isolated concept."
      }
    ]
  }
];