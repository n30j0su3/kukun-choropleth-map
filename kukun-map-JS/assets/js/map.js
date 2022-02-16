let map;
// Check the window's size to change the map zoom
if (window.innerWidth < 500) {
    map = L.map('map').setView([37.8, -96], 3);
}
else{
    map = L.map('map').setView([37.8, -96], 4);    
}
// Init map with mapbox API data
let tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/light-v9',
    tileSize: 512,
    fitBounds:[37.8, -96],
    setMaxBounds:[37.8, -96],
    zoomOffset: -1
}).addTo(map);


// control that shows state info on hover
let info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = '<h4>US Avg. Remodeling costs</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.costs + ' $USD ' : 'Hover over a state');
};

info.addTo(map);

// get color depending on population costs value
function getColor(d) {
    return d > 100000 ? '#5e29d5' :
        d > 50000  ? '#4f52e6' :
        d > 20000  ? '#4771f2' :
        d > 10000  ? '#4f8cf9' :
        d > 5000   ? '#5695fb' :
        d > 2000   ? '#66a5fc' :
        d > 1000   ? '#7ab5fd' : '#ADCBEF';
}

function style(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.costs)
    };
}

function highlightFeature(e) {
    let layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

let geojson;

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

//Links for each US city

function stateLink(e) {
//  console.log(e.target.feature.properties.name);
    let urlLink;
    switch (e.target.feature.properties.name) {
    case 'Alabama':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Alabama';
        break;
    case 'Alaska':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Alaska';
        break;
    case 'Arizona':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Arizona';
        break;
    case 'Arkansas':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Arkansas';
        break;
    case 'California':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/California';
        break;
    case 'Colorado':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Colorado';
        break;
    case 'Connecticut':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Connecticut';
        break;
    case 'Delaware':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Delaware';
        break;
    case 'District of Columbia':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/District-of-Columbia';
        break;
    case 'Florida':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Florida';
        break;
    case 'Georgia':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Georgia';
        break;
    case 'Hawaii':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Hawaii';
        break;
    case 'Idaho':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Idaho';
        break;
    case 'Illinois':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Illinois';
        break;
    case 'Indiana':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Indiana';
        break;
    case 'Iowa':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Iowa';
        break;
    case 'Kansas':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Kansas';
        break;
    case 'Kentucky':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Kentucky';
        break;
    case 'Louisiana':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Louisiana';
        break;
    case 'Maine':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Maine';
        break;
    case 'Maryland':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Maryland';
        break;
    case 'Massachusetts':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Massachusetts';
        break;
    case 'Michigan':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Michigan';
        break;
    case 'Minnesota':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Minnesota';
        break;
    case 'Mississippi':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Mississippi';
        break;
    case 'Missouri':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Missouri';
        break;
    case 'Montana':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Montana';
        break;
    case 'Nebraska':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Nebraska';
        break;
    case 'Nevada':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Nevada';
        break;
    case 'New Hampshire':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/New-Hampshire';
        break;
    case 'New Jersey':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/New-Jersey';
        break;
    case 'New Mexico':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/New-Mexico';
        break;
    case 'New York':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/New-York';
        break;
    case 'North Carolina':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/North-Carolina';
        break;
    case 'North Dakota':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/North-Dakota';
        break;
    case 'Ohio':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Ohio';
        break;
    case 'Oklahoma':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Oklahoma';
        break;
    case 'Oregon':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Oregon';
        break;
    case 'Pennsylvania':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Pennsylvania';
        break;
    case 'Rhode Island':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Rhode-Island';
        break;
    case 'South Carolina':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/South-Carolina';
        break;
    case 'South Dakota':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/South-Dakota';
        break;
    case 'Tennessee':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Tennessee';
        break;
    case 'Texas':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Texas';
        break;
    case 'Utah':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Utah';
        break;
    case 'Vermont':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Vermont';
        break;
    case 'Virginia':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Virginia';
        break;
    case 'Washington':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Washington';
        break;
    case 'West Virginia':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/West-Virginia';
        break;
    case 'Wisconsin':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Wisconsin';
        break;
    case 'Wyoming':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Wyoming';
        break;
    case 'Puerto Rico':
        urlLink = 'https://app.mykukun.com/estimator/kitchen-renovation-cost/Puerto-Rico';
        break;
    default: 
        urlLink = 'https://www.google.com';
        break;
    };
    window.open(urlLink, '_blank');
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: stateLink
    });
}

/* global statesData */
geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

//map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');

let legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    let div = L.DomUtil.create('div', 'info legend');
    
    let grades = [0, 1000, 2000, 5000, 10000, 20000, 50000, 100000];
    let labels = [];
    let from, to;
    //div += '<span>hey</span>' 
    //div.appendChild(document.createElement('span')).textContent='avg. USD range';

    for (let i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        labels.push(
            '<i style="background:' + getColor(from + 1) + '"></i> ' +
            from + (to ? '&ndash;' + to : '+'));
    }

    div.innerHTML = '<span><b>Range avg. in USD</b></span><br>' + '$'+labels.join('<br>$');
    return div;
};

legend.addTo(map);
