import Overlay from '../overlay/overlay';

export default class Network
{

    public overlay: Overlay;

    public constructor()
    {
      this.overlay = new Overlay;
      this.getStatus = this.getStatus.bind(this);
    }

    public Init() : void
    {
      this.getStatus((status: string) => this.overlay.createStatusView(status));
    }

    public getStatus(callback: Function) : Promise<any> {
      return fetch('https://api.spacetraders.io/game/status')
        .then(response => response.json())
        .then(data => {
          callback(data.status);
        });
    }

}