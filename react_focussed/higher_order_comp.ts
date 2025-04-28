// 3.3 Higher-Order Components (HoC)

// Task: 
// Create a Higher-Order Component withErrorBoundary that wraps any component and catches rendering errors.
// Add fallback UI and optional retry mechanism.

// Focus: 
// HoC patterns, error boundaries, reusable patterns in React

import React, { Component, ReactNode } from 'react';

// The HoC that wraps another component with error boundary
export function withErrorBoundary<P>(WrappedComponent: React.ComponentType<P>) {
  return class ErrorBoundary extends Component<P, { hasError: boolean }> {
    constructor(props: P) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(): { hasError: boolean } {
      return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    handleRetry = () => {
      this.setState({ hasError: false });
    };

    render(): ReactNode {
      if (this.state.hasError) {
        return (
          <div style={{ padding: '1rem', color: 'red' }}>
            <h2>Something went wrong.</h2>
            <button onClick={this.handleRetry}>Retry</button>
          </div>
        );
      }

      return <WrappedComponent {...this.props} />;
    }
  };
}