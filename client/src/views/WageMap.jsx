import React from 'react';
import mapImage from '../wagemap.jpg';
import Datamap from 'datamaps/dist/datamaps.world.min.js';
import * as d3 from 'd3';
import CanadaJson from './canada.topo.json';

//<img src={mapImage} alt="Wage Map" />
class WageMap extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Datamaps expect data in format:
    // { "USA": { "fillColor": "#42a844", numberOfWhatever: 75},
    //   "FRA": { "fillColor": "#8dc386", numberOfWhatever: 43 } }
    let dataset = {};

    // We need to colorize every country based on "numberOfWhatever"
    // colors should be uniq for every value.
    // For this purpose we create palette(using min/max this.props.data-value)
    let onlyValues = this.props.data.map(function (obj) { return obj[1]; });
    let minValue = Math.min.apply(null, onlyValues),
        maxValue = Math.max.apply(null, onlyValues);

    // create color palette function
    // color can be whatever you wish
    let paletteScale = d3.scaleLinear()
        .domain([minValue, maxValue])
        .range(["#EFEFFF", "#02386F"]); // blue color

    // fill dataset in appropriate format
    this.props.data.forEach(function (item) { //
        // item example value ["USA", 70]
        let iso = item[0],
            value = item[1];
        dataset[iso] = { numberOfThings: value, fillColor: paletteScale(value) };
    });

    let map = new Datamap({
        element: document.getElementById('cloropleth_map'),
        scope: 'canada',
        geographyConfig: {
            popupOnHover: true,
            highlightOnHover: true,
            borderColor: '#444',
            highlightBorderWidth: 1,
            borderWidth: 0.5,
            dataJson: CanadaJson,
            popupTemplate: function (geo, data) {
                // don't show tooltip if country don't present in dataset
                if (!data) { return; }
                // tooltip content
                return ['<div class="hoverinfo">',
                    '<strong>', geo.properties.name, '</strong>',
                    '<br>Count: <strong>', data.numberOfThings, '</strong>',
                    '</div>'].join('');
            }
        },
        fills: {
            HIGH: '#afafaf',
            LOW: '#123456',
            MEDIUM: 'blue',
            UNKNOWN: 'rgb(0,0,0)',
            defaultFill: '#eee'
        },
        data: dataset,
        setProjection: function (element) {
            var projection = d3.geoMercator()
                .center([-106.3468, 68.1304]) // always in [East Latitude, North Longitude]
                .scale(200)
                .translate([element.offsetWidth / 2, element.offsetHeight / 2]);

            var path = d3.geoPath()
                .projection(projection);
            return { path: path, projection: projection };
        }
    });
  }
  render() {
    return (
      <div className='Wage-Map' style={{height: "100%", width: "100%"}}>
        <h1>Welcome to the Wage Visualizer!</h1>
        <div id="cloropleth_map" style={{height: "100%", width: "100%"}}></div>
      </div>);
  }
}

export default WageMap;
