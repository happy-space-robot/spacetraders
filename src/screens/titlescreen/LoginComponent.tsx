import React, { useState, MouseEvent, ChangeEvent } from "react";
import Network from "../../network/Network";

type Props = {
  setLoggedIn: (loggedIn: boolean) => void;
  loggedIn: boolean;
  setTitleMenuMode: (titleMenuMode: string) => void;
}

export default function LoginComponent ({ setLoggedIn, setTitleMenuMode, loggedIn } : Props): JSX.Element {

  const [resultView, setResultView] = useState(<div>Please enter your username and token above to continue.</div>);
  const [inputUsername, setInputUsername] = useState('');
  const [inputToken, setInputToken] = useState('');

  const network = new Network();

  const displayErrorMessage = (errorMsg: string) => {
    setResultView(<div>Error: {errorMsg}</div>);
  };

  const handleChange = (event: ChangeEvent) => {
    event.preventDefault();
    switch (event.target.id) {
      case "login-name":
        setInputUsername((event.target as HTMLInputElement).value);
        console.log("Writing to loginName.");
        break;
      case "token":
        setInputToken((event.target as HTMLInputElement).value);
        console.log("Writing to token.");
        break;
      default:
        console.log("Default change handler reached.");
    }
  };

  const handleSubmit = (event: MouseEvent) => {
    event.preventDefault();
    console.log("Logging in.");
    network.authenticateUser(
      inputUsername,
      inputToken,
      (errorMessage: string) => {
        if (errorMessage) {
          displayErrorMessage(errorMessage);
        } else {
          setLoggedIn(true);
          setResultView(
            <div>
              <div>Successfully logged in as {inputUsername}!</div>
            </div>,
          );
        }
      },
    );
  };

  const handleBack = (event: MouseEvent) => {
    event.preventDefault;
    setTitleMenuMode('title');
  };

  const handleContinue = (event: MouseEvent) => {
    event.preventDefault;
    setTitleMenuMode('title');
  };

  return (
    <div className="title-menu-outside-container">
      <div className="title-menu-inside-container bkg-black text-color-green">
        <h3>Log In:</h3>
        <div className="form-container">
          <form>
            <ul className="login-menu-option-list">
              <li key="login">
                <label id="login">
                  Username:
                </label>
                <input
                    id="login-name"
                    type="text"
                    name="name"
                    placeholder="Username"
                    onChange={handleChange}
                  />
              </li>
              <li>
                <label id="token">
                  Token:
                </label>
                <input
                    id="token"
                    type="text"
                    name="token"
                    placeholder="Token"
                    onChange={handleChange}
                  />
              </li>
            </ul>
          </form>
        </div>
        <div className="login-menu-content">{resultView}</div>
        <div className="login-button-container">
          <button className="menu-button login-menu-button" value="Back" onClick={handleBack}>
            Back
          </button>
          <button className="menu-button login-menu-button" value="Submit" onClick={handleSubmit}>
            Submit
          </button>
          <button className="menu-button login-menu-button" value="Continue" disabled={!loggedIn} onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
