import React, { MouseEventHandler } from 'react';
import { StatusViewComponent } from './StatusViewComponent';

type Props = {
  serverStatus: string,
  clickHandler: MouseEventHandler
}

export const TitleMenuComponent = ({ serverStatus, clickHandler }: Props) =>
  <div className="title-menu-outside-container">
    <div className="title-menu-inside-container">
      <StatusViewComponent serverStatus={ serverStatus }/>
      <ul>
        <li><button id="login-button" className="title-menu-button" onClick= { clickHandler }>Log In</button></li>
        <li><button id="create-account-button" className="title-menu-button" onClick= { clickHandler }>Create Account</button></li>
        {/* Start button should be disabled and opacity 0.5 or something to start. */}
        <li><button id="start-button" className="title-menu-button" onClick= { clickHandler }>Start</button></li>
      </ul>
    </div>
  </div>
