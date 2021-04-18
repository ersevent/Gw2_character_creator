import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }

  static getDerivedStateFromError(error) {
    return { error: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.error)
      return (
        <div>
          <h2>There was an error</h2>
        </div>
      );
    else return this.props.children;
  }
}

export default ErrorBoundary;
