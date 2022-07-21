import React, { Component, ErrorInfo, ReactNode } from "react";
import ErrorScreen from "./ErrorScreen";

type Props = {
  children?: ReactNode;
};

type State = {
  error: Error | null;
  fallback?: (({ error }: { error: Error }) => JSX.Element) | null;
};

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: null,
    fallback: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { error: error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }
  public render() {
    const error = this.state.error;
    const fallback = this.state.fallback;
    const resetErrorBoundary = () => (this.state.error = null);
    if (error && !fallback) {
      // default ErrorScreen
      return (
        <ErrorScreen error={error} resetErrorBoundary={resetErrorBoundary} />
      );
    }
    if (error && fallback) return fallback({ error });
    return this.props.children;
  }
}

export default ErrorBoundary;
