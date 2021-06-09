import React, { useState, useEffect } from 'react';
import RenderGame from '../../app/RenderGame';
import SceneRenderer from "../../render/SceneRenderer";

type Props = {
  renderer: SceneRenderer;
  systemInfo: any;
}

export default function GalaxyPagePanel ({ renderer, systemInfo } : Props): JSX.Element {
  
  let planets = systemInfo.locations.filter((e: any) => {return true;}); /* allow everything right now*/ //e.type=="PLANET";});

  const renderGame = new RenderGame(renderer);
  renderGame.Init();
  renderGame.CreateView(planets);

  useEffect(() => {
    const parent = document.getElementById('gameViewContainer');
    if(parent?.childElementCount == 0)
    {
      parent.parentNode?.appendChild(renderer.CanvasElement);
    }
    });

  return <div>
    <div>
      <div id="gameViewContainer" ></div>
    </div>
  </div>;
}


