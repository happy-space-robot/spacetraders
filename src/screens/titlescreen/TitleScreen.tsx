import React, { useState } from 'react';
import TitleBannerComponent from './TitleBannerComponent';
import TitleMenuComponent from './TitleMenuComponent';
import LoginComponent from './LoginComponent';

type Props = {
  setScreen: (screen: string) => void;
  setLoggedIn: (loggedIn: boolean) => void;
  loggedIn: boolean;
}

export default function TitlePagePanel ({ setScreen, setLoggedIn, loggedIn } : Props): JSX.Element {

  let titleMenuDisplay = <div></div>;

  const [titleMenuMode, setTitleMenuMode] = useState('title');

  if (titleMenuMode === 'login') {
    console.log("Login time.");
    titleMenuDisplay = <LoginComponent setLoggedIn={setLoggedIn} setTitleMenuMode={setTitleMenuMode}/>
  } else if (titleMenuMode === 'title') {
    titleMenuDisplay = <TitleMenuComponent setScreen={ setScreen } setLoggedIn={setLoggedIn} loggedIn={loggedIn} setTitleMenuMode={setTitleMenuMode}/>;
  }

  return (
    <div className="title-page-outside-container">
      <div className="title-page-inside-container">
        <TitleBannerComponent />
        { titleMenuDisplay }
      </div>
    </div>
  )
}


