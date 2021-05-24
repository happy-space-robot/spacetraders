import * as THREE from 'three';

export default class SceneRenderer
{
    private m_Scene: THREE.Scene
    private m_Camera: THREE.PerspectiveCamera;
    private m_Renderer: THREE.WebGLRenderer;
    private m_Viewport = new THREE.Box2();
    private m_Initialized: boolean = false;

    public get Camera() : THREE.PerspectiveCamera { return this.m_Camera; }

    public get CanvasElement() : HTMLCanvasElement { return this.m_Renderer.domElement; }

    public IsInitialized() : boolean
    {
        return this.m_Initialized;
    }

    public constructor()
    {
    }

    public Initialize()
    {
        console.assert(!this.m_Initialized);

        this.m_Renderer = new THREE.WebGLRenderer({ antialias: true });
        //this.m_Renderer.setPixelRatio( window.devicePixelRatio );
        this.m_Renderer.setSize( window.innerWidth, window.innerHeight );
        this.m_Renderer.setClearColor(new THREE.Color(0x000000));

        this.m_Camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
        this.m_Camera.position.set( 0, 0, 200 );

        this.m_Scene = new THREE.Scene();
        this.m_Scene.background = new THREE.Color( 0x101010 );
        this.m_Scene.fog = new THREE.Fog( 0x0000a0, 50, 300 );

        this.InitLighting();

        this.m_Initialized = true;
    }

    public AddToScene(object: THREE.Object3D)
    {
        this.m_Scene.add(object);
    }

    public RemoveFromScene(object: THREE.Mesh, cleanupObject: boolean)
    {
        this.m_Scene.remove(object);
        
        if(cleanupObject)
        {
            object.geometry.dispose();
            (object.material as THREE.Material).dispose();
        }
    }

    private InitLighting()
    {
        const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444);
        hemiLight.position.set( 0, 200, 0 );
        this.m_Scene.add( hemiLight );

        const dirLight = new THREE.DirectionalLight( 0xffffff );
        dirLight.position.set( 100, 200, 200);
        this.m_Scene.add( dirLight );
    }

    public OnResize() : void
    {
        const canvasWidth = window.innerWidth;
        const canvasHeight = window.innerHeight;

        this.m_Renderer.setSize( canvasWidth, canvasHeight );

        this.m_Camera.aspect = canvasWidth / canvasHeight;
        this.m_Camera.updateProjectionMatrix();
    }

    public Render()
    {
        this.m_Renderer.render(this.m_Scene, this.m_Camera);
    }

    public DisplayToClipPos(displayPos : THREE.Vector2) : THREE.Vector2
    {
        let viewportPos = this.DisplayToViewportPos(displayPos);
        return this.ViewportToClipPos(viewportPos);
    }

    public DisplayToViewportPos(displayPos : THREE.Vector2) : THREE.Vector2
    {
        let viewport = new THREE.Vector4();
        this.m_Renderer.getCurrentViewport(viewport)

        let x = displayPos.x * this.m_Renderer.getPixelRatio() - viewport.x;
        let y = displayPos.y * this.m_Renderer.getPixelRatio() - viewport.y;
        return new THREE.Vector2(x,y);
    }

    public ViewportToClipPos(viewportPos : THREE.Vector2) : THREE.Vector2
    {
        let viewport = new THREE.Vector4();
        this.m_Renderer.getCurrentViewport(viewport)

        var clipPos = new THREE.Vector2();
        clipPos.x = (viewportPos.x / viewport.width) * 2 - 1;
        clipPos.y = -(viewportPos.y / viewport.height) * 2 + 1;
        return clipPos;
    }
}
