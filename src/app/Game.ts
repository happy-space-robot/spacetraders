namespace SpaceTraders
{
    export class Game
    {
        public m_Scene: SceneRenderer;

        public constructor()
        {
            this.m_Scene = new SceneRenderer();
        }

        public Init() : void
        {
            this.m_Scene.Init();
        }
    }
}