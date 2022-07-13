import { ToastProvider } from '../toast';

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * All providers
 * @param props
 * @returns
 */
export function Providers(props: ProvidersProps) {
  return <ToastProvider>{props.children}</ToastProvider>;
}
