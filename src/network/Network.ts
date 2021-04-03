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

    public getAvailableShips(token: string, callback: Function) : Promise<any> {
      return fetch(this.api + '/game/ships?token=' + token, {
        method: 'GET',
      })
        .then(result => result.json())
        .then(data => {
          callback(data);
        });
    }

    public getAvailableLocations(token: string, type: string, callback: Function) : Promise<any> {
      return fetch(this.api + '/game/systems/OE/locations?token=' + token + "&type=" + type, {
        method: 'GET',
      })
        .then(result => result.json())
        .then(data => {
          callback(data);
        });
    }

    public takeOutLoan(username: string, token: string, type: string, callback: Function) : Promise<any> {
      return fetch(this.api + '/users/' + username + '/loans' + '?token=' + token, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams({'type': type}),
      })
        .then(result => result.json())
        .then(data => {
          callback(data);
        });
    }

}