export class TagMoreMenu {
    constructor(){
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
    async init(menu, mapData, map, mapContainer) {
        this.mapData = mapData;
        this.map = map;
        this.mapContainer = mapContainer;
        this.menu = menu.addFolder('More');
        this.initMoreSetting();
        return this.menu;
    }
    initMoreSetting() {
        const setting = {
            TagPostest:this.TagPostest.bind(this),
        };
        const menu = this.menu;
        menu.add(setting, 'TagPostest');
    }
    async TagPostest(){
        const markers1 = await this.map.markers.set({ 
            marker: [
                { x: 2000, y: 1000 },
                { x: 2000, y: 1000 },
                { x: 2000, y: 1000 },
                { x: 2000, y: 1000 },
                { x: 2000, y: 1000 }
            ]
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
        this.map.tag.setMarkerTag({ parentId: markers1[0], pos: 'LEFT', tag: tag });
        this.map.tag.setMarkerTag({ parentId: markers1[1], pos: 'RIGHT', tag: tag1 });
        this.map.tag.setMarkerTag({ parentId: markers1[2], pos: 'TOP', tag: tag2 });
        this.map.tag.setMarkerTag({ parentId: markers1[3], pos: 'CENTER', tag: tag3 });
        this.map.tag.setMarkerTag({ parentId: markers1[4], pos: 'BOTTOM', tag: tag4 });
    }
}