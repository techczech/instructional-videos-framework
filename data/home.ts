

import { NavItem } from '../types';

export const appInfo = {
  name: "Instructional Videos",
  title: "Creating and using instructional videos in university teaching",
  subtitle: "6 principles and 15 answers to common questions",
  author: "Dominik Lukes",
  year: "2023",
  license: "CC BY",
  intro: "A guide for designing instructional videos. Its aim is to link decisions educational video producers make to evidence and examples of best practice. It is not intended to be a how-to guide to video production technology."
};

export const navigationItems: NavItem[] = [
  {
    id: 'pros-cons',
    label: 'Videos vs other modes of learning',
    path: '/pros-cons',
    description: 'Compare videos to lectures and readings from student and lecturer perspectives.',
    iconName: 'Scale'
  },
  {
    id: 'tasks',
    label: '6 tasks of effective instructional videos',
    path: '/tasks',
    description: 'The six essential tasks an effective instructional video should perform.',
    iconName: 'CheckSquare'
  },
  {
    id: 'questions',
    label: '15 questions about evidence-based video production',
    path: '/questions',
    description: 'Common questions regarding format, timing, delivery, and structure answered.',
    iconName: 'HelpCircle'
  },
  {
    id: 'cognitive-principles',
    label: '3 Cognitive Learning Principles',
    path: '/cognitive-principles',
    description: 'Crucial cognitive learning principles that underpin multimedia learning.',
    iconName: 'Layers'
  },
  {
    id: 'principles',
    label: '12 Principles of Multimedia Learning',
    path: '/principles',
    description: 'Overview of Mayer’s Principles of Multimedia Learning with definitions and effect sizes.',
    iconName: 'Brain'
  },
  {
    id: 'slide-design',
    label: 'Example of good slide design',
    path: '/slide-design',
    description: 'Compare effective and ineffective slide layouts to improve your instructional materials.',
    iconName: 'Layout'
  },
  {
    id: 'resources',
    label: 'Video examples',
    path: '/resources',
    description: 'Examples of instructional videos.',
    iconName: 'FileText'
  },
  {
    id: 'learning-tips',
    label: '15 Tips for Effective Learning from Videos',
    path: '/learning-tips',
    description: 'Strategies for effective learning from videos and managing cognitive load.',
    iconName: 'Lightbulb'
  },
  {
    id: 'platforms',
    label: 'Giving access to videos for learning',
    path: '/platforms',
    description: 'Feature comparison of platforms like Panopto, YouTube, and LinkedIn Learning.',
    iconName: 'Monitor'
  },
  {
    id: 'tools',
    label: 'Production tools',
    path: '/tools',
    description: 'Matrix of recording and editing tools for screencasting, green screen, and more.',
    iconName: 'PenTool'
  },
  {
    id: 'readings',
    label: 'Further readings',
    path: '/readings',
    description: 'Key references and bibliography used in this guide.',
    iconName: 'Book'
  }
];