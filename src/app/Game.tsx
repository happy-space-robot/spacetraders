import React, { useState } from "react";
import TitlePagePanel from "../screens/titlescreen/TitleScreen";
import DevMenu from "../screens/devmenu/DevMenu";
import GalaxyPagePanel from "../screens/galaxyscreen/GalaxyScreen";

export const Game = (): JSX.Element => {
  const [screen, setScreen] = useState("titlePage");
  const [loggedIn, setLoggedIn] = useState(false);

  let screenToRender = <div />;

  const changeScreen = (screenName: string) => {
    switch (screenName) {
      case "titlePage":
        screenToRender = <TitlePagePanel setScreen={setScreen} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>;
        break;
      case "devMenu":
        screenToRender = <DevMenu setScreen={setScreen} />;
        break;
      case "galaxyPage":
        screenToRender = <GalaxyPagePanel setScreen={setScreen}/>;
        break;
      default:
        console.log("Default case reached for changeScreen.");
    }
  };

  changeScreen(screen);

  return <div>{screenToRender}</div>;
};

