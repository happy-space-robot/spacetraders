import React, { MouseEventHandler, useState } from 'react';
import { TitleBannerComponent } from './TitleBannerComponent';
import { TitleMenuComponent } from './TitleMenuComponent';

type Props = {
  setScreen: (screen: string) => void;
  setAuthStatus: (authStatus: boolean) => void;
}

export const TitlePagePanel = ({ setScreen, setAuthStatus } : Props) => {

  let titleMenuDisplay = <div></div>;

  const [titleMenuMode, setTitleMenuMode] = useState('title');

  if (titleMenuMode === 'login') {
    console.log("Login time.");
  } else {
    titleMenuDisplay = <TitleMenuComponent setScreen={ setScreen } setAuthStatus={ setAuthStatus }/>;
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


