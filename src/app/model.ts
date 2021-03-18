namespace SpaceTraders
{
    export class Model
    {

        public view: View;

        public constructor()
        {
          this.view = new View;
          this.getStatus = this.getStatus.bind(this);
        }

        public Init() : void
        {
          this.getStatus((status: string) => this.view.createStatusView(status));
        }

        public getStatus(callback: Function) : Promise<any> {
          return fetch('https://api.spacetraders.io/game/status')
            .then(response => response.json())
            .then(data => {
              callback(data.status);
            });
        }

    }
}