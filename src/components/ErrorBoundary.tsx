import { Component, ReactNode } from 'react';
import { recordEvent } from '@/lib/strapi-client';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.error('UI render error captured:', { error, info });
    try {
      const payload = {
        type: 'ui_error',
        message: String(error?.message || error),
        stack: String(error?.stack || ''),
        route: typeof window !== 'undefined' ? window.location.pathname : '',
        info: String(info?.componentStack || ''),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        ts: new Date().toISOString()
      };
      recordEvent(payload).catch(() => {});
    } catch {}
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-bold mb-2">Oops, an error occurred</h1>
            <p className="text-muted-foreground mb-4">We're working to fix this. You can retry below or contact support.</p>
            <button
              className="px-4 py-2 rounded bg-primary text-white"
              onClick={() => this.setState({ hasError: false })}
            >
              Retry
            </button>
            <div className="mt-3 text-sm">
              <a href="/contact" className="underline">Contact Support</a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
