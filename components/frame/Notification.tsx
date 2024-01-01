import { Slide, ToastContainer, cssTransition, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './slide.css';

export default function Notification() {
  const transStyle = cssTransition({
    enter: 'slide-enter',
    exit: 'slide-exit'
    // collapse: true
  });

  return (
    <div className="relative">
      <ToastContainer
        style={{
          position: 'absolute'
        }}
        position="top-center"
        // transition={Slide}
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
