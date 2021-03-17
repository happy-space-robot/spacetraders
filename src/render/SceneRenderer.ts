namespace SpaceTraders
{
    export class SceneRenderer
    {
        private m_Scene: THREE.Scene
        private m_Camera: THREE.PerspectiveCamera;
        private m_Renderer: THREE.WebGLRenderer;

        public constructor()
        {
            this.onResize = this.onResize.bind(this);
        }

        public Init() : void
        {
            this.m_Renderer = new THREE.WebGLRenderer({ antialias: true });
			this.m_Renderer.setPixelRatio( window.devicePixelRatio );
            this.m_Renderer.setSize( window.innerWidth, window.innerHeight );
            this.m_Renderer.setClearColor(new THREE.Color(0x000000));

            const container = document.createElement( 'div' );
            document.body.appendChild( container );            
            container.appendChild( this.m_Renderer.domElement );

            this.m_Camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
            this.m_Camera.position.set( 0, 0, 200 );

            this.m_Scene = new THREE.Scene();
            this.m_Scene.background = new THREE.Color( 0x000000 );
            this.m_Scene.fog = new THREE.Fog( 0x0000a0, 50, 300 );

            this.InitLighting();
            this.InitTestScene();
           
           window.addEventListener( 'resize', this.onResize );

           this.Render();
        }

        private InitLighting()
        {
            const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
            hemiLight.position.set( 0, 200, 0 );
            this.m_Scene.add( hemiLight );

            const dirLight = new THREE.DirectionalLight( 0xffffff );
            dirLight.position.set( 100, 200, 200 );
            this.m_Scene.add( dirLight );
        }

        private InitTestScene()
        {
            /* Not working yet

            const loader = new THREE.FBXLoader();
            let scene = this.m_Scene;
            loader.load( 'data/models/TestPlanet.fbx', function ( object : THREE.Object3D )
            {
                scene.add( object );
            } );
            */
            
            for(let i = 0; i < 10; ++i)
            {
                const colorVal = new THREE.Color(Math.random(), Math.random(), Math.random());
                const pos = new THREE.Vector3(Math.random()-0.5, Math.random()-0.5, Math.random()-0.5);
                pos.multiplyScalar(100);

                const geometry = new THREE.SphereGeometry( 5, 32, 32 );
                const material = new THREE.MeshPhongMaterial( {color: colorVal} );
                const sphere = new THREE.Mesh( geometry, material );
                sphere.position.set(pos.x, pos.y, pos.z);
                this.m_Scene.add( sphere );
            }
        }

        private onResize() : void
        {
            const canvasWidth = window.innerWidth;
            const canvasHeight = window.innerHeight;

            this.m_Renderer.setSize( canvasWidth, canvasHeight );

            this.m_Camera.aspect = canvasWidth / canvasHeight;
            this.m_Camera.updateProjectionMatrix();

            this.Render();

        }

        private Render()
        {
            this.m_Renderer.render(this.m_Scene, this.m_Camera);
        }
    }
}