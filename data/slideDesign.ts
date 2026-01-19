import { SlideDesignSection } from '../types';

export const slideDesignSections: SlideDesignSection[] = [
  {
    id: 'one-bullet',
    title: 'One bullet, one slide',
    description: 'Instead of keeping a single slide with a title and multiple bullet points, break it down into an introductory slide, a summary slide, and individual slides with actual content. Sometimes there may be a need for multiple slides for each bullet. Ideally, what is being said should be directly related to what is on the screen. If necessary, you can repeat the summary slide at the end again.',
    examples: [
      {
        variant: 'text-heavy',
        feedback: 'negative',
        caption: 'Too much text in one place creates cognitive overload. The audience will read instead of listening.',
        data: {
          title: 'Collaborative thinking to further the overall value proposition',
          items: [
            'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
            'Iterative approaches to corporate strategy foster collaborative thinking.',
            'Organically grow the holistic world view of disruptive innovation.',
            'Bring to the table win-win survival strategies to ensure domination.',
            'At the end of the day, going forward, a new normal that has evolved.',
            'User generated content in real-time will have multiple touchpoints.'
          ]
        }
      },
      {
        variant: 'structured-sequence',
        feedback: 'positive',
        caption: 'Broken down into Intro, Summary, and Detail slides helps manage cognitive load.',
        data: {
          labels: ['Collaborative thinking']
        }
      }
    ]
  },
  {
    id: 'clean-graphics',
    title: 'Remove extraneous text from graphics and diagrams',
    description: 'Clean up complex diagrams by removing the title, too many labels and descriptive paragraphs, allowing you to zoom in on the graphic itself.',
    examples: [
      {
        variant: 'small-graphic',
        feedback: 'negative',
        caption: 'Small graphics and text cause eye strain and disengagement.',
        data: {
          title: 'Nanotechnology immersion along the highway',
          items: ['Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.']
        }
      },
      {
        variant: 'zoomed-graphic',
        feedback: 'positive',
        caption: 'Big, bold graphics that fill the screen are easier to process and remember.',
        data: {}
      }
    ]
  },
  {
    id: 'zoom-images',
    title: 'Zooming in on images',
    description: 'Full-screen images are better than images next to text. You almost never lose any important information by cropping. The text should be just enough to support what is being said in the video - not replace it (unless it is a quotation).',
    examples: [
      {
        variant: 'split-attention',
        feedback: 'negative',
        caption: 'Text competes with image for attention (Split-Attention Effect).',
        data: {
          title: 'Maximising minimums',
          imageSrc: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=400',
          items: [
            'Proactively envisioned multimedia',
            'Expertise and cross-media growth',
            'Quality intellectual capital',
            'Superior collaboration'
          ]
        }
      },
      {
        variant: 'immersive',
        feedback: 'positive',
        caption: 'Immersive images with minimal text set the context instantly.',
        data: {
          title: 'Maximising minimums',
          labels: ['(Carls, Chunk, Hendersson 2016)'],
          imageSrc: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=800'
        }
      }
    ]
  }
];
