import React, { Component } from "react"
import { connect } from "react-redux"
import L from "leaflet"
// import PropTypes from 'prop-types'

import { handleSelection } from './redux'

import Container from "@material-ui/core/Container"

import circles from "./assets/data/circles"
import { addToOrRemoveFromArray } from "./utils"


// Map style:
const style = {
  width: "100%",
  height: "50vh"
}

// Base map tile:
const map_tile = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
)

const circle_layer = L.layerGroup()
const marker_layer = L.layerGroup()
const highlight_layer = L.layerGroup()

// Params to be passed to the map:
const mapParams = {
  center: [30, 0],
  zoom: 1,
  zoomControl: false,
  maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
  layers: [map_tile, circle_layer, marker_layer, highlight_layer]
}

let new_selections = []

// Custom Leaflet.js Map component:
class Map extends Component {

  addCircles = (data, layer) => {
    const { handleSelection } = this.props
    layer.clearLayers();
    if (data && data.length > 0) {
      for (const d in data) {
        // Get the circle's data from data set:
        let circleData = data[d];
        // Circle options:
        const options = {
          color: "red",
          fillColor: "#f03",
          fillOpacity: 0.0,
          radius: 1000000
        };
        // Add the circle to the circle layer:
        let circle = L.circle([circleData.lat, circleData.lon], options).addTo(
          layer
        );
        //********/
        // This is the onClick event for the circle marker: *****/
        circle.on("click", () => {
          new_selections = addToOrRemoveFromArray(circleData, new_selections, 'new_selections')
          handleSelection(new_selections)
        });
        //********/
        //********/
      }
    }
  }

  addPointMarkersAndHighlight = (
    selections,
    marker_layer,
    highlight_layer
  ) => {
    const { handleSelection } = this.props
    marker_layer.clearLayers();
    highlight_layer.clearLayers();
    if (selections) {
      for (const s in selections) {
        let circleData = selections[s];
        // console.log(circleData);
        let marker = L.marker([circleData.lat, circleData.lon]).addTo(
          marker_layer
        );
        const options = {
          color: "red",
          fillColor: "#f03",
          fillOpacity: 0.5,
          radius: 1000000
        };
        let circle = L.circle(
          [circleData.lat, circleData.lon],
          options
        ).addTo(highlight_layer);
        circle.on("click", () => {
          new_selections = addToOrRemoveFromArray(circleData, new_selections, 'new_selections')
          handleSelection(new_selections)
        });
      }
    }
  }

  componentDidMount() {
    // Create the map using the id found in the div:
    this.map = L.map("map", mapParams)

    // Set Base map in Layer control:
    const baseMaps = {
      OpenStreetMap: map_tile
    }

    // Set ellipse layers in layer control:
    const overlayMaps = { "Circle Layer": circle_layer }

    // Create the layer control:
    L.control.layers(baseMaps, overlayMaps).addTo(this.map)
    //

    // Add a zoom control:
    L.control.zoom({ position: "topright" }).addTo(this.map)
    //

    // Call the addCircles function:
    this.addCircles(circles, circle_layer)
  }

  // When state is updated:
  componentDidUpdate(prevProps) {
    const { selections } = this.props
    // console.log(selections)

    if (selections !== prevProps.selections) {
      this.addPointMarkersAndHighlight(
        selections,
        marker_layer,
        highlight_layer
      )
    }
  }

  render() {
    return (
      <Container disableGutters={true} maxWidth={false}>
        <div id="map" style={style} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selections: state.selection.selections
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSelection: selection_list => dispatch(handleSelection(selection_list)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
