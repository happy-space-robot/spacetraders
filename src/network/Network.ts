export default class Network
{
    public constructor()
    {
      this.getStatus = this.getStatus.bind(this);
    }

    public Init() : void
    {

    }

    public getStatus(callback: Function /*= (data: string) => {return data}*/) : Promise<any> {
      return fetch('https://api.spacetraders.io/game/status')
        .then(response => response.json())
        .then(data => {
          callback(data.status);
        });
    }

}