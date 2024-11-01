import React from 'react'

export default function ErrorBounderyCompo() {
  return (
    <>
     if (this.state.hasError) {
    return (
      <div>
        <h2>Something went wrong.</h2>
        <button onClick={() => this.setState({ hasError: false })}>
          Try Again
        </button>
      </div>
    );
      
    </>
  )
}
