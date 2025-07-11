import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const shortcuts = [
  { key: 'D', description: 'Go to Dashboard', path: '/' },
  { key: 'T', description: 'View Transactions', path: '/transactions' },
  { key: 'A', description: 'View Accounts', path: '/accounts' },
  { key: 'I', description: 'View Investments', path: '/investments' },
  { key: 'C', description: 'View Credit Cards', path: '/credit-cards' },
  { key: 'S', description: 'Go to Settings', path: '/settings' },
  { key: '?', description: 'Show this help', path: null },
  { key: 'Esc', description: 'Close modals/menus', path: null },
];

export default function KeyboardShortcuts() {
  const [showHelp, setShowHelp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (event.target instanceof HTMLInputElement || 
          event.target instanceof HTMLTextAreaElement ||
          event.target instanceof HTMLSelectElement) {
        return;
      }

      // Handle Escape key
      if (event.key === 'Escape') {
        setShowHelp(false);
        return;
      }

      // Handle help toggle
      if (event.key === '?' && !event.shiftKey) {
        event.preventDefault();
        setShowHelp(!showHelp);
        return;
      }

      // Handle navigation shortcuts (only with Ctrl/Cmd)
      if (event.ctrlKey || event.metaKey) {
        const shortcut = shortcuts.find(s => 
          s.key.toLowerCase() === event.key.toLowerCase() && s.path
        );
        
        if (shortcut) {
          event.preventDefault();
          navigate(shortcut.path!);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [navigate, showHelp]);

  if (!showHelp) {
    return (
      <button
        onClick={() => setShowHelp(true)}
        className="fixed bottom-6 right-6 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        title="Keyboard shortcuts (?)"
      >
        <QuestionMarkCircleIcon className="w-5 h-5" />
      </button>
    );
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={() => setShowHelp(false)}
      />
      
      {/* Help Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Keyboard Shortcuts</h2>
            <button
              onClick={() => setShowHelp(false)}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700">Navigation (Ctrl/Cmd + Key)</h3>
              {shortcuts.filter(s => s.path && s.key !== '?').map((shortcut) => (
                <div key={shortcut.key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{shortcut.description}</span>
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs font-mono">
                    Ctrl+{shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <h3 className="text-sm font-medium text-gray-700">General</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Show this help</span>
                <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs font-mono">
                  ?
                </kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Close modals/menus</span>
                <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs font-mono">
                  Esc
                </kbd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}