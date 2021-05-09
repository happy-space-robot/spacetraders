import React, { useState, MouseEvent, ChangeEvent } from "react";
import Network from "../../network/Network";

type Props = {
  setLoggedIn: (loggedIn: boolean) => void;
  setTitleMenuMode: (titleMenuMode: string) => void;
}

export default function LoginComponent ({ setLoggedIn, setTitleMenuMode } : Props): JSX.Element {

  const [resultView, setResultView] = useState(<div />);
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

  return (
    <div className="title-menu-outside-container">
      <div className="title-menu-inside-container bkg-black text-color-green">
        <form>
          <ul className="login-menu-option-list">
            <li key="login">
            <label id="login">
              Log In:
              <input
                id="login-name"
                type="text"
                name="name"
                placeholder="Username"
                onChange={handleChange}
              />
              Token:
              <input
                id="token"
                type="text"
                name="token"
                placeholder="Token"
                onChange={handleChange}
              />
              <button value="Submit" onClick={handleSubmit}>
                Submit
              </button>
            </label>
            </li>
          </ul>
        </form>
        <button value="Back" onClick={handleBack}>
          Back
        </button>
        <div className="login-menu-content">{resultView}</div>
      </div>
    </div>
  )
}
