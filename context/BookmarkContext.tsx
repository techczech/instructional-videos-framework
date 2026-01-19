import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Bookmark {
  id: string;
  type: string;
  title: string;
  path: string;
}

interface BookmarkContextType {
  bookmarks: Bookmark[];
  addBookmark: (item: Bookmark) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('iv_guide_bookmarks');
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse bookmarks", e);
      }
    }
  }, []);

  // Save to localStorage whenever bookmarks change
  useEffect(() => {
    localStorage.setItem('iv_guide_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (item: Bookmark) => {
    setBookmarks(prev => {
      if (prev.some(b => b.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  const isBookmarked = (id: string) => {
    return bookmarks.some(b => b.id === id);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};
