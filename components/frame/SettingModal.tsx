// components/Modal.js
import { useEffect } from 'react';

export default function KBSettingModal({
  title,
  isOpen,
  onClose,
  children
}: {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="absolute z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div className="z-40 m-4 flex h-4/5 w-full flex-col rounded-lg bg-my-bg p-4 dark:bg-my-darkbg2 sm:w-2/3">
        {/* header */}
        <div className="flex items-center justify-between border-b-2 border-my-border px-1 pb-2 dark:border-my-darkborder">
          <label className="text-lg font-semibold text-my-text0 dark:text-my-darktext0">
            {title}
          </label>
          <button className="h-6 w-6" onClick={onClose}>
            <svg viewBox="0 0 1024 1024">
              <path d="M0 0h1024v1024H0z" fill="#FF0033" fillOpacity="0"></path>
              <path
                d="M240.448 168l2.346667 2.154667 289.92 289.941333 279.253333-279.253333a42.666667 42.666667 0 0 1 62.506667 58.026666l-2.133334 2.346667-279.296 279.210667 279.274667 279.253333a42.666667 42.666667 0 0 1-58.005333 62.528l-2.346667-2.176-279.253333-279.253333-289.92 289.962666a42.666667 42.666667 0 0 1-62.506667-58.005333l2.154667-2.346667 289.941333-289.962666-289.92-289.92a42.666667 42.666667 0 0 1 57.984-62.506667z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </div>
        {/* body */}
        <div className="flex flex-shrink flex-grow flex-col overflow-y-auto px-2 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}
