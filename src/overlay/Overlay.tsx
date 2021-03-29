import React from 'react';
import ReactDOM from 'react-dom';
import TitlePage from './titlepage/TitlePagePanel'


// Organize and initiate all our panels and bars
export default class Overlay
{
  public titlePage: TitlePage;

  public constructor()
  {
    this.titlePage = new TitlePage;
  }

  public Init() : void
  {
    this.titlePage.Init();
  }


}