import { mapList } from './qaTest/mapList.js';
import { menuList } from './menuList.js';
// import { indexMore } from './indexMore.js';

const dabeeoMaps = new dabeeo.Maps();
// let gui = null;
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

    //초기 메뉴를 만든다
    await initMenu();

    //nav bar active class switching
    document.querySelector('.nav').addEventListener('click', menuSwitch);
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

function makeMapElement() {
    // map 그리기
    const section = document.querySelector('.section');
    const mapContainer = document.createElement('div');
    mapContainer.className = 'map';
    section.appendChild(mapContainer);
    return mapContainer;
}
// 최초로 메뉴를 만든다
async function initMenu() {
    // mapData를 fetch
    mapData = await dabeeoMaps.getMapData({
        clientId: mapList[0].clientId,
        clientSecret: mapList[0].clientSecret,
        serverType: 'SERVER_REAL',
    });

    // mapContainer를 만든다
    const mapContainer = makeMapElement();
    // map을 그린다
    map = await dabeeoMaps.showMap(mapContainer, {}, mapData);
    // console.log('mapoption', map.getMapOptions());
    // 메뉴를 만든다
    getMapMenu = initGetMap(gui);
    mapOptionMenu = initMapOptionMenu(gui);
    mapOptionMenu.hide();
    floorMenu = initFloorMenu(gui, mapData, map, mapContainer);
    menuList.forEach(async (element) => {
        if (element.menu) {
            element.instance = new element.menu();
            element.init = await element.instance.init(gui, mapData, map, mapContainer);
            element.init.hide();
        }
    });
    console.log(menuList);
    console.log('mapoption', map.context.getMapOptions());
    currentMenu = getMapMenu;
}

function initGetMap(parentMenu) {
    const menu = parentMenu.addFolder('getMap Menu ');
    menu.open();
    initGetMapByInput(menu);
    initGetMapByList(menu);
    return menu;
}
function initGetMapByInput(parentMenu) {
    const menu = parentMenu.addFolder('get Map by client info ');

    const setting = {
        clientId: '',
        clientSecret: '',
        serverType: 'SERVER_REAL',
        getMapByInput: getMapByInput,
        getMapReal_Stage: getMapReal_Stage,
        local: local,
    };
    menu.add(setting, 'clientId');
    menu.add(setting, 'clientSecret');
    menu.add(setting, 'serverType', ['SERVER_REAL', 'SERVER_STAGE']);
    menu.add(setting, 'getMapByInput');
    menu.add(setting, 'getMapReal_Stage');
    menu.add(setting, 'local');

    async function getMapByInput() {
        const option = {
            clientId: setting.clientId,
            clientSecret: setting.clientSecret,
            serverType: setting.serverType,
        };
        await getMapData(option);
    }

    async function local() {
        const dabeeoMaps = new dabeeo.Maps();

        //mapDataOption 정의
        const path = `./MP-1jydrhzb11sh17965`;

        const mapDataOption = {
            baseUrl: path,
            mapId: 'MP-1jydrhzb11sh17965',
            serverType: 'SERVER_LOCAL',
        };
        //mapData 가져오기
        const mapData = await dabeeoMaps.getMapData(mapDataOption);
        console.log(mapData);
        if (map) map.context.cleanup();
        document.querySelector('.map').remove();
        //mapContainer
        const mapContainer = makeMapElement();

        //mapOption 정의
        const mapOption = Object.assign({
            // camera: '2d' | '3d',                        // 초기 카메라 모드 3d
            // floor: string,                              // 적용할 층 정보
            // theme: string,                              // 적용할 테마의 ID
            language: 'en', // 초기 poi 언어 설정
            showPoi: true, // map상에 poi 보여줄지 말지 결정 여부. default는 true
            spriteEnable: true, // POI,Marker,MyLocation,길찾기 마커를 항상 정면으로 보이게 함.
            // spriteKeepRotation: true,                      // POI,Marker,MyLocation,길찾기 마커를 sprite로 그릴때 원래 각도 유지 여부
            // controlOption: {
            //     // zoom: 0,                             // 초기 줌
            //     // pan: {                               // 중심좌표
            //     //     // x: number,
            //     //     // y: number
            //     // },
            //     // rotate: 0,                           // 회전 3d, 2d
            //     // tilt: 0                              // 기울기 3d
            // },
            // poiLevel: any[]                             // poi 중요도에 따라 설정한 지도 확대 백분율에 맞게 보이게 설정.
            // fontWeight: {                               // poi title font style
            //   // normal:number,
            //   // bold:number
            // },
            // mergeMesh: boolean,                         // mergedMesh 활성화 여부
            waterMarkPosition: 'RIGHT_TOP',
        });

        // mapContainer에 mapOption으로 mapData의 지도데이터를 그리기
        map = await dabeeoMaps.showMap(mapContainer, mapOption, mapData);
        console.log('mapoption', map.context.getMapOptions());
        gui.removeFolder(mapOptionMenu);
        removeAllMenu();
        console.log('mapoption', mapOption);
        // 메뉴 다시 만들기
        mapOptionMenu = initMapOptionMenu(gui);
        mapOptionMenu.hide();

        initAllMenu(gui, mapData, map, mapContainer);
        console.log(map);
        console.log('test: dabeeoMaps');
    }

    async function getMapReal_Stage() {
        const mapDataOption1 = {
            name: '사무실_real',
            clientId: '75hb8YSnAokb-sZ04aDR91',
            clientSecret: '0f7ad84f160c7b3fd1849a7920af718b',
            serverType: 'SERVER_REAL',
        };
        const mapDataOption2 = {
            name: '사무실_stage',
            clientId: '75hb8YSnAokb-sZ04aDR91',
            clientSecret: '0f7ad84f160c7b3fd1849a7920af718b',
            serverType: 'SERVER_STAGE',
        };
        const mapDataOption3 = {
            name: '사무실_real',
            clientId: '6cHpIJoJknv9ZbsaLRN2Dj',
            clientSecret: 'ad980b99be38dbd033aac1c757115064',
            serverType: 'SERVER_REAL',
        };
        const mapDataOption4 = {
            name: '사무실_stage',
            clientId: '6cHpIJoJknv9ZbsaLRN2Dj',
            clientSecret: 'ad980b99be38dbd033aac1c757115064',
            serverType: 'SERVER_REAL',
        };

        await dabeeoMaps.getMapData(mapDataOption1);
        console.log('사무실_real');
        setTimeout(async () => {
            await dabeeoMaps.getMapData(mapDataOption2);
            console.log('사무실_stage');
        }, 3000);
        setTimeout(async () => {
            await dabeeoMaps.getMapData(mapDataOption3);
            console.log('이케아_real');
        }, 6000);
        setTimeout(async () => {
            await dabeeoMaps.getMapData(mapDataOption4);
            console.log('이케아_stage');
        }, 9000);
    }
}

function initGetMapByList(menu) {
    let mapSetting = { 선택: -1 };
    mapList.forEach((element, index) => {
        mapSetting[element.name] = index;
    });

    const setting = { mapIndex: mapIndex };
    menu.add(setting, 'mapIndex', mapSetting).onChange(initGetMapDataByIndex);
    async function initGetMapDataByIndex(value) {
        mapIndex = value;
        await getMapDataByIndex(value);
    }
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
    // 맵 데이터 새로 가져오기
    mapData = await dabeeoMaps.getMapData(option);
    //이전에 그려졌던 맵 삭제 및 메모리 해제
    if (map) map.context.cleanup();
    document.querySelector('.map').remove();

    //맵 컨테이너 만들고 맵 그리기
    const mapContainer = makeMapElement();
    map = await dabeeoMaps.showMap(mapContainer, {}, mapData);
    console.log('mapoption', map.context.getMapOptions());
    //메뉴 삭제
    gui.removeFolder(mapOptionMenu);
    removeAllMenu();

    // 메뉴 다시 만들기
    mapOptionMenu = initMapOptionMenu(gui);
    mapOptionMenu.hide();

    initAllMenu(gui, mapData, map, mapContainer);
}

// 메뉴 삭제
function removeAllMenu() {
    gui.removeFolder(floorMenu);
    menuList.forEach(async (element) => {
        if (element.menu) {
            element.instance.removeMenu();
        }
    });
}

// 메뉴 다시 만들기
function initAllMenu(parentMenu, mapData, map, mapContainer) {
    floorMenu = initFloorMenu(parentMenu, mapData, map, mapContainer);
    menuList.forEach(async (element) => {
        if (element.menu) {
            element.init = await element.instance.init(gui, mapData, map, mapContainer);
            element.init.hide();
        }
    });
    console.log(menuList);

    currentMenu = getMapMenu;
}

function menuSwitch(e) {
    // nav 메뉴를 클릭하지 않았거나 이미 active되어 있는 메뉴를 클릭했으면 return
    if (e.target.parentElement.className !== 'nav' || e.target.classList.contains('active')) return;

    //active class에서 active를 제거한다
    e.target.parentElement.querySelector('li.active').classList.remove('active');

    //현재 선택된 element에 active를 붙인다
    e.target.classList.add('active');

    // 현재 메뉴를 숨긴다
    currentMenu.hide();

    //현재 선택된 메뉴를 보여준다
    currentMenu = activateMenu(e.target.getAttribute('name'));
}

function activateMenu(menuName) {
    if (menuName === 'getMap') {
        getMapMenu.show();
        return getMapMenu;
    } else if (menuName === 'mapOption') {
        mapOptionMenu.show();
        return mapOptionMenu;
    } else {
        const menuFound = menuList.find((element) => element.name === menuName);
        menuFound.init.show();
        return menuFound.init;
    }
}

function initFloorMenu(gui, mapData, map, mapContainer) {
    const menu = gui.addFolder('Floor');
    menu.open();
    const currentFloor = map.context.getCurrentFloor();
    const setting = {
        changeFloor: currentFloor.id,
    };
    mapContainer.addEventListener('floor-changed', (e) => {
        console.log('floor-changed 에 대한 결과값', e.detail);
        setting.changeFloor = e.detail.id;
    });

    const floorList = mapData.dataFloor.getFloors().reduce((prev, cur) => {
        return { ...prev, [cur.name[0].text]: cur.id };
    }, {});
    console.log(floorList);

    async function changeFloor(value) {
        await map.context.changeFloor(value);
        console.log(`this.map.context.changeFloor(${value})`);
    }
    menu.add(setting, 'changeFloor', floorList).onChange(changeFloor).listen();
    return menu;
}

function initMapOptionMenu(parentMenu, map, option) {
    const setting = initOptionSetting();
    const menu = initOptionMenu(setting, parentMenu);
    const actionSetting = {
        showMap: showMap,
        langtest: langtest,
        showpoitest: showpoitest,
        watermarktest: watermarktest,
        tilitingtest: tilitingtest,
        emart: emart,
        mergeMesh: mergeMesh,
        splitetest: splitetest,
    };
    menu.add(actionSetting, 'showMap');
    menu.add(actionSetting, 'langtest');
    menu.add(actionSetting, 'showpoitest');
    menu.add(actionSetting, 'watermarktest');
    menu.add(actionSetting, 'tilitingtest');
    menu.add(actionSetting, 'emart');
    menu.add(actionSetting, 'mergeMesh');
    menu.add(actionSetting, 'splitetest');
    // new indexMore().init(menu, map, option, gui);
    async function showMap() {
        if (map) map.context.cleanup();
        document.querySelector('.map').remove();

        const option = getOption(setting);
        const mapContainer = makeMapElement();
        map = await dabeeoMaps.showMap(mapContainer, option, mapData);
        console.log('mapoption', map.context.getMapOptions());
        removeAllMenu();

        initAllMenu(gui, mapData, map, mapContainer);
        // getMapMenu.hide();
        // mapOptionMenu.show();
        currentMenu = mapOptionMenu;
    }

    //Daniel 임시추가 내역 ( 추후 업데이트 )
    async function splitetest() {
        if (map) map.context.cleanup();
        document.querySelector('.map').remove();
        const mapDataOption = {
            name: '사무실',
            id: 'MP-1jydrhzb11sh17965',
            clientId: '75hb8YSnAokb-sZ04aDR91',
            clientSecret: '0f7ad84f160c7b3fd1849a7920af718b',
        };
        const mapOption = {
            spriteEnable: false,
        };
        const mapOption2 = {
            spriteEnable: true,
            spriteKeepRotation: true,
        };
        const mapData = await dabeeoMaps.getMapData(mapDataOption);
        const mapContainer = makeMapElement();
        map = await dabeeoMaps.showMap(mapContainer, {}, mapData);
        map.control.set({ zoom: 20, rotation: 90, tilt: 0 });
        setTimeout(async () => {
            if (map) map.context.cleanup();
            map = await dabeeoMaps.showMap(mapContainer, mapOption, mapData);
            map.control.set({ zoom: 20, rotation: 90, tilt: 0 });
            removeAllMenu();

            initAllMenu(gui, mapData, map, mapContainer);

            currentMenu = mapOptionMenu;
        }, 3000);
        setTimeout(async () => {
            if (map) map.context.cleanup();
            map = await dabeeoMaps.showMap(mapContainer, mapOption2, mapData);
            map.control.set({ zoom: 20, rotation: 90, tilt: 0 });
            removeAllMenu();

            initAllMenu(gui, mapData, map, mapContainer);

            currentMenu = mapOptionMenu;
        }, 6000);
    }

    async function tilitingtest() {
        if (map) map.context.cleanup();
        document.querySelector('.map').remove();
        const mapDataOption = {
            name: '경주',
            id: 'MP-1ib99qh85lu903573',
            clientId: '8sQFPWruAUGbcZt7OyxFX0',
            clientSecret: '120ad2959d5533e44cc24905d8af0da4',
        };
        const mapOption = {
            enableTiling: true,
        };

        //mapData 가져오기
        const mapData = await dabeeoMaps.getMapData(mapDataOption);
        const mapContainer = makeMapElement();

        if (map) map.context.cleanup();
        map = await dabeeoMaps.showMap(mapContainer, mapOption, mapData);
        removeAllMenu();

        initAllMenu(gui, mapData, map, mapContainer);

        currentMenu = mapOptionMenu;
    }

    async function emart() {
        if (map) map.context.cleanup();
        document.querySelector('.map').remove();
        const mapDataOption = {
            name: '이마트_연수점',
            id: 'MP-1iev226pi8f1v0652',
            clientId: 'c_VGxATtQ_M9uxz1YdsWDj',
            clientSecret: 'ed2dbb75cd356b8a44ffa9d9993bc922',
        };
        const mapOption = {
            camera: '3d', // 초기 카메라 모드. default는 3d
            floor: null, // 적용할 층 정보. default는 지도 설정값
            // theme: string,                    // 적용할 테마의 ID
            language: 'ko', // 초기 poi 언어 설정. default는 지도 설정값
            showPoi: true,
            spriteEnable: true, // Poi를 항상 정면으로 보이게 함. default는 true
            spriteKeepRotation: true, // POI sprite로 그릴때 원래 각도 유지 여부. default는 false
            showWaterMarker: false,
            enablePoiCollisionTest: false,
            canvasSize: {
                width: 1000,
                height: 800,
            },
            controlOption: {
                rotate: 180,
                zoom: 21.2, // 0~24
                pan: {
                    // 중심좌표, default는 지도 중심
                    x: 940,
                    y: 600,
                },
                tilt: 30,
            },
        };

        //mapData 가져오기
        const mapData = await dabeeoMaps.getMapData(mapDataOption);
        const mapContainer = makeMapElement();

        if (map) map.context.cleanup();
        map = await dabeeoMaps.showMap(mapContainer, mapOption, mapData);
        removeAllMenu();

        initAllMenu(gui, mapData, map, mapContainer);

        currentMenu = mapOptionMenu;
    }

    async function mergeMesh() {
        if (map) map.context.cleanup();
        document.querySelector('.map').remove();
        const mapDataOption = {
            name: '경주',
            id: 'MP-1ib99qh85lu903573',
            clientId: '8sQFPWruAUGbcZt7OyxFX0',
            clientSecret: '120ad2959d5533e44cc24905d8af0da4',
        };
        const mapOption = {
            mergeMesh: true,
        };
        setTimeout(async () => {
            const mapData = await dabeeoMaps.getMapData(mapDataOption);
            const mapContainer = makeMapElement();

            if (map) map.context.cleanup();
            map = await dabeeoMaps.showMap(mapContainer, mapOption, mapData);
            removeAllMenu();

            initAllMenu(gui, mapData, map, mapContainer);

            currentMenu = mapOptionMenu;
        }, 3000);
        //mapData 가져오기
    }

    async function langtest() {
        if (map) map.context.cleanup();
        document.querySelector('.map').remove();

        const mapOption = {
            language: 'en', // 초기 poi 언어 설정
            showPoi: true, // map상에 poi 보여줄지 말지 결정 여부. default는 true
        };
        const mapOption2 = {
            language: 'ko', // 초기 poi 언어 설정
            showPoi: true, // map상에 poi 보여줄지 말지 결정 여부. default는 true
        };
        const mapContainer = makeMapElement();
        map = await dabeeoMaps.showMap(mapContainer, mapOption, mapData);
        console.log(mapData);
        setTimeout(async () => {
            if (map) map.context.cleanup();
            map = await dabeeoMaps.showMap(mapContainer, mapOption2, mapData);
            removeAllMenu();

            initAllMenu(gui, mapData, map, mapContainer);

            currentMenu = mapOptionMenu;
        }, 5000);

        // removeAllMenu();

        // initAllMenu(gui, mapData, map, mapContainer);
        // getMapMenu.hide();
        // mapOptionMenu.show();
        // currentMenu = mapOptionMenu;
    }

    async function showpoitest() {
        if (map) map.context.cleanup();
        document.querySelector('.map').remove();
        const mapContainer = makeMapElement();
        const mapOption = Object.assign({
            camera: '2d',
            showPoi: true, // map상에 poi 보여줄지 말지 결정 여부. default는 true
        });
        const mapOption2 = Object.assign({
            camera: '3d',
            showPoi: true, // map상에 poi 보여줄지 말지 결정 여부. default는 true
        });
        const mapOption3 = Object.assign({
            camera: '2d',
            showPoi: false, // map상에 poi 보여줄지 말지 결정 여부. default는 true
        });
        const mapOption4 = Object.assign({
            camera: '3d',
            showPoi: false, // map상에 poi 보여줄지 말지 결정 여부. default는 true
        });

        map = await dabeeoMaps.showMap(mapContainer, mapOption, mapData);
        setTimeout(async () => {
            if (map) map.context.cleanup();
            map = await dabeeoMaps.showMap(mapContainer, mapOption2, mapData);
        }, 2000);
        setTimeout(async () => {
            if (map) map.context.cleanup();
            map = await dabeeoMaps.showMap(mapContainer, mapOption3, mapData);
        }, 6000);
        setTimeout(async () => {
            if (map) map.context.cleanup();
            map = await dabeeoMaps.showMap(mapContainer, mapOption4, mapData);
            removeAllMenu();

            initAllMenu(gui, mapData, map, mapContainer);
            // getMapMenu.hide();
            // mapOptionMenu.show();
            currentMenu = mapOptionMenu;
        }, 11000);
    }

    async function watermarktest() {
        if (map) map.context.cleanup();
        document.querySelector('.map').remove();
        const mapContainer = makeMapElement();
        const mapOption = Object.assign({
            showWaterMarker: false,
        });
        const mapOption2 = Object.assign({
            showWaterMarker: true,
        });
        const mapOption3 = Object.assign({
            showWaterMarker: true,
            waterMarkPosition: 'LEFT_TOP',
        });
        const mapOption4 = Object.assign({
            showWaterMarker: true,
            waterMarkPosition: 'RIGHT_TOP',
        });
        const mapOption5 = Object.assign({
            showWaterMarker: true,
            waterMarkPosition: 'LEFT_BOTTOM',
        });
        const mapOption6 = Object.assign({
            showWaterMarker: true,
            waterMarkPosition: 'RIGHT_BOTTOM',
        });

        map = await dabeeoMaps.showMap(mapContainer, mapOption, mapData);
        setTimeout(async () => {
            if (map) map.context.cleanup();
            map = await dabeeoMaps.showMap(mapContainer, mapOption2, mapData);
        }, 2000);
        setTimeout(async () => {
            if (map) map.context.cleanup();
            map = await dabeeoMaps.showMap(mapContainer, mapOption3, mapData);
        }, 5000);
        setTimeout(async () => {
            if (map) map.context.cleanup();
            map = await dabeeoMaps.showMap(mapContainer, mapOption4, mapData);
        }, 8000);
        setTimeout(async () => {
            if (map) map.context.cleanup();
            map = await dabeeoMaps.showMap(mapContainer, mapOption5, mapData);
        }, 11000);
        setTimeout(async () => {
            if (map) map.context.cleanup();
            map = await dabeeoMaps.showMap(mapContainer, mapOption6, mapData);
            removeAllMenu();

            initAllMenu(gui, mapData, map, mapContainer);
            // getMapMenu.hide();
            // mapOptionMenu.show();
            currentMenu = mapOptionMenu;
        }, 14000);
    }

    //Daniel 임시추가 내역(완)
    function getOption(setting) {
        const mapOption = {
            camera: setting.camera, // 초기 카메라 모드 3d
            floor: setting.floor, // 적용할 층 정보
            language: setting.language, // 초기 poi 언어 설정
            theme: setting.theme,
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
            canvasSize: {
                width: setting.canvasSizewidth,
                height: setting.canvasSizeheight,
            },
            enablePoiCollisionTest: setting.enablePoiCollisionTest,
            waterMarkPosition: setting.waterMarkPosition,
            enableTiling: setting.enableTiling,
            framerate: setting.framerate,
            backgroundImage: setting.backgroundImage,
        };
        return mapOption;
    }

    return menu;
}

function initOptionSetting() {
    const defaultFloorId = mapData.dataFloor.getDefaultFloor().id;
    const defaultLang = mapData.dataLanguage.getDefaultLanguage().lang;
    const theme = mapData.dataMapInfo.mapInfo.themes[0].id;

    const setting = {
        camera: '3d', // 초기 카메라 모드 3d
        floor: defaultFloorId,
        language: defaultLang, // 초기 poi 언어 설정
        theme: theme,
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
        canvasSizewidth: '',
        canvasSizeheight: '',
        enableTiling: false,
        waterMarkPosition: 'LEFT_BOTTOM',
        enablePoiCollisionTest: true,
        framerate: 24,
        backgroundImage: '',
    };
    return setting;
}

function initOptionMenu(setting, parentMenu) {
    const menu = parentMenu.addFolder('mapOption');
    const floorSetting = mapData.dataFloor.getFloors().reduce((prev, cur) => {
        return { ...prev, [cur.name[0].text]: cur.id };
    }, {});
    const langSetting = mapData.dataLanguage.getLanguage().map((data) => data.lang);
    const theme = mapData.dataMapInfo.mapInfo.themes.reduce((prev, cur) => {
        return { ...prev, [cur.name]: cur.id };
    }, {});

    menu.open();
    menu.add(setting, 'camera', ['2d', '3d']);
    menu.add(setting, 'floor', floorSetting);
    menu.add(setting, 'language', langSetting);
    menu.add(setting, 'theme', theme);
    menu.add(setting, 'showPoi');
    menu.add(setting, 'enablePoiCollisionTest');
    menu.add(setting, 'spriteEnable');
    menu.add(setting, 'spriteKeepRotation');
    menu.add(setting, 'zoom');
    menu.add(setting, 'x');
    menu.add(setting, 'y');
    menu.add(setting, 'rotate');
    menu.add(setting, 'tilt');
    menu.add(setting, 'canvasSizewidth');
    menu.add(setting, 'canvasSizeheight');
    menu.add(setting, 'framerate');
    menu.add(setting, 'mergeMesh');
    menu.add(setting, 'showWaterMarker');
    menu.add(setting, 'waterMarkPosition', ['LEFT_TOP', 'RIGHT_TOP', 'LEFT_BOTTOM', 'RIGHT_BOTTOM']);
    menu.add(setting, 'enableTiling');
    menu.add(setting, 'backgroundImage', ['', 'https://assets.dabeeomaps.com/upload/library/assets/EVO_Sports_Expo_SANTA_CLARA_2023_layout.jpg']);
    return menu;
}

window.addEventListener('load', (event) => {
    console.log('window is loaded');
    init();
});
