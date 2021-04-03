import React, { Component, MouseEvent, ChangeEvent } from 'react';
import Network from '../../network/Network'

type devMenuProps = {

};

type devMenuState = {
  username: string,
  token: string,
  resultView: JSX.Element,
};

type errorMessageFromHTTP = {
  message: string
}

type resultFromHTTP = {
  user?: userFromHTTP,
  error?: errorMessageFromHTTP,
  message?: string,
  token?: string,
  loans?: Array<loansFromHTTP>
  ships?: Array<shipsPurchasableFromHTTP>
  locations?: Array<locationFromHTTP>
}

type userFromHTTP = {
  username: string,
  credits: number,
  loans: Array<loansFromHTTP>,
  ships: Array<shipsFromHTTP>
}

type loansFromHTTP = {
  amount: number,
  collateralRequired: boolean,
  rate: number,
  termInDays: number,
  type: string
}

type shipsPurchasableFromHTTP = {
  class: string,
  manufacturer: string,
  maxCargo: number,
  plating: number,
  purchaseLocations: Array<purchaseOfferFromHTTP>
  speed: number,
  type: string,
  weapons: number,
}

type locationFromHTTP = {
  name: string,
  symbol: string,
  type: string,
  x: number,
  y: number
}

type purchaseOfferFromHTTP = {
  location: string,
  price: number
}

type shipsFromHTTP = {
  cargo: Array<cargoFromHTTP>,
  class: string,
  id: string,
  location: string,
  manufacturer: string,
  maxCargo: number,
  plating: number,
  spaceAvailable: number,
  speed: number,
  type: string,
  weapons: number,
  x: number,
  y: number
}

type cargoFromHTTP = {
  good: string,
  quantity: number,
  totalVolume: number
}





export default class DevMenu extends Component<devMenuProps, devMenuState> {

  private network: Network;

  constructor(props: devMenuProps) {
    super(props);
    this.state = {
      username: '',
      token: '',
      resultView: <div></div>,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.displayErrorMessage = this.displayErrorMessage.bind(this);
    this.network = new Network();
  };

  handleChange(event: ChangeEvent) {
    event.preventDefault();
    let stateToChange = '';
    switch((event.target as Element).id) {
      case 'new-account-name':
        stateToChange = 'username';
        console.log("Writing to username.")
        break;
      case 'login-name':
        stateToChange = 'username';
        console.log("Writing to loginName.")
        break;
      case 'token':
        stateToChange = 'token';
        console.log("Writing to token.")
        break;
      default:
        console.log('Default change handler reached.');
    }
    // Ideally we could find some way around casting as 'any', but... turns out
    // dynamic keys are tricky in Typescript
    this.setState({[stateToChange]: (event.target as HTMLInputElement).value} as any);
  };

  handleClick(event: MouseEvent) : void {
    event.preventDefault();
    switch(((event.target as Node).parentNode as Element).id) {
      case 'create-account':
        console.log("Creating account.");
        this.network.createUser(this.state.username, (result: resultFromHTTP) => {
          console.log(result);
          if (result.error) {
            this.displayErrorMessage(result.error.message);
          } else if (result.user) {
            this.setState({resultView: (
              <div>
                <div>Username {result.user.username} created!</div>
                <div>Token: {result.token}</div>
                <div>Please save this elsewhere immediately! This will be your only chance.</div>
              </div>
            )});
          }
        });
        break;
      case 'login':
        console.log("Logging in.");
        this.network.getUserStatus(this.state.username, this.state.token, (result: resultFromHTTP) => {
          console.log(result);
          if (result.error) {
            this.displayErrorMessage(result.error.message);
          } else if (result.user) {
            this.setState({resultView: (
              <div>
                <div>Successfully logged in as {result.user.username}!</div>
              </div>
            )});
          }
        });
        break;
      case 'autologin':
        console.log("Logging in test account.");
        const testUsername = "superawesometestaccount";
        const testToken = "073a3728-70ea-41e3-9e80-857e293e7d72";
        this.network.getUserStatus(testUsername, testToken, (result: resultFromHTTP) => {
          console.log(result);
          if (result.error) {
            this.displayErrorMessage(result.error.message);
          } else if (result.user) {
            this.setState({username: testUsername});
            this.setState({token: testToken});
            this.setState({resultView: (
              <div>
                <div>Successfully logged in default test account as {result.user.username}!</div>
              </div>
            )});
          }
        });
        break;
      case 'get-user-info':
        console.log("Getting user info.");
        this.network.getUserStatus(this.state.username, this.state.token, (result: resultFromHTTP) => {
          console.log(result);
          if (result.error) {
            this.displayErrorMessage(result.error.message);
          } else if (result.user) {
            this.setState({resultView: (
              <div>
                <div>Username: {result.user.username}</div>
                <div>Credits: {result.user.credits}</div>
                <div>Ships: {result.user.ships}</div>
                <div>Loans: {result.user.loans}</div>
              </div>
            )});
          }
        });
        break;
      case 'get-available-loans':
        console.log("Getting available loans.");
        this.network.getAvailableLoans(this.state.token, (result: resultFromHTTP) => {
          console.log(result);
          if (result.error) {
            this.displayErrorMessage(result.error.message);
          } else if (result.loans) {
            console.log(result.loans);
            console.log(result.loans[0]);
            console.log(result.loans[0].amount);
            const loanItems = result.loans.map((loanObject, index) =>
              <div>
                <div>Amount: {loanObject.amount}</div>
                <div>Collateral Required: {loanObject.collateralRequired.toString()}</div>
                <div>Rate: {loanObject.rate}</div>
                <div>Term (in days): {loanObject.termInDays}</div>
                <div>Type: {loanObject.type}</div>
                <div id="take-out-loan"><button onClick={(e) => {
                  e.preventDefault();
                  this.takeOutLoan(loanObject.type);
                }}>Take Out Loan</button></div>
              </div>
            );
            console.log(loanItems);
            this.setState({resultView: <div>{loanItems}</div>});
          } else {
            console.log('No loans found?');
          }
        });
          break;
        case 'get-available-ships':
          console.log("Getting available ships.");
          this.network.getAvailableShips(this.state.token, (result: resultFromHTTP) => {
            console.log(result);
            if (result.error) {
              this.displayErrorMessage(result.error.message);
            } else if (result.ships) {
              console.log(result.ships);
              const shipItems = result.ships.map((shipObject, index) =>
                <div>
                <div>Class: {shipObject.class}</div>
                <div>Manufacturer: {shipObject.manufacturer}</div>
                <div>Max Cargo: {shipObject.maxCargo}</div>
                <div>Plating: {shipObject.plating}</div>
                <div>Speed: {shipObject.speed}</div>
                <div>Type: {shipObject.type}</div>
                <div>Weapons: {shipObject.weapons}</div>
                <div>Offers: {shipObject.purchaseLocations.map((offer, index) =>
                  <div>{index+1}. {offer.location}: {offer.price}</div>)}</div>
                <br/>
                </div>
              );
              console.log(shipItems);
              this.setState({resultView: <div>{shipItems}</div>});
            } else {
              console.log('No ships found?');
            }
          });
            break;
          case 'get-available-planets':
            console.log("Getting available planets.");
            this.network.getAvailableLocations(this.state.token, "PLANET", (result: resultFromHTTP) => {
              console.log(result);
              if (result.error) {
                this.displayErrorMessage(result.error.message);
              } else if (result.locations) {
                console.log(result.locations);
                const locationItems = result.locations.map((locationObject, index) =>
                  <div>
                  <div>Name: {locationObject.name}</div>
                  <div>Symbol: {locationObject.symbol}</div>
                  <div>Coordinates: [{locationObject.x}, {locationObject.y}]</div>
                  <br/>
                  </div>
                );
                console.log(locationItems);
                this.setState({resultView: <div>{locationItems}</div>});
              } else {
                console.log('No locations found?');
              }
            });
            break;
            break;
      default:
        console.log('Default click handler reached.');
    }
  };

  takeOutLoan(type: string)
  {
    console.log("Taking out a loan of type " + type);
    this.network.takeOutLoan(this.state.username, this.state.token, type, (result: resultFromHTTP) => {
      console.log(result);
    });
  }

  displayErrorMessage(errorMsg: string) {
    this.setState({resultView: <div>Error: {errorMsg}</div>});
  };

  render() {
    return (
      <div className="dev-menu">
        <h1>This is the dev menu!</h1>
        <div className="flex-container">
          <div className="dev-menu-content-container">
            <h3>Options:</h3>
            <div className="dev-menu-content">
              <form>
                <ul className="dev-menu-option-list">
                  <li key="create-account"><label id="create-account">
                    Create User:
                    <input id="new-account-name"
                      type="text"
                      name="name"
                      placeholder="Username"
                      onChange={this.handleChange}/>
                    <button value="Submit" onClick={this.handleClick}>Submit</button>
                  </label></li>
                  <li key="login"><label id="login">
                    Log In:
                    <input id="login-name"
                      type="text"
                      name="name"
                      placeholder="Username"
                      onChange={this.handleChange}/>
                    <input id="token"
                      type="text"
                      name="token"
                      placeholder="Token"
                      onChange={this.handleChange}/>
                    <button value="Submit" onClick={this.handleClick}>Submit</button>
                  </label></li>
                  <li key="autologin"><label id="autologin">
                    Log In Default Account:
                    <button value="Submit" onClick={this.handleClick}>Submit</button>
                  </label></li>
                  <li key="get-user-info"><label id="get-user-info">
                    User Info:
                    <button value="Submit" onClick={this.handleClick}>Submit</button>
                  </label></li>
                  <li key="get-available-loans"><label id="get-available-loans">
                    Available Loans:
                    <button value="Submit" onClick={this.handleClick}>Submit</button>
                  </label></li>
                  <li key="get-available-ships"><label id="get-available-ships">
                    Available Ships:
                    <button value="Submit" onClick={this.handleClick}>Submit</button>
                  </label></li>
                  <li key="get-available-planets"><label id="get-available-planets">
                    Available Planets:
                    <button value="Submit" onClick={this.handleClick}>Submit</button>
                  </label></li>
                </ul>
              </form>
            </div>
          </div>
          <div className="dev-menu-content-container">
            <h3>Results:</h3>
              <div className="dev-menu-content">
                {this.state.resultView}
              </div>
          </div>
        </div>
      </div>
    )
  };
}