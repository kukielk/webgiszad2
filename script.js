require(["esri/Map",
    "esri/views/SceneView",
    "esri/renderers/Renderer",
    "esri/layers/FeatureLayer"], function (Map, SceneView, Renderer, FeatureLayer,) {
        const map = new Map({
            basemap: "topo-vector",
            ground: "world-elevation"
        });
        const view = new SceneView({
            container: "map",
            map: map,
            scale: 500000000,
            center: [-101.17, 21.78]
        });
        const renderer = {
            type: "simple",
            symbol: {
                type: "point-3d",
                symbolLayers: [
                    {
                        type: "object",
                        resource: { primitive: "cone" },
                        width: 50000
                    }
                ]
            },
            visualVariables: [{
                type: "color",
                field: "MAGNITUDE",
                stops: [{ value: 1, color: "green" }, { value: 2, color: "orange" }, { value: 4, color: "red" }, { value: 4.48, color: "#52170b" }],
            }, {
                type: "size",
                field: "DEPTH", // field containing data for wind speed
                stops: [{ value: -3.39, size: 5000 }, { value: -2, size: 10000 }, { value: -1, size: 15000 }, { value: 0, size: 20000 }, { value: 1, size: 25000 }, { value: 2, size: 30000 }, { value: 3, size: 35000 }, { value: 4, size: 40000 }, { value: 5, size: 45000 },
                { value: 6, size: 50000 }, { value: 7, size: 55000 }, { value: 8, size: 60000 }, { value: 9, size: 65000 }, { value: 10, size: 70000 }, { value: 11, size: 75000 },
                { value: 12, size: 80000 }, { value: 13, size: 85000 }, { value: 14, size: 90000 }, { value: 15, size: 95000 }, { value: 16, size: 100000 }, { value: 17, size: 105000 }, { value: 18, size: 110000 }, { value: 19, size: 1150000 }, { value: 20, size: 1200000 },
                { value: 21, size: 1250000 }, { value: 22, size: 1300000 }, { value: 30, size: 1350000 }],
                axis: "height"
            }, {
                type: "size",
                axis: "width-and-depth",
                useSymbolValue: true // uses the width value defined in the symbol layer (50,000)
            }
            ]
        };

        //wybrany punkt
        const point = new FeatureLayer({
            url: "https://services.arcgis.com/ue9rwulIoeLEI9bj/ArcGIS/rest/services/Earthquakes/FeatureServer/"
        });
        point.definitionExpression = "MAGNITUDE > 4  ";
        map.add(point);
        //wszystkie punkty - kolory
        const layer = new FeatureLayer({
            url: "https://services.arcgis.com/ue9rwulIoeLEI9bj/ArcGIS/rest/services/Earthquakes/FeatureServer/",

        });
        map.add(layer);
        layer.renderer = renderer;

    });

