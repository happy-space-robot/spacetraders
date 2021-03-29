import React from 'react';
import ReactDOM from 'react-dom';
import Network from '../network/Network';
import { TitlePagePanel } from './titlepage/TitlePagePanel';

import '../styles/style.scss';


// Organize and initiate all our panels and bars
export default class Overlay
{

  private network: Network;

  public constructor()
  {
    this.network = new Network();
  }

  public Init() : void
  {
    // Need to add some error handling to this in case the server doesn't exist
    // In fact, we should refactor the whole thing so we're not waiting on the
    // server before rendering the menu
    this.network.getStatus((status:string) =>
      {
        ReactDOM.render(
          <TitlePagePanel serverStatus={ status }/>,
          document.getElementById('overlay')
        );
      }
    );
  }
}