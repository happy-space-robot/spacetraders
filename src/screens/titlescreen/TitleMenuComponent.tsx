import React, { useState, MouseEvent } from 'react';
import Network from '../../network/Network';

type Props = {
  setScreen: (screen: string) => void;
  setLoggedIn: (loggedIn: boolean) => void;
  loggedIn: boolean;
  setTitleMenuMode: (titleMenuMode: string) => void;
  setCurrentSystem: (currentSystemInfo: any) => void;
}

type StatusResponse = {
  status: string;
}

export default function TitleMenuComponent ({ setScreen, setLoggedIn, loggedIn, setTitleMenuMode, setCurrentSystem } : Props): JSX.Element {

  const [serverStatus, setServerStatus] = useState('Getting server status...');

  const network = new Network();

  network.getStatus((statusMsg : StatusResponse) => {
    if (statusMsg.status === 'spacetraders is currently online and available to play') {
      setServerStatus('SpaceTraders is online and available to play!');
    } else {
      setServerStatus(statusMsg.status);
    }
  });

  const jeffTest = () => {
    // Super simple test to login with a random account and lookup a system

    const network = new Network();

    const randoUsername = `Rando${Math.floor(Math.random() * 1000000)}`;
    network.createUser(randoUsername, (result: any) => {
      console.log(result);
      if (!result.error) {
        // TODO: Added this to avoid the error, but I'm not sure this was this was the right way
        // to handle this for the case of an empty token being returned...
        network.authenticateUser(
          randoUsername,
          result.token ? result.token : "",
          (errorMessage: string) => {
            if (!errorMessage) {
              network.getGameInfo("systems", (result: any) => {
                setCurrentSystem(result.systems[0]);
              });
            }
          },
        );
      }
    });
  }

  const clickHandler = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    switch((event.target as Element).id) {
      case "login-button":
        console.log('Log in!');
        setTitleMenuMode('login');
        break;
      case "create-account-button":
        console.log('Create account!');
        setTitleMenuMode('create-account');
        break;
      case "start-button":
        console.log('Start!');
        setScreen('galaxyPage');
        break;
      case "goto-dev-menu-button":
        console.log('Dev menu!');
        setScreen('devMenu');
        break;
      case "goto-jefftest-menu-button":
        console.log('Jefftest menu!');
        jeffTest();
        break;
      default:
        console.log('Default click handler reached in TitleMenuComponent.');
    }
  }

  let loginText = loggedIn ? "Log In Again" : "Log In";

  return (
    <div className="title-menu-outside-container">
      <div className="title-menu-inside-container">
        <div className="status-view">
          <p>{serverStatus}</p>
        </div>
        <ul className="title-menu-button-list">
          <li><button disabled={!loggedIn} type="button" id="start-button" className="menu-button title-menu-button" onClick={clickHandler}>Start</button></li>
          <li><button type="button" id="login-button" className="menu-button title-menu-button" onClick={clickHandler}>{loginText}</button></li>
          <li><button type="button" id="create-account-button" className="menu-button title-menu-button" onClick={clickHandler}>Create Account</button></li>
          <li><button type="button" id="goto-dev-menu-button" className="menu-button title-menu-button" onClick={clickHandler}>Dev Menu</button></li>
          <li><button type="button" id="goto-jefftest-menu-button" className="jefftest-button title-menu-button" onClick={clickHandler}>Jefftest Menu</button></li>
        </ul>
      </div>
    </div>
  );
}

