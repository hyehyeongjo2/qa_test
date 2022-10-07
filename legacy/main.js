const codeSnipet = document.querySelector('.codeSnipet');
const addBtn = document.querySelector('.addBtn');
const addMap = document.querySelector('.addMap');

let map;
let mapContainer;

function getSize() {
    const width = document.querySelector('.containerWidth').value;
    const height = document.querySelector('.containerHeight').value;
    
    if (width) {
        console.log(Number(width));
        document.getElementById("container").style.width = Number(width) + 'px';
        document.querySelector('.containerWidth').value = '';
    }
    if (height) {
        document.getElementById("container").style.height = Number(height) + 'px';
        document.querySelector('.containerHeight').value = '';
    }
}

addBtn.addEventListener('click', () => {
    const script = document.createElement('script');
    script.innerHTML = codeSnipet.value;
    document.body.appendChild(script);

    getSize();
    codeSnipet.value = '';
});

addMap.addEventListener('click', () => {
    const dabeeoMaps = new window.dabeeo.Maps();
    getSize();

    async function fetchData() {
        const mapData = await dabeeoMaps.getMapData({
            clientId: "75hb8YSnAokb-sZ04aDR91",
            clientSecret: "0f7ad84f160c7b3fd1849a7920af718b",
        });

        mapContainer = document.getElementById("container");          
        const mapOption = Object.assign({ canvasSize: { width: 1000, height: 500 }, canvasFitTo: mapContainer});                                         
        map = await dabeeoMaps.showMap(mapContainer, mapOption, mapData); 
        console.log(map);
    }
    fetchData();
});

const text = `const dabeeoMaps = new window.dabeeo.Maps();

async function fetchData() {
    const mapData = await dabeeoMaps.getMapData({
        clientId: "75hb8YSnAokb-sZ04aDR91",
        clientSecret: "0f7ad84f160c7b3fd1849a7920af718b",
    });

    const mapContainer = document.getElementById("container");          
    const mapOption = Object.assign({ canvasSize: { width: 1000, height: 500 }});                                         
    map = await dabeeoMaps.showMap(mapContainer, mapOption, mapData);
}
fetchData();`;

// setTimeout(() => {

//     map.markers.draw({
//       marker: [
//         {
//           position: { x: 3000, y: 1000, z: 400 },
//           // async: true
//           // isKeep: true,
//         },
//       ],
//     });
//     map.mylocation.draw({
//       x: 2500,
//       y: 1000,
//       z: 400,
//       onActive: true,
//       // isKeep: true,
//       // animate: true,
//       animate: {
//         color: "#00ff00",
//         opacity: 0.4,
//         desireScale: 4,
//       },
//     });

//     const naviOption = {
//       // 네비게이션 선 분할 시 각 경유지마다 적용할 옵션 배열 (경유지별 lineOption 포함)
//       wayPoints: [
//         {
//           // iconUrl: 'https://assets.dabeeomaps.com/image/ico/img_start-3x.png',
//           // width: 150,
//           // height: 150,
//           lineOption: {
//             lineColor:"#ff00ff",
//             lineSpotSize: 12,
//             solidLineEnabled: true,
//             solidLineWidth: 3
//           },
//         },
//         {
//           // iconUrl: 'https://assets.dabeeomaps.com/image/ico/img_end-3x.png',
//           // width: 150,
//           // height: 150,
//           lineOption: {
//             lineColor:"#00ff53",
//             lineSpotSize: 20,
//             lineSpotCount: 50, // lineSpotInterval -> lineSpotCount 로 변경
//             solidLineEnabled: false,
//           },
//         },
//       ],
//       lineDivide: true, // 네비게이션 선 분할여부 결정 (false 인 경우, defaultLineOption 만 사용)
//       lineZ : 200,
//       speedRate: 60,
//     }
//     const animOption = {
//       destOption:{
//         activeDest: true,
//         color: "#00ffff",
//         opacity: 0.3,
//         isAnimate: true,
//         duration: 1200,
//         isRepeat: true,
//         isYoyo: false
//       },
//       // zoom: 1050,
//       // changeFloorDelay: 1200
//     };

//     map.routeSimulation.set(naviOption);
//     map.routeSimulation.setRoute({
//         origin: {
//           poiId : "PO-4JvSQCWHC2270", // 남자화장실 (11층)
//           floorId: "FL-skycuh0406y87004"
//         },
//         destination:  {
//           poiId : "PO-M02DvTVjp8449", // 회의실1 (11층)
//           floorId: "FL-skycuh0406y87004"
//         },
//         type: "recommendation",
//         // type: "stairs",
//         // type: "elevator",
//         waypoints: [
//           {
//             poiId : "PO-NMvw3E0pe1690", // 플랫폼사업부 회의실 (11층)
//             floorId: "FL-skycuh0406y87004"
//           },
//           {
//             poiId : "PO-bG8eepPeB2502", // 여자화장실 (2층)
//             floorId: "FL-ubj3xpjjwp4p7136" 
//           }
//         ],
//         retResponse: true
//       }).then((response) => {
//         map.routeSimulation.draw(animOption);
//     });


//     // setTimeout(() => {
//     //   map.markers.clear();
//     //   map.mylocation.clear();
//     //   map.routeSimulation.stop();

//     //   setTimeout(() => {
//     //     map.routeSimulation.clear();
//     //   }, 2000);
//     // }, 3000);

//     // map.control.reset({
//     //   useMapOptions : false
//     // });
//     // map.control.set({
//     //   zoomLevel:22,
//     //   // rotation:10,
//     //   // tilt:30
//     // })

//     // setTimeout(() => {
//     //     map.control.reset({
//     //       useMapOptions : false
//     //     });
//     // }, 2000);


//     // map.control.moveTo({x:100,y:100});
//     // map.control.zoomIn();
//     // map.control.zoomOut();
//     // map.control.changeCamera("3D");
//     // map.control.changeZoom(220);
//     // map.control.reset({});

//   }, 2000);

