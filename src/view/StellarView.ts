import SceneRenderer from '../render/SceneRenderer';
import GameView from './GameView';
import Planet from '../app/Planet';
import * as THREE from 'three';

export default class StellarView extends GameView
{
    private m_Planets = new Array<Planet>();
    private m_PlayerVisuals: THREE.Mesh;
    private m_CurrentPlanet: Planet;

    // Initializes the game view from a definition structure
    public Init(scene: SceneRenderer, jsonDef: any) : void
    {
        super.Init(scene, jsonDef);

        for(let planetDef of jsonDef.planets)
        {
            let planet = new Planet(planetDef);
            this.AddObject(planet.VisualObject);
            this.m_Planets.push(planet);
        }

        this.InitPlayer();
        this.MovePlayerToPlanet(this.m_Planets[0]);
    }

    public Update(currentTime: number) : void
    {
        super.Update(currentTime);

        this.UpdatePlayer(currentTime);
    }

    // Returns true if input was handled. Implemented by derived classes
    public OnCursorPress(x: number, y: number) : boolean
    {
        for(let p of this.m_Planets)
        {
            if(p.Pick(x, y))
            {
                this.MovePlayerToPlanet(p);
                return true;
            }
        }

        return super.OnCursorPress(x, y);
    }


    private InitPlayer()
    {
        const geometry = new THREE.ConeGeometry(1, 4, 32);
        const material = new THREE.MeshPhongMaterial( { color: 0xffff00 } );
        this.m_PlayerVisuals = new THREE.Mesh( geometry, material );
        this.m_PlayerVisuals.matrixAutoUpdate = false;
        this.AddObject(this.m_PlayerVisuals);
    }

    private MovePlayerToPlanet(planet: Planet)
    {
        console.error("Debug: Moved to planet " + planet.m_Name);
        this.m_CurrentPlanet = planet;
    }

    private UpdatePlayer(currentTime: number)
    {
        // Make the player rotate around the planet, just for fun
        let orbitalOffset = new THREE.Matrix4();
        orbitalOffset.setPosition(new THREE.Vector3(this.m_CurrentPlanet.m_Size * 1.4, 0, 0));

        let rotationAxis = new THREE.Vector3(0,0.5,0.5);
        rotationAxis.normalize();

        let rotation = new THREE.Matrix4();
        rotation.makeRotationAxis(rotationAxis, currentTime * 0.001);

        let planetaryPosition = new THREE.Matrix4();
        planetaryPosition.setPosition(this.m_CurrentPlanet.m_Position);

        let transform = orbitalOffset.clone();
        transform.premultiply(rotation);
        transform.premultiply(planetaryPosition);

        this.m_PlayerVisuals.matrix = transform.clone();
        this.m_PlayerVisuals.updateMatrixWorld(true);
    }

    // TODO: Make some random planet data for now, eventually load from json file or get from server
    public static GetPlanetaryData() : any
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
}