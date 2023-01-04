import { SimulationMoreMenu } from './SimulationMoreMenu.js';

export class SimulationMenu {
    constructor() {
        this.gui = null;
        this.mapData = null;
        this.map = null;
        this.mapContainer = null;
        this.menu = null;
        this.setting = null;
        this.originPoi = null;
        this.destinationPoi = null;
        this.waypoint1 = null;
        this.waypoint2 = null;
        this.naviOption = null;
        this.defaultLineOption = null;
        this.originMarkerOption = null;
        this.destTagOption = null;
        this.destinationMarkerOption = null;
        this.destinationLineOptions = null;
        this.waypointMarkerOptions1 = null;
        this.waypointLineOptions1 = null;
        this.waypointMarkerOptions2 = null;
        this.waypointLineOptions2 = null;
        this.animOption = null;
        this.animMarkerOptions = null;
        this.destOption = null;
    }
    removeMenu() {
        if (this.menu) {
            this.gui.removeFolder(this.menu);
            this.menu = null;
        }
    }
    init(gui, mapData, map, mapContainer) {
        this.gui = gui;
        this.mapData = mapData;
        this.map = map;
        this.mapContainer = mapContainer;
        this.menu = this.gui.addFolder('Simulation Menu');
        this.menu.open();
        this.originPoi = this.initPoiSetting('origin');
        this.destinationPoi = this.initPoiSetting('destination');
        this.waypoint1 = this.initWayPoint('waypoint1');
        this.waypoint2 = this.initWayPoint('waypoint2');
        this.setting = this.initSetting();
        this.initNaviOptions();
        this.mapContainer.addEventListener('on-mouse-click', (e) => {
            console.log('on mouse click 에 대한 결과값', e.detail);
        });
        new SimulationMoreMenu().init(this.menu, mapData, map, mapContainer);
        return this.menu;
    }
    initNaviOptions() {
        this.naviOption = this.initOptions();
        this.defaultLineOption = this.initLineMenu('Default Line');
        this.originMarkerOptions = this.initIconMenu('Origin Icon');
        this.destTagOption = this.initdestTagMenu('destTag');
        this.destinationMarkerOptions = this.initIconMenu('Destination Icon');
        this.destinationLineOptions = this.initLineMenu('Destination Line');
        this.waypointMarkerOptions1 = this.initIconMenu('Waypoint1 Icon');
        this.waypointLineOptions1 = this.initLineMenu('Waypoint1 Line');
        this.waypointMarkerOptions2 = this.initIconMenu('Waypoint2 Icon');
        this.waypointLineOptions2 = this.initLineMenu('Waypoint2 Line');
        this.animOption = this.initAnimationMenu('Animation Option');
        this.animMarkerOptions = this.initIconMenu('Animation Icon');
        this.destOption = this.initdestMenu('destOption');
    }
    makeFloorSetting() {
        return this.mapData.dataFloor.getFloors().reduce(
            (prev, cur) => {
                return { ...prev, [cur.name[0].text]: cur.id };
            },
            { 'not defined': '' },
        );
    }
    makePoiSetting(floor) {
        return this.mapData.dataPoi.getPois().reduce(
            (result, cur) => {
                if (floor == cur.floorId) return { ...result, [cur.title]: cur.id };
                else return result;
            },
            { '': '' },
        );
    }

    initPoiSetting(menuName) {
        let poiSetting = null;
        const changeFloor = (value) => {
            const poiList = this.makePoiSetting(value);
            poiSetting = poiSetting.options(poiList);
        };

        const menu = this.menu.addFolder(menuName);
        menu.open();

        const floorSetting = this.makeFloorSetting();
        let poisSetting = this.makePoiSetting(this.mapData.dataFloor.getFloors()[0].id);

        const setting = {
            floor: this.mapData.dataFloor.getFloors()[0].id,
            poi: '',
            x: '',
            y: '',
            z: '',
        };

        menu.add(setting, 'floor', floorSetting).onChange(changeFloor);
        poiSetting = menu.add(setting, 'poi', poisSetting);
        menu.add(setting, 'x');
        menu.add(setting, 'y');
        menu.add(setting, 'z');
        return setting;
    }

    initWayPoint(menuName) {
        let poiSetting = null;
        const changeFloor = (value) => {
            const poiList = this.makePoiSetting(value);
            poiSetting = poiSetting.options(poiList);
        };

        const menu = this.menu.addFolder(menuName);
        const floorSetting = this.makeFloorSetting();
        let poisSetting = this.makePoiSetting(this.mapData.dataFloor.getFloors()[0].id);

        const setting = {
            floor: this.mapData.dataFloor.getFloors()[0].id,
            poi: '',
            apply: false,
        };

        menu.add(setting, 'floor', floorSetting).onChange(changeFloor);
        poiSetting = menu.add(setting, 'poi', poisSetting);
        menu.add(setting, 'apply');

        return setting;
    }

    initSetting() {
        const setting = {
            type: 'recommendation',
            set: this.set.bind(this),
            clear: this.clear.bind(this),
            start: this.start.bind(this),
            stop: this.stop.bind(this),
        };

        const menu = this.menu;
        menu.add(setting, 'type', ['recommendation', 'stairs', 'escalator', 'elevator']);
        menu.add(setting, 'set');
        menu.add(setting, 'clear');
        menu.add(setting, 'start');
        menu.add(setting, 'stop');

        return setting;
    }
    async set() {
        let option = {};
        if (this.originPoi.poi === '') {
            option.origin = {
                position: { x: this.originPoi.x, y: this.originPoi.y, z: this.originPoi.z },
                floorId: this.originPoi.floor,
            };
        } else {
            option.origin = {
                poiId: this.originPoi.poi,
                floorId: this.originPoi.floor,
            };
        }
        if (this.destinationPoi.poi === '') {
            option.destination = {
                position: { x: this.destinationPoi.x, y: this.destinationPoi.y, z: this.destinationPoi.z },
                floorId: this.destinationPoi.floor,
            };
        } else {
            option.destination = {
                poiId: this.destinationPoi.poi,
                floorId: this.destinationPoi.floor,
            };
        }
        option.type = [this.setting.type];
        const waypoints = [];
        if (this.waypoint1.apply) {
            waypoints.push({
                poiId: this.waypoint1.poi,
                floorId: this.waypoint1.floor,
            });
        }
        if (this.waypoint2.apply) {
            waypoints.push({
                poiId: this.waypoint2.poi,
                floorId: this.waypoint2.floor,
            });
        }
        if (waypoints.length > 0) {
            option.waypoints = waypoints;
        }
        console.log(option);

        const naviResponse = await this.mapData.getRoute(option);
        console.log(naviResponse);
        if (naviResponse.totalDistance === 0) {
            alert('경로에 대한 거리가 0입니다! ');
            return;
        }
        let naviOption = {};
        let way = {};

        naviOption = this.naviOption;
        naviOption.origin = {};
        naviOption.destination = {};
        naviOption.wayPoints = [
            {
                markerOptions: this.waypointMarkerOptions1,
                lineOptions: this.waypointLineOptions1,
            },
            {
                markerOptions: this.waypointMarkerOptions2,
                lineOptions: this.waypointLineOptions2,
            },
        ];

        naviOption.defaultLineOption = this.defaultLineOption;
        naviOption.origin.markerOptions = this.originMarkerOptions;
        naviOption.destination = this.destTagOption;
        naviOption.destination.markerOptions = this.destinationMarkerOptions;
        naviOption.destination.lineOptions = this.destinationLineOptions;
        
        console.log(naviOption);
        await this.map.routeSimulation.set(naviResponse[this.setting.type], naviOption);
    }

    clear() {
        this.map.routeSimulation.clear();
    }
    start() {
        let animOption = Object.assign({}, this.animOption);
        animOption.markerOptions = this.animMarkerOptions;
        animOption.destOption = this.destOption;
        console.log(animOption);
        this.map.routeSimulation.start(animOption);
    }

    stop() {
        this.map.routeSimulation.stop();
    }
    initdestTagMenu(){
        const setting = {
            showTag:true
        };
        const menu = this.menu;
        menu.add(setting, 'showTag');
        return setting;
    }
    initOptions() {
        const setting = {
            lineZ: 2, // 주행선의 z축 값을 지정합니다.
            lineDivide: false,
        };
        const menu = this.menu.addFolder('Navigation Option');
        menu.add(setting, 'lineZ');
        menu.add(setting, 'lineDivide');
        return setting;
    }
    initLineMenu(menuName) {
        const setting = {
            lineColor: '#ffbb00',
            lineSpotSize: 10,
            lineSpotInterval: 10,
            lineSpotCount: 10,
            lineSpotAnimate: true,
            lineSpotAnimateSpeed: 0.1,
            solidLineEnabled: true,
            solidLineWidth: 10,
            solidLineJoin: 'round',
            solidLineCap: 'round',
        };

        const menu = this.menu.addFolder(menuName);
        menu.addColor(setting, 'lineColor');
        menu.add(setting, 'lineSpotSize');
        menu.add(setting, 'lineSpotInterval');
        menu.add(setting, 'lineSpotCount');
        menu.add(setting, 'lineSpotAnimate');
        menu.add(setting, 'lineSpotAnimateSpeed');
        menu.add(setting, 'solidLineEnabled');
        menu.add(setting, 'solidLineWidth');
        menu.add(setting, 'solidLineJoin', ['round', 'bevel', 'miter']);
        menu.add(setting, 'solidLineCap', ['round', 'butt']);
        return setting;
    }
    initIconMenu(menuName) {
        const setting = {
            iconUrl: '',
            width: '',
            height: '',
            positionZ: 0,
            visibleIcon: true,
        };

        const menu = this.menu.addFolder(menuName);
        menu.add(setting, 'iconUrl', ['', 'https://assets.dabeeomaps.com/image/btn_floor_up.png']);
        menu.add(setting, 'width');
        menu.add(setting, 'height');
        menu.add(setting, 'positionZ');
        menu.add(setting, 'visibleIcon');
        return setting;
    }

    initdestMenu(menuName) {
        const setting = {
            activeDest: true,
            color: '#00ffff',
            opacity: 0.3,
            isAnimate: true,
            duration: 1200,
            isRepeat: true,
            isYoyo: false
        };

        const menu = this.menu.addFolder(menuName);
        menu.add(setting, 'activeDest');
        menu.add(setting, 'color');
        menu.add(setting, 'opacity');
        menu.add(setting, 'isAnimate');
        menu.add(setting, 'duration');
        menu.add(setting, 'isRepeat');
        menu.add(setting, 'isYoyo');
        return setting;
    }

    initAnimationMenu(menuName) {
        const setting = {
            zoom: 20,
            changeFloorDelay: 1000,
            speedRate: 50,
            removeIcon: true,
        };
        const menu = this.menu.addFolder(menuName);
        menu.add(setting, 'zoom');
        menu.add(setting, 'changeFloorDelay');
        menu.add(setting, 'speedRate');
        menu.add(setting, 'removeIcon');
        return setting;
    }
}
