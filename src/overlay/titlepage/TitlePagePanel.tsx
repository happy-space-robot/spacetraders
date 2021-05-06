import React, { useState } from 'react';
import TitleBannerComponent from './TitleBannerComponent';
import TitleMenuComponent from './TitleMenuComponent';

type Props = {
  setScreen: (screen: string) => void;
}

export default function TitlePagePanel ({ setScreen } : Props): JSX.Element {

  let titleMenuDisplay = <div></div>;

  const [titleMenuMode, setTitleMenuMode] = useState('title');

  if (titleMenuMode === 'login') {
    console.log("Login time.");
  } else {
    titleMenuDisplay = <TitleMenuComponent setScreen={ setScreen } />;
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


