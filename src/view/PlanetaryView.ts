import SceneRenderer from '../render/SceneRenderer';
import GameView from './GameView';
import * as THREE from 'three';

export default class PlanetaryView extends GameView
{
    public Init(scene: SceneRenderer, jsonDef: any) : void
    {
        super.Init(scene, jsonDef);
        
        console.error("TODO NYI...");
    }
}