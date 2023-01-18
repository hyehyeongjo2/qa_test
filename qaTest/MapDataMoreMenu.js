export class MapDataMoreMenu {
    constructor() {
        this.gui = null;
        this.mapData = null;
        this.map = null;
        this.mapContainer = null;
        this.menu = null;
    }

    init(gui, mapData, map, mapContainer) {
        this.gui = gui;
        this.mapData = mapData;
        this.map = map;
        this.mapContainer = mapContainer;
        this.addmenu = this.gui.addFolder('More_사무실용');
        this.initFloorData(this.addmenu);
        return this.addmenu;
    }

    initFloorData(gui) {
        const FloorData = () => {
            console.log('---------------');
            console.log('Floor Info: ', this.mapData.dataFloor.getFloors());
            console.log('default Floor: ', this.mapData.dataFloor.getDefaultFloor());
            console.log('입력받은 층이름이 title에 포함된 모든 층 정보: ', this.mapData.dataFloor.find({ title: '11F' }));
            console.log('입력받은 floorId의 정보를 가진 층 정보: ', this.mapData.dataFloor.find({ id: 'FL-t4vqgyek3jnb8146' }));
            console.log('---------------');
        };
        const setting = {
            FloorData: FloorData,
        };
        gui.add(setting, 'FloorData');
    }
}