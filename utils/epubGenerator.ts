
import JSZip from 'jszip';
import saveAs from 'file-saver';
import { appInfo } from '../data/home';
import { tasksData, tasksIntro } from '../data/tasks';
import { questionsData, questionsIntro } from '../data/questions';
import { mayerPrinciples, mayerContext } from '../data/principles';
import { modesComparisonData, sectionIntro as prosConsIntro } from '../data/modesComparison';
import { slideDesignSections } from '../data/slideDesign';
import { platformPageData, platformComparisonTable, learningTips, reflectionData } from '../data/platforms';
import { toolMatrix } from '../data/tools';
import { resourceCategories } from '../data/resources';
import { readingsData } from '../data/readings';

// Helper to escape XML characters
const escapeXml = (unsafe: string): string => {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
};

// Only escape if not already HTML (basic check)
const safeText = (text: string) => escapeXml(text);
// For content we know contains HTML tags like <strong>, we keep them but ensure valid XHTML structure if needed. 
// Since the source data uses simple tags, we mostly trust it but standardizing text helps.
const processHtmlContent = (html: string) => {
    // Basic cleanup for EPUB (XHTML) compatibility
    return html.replace(/<br>/g, '<br/>');
};

const createXHTML = (title: string, content: string) => `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
    <title>${escapeXml(title)}</title>
    <link rel="stylesheet" type="text/css" href="style.css" />
</head>
<body>
    <h1>${escapeXml(title)}</h1>
    ${content}
</body>
</html>`;

const generateIntroHtml = () => {
    return `
        <div class="intro">
            <p class="subtitle">${escapeXml(appInfo.subtitle)}</p>
            <p>${escapeXml(appInfo.intro)}</p>
            <div class="meta">
                <p><strong>Author:</strong> ${escapeXml(appInfo.author)}</p>
                <p><strong>Year:</strong> ${escapeXml(appInfo.year)}</p>
                <p><strong>License:</strong> ${escapeXml(appInfo.license)}</p>
            </div>
        </div>
    `;
};

const generateProsConsHtml = () => {
    let html = `<p>${escapeXml(prosConsIntro)}</p>`;
    
    modesComparisonData.forEach(mode => {
        html += `<h2>${escapeXml(mode.mode)}</h2>`;
        
        // Student Perspective
        html += `<h3>Student Perspective</h3>`;
        if (mode.perspectives.student.pros.length > 0) {
            html += `<h4>Pros</h4><ul>${mode.perspectives.student.pros.map(p => `<li>${escapeXml(p.text)}</li>`).join('')}</ul>`;
        }
        if (mode.perspectives.student.cons.length > 0) {
            html += `<h4>Cons</h4><ul>${mode.perspectives.student.cons.map(p => `<li>${escapeXml(p.text)}</li>`).join('')}</ul>`;
        }

        // Lecturer Perspective
        html += `<h3>Lecturer Perspective</h3>`;
        if (mode.perspectives.lecturer.pros.length > 0) {
            html += `<h4>Pros</h4><ul>${mode.perspectives.lecturer.pros.map(p => `<li>${escapeXml(p.text)}</li>`).join('')}</ul>`;
        }
        if (mode.perspectives.lecturer.cons.length > 0) {
            html += `<h4>Cons</h4><ul>${mode.perspectives.lecturer.cons.map(p => `<li>${escapeXml(p.text)}</li>`).join('')}</ul>`;
        }
        html += `<hr/>`;
    });
    return html;
};

const generateTasksHtml = () => {
    let html = `<p>${escapeXml(tasksIntro)}</p>`;
    tasksData.forEach(task => {
        html += `
            <div class="task">
                <h2>Task ${task.id}: ${escapeXml(task.title)}</h2>
                <p>${escapeXml(task.description)}</p>
                <h3>Action Points</h3>
                <ul>
                    ${task.actionPoints.map(ap => `<li>${processHtmlContent(ap)}</li>`).join('')}
                </ul>
                <p><strong>Related Principles:</strong> ${escapeXml(task.principles)}</p>
            </div>
            <hr/>
        `;
    });
    return html;
};

const generateQuestionsHtml = () => {
    let html = `<p>${escapeXml(questionsIntro)}</p>`;
    questionsData.forEach(cat => {
        html += `<h2>${escapeXml(cat.title)}</h2>`;
        cat.questions.forEach(q => {
            html += `
                <div class="question">
                    <h3>${q.id}. ${escapeXml(q.question)}</h3>
                    ${q.answer.map(a => `<p>${processHtmlContent(a)}</p>`).join('')}
                </div>
            `;
        });
    });
    return html;
};

const generatePrinciplesHtml = () => {
    let html = `<p>${escapeXml(mayerContext.intro)}</p>`;
    html += `<h3>Cognitive Principles</h3><ul>${mayerContext.principles.map(p => `<li>${escapeXml(p)}</li>`).join('')}</ul>`;
    
    html += `<h2>The 12 Principles</h2>`;
    mayerPrinciples.forEach(p => {
        html += `
            <div class="principle">
                <h3>${p.id}. ${escapeXml(p.name)}</h3>
                <p><em>Effect Size: ${escapeXml(p.effectSize || 'N/A')}</em></p>
                <p>${escapeXml(p.definition)}</p>
            </div>
        `;
    });
    return html;
};

const generateSlideDesignHtml = () => {
    let html = ``;
    slideDesignSections.forEach(section => {
        html += `<h2>${escapeXml(section.title)}</h2>`;
        html += `<p>${escapeXml(section.description)}</p>`;
        
        section.examples.forEach((ex, idx) => {
           html += `<div class="example">`;
           html += `<h3>Example ${idx + 1} (${ex.feedback === 'positive' ? 'Do this' : 'Avoid this'})</h3>`;
           html += `<p><strong>Caption:</strong> ${escapeXml(ex.caption || '')}</p>`;
           if (ex.data.title) html += `<p><strong>Title:</strong> ${escapeXml(ex.data.title)}</p>`;
           if (ex.data.items) {
               html += `<ul>${ex.data.items.map(i => `<li>${escapeXml(i)}</li>`).join('')}</ul>`;
           }
           html += `</div>`;
        });
        html += `<hr/>`;
    });
    return html;
};

const generatePlatformsHtml = () => {
    let html = `<p>${processHtmlContent(platformPageData.intro)}</p>`;
    
    // Modes
    html += `<h3>${escapeXml(platformPageData.modesListTitle)}</h3><ul>`;
    platformPageData.modes.forEach(m => html += `<li>${escapeXml(m.text)}</li>`);
    html += `</ul>`;

    // Sections
    html += `<h2>${escapeXml(platformPageData.sectionsTitle)}</h2>`;
    html += `<p>${escapeXml(platformPageData.sectionsIntro)}</p>`;
    platformPageData.sections.forEach(sec => {
        html += `<h3>${escapeXml(sec.title)}</h3>`;
        sec.content.forEach(p => html += `<p>${processHtmlContent(p)}</p>`);
    });

    // Table
    html += `<h2>${escapeXml(platformComparisonTable.title)}</h2>`;
    html += `<table border="1" cellpadding="5" cellspacing="0" style="border-collapse:collapse; width:100%">`;
    html += `<thead><tr>${platformComparisonTable.headers.map(h => `<th>${escapeXml(h)}</th>`).join('')}</tr></thead>`;
    html += `<tbody>`;
    platformComparisonTable.rows.forEach(row => {
        html += `<tr>${row.map(cell => `<td>${escapeXml(String(cell))}</td>`).join('')}</tr>`;
    });
    html += `</tbody></table>`;
    return html;
};

const generateLearningTipsHtml = () => {
    let html = ``;
    const allSections = [...learningTips, {
        title: reflectionData.title,
        intro: reflectionData.content,
        tips: [] as any[],
        outro: ''
    }];

    allSections.forEach(sec => {
        html += `<h2>${escapeXml(sec.title)}</h2>`;
        sec.intro.forEach(p => html += `<p>${processHtmlContent(p)}</p>`);
        
        if (sec.tips && sec.tips.length > 0) {
            html += `<ul>`;
            sec.tips.forEach(t => {
                html += `<li><strong>${escapeXml(t.title)}:</strong> ${escapeXml(t.content)}</li>`;
            });
            html += `</ul>`;
        }
        if (sec.outro) html += `<p>${processHtmlContent(sec.outro)}</p>`;
        html += `<hr/>`;
    });
    return html;
};

const generateToolsHtml = () => {
    let html = ``;
    toolMatrix.forEach(cat => {
        html += `<h2>${escapeXml(cat.type)}</h2>`;
        html += `<p><strong>Purpose:</strong> ${processHtmlContent(cat.purpose)}</p>`;
        html += `<h3>Tools:</h3>`;
        html += `<ul>${cat.tools.map(t => `<li>${processHtmlContent(t)}</li>`).join('')}</ul>`;
    });
    return html;
};

const generateResourcesHtml = () => {
    let html = `<p>This section lists examples of instructional videos. In this eBook version, please use the links to view the content online.</p>`;
    
    resourceCategories.forEach(cat => {
        html += `<h2>${escapeXml(cat.heading)}</h2>`;
        if (cat.content) html += `<p>${escapeXml(cat.content)}</p>`;
        
        if (cat.videos.length > 0) {
            html += `<ul>`;
            cat.videos.forEach(vid => {
                html += `<li>`;
                if (vid.title) html += `<strong>${escapeXml(vid.title)}</strong><br/>`;
                html += `<a href="${vid.url}">${vid.url}</a>`;
                if (vid.description) html += `<br/>${escapeXml(vid.description)}`;
                html += `</li>`;
            });
            html += `</ul>`;
        } else {
            html += `<p><em>No videos in this category.</em></p>`;
        }
        html += `<hr/>`;
    });
    return html;
};

const generateReadingsHtml = () => {
    let html = `<p>${processHtmlContent(readingsData.intro)}</p>`;
    html += `<p><a href="${readingsData.referencesLink}">${readingsData.referencesLink}</a></p>`;
    html += `<h2>${escapeXml(readingsData.keyReferencesTitle)}</h2>`;
    html += `<ul>`;
    readingsData.references.forEach(ref => {
        html += `<li>${escapeXml(ref.text)}`;
        if (ref.link) html += ` <br/><a href="${ref.link}">${ref.link}</a>`;
        html += `</li>`;
    });
    html += `</ul>`;
    return html;
};

// Main Generation Function
export const generateEpub = async () => {
    const zip = new JSZip();

    // 1. Mimetype
    zip.file("mimetype", "application/epub+zip", { compression: "STORE" });

    // 2. Container
    zip.folder("META-INF")?.file("container.xml", `<?xml version="1.0"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
    <rootfiles>
        <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
    </rootfiles>
</container>`);

    const oebps = zip.folder("OEBPS");

    // 3. CSS
    oebps?.file("style.css", `
        body { font-family: sans-serif; line-height: 1.6; padding: 1em; }
        h1 { color: #4338ca; text-align: center; margin-bottom: 1em; }
        h2 { color: #3730a3; margin-top: 1.5em; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5em; }
        h3 { color: #4f46e5; margin-top: 1.2em; }
        h4 { color: #6366f1; font-size: 1em; font-weight: bold; }
        .intro { text-align: center; }
        .subtitle { font-size: 1.2em; font-style: italic; color: #6b7280; }
        .meta { margin-top: 2em; font-size: 0.9em; color: #4b5563; }
        table { width: 100%; border-collapse: collapse; margin: 1em 0; }
        th { background: #f3f4f6; text-align: left; }
        td, th { padding: 0.5em; border: 1px solid #d1d5db; }
        hr { border: 0; border-top: 1px solid #e5e7eb; margin: 2em 0; }
        a { color: #4f46e5; text-decoration: none; }
    `);

    // 4. Content Chapters
    const chapters = [
        { id: 'intro', title: 'Introduction', content: generateIntroHtml() },
        { id: 'proscons', title: 'Videos vs Other Modes', content: generateProsConsHtml() },
        { id: 'tasks', title: '6 Tasks of Effective Videos', content: generateTasksHtml() },
        { id: 'questions', title: '15 Questions', content: generateQuestionsHtml() },
        { id: 'principles', title: 'Multimedia Principles', content: generatePrinciplesHtml() },
        { id: 'slide-design', title: 'Slide Design', content: generateSlideDesignHtml() },
        { id: 'learning-tips', title: 'Learning Tips', content: generateLearningTipsHtml() },
        { id: 'platforms', title: 'Platforms & Access', content: generatePlatformsHtml() },
        { id: 'tools', title: 'Production Tools', content: generateToolsHtml() },
        { id: 'resources', title: 'Video Examples', content: generateResourcesHtml() },
        { id: 'readings', title: 'Readings', content: generateReadingsHtml() },
    ];

    chapters.forEach(ch => {
        oebps?.file(`${ch.id}.xhtml`, createXHTML(ch.title, ch.content));
    });

    // 5. Package Document (OPF)
    const opfContent = `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="BookId" version="3.0">
    <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
        <dc:title>${escapeXml(appInfo.title)}</dc:title>
        <dc:creator>${escapeXml(appInfo.author)}</dc:creator>
        <dc:language>en</dc:language>
        <dc:identifier id="BookId">urn:uuid:12345-instructional-video-guide</dc:identifier>
        <meta property="dcterms:modified">${new Date().toISOString().split('.')[0]}Z</meta>
    </metadata>
    <manifest>
        <item id="css" href="style.css" media-type="text/css"/>
        <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
        ${chapters.map(ch => `<item id="${ch.id}" href="${ch.id}.xhtml" media-type="application/xhtml+xml"/>`).join('\n        ')}
    </manifest>
    <spine>
        ${chapters.map(ch => `<itemref idref="${ch.id}"/>`).join('\n        ')}
    </spine>
</package>`;
    oebps?.file("content.opf", opfContent);

    // 6. Navigation Document (EPUB 3 NAV)
    const navContent = `<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="en">
<head><title>Navigation</title></head>
<body>
    <nav epub:type="toc">
        <ol>
            ${chapters.map(ch => `<li><a href="${ch.id}.xhtml">${escapeXml(ch.title)}</a></li>`).join('\n            ')}
        </ol>
    </nav>
</body>
</html>`;
    oebps?.file("nav.xhtml", navContent);

    // 7. NCX (Legacy TOC)
    const ncxContent = `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
    <head>
        <meta name="dtb:uid" content="urn:uuid:12345-instructional-video-guide"/>
        <meta name="dtb:depth" content="1"/>
        <meta name="dtb:totalPageCount" content="0"/>
        <meta name="dtb:maxPageNumber" content="0"/>
    </head>
    <docTitle><text>${escapeXml(appInfo.title)}</text></docTitle>
    <navMap>
        ${chapters.map((ch, idx) => `
        <navPoint id="navPoint-${idx+1}" playOrder="${idx+1}">
            <navLabel><text>${escapeXml(ch.title)}</text></navLabel>
            <content src="${ch.id}.xhtml"/>
        </navPoint>`).join('')}
    </navMap>
</ncx>`;
    oebps?.file("toc.ncx", ncxContent);

    // Generate Blob
    const blob = await zip.generateAsync({ type: "blob", mimeType: "application/epub+zip" });
    saveAs(blob, "Instructional_Videos_Guide.epub");
};
