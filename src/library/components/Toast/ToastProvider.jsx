import { nanoid } from 'nanoid';
import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import { StyledToastWrapper } from './styled';
import { Toast } from './Toast';
import { ToastContext } from './ToastContext';

export const ToastProvider = (props) => {
  const [toasts, setToasts] = useState([]);
  const open = (content) => setToasts((currentToasts) => [...currentToasts, { id: nanoid, content }]);
  const close = (id) => setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  const contextValue = useMemo(() => ({ open }), []);

  return (
    <ToastContext.Provider value={contextValue}>
      {props.children}

      {createPortal(
        <StyledToastWrapper className="toasts-wrapper">
          {toasts.map((toast) => (
            <Toast key={toast.id} close={() => close(toast.id)}>
              {toast.content}
            </Toast>
          ))}
        </StyledToastWrapper>,
        document.body
      )}
    </ToastContext.Provider>
  );
};
