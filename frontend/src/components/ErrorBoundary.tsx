import React from "react";

type Props = { children: React.ReactNode };
type State = { hasError: boolean };

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
    this.reset = this.reset.bind(this);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log error for diagnostics; keep minimal to avoid leaking sensitive data
    // In production, replace with structured logger
    // eslint-disable-next-line no-console
    console.error("ErrorBoundary caught error:", error, info);
  }

  reset() {
    // Simple recovery: reload the page to attempt fresh mount
    if (typeof window !== "undefined" && window.location) {
      window.location.reload();
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4">
          <div className="max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4">Something went wrong</h2>
            <p className="mb-4">An unexpected error occurred while loading the app.</p>
            <div>
              <button
                onClick={this.reset}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children as React.ReactElement;
  }
}
