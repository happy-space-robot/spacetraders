import React from 'react';
import ReactDOM from 'react-dom';
import { TitlePagePanel } from './titlepage/TitlePagePanel';
import '../styles/style.scss';


// Organize and initiate all our panels and bars
export default class Overlay
{


  public constructor()
  {

  }

  public Init() : void
  {
    ReactDOM.render(<TitlePagePanel />, document.getElementById('overlay'));
  }


}