
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Error caught in error boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return <h2>Something went wrong. Please try again later.</h2>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;