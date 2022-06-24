import { useTimeout } from '../../hooks/useTimeout';
import { StyledToast, ToastInner } from './styled';

export const Toast = (props) => {
  useTimeout(props.close, 1000);

  return (
    <StyledToast className="toast">
      <ToastInner>{props.children}</ToastInner>
    </StyledToast>
  );
};
