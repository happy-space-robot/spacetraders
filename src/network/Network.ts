export default class Network
{

    api: string;

    public constructor()
    {
      this.getStatus = this.getStatus.bind(this);
      this.api = 'https://api.spacetraders.io';
    }

    public Init() : void
    {

    }

    public getStatus(callback: Function) : Promise<any> {
      return fetch(this.api + '/game/status', {method: 'GET'})
        .then(result => result.json())
        .then(data => {
          callback(data);
        });
    }

    public createUser(username: string, callback: Function) : Promise<any> {
      return fetch(this.api + '/users/' + username + '/token', {method: 'POST'})
        .then(result => result.json())
        .then(data => {
          callback(data);
        });
    }

    public getUserStatus(username: string, token: string, callback: Function) : Promise<any> {
      return fetch(this.api + '/users/' + username + '?token=' + token, {
        method: 'GET',
      })
        .then(result => result.json())
        .then(data => {
          callback(data);
        });
    }

    public getAvailableLoans(token: string, callback: Function) : Promise<any> {
      return fetch(this.api + '/game/loans?token=' + token, {
        method: 'GET',
      })
        .then(result => result.json())
        .then(data => {
          callback(data);
        });
    }

}