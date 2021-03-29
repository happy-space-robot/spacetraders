import React from 'react';
import { StatusViewComponent } from './StatusViewComponent';

type Props = {
  serverStatus: string
}

export const TitleMenuComponent = ({ serverStatus }: Props) =>
  <div className="title-menu-outside-container">
    <div className="title-menu-inside-container">
      <StatusViewComponent serverStatus={ serverStatus }/>
    </div>
  </div>
