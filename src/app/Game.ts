namespace SpaceTraders
{
    export class Game
    {
        public m_Scene: SceneRenderer;
        public model: Model;

        public constructor()
        {
            this.m_Scene = new SceneRenderer();
            this.model = new Model();
        }

        public Init() : void
        {
            this.m_Scene.Init();
            this.model.Init();
        }
    }
}