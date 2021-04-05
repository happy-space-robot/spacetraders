export default class Network
{

    api: string;
    username: string = '';
    token: string = '';

    public constructor()
    {
      this.getStatus = this.getStatus.bind(this);
      this.api = 'https://api.spacetraders.io';
    }

    public IsAuthenticated() : boolean { return this.token != null; }

    public Init() : void
    {

    }

    public authenticateUser(username: string, token: string, callback: Function) : Promise<any> {
      return fetch(this.api + '/users/' + username + '?token=' + token, {
        method: 'GET',
      })
        .then(result => result.json())
        .then(data => {
          if(!data.error)
          {
            this.username = username;
            this.token = token;
            callback(null);
          }
          else
          {
            this.username = '';
            this.token = '';
            callback(data.error.message);
          }
        });
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

    public getUserStatus(callback: Function) : Promise<any> {
      console.assert(this.IsAuthenticated());
      return fetch(this.api + '/users/' + this.username + '?token=' + this.token, {
        method: 'GET',
      })
        .then(result => result.json())
        .then(data => {
          callback(data);
        });
    }

    public performUserAction(action:string, args: any, callback: Function) : Promise<any> {
      console.assert(this.IsAuthenticated());
      return fetch(this.api + '/users/' + this.username + '/' + action + '?token=' + this.token, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams(args),
      })
        .then(result => result.json())
        .then(data => {
          callback(data);
        });
    }

    public getGameInfo(type: string, callback: Function) : Promise<any> {
      console.assert(this.IsAuthenticated());
      return fetch(this.api + '/game/' + type + '?token=' + this.token, {
        method: 'GET',
      })
        .then(result => result.json())
        .then(data => {
          callback(data);
        });
    }
}