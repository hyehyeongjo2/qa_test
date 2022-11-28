import { mapList } from './test/mapList.js';
import { menuList } from './menuList.js';

async function init() {
    const dabeeoMaps = new dabeeo.Maps();
    const gui = new dat.GUI({ width: 300, right: 0, autoPlace: false });
    document.querySelector('.guiContainer').append(gui.domElement);
    const mapContainer = document.querySelector('.map');

    let mapData = null;
    let map = null;
    let mapIndex = 0;
    let getMapMenu = null;
    let mapOptionMenu = null;
    let currentMenu = null;
    await getMap(mapIndex);
    initAllMenu();

    //nav bar active class switching
    document.querySelector('.nav').addEventListener('click', (e) => {
        // nav 메뉴를 클릭하지 않았거나 이미 active되어 있는 메뉴를 클릭했거나
        if (e.target.parentElement.className !== 'nav' || e.target.classList.contains('active')) return;

        // 다른 메뉴를 선택한 경우
        // 기존 메뉴를 숨기고 새로운 메뉴를 보여줌.
        currentMenu.hide();
        e.target.parentElement.querySelector('li.active').classList.remove('active');
        e.target.classList.add('active');

        if (e.target.getAttribute('name') === 'getMap') {
            getMapMenu.show();
            currentMenu = getMapMenu;
        } else if (e.target.getAttribute('name') === 'mapOption') {
            mapOptionMenu.show();
            currentMenu = mapOptionMenu;
        } else {
            const menuFound = menuList.find((element) => element.name === e.target.getAttribute('name'));
            menuFound.init.show();
            currentMenu = menuFound.init;
        }
    });
    function initAllMenu() {
        getMapMenu = initGetMap(gui);
        menuList.forEach((element) => {
            if (element.menu) {
                element.init = new element.menu().init(gui, mapData, map, mapContainer);
                element.init.hide();
            }
        });
        console.log(menuList);
        mapOptionMenu = initMapOptionMenu(gui, mapData, mapContainer);
        mapOptionMenu.hide();

        currentMenu = getMapMenu;
    }

    function initGetMap(parentGui) {
        const menu = parentGui.addFolder('getMap Menu ');
        menu.open();
        initGetMapByInput(menu);
        initGetMapByList(menu);
        return menu;
    }

    function initGetMapByInput(parentMenu) {
        const setting = {
            clientId: '',
            clientSecret: '',
            serverType: 'SERVER_REAL',
            getMap: getMap,
        };
        const menu = parentMenu.addFolder('get Map by client info ');
        menu.add(setting, 'clientId');
        menu.add(setting, 'clientSecret');
        menu.add(setting, 'serverType', ['SERVER_REAL', 'SERVER_STAGE']);
        menu.add(setting, 'getMap');

        async function getMap() {
            mapData = await dabeeoMaps.getMapData({
                clientId: setting.clientId,
                clientSecret: setting.clientSecret,
                serverType: setting.serverType,
            });
            map = await dabeeoMaps.showMap(mapContainer, {}, mapData);
        }
        return menu;
    }
    async function getMap(value) {
        if (value < 0) {
            alert('map을 선택하세요. ');
            return;
        }

        mapData = await dabeeoMaps.getMapData({
            clientId: mapList[value].clientId,
            clientSecret: mapList[value].clientSecret,
            serverType: 'SERVER_REAL',
        });
        map = await dabeeoMaps.showMap(mapContainer, {}, mapData);
    }

    function initGetMapByList(parentMenu) {
        let mapSetting = { 선택: -1 };
        mapList.forEach((element, index) => {
            mapSetting[element.name] = index;
        });

        const setting = { mapIndex: mapIndex };
        parentMenu.add(setting, 'mapIndex', mapSetting).onChange(getMap);
    }
    function initMapOptionMenu(gui) {
        const setting = initSetting();
        const menu = initMenu(setting, gui);
        const actionSetting = {
            showMap: showMap,
            deleteMap: deleteMap,
        };
        menu.add(actionSetting, 'showMap');
        menu.add(actionSetting, 'deleteMap');
        async function showMap(value) {
            if (!mapData) {
                alert('mapData is not available');
                return;
            }
            const option = getOption(setting);
            deleteMap();
            menu.close();
            if (this.menuClass !== null) this.menuClass.removeMenu();
            map = await this.dabeeoMaps.showMap(mapContainer, option, mapData);
            console.log(`await this.dabeeoMaps.showMap(${mapContainer}, ${option}, ${mapData});`);
            console.log('this.mapContainer:', this.mapContainer);
            console.log('option: ', option);
            console.log('this.mapData : ', mapData);
        }
        function deleteMap() {
            if (map) {
                map.context.cleanup();
                map = null;
            }
        }

        return menu;
    }

    function initSetting() {
        const defaultFloorId = mapData.dataFloor.getDefaultFloor().id;
        const defaultLang = mapData.dataLanguage.getDefaultLanguage().lang;

        const setting = {
            camera: '3d', // 초기 카메라 모드 3d
            floor: defaultFloorId,
            language: defaultLang, // 초기 poi 언어 설정
            showPoi: true, // map상에 poi 보여줄지 말지 결정 여부. default는 true
            spriteEnable: true, // POI,Marker,MyLocation,길찾기 마커를 항상 정면으로 보이게 함.
            spriteKeepRotation: false, // POI,Marker,MyLocation,길찾기 마커를 sprite로 그릴때 원래 각도 유지 여부
            zoom: '', //초기줌
            x: '',
            y: '',
            rotate: '', //회전 3d, 2d
            tilt: '', //기울기 3d
            mergeMesh: false, // mergedMesh 활성화 여부
            showWaterMarker: true,
            waterMarkPosition: 'LEFT_BOTTOM',
        };
        return setting;
    }

    function initMenu(setting, gui) {
        const floorSetting = mapData.dataFloor.getFloors().reduce((prev, cur) => {
            return { ...prev, [cur.name[0].text]: cur.id };
        }, {});
        const langSetting = mapData.dataLanguage.getLanguage().map((data) => data.lang);

        const menu = gui.addFolder('mapOption');
        // menu.open();
        menu.add(setting, 'camera', ['2d', '3d']);
        menu.add(setting, 'floor', floorSetting);
        menu.add(setting, 'language', langSetting);
        menu.add(setting, 'showPoi');
        menu.add(setting, 'spriteEnable');
        menu.add(setting, 'spriteKeepRotation');
        menu.add(setting, 'zoom');
        menu.add(setting, 'x');
        menu.add(setting, 'y');
        menu.add(setting, 'rotate');
        menu.add(setting, 'tilt');
        menu.add(setting, 'mergeMesh');
        menu.add(setting, 'showWaterMarker');
        menu.add(setting, 'waterMarkPosition', ['LEFT_TOP', 'RIGHT_TOP', 'LEFT_BOTTOM', 'RIGHT_BOTTOM']);

        return menu;
    }

    function getOption(setting) {
        const mapOption = {
            camera: setting.camera, // 초기 카메라 모드 3d
            floor: setting.floor, // 적용할 층 정보
            language: setting.language, // 초기 poi 언어 설정
            showPoi: setting.showPoi, // map상에 poi 보여줄지 말지 결정 여부. default는 true
            spriteEnable: setting.spriteEnable, // POI,Marker,MyLocation,길찾기 마커를 항상 정면으로 보이게 함.
            spriteKeepRotation: setting.spriteKeepRotation, // POI,Marker,MyLocation,길찾기 마커를 sprite로 그릴때 원래 각도 유지 여부
            controlOption: {
                zoom: setting.zoom, //초기줌
                pan: {
                    //중심좌표
                    x: setting.x,
                    y: setting.y,
                },
                rotate: Number(setting.rotate), //회전 3d, 2d
                tilt: Number(setting.tilt), //기울기 3d
            },
            mergeMesh: setting.mergeMesh, // mergedMesh 활성화 여부
            showWaterMarker: setting.showWaterMarker,
            waterMarkPosition: setting.waterMarkPosition,
        };
        return mapOption;
    }
}

window.addEventListener('load', (event) => {
    console.log('window is loaded');
    init();
});
