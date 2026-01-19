import { ToolCategory } from '../types';

export const toolMatrix: ToolCategory[] = [
  {
    type: "Screencasting",
    purpose: "Recording of the screen or slides with voice over, optionally with a video of the person talking.",
    tools: [
      "There are many professional custom tools for this such as:",
      "· Screencast-to-Matic (free tier and editor)",
      "· Camtasia (expensive)",
      "· Loom (now free for students and educators)",
      "· Filmora",
      "But effective screencasts can also be recorded with existing tools:",
      "· PowerPoint (MS Windows only)",
      "· Panopto (only whole screen recording)",
      "· ShareX (free screenshot tool with screencast functionality)"
    ]
  },
  {
    type: "Green screen recording (virtual backgrounds)",
    purpose: "Green screen makes it possible to record a person against a virtual background. The background can be a static image, slide show, or another video.",
    tools: [
      "RapidMooc or RapidMooc GO is the perfect solution for making green screen videos with just plugging in PowerPoint.",
      "Zoom or ManyCam Pro also have some green screen capabilities but require set up.",
      "Full green-screen set up usually requires a production team and post-production and without one of the tools above is probably too expensive."
    ]
  },
  {
    type: "Handwriting videos",
    purpose: "Recording somebody writing on screen. Most often used for STEM tutorials such as those made famous by Khan Academy.<br><br>There are three types of these videos:<br>· Using a virtual pen<br>· Recording somebody writing<br>· Simulating writing in software",
    tools: [
      "There are many options for recording virtual handwriting, all requiring additional hardware:",
      "· iPad with pencil and app such as ShowMe or Explain Everything",
      "· Microsoft Surface Pro, Studio (or equivalent) with PowerPoint or another handwriting app",
      "· RapidMooc with connected tablet above",
      "· SmartPen – such as NeoSmart Pen and <a href='https://www.neosmartpen.com/en/papertube/' target='_blank' class='text-indigo-600 hover:underline'>PaperTube</a>",
      "To record video of actual handwriting, a visualiser or device (such as smartphone) acting as visualiser is necessary:",
      "· See <a href='http://digiknow.sbsblogs.co.uk/2020/04/21/transferring-handwriting-to-video-with-pen-and-paper-technique-for-live-and-pre-recorded-sessions/' target='_blank' class='text-indigo-600 hover:underline'>this write up</a> or a solution",
      "· <a href='https://lightboard.info/' target='_blank' class='text-indigo-600 hover:underline'>Lightboard</a> (possibly in combination with RapidMooc)",
      "There are tools that can simulate handwriting to present text:",
      "· <a href='https://www.videoscribe.co/en' target='_blank' class='text-indigo-600 hover:underline'>VideoScribe</a>",
      "· <a href='https://filmora.wondershare.com/animated-video/best-whiteboard-animation-software.html' target='_blank' class='text-indigo-600 hover:underline'>This post</a> has an overview of 10 others"
    ]
  },
  {
    type: "Animations",
    purpose: "Animations should only be used sparingly for a purpose. They can be entirely animated videos or normal videos with animated portions.",
    tools: [
      "PowerPoint has surprisingly many features that make it possible to create animations beyond simple slide transitions.",
      "There are online services such as RawShorts, Vidyo or Mysimple Show that make it easier to create animate videos using templates.",
      "Fully animated videos relying on professional animators are very production intensive and expensive."
    ]
  },
  {
    type: "Editing video files",
    purpose: "Often, people want to edit video files to achieve one of the following:<br><br>· Trim: cut of the beginning and end<br>· Splice: join together multiple shorter clips<br>· Layer: produce cuts inside videos, add side views, music background, etc.",
    tools: [
      "There are many tools that make it easy to <strong>trim</strong> a video or <strong>splice multiple clips</strong>:",
      "· PowerPoint (import video, trim it and export slideshow as video)",
      "· Screencast-o-Matic is also very easy to use to edit short videos online",
      "· Panopto has basic editing features",
      "· Photos app in Windows 10 or iMovie on MacOS",
      "New tool called <a href='https://www.descript.com/' target='_blank' class='text-indigo-600 hover:underline'><strong>Descript</strong></a> makes it possible edit video or audio based on editing the transcript as text and it makes the changes in the video.",
      "Professional tools with learning curves are required for any more complicated edits. Some examples:",
      "· DaVinci Resolve (full featured, free for basic use, paid additional features)",
      "· Adobe Premiere (standard tool, requires monthly subscription)",
      "· FinalCut Pro (also iMovie for smaller jobs – Mac only)",
      "· Camtasia (if you already have it for screen casts, it can do decent job of video production)",
      "· There are many other competitors, Filmora is worth a mention"
    ]
  }
];