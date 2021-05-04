import React, { useState, MouseEvent } from 'react';
import Network from '../../network/Network';

type Props = {
  setScreen: (screen: string) => void;
  setAuthStatus: (authStatus: boolean) => void;
}

type statusResponse = {
  status: string;
}

export const TitleMenuComponent = ({ setScreen, setAuthStatus } : Props) => {

  let [serverStatus, setServerStatus] = useState('Getting server status...');

  const network = new Network();

  network.getStatus((statusMsg : statusResponse) => {
    if (statusMsg.status === 'spacetraders is currently online and available to play') {
      setServerStatus('SpaceTraders is online and available to play!');
    } else {
      setServerStatus(statusMsg.status);
    }
  });

  const clickHandler = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    switch((event.target as Element).id) {
      case "login-button":
        console.log('Log in!');
        break;
      case "create-account-button":
        console.log('Create account!');
        break;
      case "start-button":
        console.log('Start!');
        break;
      case "goto-dev-menu-button":
        console.log('Dev menu!');
        setScreen('devMenu');
        break;
      default:
        console.log('Default click handler reached in TitleMenuComponent.');
    }
  }

  return (
    <div className="title-menu-outside-container">
      <div className="title-menu-inside-container">
        <div className="status-view">
          <p>{ serverStatus }</p>
        </div>
        <ul className="login-menu-button-list">
          <li><button id="login-button" className="title-menu-button" onClick= { clickHandler }>Log In</button></li>
          <li><button id="create-account-button" className="title-menu-button" onClick= { clickHandler }>Create Account</button></li>
          {/* Start button should be disabled and opacity 0.5 or something to start. */}
          <li><button id="start-button" className="title-menu-button" onClick= { clickHandler }>Start</button></li>
          <li><button id="goto-dev-menu-button" className="title-menu-button" onClick= { clickHandler }>Dev Menu</button></li>
        </ul>
      </div>
    </div>
  );
}

