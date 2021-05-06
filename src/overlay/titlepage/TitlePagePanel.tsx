import React, { MouseEventHandler, useState } from 'react';
import { TitleBannerComponent } from './TitleBannerComponent';
import { TitleMenuComponent } from './TitleMenuComponent';

type Props = {
  setScreen: (screen: string) => void;
  setUsername: (username: string) => void;
  setToken: (token: string) => void;
}

export const TitlePagePanel = ({ setScreen, setUsername, setToken } : Props) => {

  let titleMenuDisplay = <div></div>;

  const [titleMenuMode, setTitleMenuMode] = useState('title');

  if (titleMenuMode === 'login') {
    console.log("Login time.");
  } else {
    titleMenuDisplay = <TitleMenuComponent setScreen={ setScreen } setUsername={ setUsername } setToken={ setToken }/>;
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


