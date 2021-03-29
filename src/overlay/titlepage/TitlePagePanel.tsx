import React, { MouseEventHandler } from 'react';
import { TitleBannerComponent } from './TitleBannerComponent';
import { TitleMenuComponent } from './TitleMenuComponent';

type Props = {
  serverStatus: string,
  clickHandler: MouseEventHandler
}

export const TitlePagePanel = ({ serverStatus, clickHandler }: Props) =>
  <div className="title-page-outside-container">
    <div className="title-page-inside-container">
      <TitleBannerComponent />
      <TitleMenuComponent serverStatus={ serverStatus } clickHandler={ clickHandler }/>
    </div>
  </div>