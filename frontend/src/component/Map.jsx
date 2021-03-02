import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";

mapboxgl.accessToken = "pk.eyJ1IjoiaW11cm5hbmUiLCJhIjoiY2tscTlwcWg0MDgwNzJ1czFmMDBwMjJ5biJ9.ekTnFQfS_uqh6bF4YPjG0Q";

/**
 * Instantiate a MapBox map, zoom to the bounds and display relevant markers
 *
 * @param {Array} pickupPoints - most_popular_pickup_points
 * @param {Array} dropoffPoints - most_popular_dropoff_points
 * @param {Array} boundingBox - city bounding box co-ords
 * @returns {JSX.Element} Initialised MapBox map
 */
export default function Map({ pickupPoints, dropoffPoints, boundingBox }) {
  const mapContainer = useRef(null);

  // Initialise map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/imurnane/cklqmsm726d9c17olaamh8mo3",
    });

    // navigation control
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // zoom to the bounding box
    map.fitBounds([
      boundingBox.slice(0, 2),
      boundingBox.slice(-2),
    ]);

    // add markers
    pickupPoints.features.forEach((feature) => {
      const el = document.createElement("div");
      el.className = "marker-dropoff";

      new mapboxgl.Marker(el, { anchor: "bottom" })
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);
    });
    dropoffPoints.features.forEach((feature) => {
      const el = document.createElement("div");
      el.className = "marker-pickup";

      new mapboxgl.Marker(el, { anchor: "bottom" })
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);
    });

    // clean up on unmount
    return () => map.remove();
  }, []);

  return (
    <div>
      <div className="map-container" ref={mapContainer} />
    </div>
  );
}

Map.propTypes = {
  pickupPoints: PropTypes.shape({
    features: PropTypes.arrayOf(PropTypes.shape({
      geometry: PropTypes.shape({
        coordinates: PropTypes.arrayOf(PropTypes.number),
      }),
    })),
  }).isRequired,
  dropoffPoints: PropTypes.shape({
    features: PropTypes.arrayOf(PropTypes.shape({
      geometry: PropTypes.shape({
        coordinates: PropTypes.arrayOf(PropTypes.number),
      }),
    })),
  }).isRequired,
  boundingBox: PropTypes.arrayOf(PropTypes.number).isRequired,
};
