export class ModelMenu {
    constructor() {
        this.gui = null;
        this.mapData = null;
        this.map = null;
        this.mapContainer = null;
        this.modelFolder = null;
        this.importFolder = null;
        this.transformFolder = null;
        this.dropDown = null;
        this.uploadedModels = {
            model: '선택',
            list: ['선택'],
        };
        this.currentModelData = {
            type: '',
            modelName: '',
            fileName: '',
            transform: {
                position: {
                    x: 0,
                    y: 0,
                    z: 0,
                },
                rotation: {
                    x: 0,
                    y: 0,
                    z: 0,
                },
                scale: {
                    x: 1,
                    y: 1,
                    z: 1,
                },
            },
        };
        this.importData = {
            json: '',
        };
    }

    removeMenu() {
        if (this.modelFolder) {
            this.gui.removeFolder(this.modelFolder);
            this.modelFolder = null;
        }
    }

    async init(gui, mapData, map, mapContainer) {
        this.gui = gui;
        this.mapData = mapData;
        this.map = map;
        this.mapContainer = mapContainer;
        await this.addModelLayer();
        this.addModelFolder();
        this.addDropDown();
        this.addFileNameInput();
        this.addTypeInput();
        this.addModelNameInput();
        this.addImportFolder();
        this.addTransformFolder();
        this.addUploadButton();
        this.addRemoveButton();
        this.addExportButton();
        return this.modelFolder;
    }

    async addModelLayer() {
        // 모델을 OverlayGroup 에서 통합 관리하므로,
        // 모델 생성을 시작하려면, Overlay 에서 ModelLayer 를 먼저 생성해야 힘.
        await this.map.overlay.addSource('empty-model', {
            type: 'json',
            data: 'https://assets.dabeeomaps.com/upload/models/json/emptyData.json',
        });
        await this.map.overlay.addLayer({ type: 'model', source: 'empty-model', paint: {} });
    }

    addModelFolder() {
        this.modelFolder = this.gui.addFolder('Model');
        this.modelFolder.open();
    }

    addFileNameInput() {
        this.modelFolder.add(this.currentModelData, 'fileName').setValue('https://assets.dabeeomaps.com/upload/models/blender/답동성당');
    }

    addTypeInput() {
        this.modelFolder.add(this.currentModelData, 'type').setValue('obj');
    }

    addModelNameInput() {
        this.modelFolder.add(this.currentModelData, 'modelName').setValue('답동성당');
    }

    addImportFolder() {
        this.importFolder = this.modelFolder.addFolder('import');
        this.importFolder.open();
        this.addJSONInput();
        this.addImportButton();
    }

    addJSONInput() {
        this.importFolder.add(this.importData, 'json').setValue('https://assets.dabeeomaps.com/upload/models/json/models.json');
    }

    addImportButton() {
        const button = {
            import: async () => {
                const importedModelData = await fetch(this.importData.json).then((response) => {
                    return response.json();
                });
                const promises = importedModelData.models.map(async (modelData) => {
                    await this.map.testModel.addTestModel(modelData);
                    this.uploadedModels.list.push(modelData.modelName);
                    this.uploadedModels.model = modelData.modelName;
                    this.updateDropDown();
                });
                await Promise.all(promises);
            },
        };
        this.importFolder.add(button, 'import');
    }

    addTransformFolder() {
        this.transformFolder = this.modelFolder.addFolder('transform');
        this.transformFolder.open();
        this.addPositionFolder();
        this.addRotationFolder();
        this.addScaleFolder();
    }

    addPositionFolder() {
        const positionFolder = this.transformFolder.addFolder('position');
        positionFolder.open();
        positionFolder.add(this.currentModelData.transform.position, 'x', 0, 10000, 0.1).onChange((value) => {
            this.map.testModel.updateTestModel(this.currentModelData);
        });
        positionFolder.add(this.currentModelData.transform.position, 'y', 0, 10000, 0.1).onChange((value) => {
            this.map.testModel.updateTestModel(this.currentModelData);
        });
        positionFolder.add(this.currentModelData.transform.position, 'z', 0, 10000, 0.1).onChange((value) => {
            this.map.testModel.updateTestModel(this.currentModelData);
        });
    }

    addRotationFolder() {
        const rotateFolder = this.transformFolder.addFolder('rotation');
        rotateFolder.open();
        rotateFolder.add(this.currentModelData.transform.rotation, 'x', 0, 360, 1).onChange((value) => {
            this.map.testModel.updateTestModel(this.currentModelData);
        });
        rotateFolder.add(this.currentModelData.transform.rotation, 'y', 0, 360, 1).onChange((value) => {
            this.map.testModel.updateTestModel(this.currentModelData);
        });
        rotateFolder.add(this.currentModelData.transform.rotation, 'z', 0, 360, 1).onChange((value) => {
            this.map.testModel.updateTestModel(this.currentModelData);
        });
    }

    addScaleFolder() {
        const scaleFolder = this.transformFolder.addFolder('scale');
        scaleFolder.open();
        scaleFolder.add(this.currentModelData.transform.scale, 'x', 0, 50, 0.01).onChange((value) => {
            this.map.testModel.updateTestModel(this.currentModelData);
        });
        scaleFolder.add(this.currentModelData.transform.scale, 'y', 0, 50, 0.01).onChange((value) => {
            this.map.testModel.updateTestModel(this.currentModelData);
        });
        scaleFolder.add(this.currentModelData.transform.scale, 'z', 0, 50, 0.01).onChange((value) => {
            this.map.testModel.updateTestModel(this.currentModelData);
        });
    }

    addUploadButton() {
        const button = {
            upload: async () => {
                await this.map.testModel.addTestModel(this.currentModelData);
                this.uploadedModels.list.push(this.currentModelData.modelName);
                this.uploadedModels.model = this.currentModelData.modelName;
                this.updateDropDown();
            },
        };
        this.modelFolder.add(button, 'upload');
    }

    addRemoveButton() {
        const button = {
            remove: () => {
                this.map.testModel.removeTestModel(this.currentModelData.modelName);
                this.uploadedModels.list = this.uploadedModels.list.filter((modelName) => modelName !== this.currentModelData.modelName); // 업로드된 모델들 중에서 현재 선택된 모델만 제거
                this.uploadedModels.model = this.uploadedModels.list[this.uploadedModels.list.length - 1];
                this.updateDropDown();
            },
        };
        this.modelFolder.add(button, 'remove');
    }

    addExportButton() {
        const button = {
            export: () => {
                const allModelData = this.map.testModel.getAllModelData();
                const json = 'data:text/json;charset=utf-8,' + JSON.stringify({ models: allModelData });
                const file = encodeURI(json);
                const fileName = 'models.json';
                const downloadAnchor = document.createElement('a');
                downloadAnchor.setAttribute('href', file);
                downloadAnchor.setAttribute('download', fileName);
                downloadAnchor.click();
            },
        };
        this.modelFolder.add(button, 'export');
    }

    addDropDown() {
        this.dropDown = this.modelFolder.add(this.uploadedModels, 'model', this.uploadedModels.list).onChange((modelName) => {
            this.updateCurrentModelData(modelName);
        });
        this.editDropDownDOM();
    }

    editDropDownDOM() {
        const select = this.dropDown.domElement.children[0];
        select.style.width = '100%';
        const li = this.dropDown.domElement.parentNode.parentNode;
        const ul = li.parentNode;
        ul.insertBefore(li, ul.childNodes[1]);
    }

    updateDropDown() {
        this.updateCurrentModelData(this.uploadedModels.model);
        this.modelFolder.remove(this.dropDown);
        this.addDropDown();
    }

    updateCurrentModelData(modelName) {
        const allModelData = this.map.testModel.getAllModelData();
        const selectedModelData = allModelData.find((modelData) => modelData.modelName === modelName);
        if (selectedModelData) this.deepAssignData(this.currentModelData, selectedModelData); // API 에서 가져온 현재 모델의 모델데이터로 this.currentModelData 의 프로퍼티 값 갱신
        this.gui.updateDisplay();
    }

    deepAssignData(targetData, sourceData) {
        for (const key of Object.keys(targetData)) {
            if (targetData[key] instanceof Object) {
                this.deepAssignData(targetData[key], sourceData[key]);
            } else {
                targetData[key] = sourceData[key];
            }
        }
    }
}
