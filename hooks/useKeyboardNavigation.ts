import { useEffect } from 'react';

interface KeyboardNavigationOptions {
  onNext?: () => void;
  onPrev?: () => void;
  onFirst?: () => void;
  onLast?: () => void;
  isEnabled?: boolean;
}

export const useKeyboardNavigation = ({
  onNext,
  onPrev,
  onFirst,
  onLast,
  isEnabled = true,
}: KeyboardNavigationOptions) => {
  useEffect(() => {
    if (!isEnabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if input/textarea/editable is focused
      const target = event.target as HTMLElement;
      if (
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) ||
        target.isContentEditable
      ) {
        return;
      }

      switch (event.key) {
        case 'ArrowRight':
          onNext?.();
          break;
        case 'ArrowLeft':
          onPrev?.();
          break;
        case 'h':
        case 'H':
        case 'Home':
          onFirst?.();
          break;
        case 'e':
        case 'E':
        case 'End':
          onLast?.();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEnabled, onNext, onPrev, onFirst, onLast]);
};
