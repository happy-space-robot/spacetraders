import React, { MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import Network from '../network/Network';
import { TitlePagePanel } from './titlepage/TitlePagePanel';

import '../styles/style.scss';
import { defaultCipherList } from 'constants';


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
        <TitlePagePanel serverStatus={ status } clickHandler={ this.ClickHandler }/>,
        document.getElementById('overlay')
      );
    });
  }

  public ClickHandler(event: MouseEvent) : void
  {
    event.preventDefault();
    console.log(event);
    switch((event.target as Element).id) {
      case "login-button":
        console.log('Log in!');
        break;
      case "create-account-button":
        console.log('Create account!');
        break;
      case "start-button":
        console.log('Start!');
        break;
      default:
        console.log('Default click handler reached.');
    }
  }
}