import React, { Component } from 'react';

//todo convert functional component
export default class Error extends Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode }
  }

  findErrorPage(statusCode){
    switch (statusCode){
      default: return <div>새로고침 해서 다시 시도해 주세요....</div>;
    }
  }

  render() {
    // @ts-ignore
    const { statusCode } = this.props;
    const { findErrorPage } = this;

    let errorComponent = findErrorPage(statusCode);

    return (
      <div>
        {errorComponent}
      </div>
    )
  }
}