import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './views/Home';
import ProsCons from './views/ProsCons';
import SixTasks from './views/SixTasks';
import TaskDetail from './views/TaskDetail';
import Questions from './views/Questions';
import QuestionDetail from './views/QuestionDetail';
import Platforms from './views/Platforms';
import LearningTips from './views/LearningTips';
import Principles from './views/Principles';
import CognitivePrinciples from './views/CognitivePrinciples';
import PrincipleDetail from './views/PrincipleDetail';
import Tools from './views/Tools';
import Resources from './views/Resources';
import Readings from './views/Readings';
import SlideDesign from './views/SlideDesign';
import Bookmarks from './views/Bookmarks';
import { navigationItems } from './data/home';
import { BookmarkProvider } from './context/BookmarkContext';

const AppContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <Layout 
      navItems={navigationItems} 
      currentPath={location.pathname}
      onNavigate={(path) => navigate(path)}
      isSearchOpen={isSearchOpen}
      onSearchOpen={() => setIsSearchOpen(true)}
      onSearchClose={() => setIsSearchOpen(false)}
    >
      <Routes>
        <Route path="/" element={<Home onNavigate={(path) => navigate(path)} onOpenSearch={() => setIsSearchOpen(true)} />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/pros-cons" element={<ProsCons />} />
        <Route path="/tasks" element={<SixTasks />} />
        <Route path="/tasks/:id" element={<TaskDetail />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/questions/:id" element={<QuestionDetail />} />
        <Route path="/learning-tips" element={<LearningTips />} />
        <Route path="/platforms" element={<Platforms />} />
        <Route path="/cognitive-principles" element={<CognitivePrinciples />} />
        <Route path="/principles" element={<Principles />} />
        <Route path="/principles/:id" element={<PrincipleDetail />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/readings" element={<Readings />} />
        <Route path="/slide-design" element={<SlideDesign />} />
      </Routes>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <BookmarkProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </BookmarkProvider>
  );
};

export default App;
