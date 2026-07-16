---
name: "Instructional Videos Framework"
description: "Operationalises evidence from multimedia-learning research as concrete decisions for educators making instructional video."
categories: [content-distribution, web-app, built-by-ai]
updated: 2026-07-16
deployments:
  Appsite:
    "Instructional Videos Framework": https://instructionalvideos.edutools.fyi/
---
# Instructional Video Guide

An interactive, evidence-based guide for creating effective instructional videos in higher education. This application operationalizes cognitive science principles (specifically Mayer's Principles of Multimedia Learning) into actionable tasks and advice for educators.

## Project Architecture

This application is built as a **static Single Page Application (SPA)** using React 19. It is designed to be lightweight, maintainable, and deployable without a complex backend.

### Tech Stack

*   **Frontend**: React 19, ReactDOM 19
*   **Routing**: React Router DOM v7 (using `HashRouter` for maximum static hosting compatibility)
*   **Styling**: Tailwind CSS (via CDN)
*   **Icons**: Lucide React
*   **Data**: Static TypeScript/JSON objects (No database required)
*   **Utilities**: 
    *   `JSZip` & `File-Saver` for client-side eBook (.epub) generation.
    *   Custom client-side search engine.

### Folder Structure

The project follows a feature-based organization inside the root directory:

*   **`data/`**: The core content management layer. All textual content, relational mappings (Principles <-> Tasks), and configuration live here in strongly typed `.ts` files. This decouples content from UI.
*   **`views/`**: Top-level page components (e.g., `Home.tsx`, `SixTasks.tsx`, `PrincipleDetail.tsx`). These map 1:1 with the routes defined in `App.tsx`.
*   **`components/`**: Reusable UI blocks:
    *   `Layout.tsx`: Handles the responsive sidebar, mobile header, and global search overlay.
    *   `GlobalSearch.tsx`: An accessible, keyboard-navigable command palette.
    *   `SlideSimulation.tsx`: Specialized component for rendering interactive "Good vs Bad" slide comparisons.
*   **`context/`**: Contains `BookmarkContext` which handles local storage persistence for user saved items.
*   **`utils/`**:
    *   `search.ts`: Indexes the disparate data files into a unified search result format.
    *   `epubGenerator.ts`: logic to compile the site's content into a downloadable EPUB file.

### Data & Relational Model

Although static, the app maintains a relational web between content types:
1.  **Tasks** (Actions) are linked to **Principles** (Theory) via IDs.
2.  **Questions** (Common problems) are linked to both **Tasks** and **Principles**.
3.  **Search**: The global search aggregates all data sources (Tasks, Questions, Principles, Tools, Resources) into a flat index on the fly.

## Deployment Details

### Building & Running

The application uses ES Modules and an Import Map defined in `index.html` to load dependencies directly from CDNs.

1.  **No Build Step**: In this environment, the `.tsx` compilation is handled on the fly.
2.  **Static Serving**: The app can be served by any static file server pointing to `index.html`.

### Hosting

Because the app uses `HashRouter` (`/#/tasks`), it is compatible with purely static hosting environments where you cannot configure server-side redirects (e.g., GitHub Pages, standard S3 buckets).

*   **Entry Point**: `index.html`
*   **Configuration**: `metadata.json` defines app metadata.

### Offline Capability

The application includes an **"Export as eBook"** feature. This runs entirely in the browser, compiling the React content and raw data into an `.epub` file, allowing users to take the guide offline without needing a PWA service worker.
