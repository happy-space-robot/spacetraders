import React, { useState, useEffect } from 'react';
import RenderGame from '../../app/RenderGame';
import SceneRenderer from "../../render/SceneRenderer";

type Props = {
  renderer: SceneRenderer;
  setScreen: (screen: string) => void;
}

export default function GalaxyPagePanel ({ renderer, setScreen } : Props): JSX.Element {

  const renderGame = new RenderGame(renderer);
  renderGame.Init();
  renderGame.CreateView();

  useEffect(() => {
    const parent = document.getElementById('gameViewContainer');
    if(parent.childElementCount == 0)
    {
      parent.parentNode.appendChild(renderer.CanvasElement);
    }
    });

  return <div>
    <div>
    STUFF GOES HERE!
    </div>
    <div>
      <div id="gameViewContainer" ></div>
    </div>
  </div>;
}


