export class TagMenu {
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
        this.mapContainer = mapContainer;
        this.menu = this.gui.addFolder('Tag Menu');
        this.menu.open();
        this.initSetting();
        this.TagFolder = this.initTagFolder('tag');
        return this.menu;
    }

    initSetting() {
        this.setting = {
            x: '1000',
            y: '2000',
            z: '100',
            floor: '',
            MarkerWithPos:"CENTER",
            PoiPos:"CENTER",
            ClickPos:"CENTER",
            set: this.set.bind(this),
            clear: this.clear.bind(this),
            setMarkerTag_마커_클릭하여_생성: this.setMarkerclickTag.bind(this),
            setMarkerTag_마커와_같이_생성: this.setMarkerWithTag.bind(this),
            setPoiTag_POI_클릭하여_생성: this.setPoiTag.bind(this),
        };
        const menu = this.menu;

        const floorSetting = this.mapData.dataFloor.getFloors().reduce(
            (prev, cur) => {
                return { ...prev, [cur.name[0].text]: cur.id };
            },
            { 'not defined': '' },
        );

        const setting = this.setting;
        // menu.open();
        menu.add(this.setting, 'x');
        menu.add(setting, 'y');
        menu.add(setting, 'z');
        menu.add(setting, 'floor', floorSetting);
        menu.add(setting, 'set');
        menu.add(setting, 'clear');
        menu.add(setting, 'setMarkerTag_마커_클릭하여_생성');
        menu.add(setting, 'setMarkerTag_마커와_같이_생성');
        menu.add(setting, 'setPoiTag_POI_클릭하여_생성');
        menu.add(setting, 'PoiPos',[ "TOP" ,"BOTTOM" ,"LEFT", "RIGHT" ,"CENTER"]);
        menu.add(setting, 'MarkerWithPos',[ "TOP" ,"BOTTOM" ,"LEFT", "RIGHT" ,"CENTER"]);
        menu.add(setting, 'ClickPos',[ "TOP" ,"BOTTOM" ,"LEFT", "RIGHT" ,"CENTER"]);
    }

    initTagFolder(menuName){
        this.tagsetting = {
            width : '100',
            height : '50',
            backgroundColor : "#808080",
            textAlign : 'center',
            set: this.createTag.bind(this),
        }
        const tagsetting = this.tagsetting;
        const menu = this.menu.addFolder(menuName);
        menu.add(tagsetting,'width');
        menu.add(tagsetting,'height');
        menu.add(tagsetting,'backgroundColor');
        menu.add(tagsetting,'textAlign',['left','center','right']);
        menu.add(tagsetting, 'set');
    }

    createTag = () => {
        const tagsetting = this.tagsetting;
        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.style.width = tagsetting.width+'px';
        tag.style.height = tagsetting.height+'px';
        tag.style.backgroundColor = tagsetting.backgroundColor;
        // console.log(tagsetting.textAlign)
        tag.innerHTML = '<div>침구류</div>';
        return tag;
    };

    set(value) {
        const setting = this.setting;
        const tag = this.createTag();
        console.log(value);
        if (setting.floor === '') {
            alert('층을 선택해주세요');
            return;
        }
        const option = {
            position: {
                x: setting.x,
                y: setting.y,
                z: setting.z,
            },
            tag: tag,
            floorId: setting.floor,
        };
        console.log(option);
        const item = this.map.tag.set(option);
        console.log(item);
        tag.addEventListener('click', () => {
            this.map.tag.clear(item.id); // id에 해당하는 태그 삭제 메소드
        });
    }
    clear(value) {
        this.map.tag.clearAll(); // 모든 태그 삭제 메소드
    }
    async setMarkerclickTag(value){
        const setting = this.setting;
        const tag = this.createTag();
        const mapContainer = this.mapContainer;
        let item;
        mapContainer.addEventListener('marker-click', (e) => {
            if (e.detail[0]) {
                item = this.map.tag.setMarkerTag({ parentId: e.detail[0].userData.id, pos: setting.ClickPos, tag: tag });
                console.log(this.map.tag.find(item.id));
                return item;
            }
        });
        tag.addEventListener('click', () => {
            this.map.tag.clear(item.id); // id에 해당하는 태그 삭제 메소드
        });
    }
    async setMarkerWithTag(value) {
        const setting = this.setting;
        const tag = this.createTag();
        const list = await this.map.markers.set({
            // 생성된 marker들의 ID List를 저장합니다.
            marker: [
                {
                    x: setting.x,
                    y: setting.y,
                    z: setting.z,
                }
            ],
        });

        const item = this.map.tag.setMarkerTag({ parentId: list[0], pos: setting.MarkerWithPos, tag: tag });
        console.log(this.map.tag.find(item.id));
        tag.addEventListener('click', () => {
            this.map.tag.clear(item.id); // id에 해당하는 태그 삭제 메소드
        });
        // let markerTag = null;
        // this.mapContainer.addEventListener('marker-click', (e) => {
        //     this.map.markers.clear(e.detail[0].userData.id); //클릭삭제
        //     // markerTag = this.map.tag.setMarkerTag({ parentId: e.detail[0].userData.id, pos: 'TOP', tag: tag})//클릭생성
        // });
    }

    async setPoiTag(value) {
        const setting = this.setting;
        const tag = this.createTag();
        const mapContainer = this.mapContainer;
        // const poi = this.mapData.dataPoi.getPois()[0];
        let poiset;
        this.mapContainer.addEventListener('poi-click', (e) => {
            console.log('poi click 에 대한 결과값', e.detail);
            if (e.detail[0]) {
                poiset = this.map.tag.setPOITag({ parentId: e.detail[0].id, pos:setting.PoiPos, tag: tag });
                console.log(this.map.tag.find(poiset.id));
                return poiset;
            }
        });
        mapContainer.addEventListener('void-click', () => {
            this.map.tag.clear(poiset.id); // id에 해당하는 태그 삭제 메소드
        });
    }
}
