import { ToastContainer, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './slide.css';

export default function MyToastContainer() {
  const transStyle = cssTransition({
    enter: 'slide-enter',
    exit: 'slide-exit'
  });

  return (
    <div className="relative transition-transform">
      <ToastContainer
        className="toast-container"
        bodyClassName="toast-wrapper"
        style={{
          position: 'absolute'
          //   transform: 'translateY(0)'
        }}
        position="top-center"
        transition={transStyle}
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        //   draggable
        pauseOnHover
        theme="colored"
        //   limit={3}
      ></ToastContainer>
    </div>
  );
}
