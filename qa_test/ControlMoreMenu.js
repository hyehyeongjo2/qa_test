export class ControlMoreMenu {
  constructor() {
    this.mapData = null;
    this.map = null;
    this.mapContainer = null;
    this.menu = null;
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
    this.menu = menu.addFolder("More");

    this.initztest(this.menu);
    this.initStest(this.menu);
    this.initMtest(this.menu);
    this.initRotest(this.menu);
    this.inittitest(this.menu);
    this.initenztest(this.menu);
    return this.menu;
  }

  initztest(gui) {
    const ztest = (value) => {
      this.map.control.setOption({
        controlRangeOption: {
          zoom: {
            min: 21,
            max: 22,
          },
        },
      });
      this.map.control.changeZoom({zoom: 4, transition: true});
      setTimeout(() => {
        this.map.control.changeZoom({zoom: 24, transition: true});
        console.log("changeZoom");
      }, 1000);
      setTimeout(() => {
        this.map.control.set({zoom: 4, rotation: 0, tilt: 0, transition: true});
      }, 3000);
      setTimeout(() => {
        this.map.control.set({zoom: 24, rotation: 0, tilt: 0, transition: true});
        console.log("set");
      }, 4000);
      setTimeout(() => {
        this.map.control.changeZoom({zoom: 4});
        this.map.control.zoomIn({transition: true});
      }, 6000);
      setTimeout(() => {
        this.map.control.changeZoom({zoom: 24});
        this.map.control.zoomOut({transition: true});
        console.log("Zoomin/ Out");
      }, 7000);
      setTimeout(() => {
        console.log("scroll plz");
      }, 8000);
    };
    const setting = {
      ztest: ztest,
    };
    gui.add(setting, "ztest");
  }

  initMtest(gui) {
    const Mtest = (value) => {
      const option = {
        transition: true,
        position: {x: 1000, y: 1000},
      };
      const option2 = {
        transition: true,
        position: {x: 2000, y: 2000},
      };
      const option3 = {
        transition: true,
        position: {x: 1000, y: 1000},
      };
      const option4 = {
        transition: true,
        position: {x: 2000, y: 2000},
      };
      setTimeout(() => {
        this.map.control.moveTo(option);
      }, 1000);
      setTimeout(() => {
        this.map.control.moveTo(option2);
      }, 3000);
      setTimeout(() => {
        this.map.control.moveTo(option3);
      }, 5000);
      setTimeout(() => {
        this.map.control.moveTo(option4);
      }, 7000);
      this.map.control.moveTo(option);
    };
    const setting = {
      Mtest: Mtest,
    };
    gui.add(setting, "Mtest");
  }

  initRotest(gui) {
    const Rotest = (value) => {
      this.map.control.setOption({
        controlRangeOption: {
          rotate: {
            min: -90,
            max: 90,
          },
        },
      });
      setTimeout(() => {
        this.map.control.set({zoom: 20, rotation: -180, tilt: 0});
      }, 1000);
      setTimeout(() => {
        this.map.control.set({zoom: 20, rotation: 180, tilt: 0});
        console.log("set");
      }, 2000);
      setTimeout(() => {
        console.log("scroll plz");
      }, 3000);
    };
    const setting = {
      Rotest: Rotest,
    };
    gui.add(setting, "Rotest");
  }

  initStest(gui) {
    const Stest = (value) => {
      const option = {
        transition: true,
        zoom: 20,
        rotation: 45,
        tilt: 10,
      };
      const option2 = {
        transition: true,
        zoom: 24,
        rotation: 180,
        tilt: 50,
      };
      const option3 = {
        transition: true,
        zoom: 20,
        rotation: 45,
        tilt: 10,
      };
      const option4 = {
        transition: true,
        zoom: 24,
        rotation: 180,
        tilt: 50,
      };
      setTimeout(() => {
        this.map.control.set(option);
      }, 1000);
      setTimeout(() => {
        this.map.control.set(option2);
      }, 3000);
      setTimeout(() => {
        this.map.control.set(option3);
      }, 5000);
      setTimeout(() => {
        this.map.control.set(option4);
      }, 7000);
    };
    const setting = {
      Stest: Stest,
    };
    gui.add(setting, "Stest");
  }

  inittitest(gui) {
    const titest = (value) => {
      this.map.control.setOption({
        controlRangeOption: {
          tilt: {
            min: 40,
            max: 50,
          },
        },
      });
      setTimeout(() => {
        this.map.control.set({zoom: 20, rotation: 0, tilt: 10});
      }, 1000);
      setTimeout(() => {
        this.map.control.set({zoom: 20, rotation: 0, tilt: 80});
        console.log("set");
      }, 2000);
      setTimeout(() => {
        console.log("scroll plz");
      }, 3000);
    };
    const setting = {
      titest: titest,
    };
    gui.add(setting, "titest");
  }

  initenztest(gui) {
    const initenztest = (value) => {
      setTimeout(() => {
        this.map.control.setOption({
          mouseOption: {
            enableZoom: false,
            enableRotate: true,
            enablePan: true,
            enableTilt: true,
            buttonOption: {
              left: "PAN",
              middle: "ZOOM",
              right: "ROTATE",
            },
          },
        });
        console.log("plz check zoom false : 6s");
      }, 1000);
      setTimeout(() => {
        // this.map.control.reset();
        this.map.control.setOption({
          mouseOption: {
            enableZoom: true,
            enableRotate: false,
            enablePan: true,
            enableTilt: true,
            buttonOption: {
              left: "PAN",
              middle: "ZOOM",
              right: "ROTATE",
            },
          },
        });
        console.log("plz check rotate false : 6s");
      }, 7000);
      setTimeout(() => {
        // this.map.control.reset();
        this.map.control.setOption({
          mouseOption: {
            enableZoom: true,
            enableRotate: true,
            enablePan: false,
            enableTilt: true,
            buttonOption: {
              left: "PAN",
              middle: "ZOOM",
              right: "ROTATE",
            },
          },
        });
        console.log("plz check pan false : 6s");
      }, 13000);
      setTimeout(() => {
        // this.map.control.reset();
        this.map.control.setOption({
          mouseOption: {
            enableZoom: true,
            enableRotate: true,
            enablePan: true,
            enableTilt: false,
            buttonOption: {
              left: "PAN",
              middle: "ZOOM",
              right: "ROTATE",
            },
          },
        });
        console.log("plz check tilt false : 6s");
      }, 19000);
      setTimeout(() => {
        this.map.control.reset();
        this.map.control.setOption({
          mouseOption: {
            enableZoom: true,
            enableRotate: true,
            enablePan: true,
            enableTilt: true,
            buttonOption: {
              left: "ROTATE",
              middle: "ZOOM",
              right: "PAN",
            },
          },
        });
        console.log("plz check ro/pa button change : 6s");
      }, 25000);
    };
    const setting = {
      initenztest: initenztest,
    };
    gui.add(setting, "initenztest");
  }
}
