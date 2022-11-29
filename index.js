import { mapList } from './qaTest/mapList.js';
import { menuList } from './menuList.js';

const dabeeoMaps = new dabeeo.Maps();
const mapContainer = document.querySelector('.map');
const gui = new dat.GUI({ width: 300, right: 0, autoPlace: false });
document.querySelector('.guiContainer').append(gui.domElement);

let mapData = null;
let map = null;
let mapIndex = 0;
let getMapMenu = null;
let mapOptionMenu = null;
let currentMenu = null;
let floorMenu = null;

async function init() {
    // nav menu를 만든다
    makeNavMenu(menuList);

    // mapData를 fetch하여 rendering한후 메뉴를 생성한다
    await getMapDataByIndex(mapIndex);

    //nav bar active class switching
    document.querySelector('.nav').addEventListener('click', (e) => {
        // nav 메뉴를 클릭하지 않았거나 이미 active되어 있는 메뉴를 클릭했으면 return
        if (e.target.parentElement.className !== 'nav' || e.target.classList.contains('active')) return;

        // 현재 메뉴를 숨긴다
        currentMenu.hide();

        //active class에서 active를 제거한다
        e.target.parentElement.querySelector('li.active').classList.remove('active');

        //현재 선택된 element에 active를 붙인다
        e.target.classList.add('active');

        //현재 선택된 메뉴를 보여준다
        currentMenu = activateMenu(e.target.getAttribute('name'));
    });
}

// navigation bar를 생성한다
function makeNavMenu(menuList) {
    const nav = document.querySelector('.nav');
    menuList.forEach((element) => {
        const li = document.createElement('li');
        li.setAttribute('name', element.name);
        li.textContent = element.text;
        nav.appendChild(li);
    });
    nav.querySelector('[name="getMap"]').classList.add('active');
}

// mapList의 0번째 지도를 가져온다
async function getMapDataByIndex(index) {
    if (index < 0) {
        alert('map을 선택하세요. ');
        return;
    }
    const option = {
        clientId: mapList[index].clientId,
        clientSecret: mapList[index].clientSecret,
        serverType: 'SERVER_REAL',
    };
    getMapData(option);
}

async function getMapData(option) {
    mapData = await dabeeoMaps.getMapData(option);
    if (map) map.context.cleanup();
    map = await dabeeoMaps.showMap(mapContainer, {}, mapData);
    if (floorMenu) gui.remove(floorMenu);
    gui.destroy();
    initAllMenu(gui, mapData, map, mapContainer);
}

function activateMenu(menuName) {
    let currentMenu = null;
    if (menuName === 'getMap') {
        getMapMenu.show();
        currentMenu = getMapMenu;
    } else if (menuName === 'mapOption') {
        mapOptionMenu.show();
        currentMenu = mapOptionMenu;
    } else {
        const menuFound = menuList.find((element) => element.name === menuName);
        menuFound.init.show();
        currentMenu = menuFound.init;
    }
    return currentMenu;
}
function initAllMenu(parentMenu, mapData, map, mapContainer) {
    getMapMenu = initGetMap(parentMenu);
    floorMenu = initFloorMenu(parentMenu, mapData, map, mapContainer);
    menuList.forEach(async (element) => {
        if (element.menu) {
            element.init = await new element.menu().init(gui, mapData, map, mapContainer);
            element.init.hide();
        }
    });
    console.log(menuList);
    mapOptionMenu = initMapOptionMenu(parentMenu);
    mapOptionMenu.hide();

    currentMenu = getMapMenu;
}
function initFloorMenu(gui, mapData, map, mapContainer) {
    mapContainer.addEventListener('floor-changed', (e) => {
        console.log('floor-changed 에 대한 결과값', e.detail);
        setting.floor = e.detail.id;
    });

    const floorList = mapData.dataFloor.getFloors().reduce((prev, cur) => {
        return { ...prev, [cur.name[0].text]: cur.id };
    }, {});
    console.log(floorList);
    const currentFloor = map.context.getCurrentFloor();

    async function changeFloor(value) {
        await map.context.changeFloor(value);
        console.log(`this.map.context.changeFloor(${value})`);
    }
    const setting = {
        changeFloor: currentFloor.id,
    };
    return gui.add(setting, 'changeFloor', floorList).onChange(changeFloor).listen();
}

function initGetMap(parentMenu) {
    const menu = parentMenu.addFolder('getMap Menu ');
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
        const option = {
            clientId: setting.clientId,
            clientSecret: setting.clientSecret,
            serverType: setting.serverType,
        };
        await getMapData(option);
    }
    return menu;
}

function initGetMapByList(parentMenu) {
    let mapSetting = { 선택: -1 };
    mapList.forEach((element, index) => {
        mapSetting[element.name] = index;
    });

    const setting = { mapIndex: mapIndex };
    parentMenu.add(setting, 'mapIndex', mapSetting).onChange(initGetMapDataByIndex);
    async function initGetMapDataByIndex(value) {
        mapIndex = value;
        await getMapDataByIndex(value);
    }
}

function initMapOptionMenu(parentMenu) {
    const setting = initSetting();
    const menu = initMenu(setting, parentMenu);
    const actionSetting = {
        showMap: showMap,
    };
    menu.add(actionSetting, 'showMap');
    async function showMap() {
        const option = getOption(setting);
        if (map) map.context.cleanup();
        map = await dabeeoMaps.showMap(mapContainer, option, mapData);
        gui.remove(floorMenu);
        gui.destroy();
        initAllMenu(gui, mapData, map, mapContainer);
        getMapMenu.hide();
        mapOptionMenu.show();
        currentMenu = mapOptionMenu;
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

function initMenu(setting, parentMenu) {
    const floorSetting = mapData.dataFloor.getFloors().reduce((prev, cur) => {
        return { ...prev, [cur.name[0].text]: cur.id };
    }, {});
    const langSetting = mapData.dataLanguage.getLanguage().map((data) => data.lang);

    const menu = parentMenu.addFolder('mapOption');
    menu.open();
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

window.addEventListener('load', (event) => {
    console.log('window is loaded');
    init();
});
