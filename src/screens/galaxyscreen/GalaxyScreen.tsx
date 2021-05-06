import React, { useState } from 'react';
import RenderGame from '../../app/RenderGame';

type Props = {
  setScreen: (screen: string) => void;
}

export default function GalaxyPagePanel ({ setScreen } : Props): JSX.Element {

  const renderGame = new RenderGame();
  renderGame.Init();
  renderGame.CreateView();

  return (
    <div>{  }</div>
  )
}


