import React, { MouseEventHandler } from 'react';
import ReactDOM from 'react-dom';
import Network from '../network/Network';
import { TitlePagePanel } from './titlepage/TitlePagePanel';
import '../styles/style.scss';

// Organize and initiate all our panels and bars
export default class Overlay
{
  private network: Network;

  public constructor(public clickHandler: MouseEventHandler)
  {
    this.network = new Network();
    this.CreateTitlePage = this.CreateTitlePage.bind(this);
    this.clickHandler = clickHandler;
  }

  public Init() : void
  {
    // Need to add some error handling to this in case the server doesn't exist
    // In fact, we should refactor the whole thing so we're not waiting on the
    // server before rendering the menu
    this.CreateTitlePage();

  }

  public CreateTitlePage() : void {
    const overlayElement = document.getElementById('overlay') as Element
    ReactDOM.unmountComponentAtNode(overlayElement);
    this.network.getStatus((status:string) =>
    {
      if (status === 'spacetraders is currently online and available to play') {
        status = 'SpaceTraders is online and available to play!'
      }
      ReactDOM.render(
        <TitlePagePanel serverStatus={ status } clickHandler={ this.clickHandler }/>,
        overlayElement
      );
    });
  }

  public CreateGameOverlay() : void {
    const overlayElement = document.getElementById('overlay') as Element
    ReactDOM.unmountComponentAtNode(overlayElement);
  }


}