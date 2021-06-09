import SceneRenderer from "../render/SceneRenderer";
import GameView from "../view/GameView";
import GalacticView from "../view/GalacticView";
import StellarView from "../view/StellarView";
import PlanetaryView from "../view/PlanetaryView";

export enum GameViewType {
  None,
  Galactic,
  Stellar,
  Planetary,
}

export default class RenderGame {
  public m_Scene: SceneRenderer;

  private m_LastUpdateTime = 0;

  private m_Views = new Map<GameViewType, GameView>();

  private m_CurrentViewType: GameViewType = GameViewType.None;

  public get CurrentView(): GameView {
    return this.m_Views.get(this.m_CurrentViewType);
  }

  public constructor(scene: SceneRenderer) {
    this.CreateView = this.CreateView.bind(this);

    this.Update = this.Update.bind(this);
    this.OnResize = this.OnResize.bind(this);

    this.handleMouseInput = this.handleMouseInput.bind(this);
    this.handleTouchInput = this.handleTouchInput.bind(this);

    this.m_Scene = scene;

    this.m_Views.set(GameViewType.Galactic, new GalacticView());
    this.m_Views.set(GameViewType.Stellar, new StellarView());
    this.m_Views.set(GameViewType.Planetary, new PlanetaryView());
  }

  public Init(): void {
    
    // TODO JI: This seems messy, but the issue here is that we can't initialize the OpenGL
    // renderer until after some other important initialization occurs. And the failure seems
    // to be browser-specific, which is fun (ex: Chrome works but Brave fails, which is funny
    // because they're basically the same thing). So, we lazily initialize the scene until a
    // view needs it. Would be good to think through the initialization flow a little more here.
    if(!this.m_Scene.IsInitialized())
    {
      this.m_Scene.Initialize();
    }

    document.addEventListener("mousemove", this.handleMouseInput);
    document.addEventListener("mousedown", this.handleMouseInput);
    document.addEventListener("mouseup", this.handleMouseInput);
    document.addEventListener("touchstart", this.handleTouchInput);
    document.addEventListener("touchend", this.handleTouchInput);
    document.addEventListener("touchmove", this.handleTouchInput);

    window.addEventListener("resize", this.OnResize);
    window.requestAnimationFrame(this.Update);
  }

  public CreateView(planetaryData: any): void {
    
    // TODO: This is placeholder for now, eventually we'll want to drive the correct
    // view based on player selection.
    //const planetaryData = StellarView.GetPlanetaryData();
    this.ActivateView(GameViewType.Stellar, planetaryData);
  }

  private OnResize(): void {
    this.m_Scene.OnResize();
  }

  private Update() {
    window.requestAnimationFrame(this.Update);

    const curTime = performance.now();
    const maxFPS = 30; // increase for smoother visuals
    if (curTime - this.m_LastUpdateTime < 1 / maxFPS) {
      // not enough time has passed to render again
      return;
    }

    this.m_LastUpdateTime = curTime;

    this.CurrentView?.Update(curTime);

    this.m_Scene.Render();
  }

  public ActivateView(type: GameViewType, definition: any) {
    if (type !== this.m_CurrentViewType) {
      this.CurrentView?.Shutdown(this.m_Scene);
      this.m_CurrentViewType = type;
      this.CurrentView?.Init(this.m_Scene, definition);
    }
  }

  private handleMouseInput(e: globalThis.MouseEvent): void {
    if (e.buttons % 20 === 1) {
      this.OnCursorPress(e.clientX, e.clientY);
    }
  }

  private handleTouchInput(e: TouchEvent): void {
    if (e.touches.length > 0) {
      this.OnCursorPress(e.touches[0].clientX, e.touches[0].clientY);
    }
  }

  private OnCursorPress(x: number, y: number) {
    this.CurrentView?.OnCursorPress(x, y);
  }
}
