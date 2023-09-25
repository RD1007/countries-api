<template>
    <div class="hello" id="chartdiv">
    </div>
</template>
  
  <script>  
  import * as am5 from "@amcharts/amcharts5";
  import * as am5map from "@amcharts/amcharts5/map";
  import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
  import am5geodata_continentsLow from "@amcharts/amcharts5-geodata/continentsLow"

export const getFixedNames = (ContinentName) => {
  switch (ContinentName.toLowerCase()) {
    case 'africa':
      return 'Africa';
    case 'antarctica':
      return 'Antarctic';
    case 'asia':
      return 'Asia';
    case 'europe':
      return 'Europe';
    case 'northamerica':
      return 'North America';
    case 'oceania':
      return 'Oceania';
    case 'southamerica':
      return 'South America';
    default:
      return ContinentName
  }
};
export default {
  methods: {
  navigateToMain(continentId) {
    const fixedNames = this.getFixedNames(continentId);
    const routerLinkUrl = `/main/${encodeURIComponent(fixedNames)}`;
    this.$router.push(routerLinkUrl);
  },
  getFixedNames(ContinentName) {
    switch (ContinentName.toLowerCase()) {
      case 'africa':
        return 'Africa';
      case 'antarctica':
        return 'Antarctic';
      case 'asia':
        return 'Asia';
      case 'europe':
        return 'Europe';
      case 'northamerica':
        return 'North America';
      case 'oceania':
        return 'Oceania';
      case 'southamerica':
        return 'South America';
      default:
        return ContinentName
    }
  },
},
  mounted() {
    // Create root and chart
    let root = am5.Root.new("chartdiv"); 
    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        projection: am5map.geoNaturalEarth1(),
        minZoomLevel: 1,
        maxZoomLevel: 1
      })
    );

    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"]
      })
    );

    chart.chartContainer.set("background", am5.Rectangle.new(root, {
      fill: am5.color(0xd4f1f9),
      fillOpacity: 1
    }));

    polygonSeries.data.setAll([{
      id: "FR",
      name: "France",
      value: 100
    }, {
      id: "ES",
      name: "Spain",
      value: 200
    }]);

    let continentSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_continentsLow
    }));

    continentSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true
    });

    continentSeries.mapPolygons.template.states.create("hover", {
      fill: root.interfaceColors.get("primaryButtonActive")
    });

    let countrySeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_worldLow,
      exclude: ["AQ"],
      visible: true
    }));
    continentSeries.mapPolygons.template.events.on("click", (ev) => {
      let clickedContinent = ev.target.dataItem;
      continentSeries.zoomToDataItem(clickedContinent);
      continentSeries.hide();
      countrySeries.show();
      this.navigateToMain(clickedContinent.dataContext.id);
    });
  },
};
  </script>
  <style scoped>
  .hello {
    width: 100%;
    height: 90vh;
    padding: 0px;
  }
  </style>
  <!-- https://www.amcharts.com/docs/v5/charts/map-chart/map-line-series/#Data -->