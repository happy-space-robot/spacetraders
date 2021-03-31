import React, { MouseEventHandler, useState } from 'react';
import { TitleBannerComponent } from './TitleBannerComponent';
import { TitleMenuComponent } from './TitleMenuComponent';

type Props = {
  serverStatus: string,
  clickHandler: MouseEventHandler
}

export const changeTitleMenuMode = (newMode: string) => {

}

export const TitlePagePanel = ({ serverStatus, clickHandler }: Props) => {

  let titleMenuDisplay: JSX.Element = <TitleMenuComponent serverStatus={ serverStatus } clickHandler={ clickHandler }/>;

  const [titleMenuMode, setTitleMenuMode] = useState('title');

  if (titleMenuMode === 'login') {
    console.log("Login time.");
  } else {
    titleMenuDisplay = <TitleMenuComponent serverStatus={ serverStatus } clickHandler={ clickHandler }/>;
  }

  return (
    <div className="title-page-outside-container">
      <div className="title-page-inside-container">
        <TitleBannerComponent />
        {titleMenuDisplay}
      </div>
    </div>
  )
}


