import * as THREE from 'three';
import SceneRenderer from '../render/SceneRenderer';

export default abstract class GameView
{
    private m_Scene: SceneRenderer;
    protected m_SceneObjects = new Array<THREE.Mesh>();

    // Initializes the game view from a definition structure
    public Init(scene: SceneRenderer, jsonDef: any) : void
    {
        this.m_Scene = scene;
    }

    protected AddObject(object: THREE.Mesh)
    {
        this.m_SceneObjects.push(object);
        this.m_Scene.AddToScene(object);
    }

    protected RemoveObject(object: THREE.Mesh)
    {
        this.m_SceneObjects.splice(this.m_SceneObjects.indexOf(object), 1);
        this.m_Scene.RemoveFromScene(object, true);
    }

    public Shutdown(scene: SceneRenderer) : void
    {
        for(let obj of this.m_SceneObjects)
        {
            scene.RemoveFromScene(obj, true);
        }
        this.m_SceneObjects.length = 0;
    }

    public Update(currentTime: number) : void {}

    public OnResize() : void {}
    
    // Returns true if input was handled. Implemented by derived classes
    public OnCursorPress(x: number, y: number) : boolean
    {
        return false;
    }
}