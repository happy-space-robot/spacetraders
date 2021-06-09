import React, { useState } from "react";
import TitlePagePanel from "../screens/titlescreen/TitleScreen";
import DevMenu from "../screens/devmenu/DevMenu";
import GalaxyPagePanel from "../screens/galaxyscreen/GalaxyScreen";
import SceneRenderer from "../render/SceneRenderer";

type Props = {
  renderer: SceneRenderer;
}

export const Game = ({renderer} : Props): JSX.Element => {
  const [screen, setScreen] = useState("titlePage");
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentSystem, setCurrentSystem] = useState(null)

  let screenToRender = <div />;
  let viewToRender = <div />;

  const changeScreen = (screenName: string) => {
    switch (screenName) {
      case "titlePage":
        screenToRender = <TitlePagePanel setScreen={setScreen} setLoggedIn={setLoggedIn} loggedIn={loggedIn} setCurrentSystem={setCurrentSystem}/>;
        break;
      case "devMenu":
        screenToRender = <DevMenu setScreen={setScreen} />;
        break;
//      case "galaxyPage":
//        screenToRender = <GalaxyPagePanel renderer={renderer} setScreen={setScreen}/>;
//        break;
      default:
        console.log("Default case reached for changeScreen.");
    }
  };

  if(currentSystem)
  {
    viewToRender = <GalaxyPagePanel renderer={renderer} systemInfo={currentSystem}/>;
  }

  changeScreen(screen);

  return <div>
  <div>{screenToRender}</div>
  <div>{viewToRender}</div>
  </div>;
};

