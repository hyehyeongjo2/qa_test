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
        this.destinationMarkeranimateOptions = null;
        this.destApply = false;
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
        new SimulationMoreMenu().init(this.menu, mapData, map, mapContainer);
        return this.menu;
    }
    initNaviOptions() {
        this.naviOption = this.initOptions();
        this.defaultLineOption = this.initLineMenu('Default Line');
        this.originMarkerOptions = this.initIconMenu('Origin Icon');
        this.destTagOption = this.initdestTagMenu('destTag');
        this.destinationMarkeranimateOptions = this.initDestIconMenu();
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
            x: '',
            y: '',
            z: '',
            apply: false,
        };

        menu.add(setting, 'floor', floorSetting).onChange(changeFloor);
        poiSetting = menu.add(setting, 'poi', poisSetting);
        menu.add(setting, 'x');
        menu.add(setting, 'y');
        menu.add(setting, 'z');
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
            pathset: this.createNaviListContainer.bind(this),
        };

        const menu = this.menu;
        menu.add(setting, 'type', ['recommendation', 'stairs', 'escalator', 'elevator']);
        menu.add(setting, 'set');
        menu.add(setting, 'clear');
        menu.add(setting, 'start');
        menu.add(setting, 'stop');
        menu.add(setting, 'pathset');

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
        if (this.waypoint1.apply && this.waypoint1.poi === '') {
            waypoints.push({
                position: { x: this.originPoi.x, y: this.originPoi.y, z: this.originPoi.z },
                floorId: this.waypoint1.floor,
            });
        } else if (this.waypoint1.apply) {
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
        console.log('checkit', naviResponse);
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
        if (this.destApplyFlag) {
            naviOption.destination.markerOptions.animate = this.destinationMarkeranimateOptions;
        }
        naviOption.destination.lineOptions = this.destinationLineOptions;

        console.log(naviOption);
        await this.map.routeSimulation.set(naviResponse[this.setting.type], naviOption);
    }

    clear() {
        this.map.routeSimulation.clear();
        if (document.getElementById('pathcontainer')) {
            const naviListContainer = document.getElementById('pathcontainer');
            naviListContainer.remove();
            console.log('alive');
        }
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
    initdestTagMenu() {
        const setting = {
            showTag: true,
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
            lineSpotCount: '',
            lineSpotAnimate: false,
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
            anchor: {
                x: '0.5',
                y: '0.5',
            },
        };

        const menu = this.menu.addFolder(menuName);
        menu.add(setting, 'iconUrl', ['', 'https://assets.dabeeomaps.com/image/btn_floor_up.png']);
        menu.add(setting, 'width');
        menu.add(setting, 'height');
        menu.add(setting, 'positionZ');
        menu.add(setting, 'visibleIcon');
        menu.add(setting.anchor, 'x');
        menu.add(setting.anchor, 'y');
        return setting;
    }
    initDestIconMenu() {
        let destController = null;
        const destApply = () => {
            this.destApplyFlag = !this.destApplyFlag;
            if (this.destApplyFlag) destController = destController.name('est Reset');
            else destController = destController.name('dest Apply');
        };
        const setting = {
            duration: 1000,
            // repeat: 3,
            opacity: 0.1,
        };
        const actionSetting = {
            destApply: destApply,
        };
        const menu = this.menu.addFolder('dest animate');
        menu.add(setting, 'duration');
        menu.add(setting, 'opacity');
        destController = menu.add(actionSetting, 'destApply');
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
            isYoyo: false,
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
            zoom: '',
            changeFloorDelay: 1000,
            speedRate: 50,
            removeIcon: true,
            enableFloorMotionCSS: true,
            floorMotionDuration: 2000,
        };
        const menu = this.menu.addFolder(menuName);
        menu.add(setting, 'zoom');
        menu.add(setting, 'changeFloorDelay');
        menu.add(setting, 'speedRate');
        menu.add(setting, 'removeIcon');
        menu.add(setting, 'enableFloorMotionCSS');
        menu.add(setting, 'floorMotionDuration');
        return setting;
    }

    async createButtons(naviListContainer) {
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
        if (this.waypoint1.apply && this.waypoint1.poi === '') {
            waypoints.push({
                position: { x: this.originPoi.x, y: this.originPoi.y, z: this.originPoi.z },
                floorId: this.waypoint1.floor,
            });
        } else if (this.waypoint1.apply) {
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

        if (naviResponse && 'navigationList' in naviResponse.recommendation) {
            console.log('NavigationResponse.navigationList 에 대한 결과값', naviResponse.recommendation.navigationList);
            let totaldistance = 0;
            const arr = naviResponse.recommendation.navigationList;
            for (let index = 0; index < arr.length; index++) {
                let { poiTitle, floorName, move, direction, distance, transportation } = this.getNavigationListData(arr[index]);
                let textContent = '';
                if (index < arr.length - 1) {
                    if (poiTitle === undefined) poiTitle = '';
                    if (transportation === '걷기') {
                        textContent = `${poiTitle}(${floorName})에서 ${direction}하여 ${distance}m 만큼 ${transportation}(으)로 이동`;
                        this.createElement(naviListContainer, move, textContent);
                        if (distance !== undefined) {
                            console.log(distance);
                            totaldistance += Number(distance);
                        }
                    } else {
                        textContent = `(${floorName}) ${transportation} 탑승`;
                        this.createElement(naviListContainer, move, textContent);

                        ({ floorName, move } = this.getNavigationListData(arr[index + 1]));
                        textContent = ` (${floorName}) ${transportation} 하차`;
                        this.createElement(naviListContainer, move, textContent);
                    }
                } else {
                    textContent = `${poiTitle}(${floorName}) 도착 , 총 ${totaldistance}m`;
                    this.createElement(naviListContainer, move, textContent);
                }
            }
            console.log(totaldistance);
        }
    }
    createElement(naviListContainer, move, text) {
        const button = document.createElement('button');
        button.textContent = text;
        if (move) button.onclick = move;
        button.style.cssText = 'width: 100%; height: 2rem;text-align:left';
        naviListContainer.appendChild(button);
    }

    // navigation list 데이터 가져오기
    getNavigationListData(item) {
        let poiTitle, direction, distance, transportation, floorName, move;

        if (item.poi) poiTitle = item.poi.title;
        if (item.direction) direction = item.direction;
        if (item.distance) distance = item.distance;
        if (item.transportation) transportation = item.transportation;
        if (item.floorId) {
            const floorData = this.mapData.dataFloor.getFloors().find((floor) => floor.id === item.floorId);
            floorName = floorData?.name[0].text;
        }
        if (item.move)
            move = () => {
                item.move(this.map);
            }; // 해당 navigation 경로로 이동하는 함수 저장

        return {
            poiTitle,
            floorName,
            move,
            direction,
            distance,
            transportation,
        };
    }

    createNaviListContainer() {
        if (document.getElementById('pathcontainer')) {
            const naviListContainer = document.getElementById('pathcontainer');
            naviListContainer.remove();
            console.log('alive');
        }
        const naviListContainer = document.createElement('div');
        naviListContainer.id = 'pathcontainer';
        naviListContainer.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      position: absolute;
      top: 10rem;
      left: 1rem;
      background-color: gray;
      color: white;
      padding: 1rem; width:
      fit-content;
      height: fit-content
    `;
        this.createButtons(naviListContainer); // navigation list 버튼 추가

        document.body.appendChild(naviListContainer);
    }
}
