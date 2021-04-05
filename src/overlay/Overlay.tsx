import React, { MouseEventHandler } from 'react';
import ReactDOM from 'react-dom';
import Network from '../network/Network';
import { TitlePagePanel } from './titlepage/TitlePagePanel';
import DevMenu from './devmenu/DevMenu';
import '../styles/style.scss';

type statusResponse = {
  status: string;
}

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
    this.network.getStatus((statusMsg: statusResponse) =>
    {
      if (statusMsg.status === 'spacetraders is currently online and available to play') {
        statusMsg.status = 'SpaceTraders is online and available to play!'
      }
      ReactDOM.render(
        <TitlePagePanel serverStatus={ statusMsg.status } clickHandler={ this.clickHandler }/>,
        overlayElement
      );
    });
  }

  public CreateGameOverlay() : void {
    const overlayElement = document.getElementById('overlay') as Element
    ReactDOM.unmountComponentAtNode(overlayElement);
  }

  public CreateDevMenu() : void {
    const overlayElement = document.getElementById('overlay') as Element
    ReactDOM.unmountComponentAtNode(overlayElement);
    //TODO: get rid of this hacky way of hiding the canvas
    //or, at least, write in a way to undo it somewhere relevant
    const c = document.getElementsByTagName('canvas');
    c[0].style.width = '0';
    c[0].style.height = '0';
    ReactDOM.render(
      <DevMenu />, overlayElement
    );
  }


}