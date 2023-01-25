export class TagMoreMenu {
    constructor() {
        this.mapData = null;
        this.map = null;
        this.mapContainer = null;
        this.menu = null;
        this.setting = null;
        this.poiList = null;
    }
    removeMenu() {
        if (this.menu) {
            this.gui.removeFolder(this.menu);
            this.menu = null;
        }
    }
    async init(menu, mapData, map, mapContainer) {
        this.mapData = mapData;
        this.map = map;
        this.mapContainer = mapContainer;
        this.menu = menu.addFolder('More');
        this.initMoreSetting();
        const currentFloor = this.map.context.getCurrentFloor().id;
        this.poiList = this.mapData.dataPoi.getPois().reduce(
            (result, cur) => {
                if (currentFloor == cur.floorId) result.push(cur.id);
                return result;
            },
            [''],
        );
        return this.menu;
    }
    initMoreSetting() {
        const setting = {
            TagPostest: this.TagPostest.bind(this),
        };
        const menu = this.menu;
        menu.add(setting, 'TagPostest');
    }
    async TagPostest() {
        const markers = await this.map.markers.set({
            marker: [
                { x: 2000, y: 1000 },
                { x: 2000, y: 1000 },
                { x: 2000, y: 1000 },
                { x: 2000, y: 1000 },
                { x: 2000, y: 1000 },
            ],
        });
        const tag = document.createElement('div');
        const tag1 = document.createElement('div');
        const tag2 = document.createElement('div');
        const tag3 = document.createElement('div');
        const tag4 = document.createElement('div');
        tag.className = 'tag-container';
        tag.textContent = 'POI EVENT Created at beggining';
        tag1.className = 'tag-container';
        tag1.textContent = 'POI EVENT Created at beggining';
        tag2.className = 'tag-container';
        tag2.textContent = 'POI EVENT Created at beggining';
        tag3.className = 'tag-container';
        tag3.textContent = 'POI EVENT Created at beggining';
        tag4.className = 'tag-container';
        tag4.textContent = 'POI EVENT Created at beggining';
        this.map.tag.setMarkerTag({ parentId: markers[0], pos: 'LEFT', tag: tag });
        this.map.tag.setMarkerTag({ parentId: markers[1], pos: 'RIGHT', tag: tag1 });
        this.map.tag.setMarkerTag({ parentId: markers[2], pos: 'TOP', tag: tag2 });
        this.map.tag.setMarkerTag({ parentId: markers[3], pos: 'CENTER', tag: tag3 });
        this.map.tag.setMarkerTag({ parentId: markers[4], pos: 'BOTTOM', tag: tag4 });

        const tag5 = document.createElement('div');
        const tag6 = document.createElement('div');
        const tag7 = document.createElement('div');
        const tag8 = document.createElement('div');
        const tag9 = document.createElement('div');
        tag5.className = 'tag-container';
        tag5.textContent = 'POI EVENT Created at beggining';
        tag6.className = 'tag-container';
        tag6.textContent = 'POI EVENT Created at beggining';
        tag7.className = 'tag-container';
        tag7.textContent = 'POI EVENT Created at beggining';
        tag8.className = 'tag-container';
        tag8.textContent = 'POI EVENT Created at beggining';
        tag9.className = 'tag-container';
        tag9.textContent = 'POI EVENT Created at beggining';
        this.map.tag.setPOITag({ parentId: this.poiList[1].id, pos: 'TOP', tag: tag5 });
        this.map.tag.setPOITag({ parentId: this.poiList[1].id, pos: 'BOTTOM', tag: tag6 });
        this.map.tag.setPOITag({ parentId: this.poiList[1].id, pos: 'RIGHT', tag: tag7 });
        this.map.tag.setPOITag({ parentId: this.poiList[1].id, pos: 'LEFT', tag: tag8 });
        this.map.tag.setPOITag({ parentId: this.poiList[1].id, pos: 'CENTER', tag: tag9 });

        const floorList = this.mapData.dataFloor.getDefaultFloor();
        const tag0 = document.createElement('div');
        tag0.className = 'tag-container';
        tag0.textContent = 'POI EVENT Created at beggining';
        const option = {
            position: { x: 100, y: 100, z: 50 },
            tag: tag0,
            floorId: floorList.id,
        };
        this.map.tag.set(option);
    }
}
