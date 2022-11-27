import { mapList } from './test/mapList.js';
import { MapInfoMenu } from './test/MapInfoMenu.js';
import { MapDataMenu } from './test/MapDataMenu.js';

async function init() {
    const dabeeoMaps = new dabeeo.Maps();
    const gui = new dat.GUI({ width: 300, right: 0, autoPlace: false });

    let mapData = null;
    let map = null;
    const mapContainer = document.querySelector('.map');

    document.querySelector('.guiContainer').append(gui.domElement);
    let currentMenu = initGetMap(gui);
    await getMap(0);
    const option = {};
    map = await dabeeoMaps.showMap(mapContainer, option, mapData);

    //nav bar active class switching
    document.querySelector('.nav').addEventListener('click', (e) => {
        if (e.target.parentElement.className === 'nav') {
            if (e.target.classList.contains('active')) return;
            if (currentMenu) {
                gui.removeFolder(currentMenu);
                currentMenu = null;
            }
            e.target.parentElement.querySelector('li.active').classList.remove('active');
            e.target.classList.add('active');

            if (e.target.getAttribute('name') === 'getMap') {
                currentMenu = initGetMap(gui);
            } else {
                if (!mapData) return;
                if (e.target.getAttribute('name') === 'mapInfo') {
                    const mapInfoMenu = new MapInfoMenu();
                    currentMenu = mapInfoMenu.init(gui, mapData);
                } else if (e.target.getAttribute('name') === 'mapData') {
                    const mapDataMenu = new MapDataMenu();
                    currentMenu = mapDataMenu.init(gui, mapData);
                }
            }
        }
    });
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
            const option = {
                clientId: setting.clientId,
                clientSecret: setting.clientSecret,
                serverType: setting.serverType,
            };
            //mapData 가져오기
            mapData = await dabeeoMaps.getMapData(option);
        }
        return menu;
    }
    async function getMap(value) {
        if (value < 0) {
            alert('map을 선택하세요. ');
            return;
        }

        const option = {
            clientId: mapList[value].clientId,
            clientSecret: mapList[value].clientSecret,
            serverType: 'SERVER_REAL',
        };
        mapData = await dabeeoMaps.getMapData(option);
    }

    function initGetMapByList(parentMenu) {
        let mapSetting = { 선택: -1 };
        mapList.forEach((element, index) => {
            mapSetting[element.name] = index;
        });

        const setting = {
            mapIndex: 0,
        };
        parentMenu.add(setting, 'mapIndex', mapSetting).onChange(getMap);
    }
}

window.addEventListener('load', (event) => {
    console.log('window is loaded');
    init();
});
