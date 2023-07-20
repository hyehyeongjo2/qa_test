export class MapInfoMoreMenu {
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
    init(menu, mapData, map, mapContainer) {
        this.mapData = mapData;
        this.map = map;
        this.mapContainer = mapContainer;
        this.menu = menu.addFolder('More');
        this.initMoreSetting();
        // this.floorList = this.mapData.dataFloor.getFloors();
        return this.menu;
    }
    initMoreSetting() {
        const setting = {
            control_test: this.controltest.bind(this),
            focus_test: this.focustest.bind(this),
            myloca_test: this.Mylocatest.bind(this),
            poi_test: this.poitest.bind(this),
            obj_test: this.objtest.bind(this),
            line_test: this.linetest.bind(this),
        };
        const menu = this.menu;
        this.menu.add(setting, 'control_test');
        this.menu.add(setting, 'focus_test');
        this.menu.add(setting, 'myloca_test');
        this.menu.add(setting, 'poi_test');
        this.menu.add(setting, 'obj_test');
        this.menu.add(setting, 'line_test');
        return setting;
    }
    compareArrays(arr1, arr2) {
        const length = Math.min(arr1.length, arr2.length);
        // if (arr1.length !== arr2.length) {
        //     console.log('배열길이 다름');
        //     return false; // 길이가 다르면 다른 배열
        // }
        let differences = [];
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i] || arr1[i] === null) {
                differences.push({ index: i, value1: arr1[i], value2: arr2[i] });
                // console.log('다른 값이 있는 인덱스:', arr1);
                return false; // 요소가 다르면 다른 배열 항목이 null인 경우 다른 배열
            }
        }

        // if (differences.length > 0) {
        //     differences.forEach((diff) => {
        //         console.log(`인덱스: ${diff.index}, 값1: ${diff.value1}, 값2: ${diff.value2}`);
        //         console.log(`다른 값이 있는 인덱스: ${diff.index}`);
        //         console.log(`arr1[${diff.index}]: ${diff.value1}`);
        //         console.log(`arr2[${diff.index}]: ${diff.value2}`);
        //     });
        //     return false;
        // }

        return true; // 모든 요소가 일치하면 동일한 배열
    }
    checkNull(value) {
        if (value != null) {
            return true; // 길이가 다르면 다른 배열
        }
        return false;
    }
    filecheck(testname, arr1, arr2) {
        const fileContent = [];
        const fileContent1 = [];
        fileContent.push(arr1);
        fileContent1.push(arr2);
        const arr1_string = JSON.stringify(fileContent, null, 2);
        const arr2_string = JSON.stringify(fileContent1, null, 2);
        console.log(testname + this.compareArrays(arr1_string, arr2_string), arr1);
        fileContent.length = 0;
        fileContent1.length = 0;
    }
    downloadTextFile(text, filename) {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
    controltest() {
        console.clear();
        const SetOptiontest = this.map.control.setOption({
            controlRangeOption: {
                zoom: {
                    min: 20,
                    max: 150,
                },
                rotate: {
                    min: 30,
                    max: 50,
                },
                tilt: {
                    min: 30,
                    max: 50,
                },
            },

            mouseOption: {
                enableZoom: true,
                enableRotate: true,
                enablePan: true,
                enableTilt: true,
                buttonOption: {
                    left: 'PAN',
                    middle: 'ZOOM',
                    right: 'ROTATE',
                },
            },
            touchOption: {
                enableZoom: true,
                enableRotate: true,
                enablePan: true,
                enableTilt: true,
            },
        });
        const SetOptionOri = {
            controls2d: {
                maxZoom: 150,
                minZoom: 20,
                maxRotate: 50,
                minRotate: 30,
            },
            controls3d: {
                maxZoom: 150,
                minZoom: 20,
                maxTilt: 50,
                minTilt: 30,
                maxRotate: 50,
                minRotate: 30,
            },
        };
        filecheck('setoption :', SetOptiontest, SetOptionOri);

        const zoomOuttest = this.map.control.zoomOut({ transition: true });
        console.log('zoomOut :', this.checkNull(zoomOuttest), zoomOuttest);

        const zoomIntest = this.map.control.zoomIn({ transition: true });
        console.log('zoomIn :', this.checkNull(zoomIntest), zoomIntest);

        const changeZoomTest = this.map.control.changeZoom({ zoom: 21, transition: true });
        console.log('zoomIn :', this.checkNull(changeZoomTest), changeZoomTest);

        const movetotest = this.map.control.moveTo({ position: { x: 1500, y: 1500 }, transition: true });
        const movetoori = {
            x: 1500,
            y: 1500,
        };
        filecheck('moveto :', movetotest, movetoori);

        // const test = this.map.control.set({ zoom: 21, rotation: 0, tilt: 10, transition: true });
        // test1 = JSON.stringify(fileContent);

        // downloadTextFile(test1, 'output.txt');
        // downloadTextFile(sim1, 'output1.txt');
    }
    focustest() {
        console.clear();
        const floorList = this.mapData.dataFloor.getFloors();
        const obj = this.mapData.dataObject.getObjects(floorList[0].id);
        const poi = this.mapData.dataPoi.getPois(floorList[0].id);
        const focusToObj_single_test = this.map.control.focusTo({
            focus: {
                type: 'OBJECT',
                ids: [obj[5].id],
                //ids : OB-3PdRZ1rzi5625- 2층계단, OB-u-GoTosOj64029-남자화장실, OB-EwYTaOTNj4029- 화장실-여
                // ids: ['OB-mxanpdYA1T2410', 'OB-aN7fGeVoze1959', 'OB-ccjURqW8hq1959']
            },
            transition: true,
            padding: {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
            },
        });
        const focusToObj_single_ori = {
            focus: {
                type: 'OBJECT',
                ids: [obj[5].id],
            },
            transition: true,
            padding: {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
            },
        };
        filecheck('focusToObj_single :', focusToObj_single_test, focusToObj_single_ori);

        const focusToObj_All_test = this.map.control.focusTo({
            focus: {
                type: 'OBJECT_ALL',
                // ids: [],
                //ids : OB-3PdRZ1rzi5625- 2층계단, OB-u-GoTosOj64029-남자화장실, OB-EwYTaOTNj4029- 화장실-여
                // ids: ['OB-mxanpdYA1T2410', 'OB-aN7fGeVoze1959', 'OB-ccjURqW8hq1959']
            },
            transition: true,
            padding: {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
            },
        });
        const focusToObj_All_ori = {
            focus: {
                type: 'OBJECT_ALL',
            },
            transition: true,
            padding: {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
            },
        };
        filecheck('focusToObj_All :', focusToObj_All_test, focusToObj_All_ori);

        const focusToObj_arr_test = this.map.control.focusTo({
            focus: {
                type: 'OBJECT',
                ids: [obj[5].id, obj[3].id, obj[1].id],
                //ids : OB-3PdRZ1rzi5625- 2층계단, OB-u-GoTosOj64029-남자화장실, OB-EwYTaOTNj4029- 화장실-여
                // ids: ['OB-mxanpdYA1T2410', 'OB-aN7fGeVoze1959', 'OB-ccjURqW8hq1959']
            },
            transition: true,
            padding: {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
            },
        });
        const focusToObj_arr_ori = {
            focus: {
                type: 'OBJECT',
                ids: [obj[5].id, obj[3].id, obj[1].id],
            },
            transition: true,
            padding: {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
            },
        };
        fileContent.push(focusToObj_arr_test);
        fileContent1.push(focusToObj_arr_ori);
        const focusToObj_arr_test_arr = JSON.stringify(fileContent, null, 2);
        const focusToObj_arr_ori_arr = JSON.stringify(fileContent1, null, 2);
        console.log('focusToObj_arr :' + this.compareArrays(focusToObj_arr_test_arr, focusToObj_arr_ori_arr), focusToObj_arr_test);
        fileContent.length = 0;
        fileContent1.length = 0;

        const focusToPoi_single_test = this.map.control.focusTo({
            focus: {
                type: 'POI',
                ids: [poi[4].id],
            },
            transition: true,
            padding: {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
            },
        });
        const focusToPoi_single_ori = {
            focus: {
                type: 'POI',
                ids: [poi[4].id],
            },
            transition: true,
            padding: {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
            },
        };
        fileContent.push(focusToPoi_single_test);
        fileContent1.push(focusToPoi_single_ori);
        const focusToPoi_single_test_arr = JSON.stringify(fileContent, null, 2);
        const focusToPoi_single_ori_arr = JSON.stringify(fileContent1, null, 2);
        console.log('focusToPoi_single :' + this.compareArrays(focusToPoi_single_test_arr, focusToPoi_single_ori_arr), focusToPoi_single_test);
        fileContent.length = 0;
        fileContent1.length = 0;

        const focusToPoi_All_test = this.map.control.focusTo({
            focus: {
                type: 'POI_ALL',
                ids: [],
            },
            transition: true,
            padding: {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
            },
        });
        const focusToPoi_All_ori = {
            focus: {
                type: 'POI_ALL',
                ids: [],
            },
            transition: true,
            padding: {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
            },
        };
        fileContent.push(focusToPoi_All_test);
        fileContent1.push(focusToPoi_All_ori);
        const focusToPoi_All_test_arr = JSON.stringify(fileContent, null, 2);
        const focusToPoi_All_ori_arr = JSON.stringify(fileContent1, null, 2);
        console.log('focusToPoi_All :' + this.compareArrays(focusToPoi_All_test_arr, focusToPoi_All_ori_arr), focusToPoi_All_test);
        fileContent.length = 0;
        fileContent1.length = 0;

        const focusToPoi_arr_test = this.map.control.focusTo({
            focus: {
                type: 'POI',
                ids: [poi[4].id, poi[2].id, poi[0].id],
            },
            transition: true,
            padding: {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
            },
        });
        const focusToPoi_arr_ori = {
            focus: {
                type: 'POI',
                ids: [poi[4].id, poi[2].id, poi[0].id],
            },
            transition: true,
            padding: {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
            },
        };
        fileContent.push(focusToPoi_arr_test);
        fileContent1.push(focusToPoi_arr_ori);
        const focusToPoi_arr_test_arr = JSON.stringify(fileContent, null, 2);
        const focusToPoi_arr_ori_arr = JSON.stringify(fileContent1, null, 2);
        console.log('focusToPoi_arr :' + this.compareArrays(focusToPoi_arr_test_arr, focusToPoi_arr_ori_arr), focusToPoi_arr_test);
        fileContent.length = 0;
        fileContent1.length = 0;
    }

    Mylocatest() {
        console.clear();
        const fileContent = [];
        const fileContent1 = [];
        // location 옵션 설정
        const locationOption_test1 = this.map.mylocation.set({
            x: 276,
            y: 788,
            iconOption: {
                positionZ: 200,
                iconUrl: 'https://assets.dabeeomaps.com/image/ico/landy.gif',
                width: 196,
                height: 305,
                anchor: {
                    x: 0.5,
                    y: 0.5,
                },
            },
            onActive: true,
            animate: {
                color: '#00ff00',
                opacity: 0.4,
                desireScale: 4,
                duration: 1500,
            },
        });
        const locationOption_ori1 = {
            x: 276,
            y: 788,
            iconOption: {
                positionZ: 200,
                iconUrl: 'https://assets.dabeeomaps.com/image/ico/landy.gif',
                width: 196,
                height: 305,
                anchor: {
                    x: 0.5,
                    y: 0.5,
                },
            },
            onActive: true,
            animate: {
                color: '#00ff00',
                opacity: 0.4,
                desireScale: 4,
                duration: 1500,
            },
        };
        fileContent.push(locationOption_test1);
        fileContent1.push(locationOption_ori1);
        const locationOption_test1_arr = JSON.stringify(fileContent, null, 2);
        const locationOption_ori1_arr = JSON.stringify(fileContent1, null, 2);
        console.log('locationOption_gif :' + this.compareArrays(locationOption_test1_arr, locationOption_ori1_arr), locationOption_test1);
        fileContent.length = 0;
        fileContent1.length = 0;

        const locationOption_test2 = this.map.mylocation.set({
            x: 276.57301587301026,
            y: 788.6952380952359,
            iconOption: {
                positionZ: 100,
                width: 196,
                height: 305,
                anchor: {
                    x: 0.5,
                    y: 0.5,
                },
            },
            onActive: true,
        });
        const locationOption_ori2 = {
            x: 276.57301587301026,
            y: 788.6952380952359,
            iconOption: {
                positionZ: 200,
                width: 196,
                height: 305,
                anchor: {
                    x: 0.5,
                    y: 0.5,
                },
            },
            onActive: true,
        };
        fileContent.push(locationOption_test2);
        fileContent1.push(locationOption_ori2);
        const locationOption_test2_arr = JSON.stringify(fileContent, null, 2);
        const locationOption_ori2_arr = JSON.stringify(fileContent1, null, 2);
        console.log('locationOption_ani :' + this.compareArrays(locationOption_test2_arr, locationOption_ori2_arr), locationOption_test2);
        fileContent.length = 0;
        fileContent1.length = 0;
    }

    poitest() {
        console.clear();
        const fileContent = [];
        const fileContent1 = [];
        const currentFloor = this.map.context.getCurrentFloor().id;
        this.poiList = this.mapData.dataPoi.getPois().reduce(
            (result, cur) => {
                if (currentFloor == cur.floorId) result.push(cur.id);
                return result;
            },
            [''],
        );
        const single_option = {
            outerColor: 'black',
            innerColor: 'red',
            scale: 3,
            ids: this.poiList[1],
        };
        const single_poi = this.map.pois.set(single_option);
        fileContent.push(single_poi);
        fileContent1.push(single_option);
        const single_poi_arr = JSON.stringify(fileContent, null, 2);
        const single_option_arr = JSON.stringify(fileContent1, null, 2);
        console.log('poi set single :' + this.compareArrays(single_poi_arr, single_option_arr), single_poi);
        fileContent.length = 0;
        fileContent1.length = 0;

        const arr_option = {
            outerColor: 'black',
            innerColor: 'red',
            scale: 3,
            ids: [this.poiList[1], this.poiList[3], this.poiList[5]],
        };
        const arr_poi = this.map.pois.set(arr_option);
        fileContent.push(arr_poi);
        fileContent1.push(arr_option);
        const arr_poi_arr = JSON.stringify(fileContent, null, 2);
        const arr_option_arr = JSON.stringify(fileContent1, null, 2);
        console.log('poi set arr :' + this.compareArrays(arr_poi_arr, arr_option_arr), arr_poi);
        fileContent.length = 0;
        fileContent1.length = 0;

        const all_option = {
            outerColor: 'black',
            innerColor: 'red',
            scale: 3,
        };
        const all_poi = this.map.pois.set(all_option);
        fileContent.push(all_poi);
        fileContent1.push(all_option);
        const all_poi_arr = JSON.stringify(fileContent, null, 2);
        const all_option_arr = JSON.stringify(fileContent1, null, 2);
        console.log('poi set all :' + this.compareArrays(all_poi_arr, all_option_arr), all_poi);
        fileContent.length = 0;
        fileContent1.length = 0;

        this.map.pois.reset();
    }

    async objtest() {
        console.clear();
        const fileContent = [];
        const fileContent1 = [];
        const currentFloor = this.map.context.getCurrentFloor().id;
        const objects = await this.mapData.dataObject.getObjects(currentFloor);
        this.objectList = objects.reduce(
            (result, cur) => {
                return [...result, cur.id];
            },
            [''],
        );
        const single_option = {
            color: '#00ffff',
            activeDest: true,
            opacity: 0.3,
            duration: 1000,
            isRepeat: true,
            isYoyo: true,
            isAnimate: true,
            ids: [this.objectList[1]],
        };
        const single_obj = this.map.objects.set(single_option);
        fileContent.push(single_obj);
        fileContent1.push(single_option);
        const single_obj_arr = JSON.stringify(fileContent, null, 2);
        const single_option_arr = JSON.stringify(fileContent1, null, 2);
        console.log('objects set single :' + this.compareArrays(single_obj_arr, single_option_arr), single_option);
        fileContent.length = 0;
        fileContent1.length = 0;

        const arr_option = {
            color: '#00ffff',
            activeDest: true,
            opacity: 0.3,
            duration: 1000,
            isRepeat: true,
            isYoyo: true,
            isAnimate: true,
            ids: [this.objectList[1], this.objectList[2], this.objectList[3]],
        };
        const arr_obj = this.map.objects.set(arr_option);
        fileContent.push(arr_obj);
        fileContent1.push(arr_option);
        const arr_obj_arr = JSON.stringify(fileContent, null, 2);
        const arr_option_arr = JSON.stringify(fileContent1, null, 2);
        console.log('objects set arr :' + this.compareArrays(arr_obj_arr, arr_option_arr), arr_option);
        fileContent.length = 0;
        fileContent1.length = 0;

        const all_option = {
            color: '#00ffff',
            activeDest: true,
            opacity: 0.3,
            duration: 1000,
            isRepeat: true,
            isYoyo: true,
            isAnimate: true,
            ids: [],
        };
        const all_obj = this.map.objects.set(all_option);
        fileContent.push(all_obj);
        fileContent1.push(all_option);
        const all_obj_arr = JSON.stringify(fileContent, null, 2);
        const all_option_arr = JSON.stringify(fileContent1, null, 2);
        console.log('objects set all:' + this.compareArrays(all_obj_arr, all_option_arr), all_option);
        fileContent.length = 0;
        fileContent1.length = 0;

        this.map.objects.reset();
    }
    async linetest() {
        console.clear();
        const fileContent = [];
        const fileContent1 = [];
        const currentFloor = this.map.context.getCurrentFloor().id;
        this.poiList = this.mapData.dataPoi.getPois().reduce(
            (result, cur) => {
                if (currentFloor == cur.floorId) result.push(cur.id);
                return result;
            },
            [''],
        );
        const floorList = this.mapData.dataFloor.getFloors();
        const route = {
            origin: {
                position: { x: 2320, y: 1586, z: 20 },
                floorId: floorList[0].id,
            },
            destination: {
                // poiId: 'PO-xNsPFWfPJ6586',
                position: { x: 886, y: 1795, z: 20 },
                floorId: floorList[0].id,
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: this.poiList[5],
                    floorId: floorList[0].id,
                },
                {
                    poiId: this.poiList[7],
                    floorId: floorList[0].id,
                },
            ],
        };
        const naviOption_test = {
            origin: {
                markerOptions: {
                    width: 50,
                    height: 50,
                    positionZ: 100,
                    visibleIcon: true,
                    anchor: {
                        x: 1,
                        y: 0.5,
                    },
                },
            },
            destination: {
                markerOptions: {
                    iconUrl: 'https://assets.dabeeomaps.com/image/ico/img_person-3x.png',
                    width: 36,
                    height: 36,
                    positionZ: 20,
                    visibleIcon: true,
                    animate: {
                        duration: 1500,
                        // repeat: 10,   // ?? ??? ?? ?? ??
                        opacity: 0.4,
                    },
                },
                lineOptions: {
                    lineColor: '#1B68DA',
                    solidLineEnabled: true,
                    solidLineWidth: 14,
                },
                showTag: false,
            },
            wayPoints: [
                // 경유지 마커 및 주행선 옵션 배열
                {
                    markerOptions: {
                        width: 50,
                        height: 50,
                        positionZ: 100,
                        visibleIcon: false,
                    },
                },
            ],
            defaultLineOption: {
                lineColor: '#1B68DA',
                solidLineEnabled: true,
                solidLineWidth: 14,
            },
            lineDivide: false,
            lineZ: 24,
        };
        const naviOption_ori = {
            origin: {
                markerOptions: {
                    width: 50,
                    height: 50,
                    positionZ: 100,
                    visibleIcon: true,
                    anchor: {
                        x: 1,
                        y: 0.5,
                    },
                },
            },
            destination: {
                markerOptions: {
                    iconUrl: 'https://assets.dabeeomaps.com/image/ico/img_person-3x.png',
                    width: 36,
                    height: 36,
                    positionZ: 20,
                    visibleIcon: true,
                    animate: {
                        duration: 1500,
                        // repeat: 10,   // ?? ??? ?? ?? ??
                        opacity: 0.4,
                    },
                },
                lineOptions: {
                    lineColor: '#1B68DA',
                    solidLineEnabled: true,
                    solidLineWidth: 14,
                },
                showTag: false,
            },
            wayPoints: [
                // 경유지 마커 및 주행선 옵션 배열
                {
                    markerOptions: {
                        width: 50,
                        height: 50,
                        positionZ: 100,
                        visibleIcon: false,
                    },
                },
            ],
            defaultLineOption: {
                lineColor: '#1B68DA',
                solidLineEnabled: true,
                solidLineWidth: 14,
            },
            lineDivide: false,
            lineZ: 24,
        };
        const naviResponse = await this.mapData.getRoute(route);
        console.log(await this.map.routeSimulation.set(naviResponse.recommendation, naviOption_test));

        fileContent.push(naviOption_test);
        fileContent1.push(naviOption_ori);
        const tnaviOption_test_arr = JSON.stringify(fileContent, null, 2);
        const naviOption_ori_arr = JSON.stringify(fileContent1, null, 2);
        console.log('moveto :' + this.compareArrays(tnaviOption_test_arr, naviOption_ori_arr), tnaviOption_test_arr);
        console.log(tnaviOption_test_arr);
        fileContent.length = 0;
        fileContent1.length = 0;
    }
}
