import React, { Component } from "react";
import T from "prop-types";

const logErrorToMyService = () => {};

const Fallback = () => <div>Something went wrong</div>;

// TODO ADD FALLBACK AND OVERRIDE
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children, fallback } = this.props;
    if (hasError) {
      // You can render any custom fallback UI
      return fallback;
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: T.node.isRequired,
  fallback: T.node,
};

ErrorBoundary.defaultProps = {
  fallback: <Fallback />,
};
