import React from 'react';
import ReactDOM from 'react-dom';
import TitlePageComponent from './titlepageview';
import Network from '../network/network';

export default class Overlay
{
    public network: Network;

    public constructor()
    {
      this.setStyle = this.setStyle.bind(this);
      this.createStatusView = this.createStatusView.bind(this);

      this.network = new Network;
    }

    public Init() : void
    {
      this.createTitlePage();
    }

    public createTitlePage() : void{
      this.createTitleBanner();
      this.network.getStatus((status: string) => this.createStatusView(status));
    }

    public createTitleBanner() : void
    {
      const overlayElement = document.getElementById('overlay');
      ReactDOM.render(
        <TitlePageComponent />,
        overlayElement
      );
      const styles = {
        'color': 'green',
        'z-index': '100',
      }
      if (overlayElement) {
        this.setStyle(overlayElement, styles);
      }
    }

    // Create a div overlaying the rendered scene to display server status
    public createStatusView(status: string) : void
    {
      const statusView = document.createElement( 'div' );
      document.body.appendChild(statusView);
      statusView.classList.add('status-view');
      const styles = {
        'color': 'white',
        'z-index': '100',
      }
      this.setStyle(statusView, styles);
      statusView.innerHTML += status;
    }

    // Helper function for css styles
    public setStyle(element: HTMLElement, propertyObject: any) : void
    {
      let property: any;
      for (property in propertyObject) {
        element.style[property] = propertyObject[property];
      }
    }
}