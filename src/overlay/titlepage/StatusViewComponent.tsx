import React from 'react';

type StatusViewProps = {
  serverStatus: string
}

export const StatusViewComponent = ({ serverStatus }: StatusViewProps) =>
  <div className="status-view">
    <p>{ serverStatus }</p>
    <button id="login-button" className="title-menu-button">Log In</button>
    <button id="create-account-button" className="title-menu-button">Create Account</button>
    <button id="start-button" className="title-menu-button">Start</button>
  </div>