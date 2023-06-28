import { MapInfoMoreMenu } from './MapInfoMoreMenu.js';

export class MapInfoMenu {
    constructor() {
        this.gui = null;
        this.mapData = null;
        this.map = null;
        this.mapContainer = null;
        this.menu = null;
        this.setting = null;
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
        console.log(this.mapData);
        this.mapContainer = mapContainer;
        const georeferencingEast = mapData.dataMapInfo.mapInfo.georeferencingEast || '';
        const georeferencingNorth = mapData.dataMapInfo.mapInfo.georeferencingNorth || '';
        const georeferencingSouth = mapData.dataMapInfo.mapInfo.georeferencingSouth || '';
        const georeferencingWest = mapData.dataMapInfo.mapInfo.georeferencingWest || '';

        const mapInfo = {
            northReference: mapData.dataMapInfo.mapInfo.northReference,
            width: mapData.dataMapInfo.mapInfo.size.width,
            height: mapData.dataMapInfo.mapInfo.size.height,
            scaleCm: mapData.dataMapInfo.mapInfo.scaleCm,
            name: mapData.dataMapInfo.mapInfo.name,
            id: mapData.dataMapInfo.mapInfo.id,
            version: mapData.dataMapInfo.mapInfo.versionString,
            geoReferencingEast: georeferencingEast,
            georeferencingNorth: georeferencingNorth,
            georeferencingSouth: georeferencingSouth,
            geoReferencingWest: georeferencingWest,
        };
        this.menu = this.gui.addFolder('mapInfo');
        this.menu.open();
        this.menu.add(mapInfo, 'northReference');
        this.menu.add(mapInfo, 'width');
        this.menu.add(mapInfo, 'height');
        this.menu.add(mapInfo, 'scaleCm');
        this.menu.add(mapInfo, 'name');
        this.menu.add(mapInfo, 'id');
        this.menu.add(mapInfo, 'version');
        this.menu.add(mapInfo, 'geoReferencingEast');
        this.menu.add(mapInfo, 'georeferencingNorth');
        this.menu.add(mapInfo, 'georeferencingSouth');
        this.menu.add(mapInfo, 'geoReferencingWest');

        new MapInfoMoreMenu().init(this.menu, mapData, map, mapContainer);
        return this.menu;
    }

    removeMenu() {
        if (this.menu) {
            this.gui.removeFolder(this.menu);
            this.menu = null;
        }
    }
}
