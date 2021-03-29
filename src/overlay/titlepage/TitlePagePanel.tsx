import React from 'react';
import { TitleBannerComponent } from './TitleBannerComponent';
import { TitleMenuComponent } from './TitleMenuComponent';

type Props = {
  serverStatus: string
}

export const TitlePagePanel = ({ serverStatus }: Props) =>
  <div className="title-page-outside-container">
    <div className="title-page-inside-container">
      <TitleBannerComponent />
      <TitleMenuComponent serverStatus={ serverStatus }/>

    </div>
  </div>