import styled from 'styled-components';

export const StyledToastWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 250ms ease;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 10%;
  text-align: center;
`;
export const StyledToast = styled.div`
  transition: transform 250ms ease;
  height: 64px;
`;
export const ToastInner = styled.div`
  @keyframes slideUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
  }
  transform: scale(1) translate3d(0, 0, 0);
  transition: all 0.3s cubic-bezier(0.6, 0.4, 0, 1);
  animation: slideUp 500ms ease forwards 1;
  background: black;
  border-radius: 25px;

  display: flex;
  align-items: center;
  height: 50px;
  width: fit-content;
  color: white;
  padding: 0 20px;
`;
