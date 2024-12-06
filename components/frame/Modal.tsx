// components/Modal.js
import { useEffect } from 'react';
import Mask from './Mask';

export default function Modal({
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

  return (
    <>
      {/* Modal */}
      <div
        className={
          `fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 duration-300 ` +
          `${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`
        }
      >
        <div
          className={
            `flex flex-col rounded-lg bg-my-bg p-4 duration-300 dark:bg-my-darkbg1 ` +
            `${isOpen ? 'scale-100' : 'scale-95'}`
          }
        >
          {/* header */}
          <div className="flex items-center justify-between border-b-2 border-my-border pb-2 dark:border-my-darkborder">
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
          <div className="flex flex-shrink flex-grow flex-col overflow-y-auto px-2 pt-3">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
