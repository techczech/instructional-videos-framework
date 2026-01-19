import { tasksData, tasksIntro } from '../data/tasks';
import { questionsData, questionsIntro } from '../data/questions';
import { mayerPrinciples, mayerContext } from '../data/principles';
import { toolMatrix } from '../data/tools';
import { resourceCategories } from '../data/resources';
import { slideDesignSections } from '../data/slideDesign';
import { modesComparisonData, sectionIntro as prosConsIntro } from '../data/modesComparison';
import { learningTips } from '../data/platforms';
import { appInfo } from '../data/home';
import { SearchResult } from '../types';

const stripHtml = (html: string) => {
  if (typeof document === 'undefined') return html; 
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

const getSnippet = (text: string, query: string): string => {
  const lowerText = text.toLowerCase();
  const index = lowerText.indexOf(query);
  if (index === -1) return text.substring(0, 80) + '...';
  
  const start = Math.max(0, index - 30);
  const end = Math.min(text.length, index + query.length + 50);
  return (start > 0 ? '...' : '') + text.substring(start, end) + (end < text.length ? '...' : '');
}

export const searchContent = (query: string): SearchResult[] => {
  if (!query || query.trim().length < 2) return [];
  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  // 1. General App Info
  if (appInfo.name.toLowerCase().includes(q) || appInfo.intro.toLowerCase().includes(q) || appInfo.subtitle.toLowerCase().includes(q)) {
      results.push({
          id: 'home-intro',
          title: appInfo.name,
          snippet: getSnippet(appInfo.intro, q),
          path: '/',
          type: 'General',
          icon: 'Home'
      });
  }

  // 2. Cognitive Principles (Mayer Context)
  mayerContext.principles.forEach((p, idx) => {
      if (p.toLowerCase().includes(q)) {
          const title = p.split(':')[0] || 'Cognitive Principle';
          results.push({
              id: `cog-principle-${idx}`,
              title: title,
              snippet: getSnippet(p, q),
              path: '/cognitive-principles',
              type: 'Cognitive Principle',
              icon: 'Layers'
          });
      }
  });

  // 3. Section Intros
  
  // Principles Intro
  if (mayerContext.intro.toLowerCase().includes(q)) {
      results.push({
         id: 'mayer-intro',
         title: 'Multimedia Principles Intro',
         snippet: getSnippet(mayerContext.intro, q),
         path: '/principles',
         type: 'Section Intro',
         icon: 'Brain'
     });
  }

  // Tasks Intro
  if (tasksIntro.toLowerCase().includes(q)) {
      results.push({
         id: 'tasks-intro',
         title: '6 Tasks Overview',
         snippet: getSnippet(tasksIntro, q),
         path: '/tasks',
         type: 'Section Intro',
         icon: 'CheckSquare'
     });
  }

  // Questions Intro
  if (questionsIntro.toLowerCase().includes(q)) {
      results.push({
         id: 'questions-intro',
         title: 'Q&A Overview',
         snippet: getSnippet(questionsIntro, q),
         path: '/questions',
         type: 'Section Intro',
         icon: 'HelpCircle'
     });
  }

  // ProsCons Intro
  if (prosConsIntro.toLowerCase().includes(q)) {
      results.push({
         id: 'pros-cons-intro',
         title: 'Comparison Overview',
         snippet: getSnippet(prosConsIntro, q),
         path: '/pros-cons',
         type: 'Section Intro',
         icon: 'Scale'
     });
  }

  // 4. Tasks
  tasksData.forEach(task => {
    if (task.title.toLowerCase().includes(q) || task.description.toLowerCase().includes(q) || task.actionPoints.some(ap => ap.toLowerCase().includes(q))) {
      results.push({
        id: `task-${task.id}`,
        title: task.title,
        snippet: task.description.toLowerCase().includes(q) ? getSnippet(task.description, q) : getSnippet(task.actionPoints.join(' '), q),
        path: `/tasks/${task.id}`,
        type: 'Task',
        icon: 'CheckSquare'
      });
    }
  });

  // 5. Questions
  questionsData.forEach(cat => {
    cat.questions.forEach(quest => {
        const answerText = quest.answer.map(a => stripHtml(a)).join(' ');
        if (quest.question.toLowerCase().includes(q) || answerText.toLowerCase().includes(q)) {
             results.push({
                id: `q-${quest.id}`,
                title: quest.question,
                snippet: getSnippet(answerText, q),
                path: `/questions/${quest.id}`,
                type: 'Question',
                icon: 'HelpCircle'
             });
        }
    });
  });

  // 6. Principles
  mayerPrinciples.forEach(p => {
    if (p.name.toLowerCase().includes(q) || p.definition.toLowerCase().includes(q)) {
        results.push({
            id: `principle-${p.id}`,
            title: p.name,
            snippet: getSnippet(p.definition, q),
            path: `/principles/${p.id}`,
            type: 'Principle',
            icon: 'Brain'
        });
    }
  });

  // 7. Tools
  toolMatrix.forEach((cat, idx) => {
      const toolsText = cat.tools.map(t => stripHtml(t)).join(' ');
      if (cat.type.toLowerCase().includes(q) || cat.purpose.toLowerCase().includes(q) || toolsText.toLowerCase().includes(q)) {
          results.push({
              id: `tool-${idx}`,
              title: cat.type,
              snippet: getSnippet(cat.purpose + ' ' + toolsText, q),
              path: `/tools`,
              type: 'Tool',
              icon: 'PenTool'
          });
      }
  });

  // 8. Resources
  resourceCategories.forEach((cat, idx) => {
      const vidText = cat.videos.map(v => v.title + ' ' + v.description).join(' ');
      if (cat.heading.toLowerCase().includes(q) || cat.content.toLowerCase().includes(q) || vidText.toLowerCase().includes(q)) {
           results.push({
              id: `resource-${idx}`,
              title: cat.heading,
              snippet: getSnippet(cat.content + ' ' + vidText, q),
              path: `/resources?slide=${idx}`,
              type: 'Resource',
              icon: 'FileText'
          });
      }
  });

  // 9. Slide Design
  slideDesignSections.forEach((sec, idx) => {
       const examplesText = sec.examples.map(e => e.caption + ' ' + e.data.title).join(' ');
       if (sec.title.toLowerCase().includes(q) || sec.description.toLowerCase().includes(q) || examplesText.toLowerCase().includes(q)) {
           results.push({
               id: `slide-${sec.id}`,
               title: sec.title,
               snippet: getSnippet(sec.description, q),
               path: `/slide-design`,
               type: 'Slide Design',
               icon: 'Layout'
           });
       }
  });

  // 10. Learning Tips
  learningTips.forEach((sec, idx) => {
       const tipsText = sec.tips.map(t => t.title + ' ' + t.content).join(' ');
       const introText = sec.intro.join(' ');
       if (sec.title.toLowerCase().includes(q) || introText.toLowerCase().includes(q) || tipsText.toLowerCase().includes(q)) {
            results.push({
                id: `tip-${sec.id}`,
                title: sec.title,
                snippet: getSnippet(introText + ' ' + tipsText, q),
                path: `/learning-tips`,
                type: 'Learning Tip',
                icon: 'Lightbulb'
            });
       }
  });

  // 11. Modes Comparison
  modesComparisonData.forEach((mode, idx) => {
      const studentPros = mode.perspectives.student.pros.map(p => p.text).join(' ');
      const studentCons = mode.perspectives.student.cons.map(p => p.text).join(' ');
      const lecPros = mode.perspectives.lecturer.pros.map(p => p.text).join(' ');
      const lecCons = mode.perspectives.lecturer.cons.map(p => p.text).join(' ');
      const allText = studentPros + studentCons + lecPros + lecCons;
      
      if (mode.mode.toLowerCase().includes(q) || allText.toLowerCase().includes(q)) {
           results.push({
               id: `mode-${idx}`,
               title: `${mode.mode} (Pros & Cons)`,
               snippet: getSnippet(allText, q),
               path: `/pros-cons`,
               type: 'Comparison',
               icon: 'BookOpen' // Using generic BookOpen or Scale if available
           });
      }
  });

  return results;
};