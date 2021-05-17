import React, { useState, MouseEvent, ChangeEvent } from "react";
import Network from "../../network/Network";

type Props = {
  setLoggedIn: (loggedIn: boolean) => void;
  loggedIn: boolean;
  setTitleMenuMode: (titleMenuMode: string) => void;
}

type Result = {
  user?: User;
  error?: ErrorMessage;
  token?: string;
};

type User = {
  username: string;
};

type ErrorMessage = {
  message: string;
};

export default function CreateAccountComponent ({ setLoggedIn, setTitleMenuMode, loggedIn } : Props): JSX.Element {

  const [resultView, setResultView] = useState(<div>Please enter your preferred username to continue.</div>);
  const [inputUsername, setInputUsername] = useState('');

  const network = new Network();

  const displayErrorMessage = (errorMsg: string) => {
    setResultView(<div>Error: {errorMsg}</div>);
  };

  const handleChange = (event: ChangeEvent) => {
    event.preventDefault();
    setInputUsername((event.target as HTMLInputElement).value);
    console.log("Writing to loginName.");
  };

  const handleSubmit = (event: MouseEvent) => {
    event.preventDefault();
    console.log("Logging in.");
    network.createUser(
      inputUsername,
      (result: Result) => {
        if (result.error) {
          displayErrorMessage(result.error.message);
        } else if (result.user) {
          setLoggedIn(true);
          setResultView(
            <div>
              <div>Successfully logged in as:</div>
              <br />
              <div>{result.user.username}</div>
              <div>{result.token}</div>
              <br />
              <div>Please save this elsewhere immediately!</div>
              <div>This will be your only chance.</div>
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
        <h3>Create Account:</h3>
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
