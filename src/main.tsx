import React from 'react';
import ReactDOM from 'react-dom';
import { Game } from './app/Game';
import SceneRenderer from './render/SceneRenderer';
import './styles/style.scss';

let sceneRenderer = new SceneRenderer();

ReactDOM.render(
  <Game renderer={sceneRenderer}/>, document.getElementById('app'),
);
