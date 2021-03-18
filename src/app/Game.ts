namespace SpaceTraders
{
    export class Game
    {
        public m_Scene: SceneRenderer;
        public network: Network;

        public constructor()
        {
            this.m_Scene = new SceneRenderer();
            this.network = new Network();
        }

        public Init() : void
        {
            this.m_Scene.Init();
            this.network.Init();
        }
    }
}