/**
 * Error boundary component for graceful error handling
 */

import { Component, ReactNode } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import './ErrorBoundary.css';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary">
          <Card variant="elevated" padding="large" className="error-boundary__card">
            <div className="error-boundary__icon">⚠️</div>
            <h2 className="error-boundary__title">Oops! Something went wrong</h2>
            <p className="error-boundary__message">
              We encountered an unexpected error. Don't worry, your progress is saved!
            </p>
            {this.state.error && (
              <details className="error-boundary__details">
                <summary>Error details</summary>
                <pre className="error-boundary__stack">
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <div className="error-boundary__actions">
              <Button variant="primary" size="large" onClick={this.handleReset}>
                Try Again
              </Button>
              <Button
                variant="secondary"
                size="large"
                onClick={() => window.location.reload()}
              >
                Reload Page
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
