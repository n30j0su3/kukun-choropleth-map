<template>
  <div class="home">
    <l-map ref="myMap" @ready="doSomethingOnReady()" :center="[37.8, -96]" :zoom="4" style="height: 500px;" :options="mapOptions">
      <l-choropleth-layer :data="USADepartmentsData" titleKey="department_name" idKey="department_name" :value="value" geojsonIdKey="name" :geojson="usaGeoJSON" :colorScale="colorScale">
        <template slot-scope="props" >
          <l-info-control :item="props.currentItem" :unit="props.unit" title="Department" placeholder="Hover over a department"/>
          <l-reference-chart title="Remodelation Cost avg." :colorScale="colorScale" :min="props.min" :max="props.max" position="topright"/>
        </template>
      </l-choropleth-layer>
      <!--<l-marker :lat-lng="withTooltip">
        <l-tooltip :options="{ permanent: true, interactive: true }">
          <div @click="innerClick">
            I am a tooltip
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
              Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-tooltip>
      </l-marker>-->
    </l-map>
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>

import { InfoControl, ReferenceChart, ChoroplethLayer } from 'vue-choropleth'
//import { geojson } from '../data/py-departments-geojson'
//import paraguayGeojson from '../data/paraguay.json'
//import { pyDepartmentsData } from '../data/py-departments-data'
import usaGeoJSON from '../data/usa.json'
import { USADepartmentsData } from '../data/usa-departments-data'
import { LMap,LTileLayer, LMarker, LTooltip } from 'vue2-leaflet';
import { latLng } from "leaflet";

export default {
  name: 'Home',
  components: {
    //HelloWorld
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    'l-info-control': InfoControl, 
    'l-reference-chart': ReferenceChart, 
    'l-choropleth-layer': ChoroplethLayer 
  },
  data() {
    return {
      USADepartmentsData,
      usaGeoJSON,
      colorScale: ["ADCBEF", "4f8cf9", "5e29d5"],
      value: {
        key: "avg_costs",
        metric: "AVG. $USD"
      },
      extraValues: [{
        link: 'go'
        //key: "amount_m",
        //metric: "% boys"
      }],
      mapOptions: {
        attributionControl: false,
        doubleClickZoom: false,
        onEachFeature: (feature, layer) => {
          console.log(this)
          console.log(layer)
          console.log(feature)

          layer.on({
            mouseover: mouseover.bind(this),
            mouseout: mouseout.bind(this)
          })
        },
        onEachFeature: (feature, layer) => {
        let self = this;
        layer.on('mouseover', function(e) {
        self.popupName = feature.properties.Name;
          console.log(feature.properties.Name);
          //open popup
          let popup = L.popup()
            .setLatLng(e.latlng) 
            .setContent('<h1 style="color: grey; margin-bottom: 0;">'+ feature.properties.Name +'</h1>')
            .openOn(self.$refs.myMapRef.mapObject); 
          });
        }
      },
      withTooltip: latLng(47.41422, -1.250482),
      showParagraph: false,
      currentStrokeColor: 'ADCBEF',
    }
  },
  methods:{
    innerClick() {
      alert("Click!");
    },
    doSomethingOnReady() {
        console.log(this.$refs.myMap.mapObject)
        //this.map = this.$refs.myMap.mapObject
    },
  },

}
</script>
<style scoped>
@import "~leaflet/dist/leaflet.css";

</style>