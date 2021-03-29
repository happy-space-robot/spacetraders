import SceneRenderer from '../render/SceneRenderer';
import Planet from './Planet';
import * as THREE from 'three';
import Overlay from '../overlay/Overlay';
import React, { MouseEvent } from 'react';

export default class Game
{
    public m_Scene: SceneRenderer;
    public overlay: Overlay;

    private m_LastUpdateTime: number = 0;

    private m_Planets = new Array<Planet>();
    private m_PlayerVisuals: THREE.Mesh;
    private m_CurrentPlanet: Planet;

    public constructor()
    {
        this.CreateView = this.CreateView.bind(this);
        this.OverlayClickHandler = this.OverlayClickHandler.bind(this);

        this.Update = this.Update.bind(this);
        this.OnResize = this.OnResize.bind(this);

        this.handleMouseInput = this.handleMouseInput.bind(this);
        this.handleTouchInput = this.handleTouchInput.bind(this);

        this.m_Scene = new SceneRenderer();
        this.overlay = new Overlay(this.OverlayClickHandler);
    }

    public Init() : void
    {
        this.overlay.Init();
     // this.CreateView();
    }

    public OverlayClickHandler(event: MouseEvent) : void
    {
      event.preventDefault();
      switch((event.target as Element).id) {
        case "login-button":
          console.log('Log in!');
          break;
        case "create-account-button":
          console.log('Create account!');
          break;
        case "start-button":
          console.log('Start!');
          this.CreateView();
          this.overlay.CreateGameOverlay();
          break;
        default:
          console.log('Default click handler reached.');
      }
    }

    public CreateView() : void
    {
        this.m_Scene.Init();
        document.addEventListener('mousemove', this.handleMouseInput );
        document.addEventListener('mousedown', this.handleMouseInput );
        document.addEventListener('mouseup', this.handleMouseInput );
        document.addEventListener('touchstart', this.handleTouchInput );
        document.addEventListener('touchend', this.handleTouchInput );
        document.addEventListener('touchmove', this.handleTouchInput );

        window.addEventListener( 'resize', this.OnResize );
        window.requestAnimationFrame(this.Update);

        let planetaryData = Game.GetPlanetaryData();
        for(let planetDef of planetaryData.planets)
        {
            this.m_Planets.push(new Planet(planetDef));
        }

        // Init planets (maybe this happens later, IDK)
        for(let planet of this.m_Planets)
        {
            planet.Init();
        }

        this.InitPlayer();
        this.MovePlayerToPlanet(this.m_Planets[0]);
    }

    private OnResize() : void
    {
        this.m_Scene.OnResize();
    }

    private Update()
    {
        window.requestAnimationFrame(this.Update);

        let curTime = performance.now();
        let maxFPS = 30; // increase for smoother visuals
        if((curTime - this.m_LastUpdateTime) < (1 / maxFPS))
        {
            // not enough time has passed to render again
            return;
        }

        this.m_LastUpdateTime = curTime;

        this.UpdatePlayer();

        this.m_Scene.Render();
    }

    // TODO: Make some random planet data for now, eventually load from json file or get from server
    private static GetPlanetaryData() : any
    {
        let fakeJsonObj: any = {};

        let planetNames = ["Feldo", "Magrathea", "Impossiblonia", "Pizzeria", "Galacticus", "Ix", "TBD"];
        let planets = new Array<any>();
        for(let i = 0; i < planetNames.length; ++i)
        {
            let fakePlanetJsonObj: any = {};
            fakePlanetJsonObj.name = planetNames[i];

            let positionObj: any = {}
            positionObj.x = (Math.random()-0.5)*100;
            positionObj.y = (Math.random()-0.5)*100;
            positionObj.z = (Math.random()-0.5)*100;
            fakePlanetJsonObj.position = positionObj;
            fakePlanetJsonObj.size = 4 + Math.random()*2;
            fakePlanetJsonObj.color = new THREE.Color(Math.random(), Math.random(), Math.random()).getHex();
            planets.push(fakePlanetJsonObj);
        }
        fakeJsonObj.planets = planets;

        return fakeJsonObj;
    }

    private InitPlayer()
    {
        const geometry = new THREE.ConeGeometry(1, 4, 32);
        const material = new THREE.MeshPhongMaterial( { color: 0xffff00 } );
        this.m_PlayerVisuals = new THREE.Mesh( geometry, material );
        this.m_PlayerVisuals.matrixAutoUpdate = false;
        SceneRenderer.Instance.AddToScene(this.m_PlayerVisuals);
    }

    private handleMouseInput(e: MouseEvent)
    {
        if((e.buttons % 20) == 1)
        {
            this.OnCursorPress(e.clientX, e.clientY);
        }
    }

    private handleTouchInput(e: TouchEvent)
    {
        if(e.touches.length > 0)
        {
            this.OnCursorPress(e.touches[0].clientX, e.touches[0].clientY);
        }
    }

    private OnCursorPress(x: number, y: number)
    {
        for(let p of this.m_Planets)
        {
            if(p.Pick(x, y))
            {
                this.MovePlayerToPlanet(p);
            }
        }
    }

    private MovePlayerToPlanet(planet: Planet)
    {
        console.error("Debug: Moved to planet " + planet.m_Name);
        this.m_CurrentPlanet = planet;
    }

    private UpdatePlayer()
    {
        // Make the player rotate around the planet, just for fun
        let orbitalOffset = new THREE.Matrix4();
        orbitalOffset.setPosition(new THREE.Vector3(this.m_CurrentPlanet.m_Size * 1.4, 0, 0));

        let rotationAxis = new THREE.Vector3(0,0.5,0.5);
        rotationAxis.normalize();

        let rotation = new THREE.Matrix4();
        rotation.makeRotationAxis(rotationAxis, this.m_LastUpdateTime * 0.001);

        let planetaryPosition = new THREE.Matrix4();
        planetaryPosition.setPosition(this.m_CurrentPlanet.m_Position);

        let transform = orbitalOffset.clone();
        transform.premultiply(rotation);
        transform.premultiply(planetaryPosition);

        this.m_PlayerVisuals.matrix = transform.clone();
        this.m_PlayerVisuals.updateMatrixWorld(true);
    }
}
