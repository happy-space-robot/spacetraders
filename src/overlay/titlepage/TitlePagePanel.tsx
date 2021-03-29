import React from 'react';
import ReactDOM from 'react-dom';
import TitleBannerComponent from './TitleBannerComponent';
import Network from '../../network/Network';
import starfield from '../public/StarfieldSimulation.gif';

// Create the TitlePage
export default class TitlePage
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

    public createTitlePage() : void
    {
      const titlePageStyles = {
        // Replace this with asset from our server one day
        backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/e4/StarfieldSimulation.gif')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      };
      this.setStyle(document.body, titlePageStyles);
      this.createTitleBanner();
      this.network.getStatus((status: string) => this.createStatusView(status));
    }

    public createTitleBanner() : void
    {
      const overlayElement = document.getElementById('overlay');
      ReactDOM.render(
        <TitleBannerComponent />,
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