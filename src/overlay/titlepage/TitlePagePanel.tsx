import React from 'react';
import { TitleBannerComponent } from './TitleBannerComponent';
import { StatusViewComponent } from './StatusViewComponent';

export const TitlePagePanel = () =>
  <div className="title-page-container">
    <TitleBannerComponent />
    <StatusViewComponent />
  </div>