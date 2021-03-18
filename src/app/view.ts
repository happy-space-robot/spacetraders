namespace SpaceTraders
{
    export class View
    {
        public constructor()
        {
          this.setStyle = this.setStyle.bind(this);
          this.createStatusView = this.createStatusView.bind(this);
        }

        public Init() : void
        {

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
            'position': 'absolute',
            'top': '12px',
            'left': '12px'
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
}