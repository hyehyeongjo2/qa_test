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
        this.initLangData(this.addmenu);
        this.initPoiData(this.addmenu);
        this.initObjData(this.addmenu);
        this.initGroupData(this.addmenu);
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

    initLangData(gui) {
        const LangData = () => {
            console.log('---------------');
            console.log('Language Info: ', this.mapData.dataLanguage.getLanguage()); // 현재 지도의 모든 language 정보 반환
            console.log('default language: ', this.mapData.dataLanguage.getDefaultLanguage()); // 현재 지도에 적용된 language 정보 반환
            console.log('---------------');
        };
        const setting = {
            LangData: LangData,
        };
        gui.add(setting, 'LangData');
    }

    initPoiData(gui) {
        const PoiData = () => {
            console.log('---------------');
            console.log('poi data: ', this.mapData.dataPoi.getPois()); // poi data 가져오기
            console.log('find poi by title: ', this.mapData.dataPoi.find({ title: '실' })); // 1. title로 찾을 경우
            console.log('find poi by id: ', this.mapData.dataPoi.find({ id: 'PO-9InVzIGv20417' })); // 2. id로 찾을 경우
            console.log('find poi by floorId: ', this.mapData.dataPoi.find({ floorId: 'FL-t4vqgyek3jnb8146' })); // 3. floorId로 찾을 경우
            console.log('find poi by groupCode: ', this.mapData.dataPoi.find({ groupCode: 'A1-12' })); // 4. groupCode로 찾을 경우
            console.log('---------------');
        };
        const setting = {
            PoiData: PoiData,
        };
        gui.add(setting, 'PoiData');
    }

    initObjData(gui) {
        const ObjData = () => {
            console.log('---------------');
            console.log('object data ', this.mapData.dataObject.getObjects('FL-t4vqgyek3jnb8146'));
            console.log('find object by title: ', this.mapData.dataObject.find({ title: '실' })); // 1. title로 찾을 경우
            console.log('find object by id: ', this.mapData.dataObject.find({ id: 'OB-aN7fGeVoze1959' })); // 2. id로 찾을 경우
            console.log('find object by floorId: ', this.mapData.dataObject.find({ floorId: 'FL-t4vqgyek3jnb8146' })); // 3. floorId로 찾을 경우
            console.log('find object by GroupCode: ', this.mapData.dataObject.find({ groupCode: 'A1-1' })); // 4. groupCode로 찾을 경우
            console.log('---------------');
        };
        const setting = {
            ObjData: ObjData,
        };
        gui.add(setting, 'ObjData');
    }

    initGroupData(gui) {
        const GroupData = () => {
            console.log('---------------');
            console.log('groupcode data: ', this.mapData.dataGroupCode.getCodes()); // 현재 맵의 group code data를 반환합니다.
            console.log('하위 group code: ', this.mapData.dataGroupCode.findChild('A1')); // 1. 입력받은 code의 하위 group code들 반환
            console.log('모든 하위 group code: ', this.mapData.dataGroupCode.findAllChild('A1')); // 2. 입력받은 code의 모든 하위 group code들 반환
            console.log('부모 group code: ', this.mapData.dataGroupCode.findParent('A1-1')); // 3. 입력받은 code의 부모 group code 반환
            console.log('최상위 group code: ', this.mapData.dataGroupCode.findRootParent('A1-1')); // 4. 입력받은 code의 최상위 부모 group code 반환
            console.log('모든 root code: ', this.mapData.dataGroupCode.findAllRoot()); // 5. 현재 맵의 모든 root parent들을 반환합니다.
            console.log('현재 지도의 모든 group code list: ', this.mapData.dataGroupCode.findAll()); // 6. 현재 맵의 모든 code를 반환합니다.
            console.log('---------------');
        };
        const setting = {
            GroupData: GroupData,
        };
        gui.add(setting, 'GroupData');
    }
}