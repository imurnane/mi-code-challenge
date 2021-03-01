import { useRef, useEffect } from "react";
import mapboxgl from 'mapbox-gl';

import "./Map.css";


mapboxgl.accessToken = "pk.eyJ1IjoiaW11cm5hbmUiLCJhIjoiY2tscTlwcWg0MDgwNzJ1czFmMDBwMjJ5biJ9.ekTnFQfS_uqh6bF4YPjG0Q";

export default function Map({ data }) {
  const mapContainer = useRef(null);

  // Initialise map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/imurnane/cklqmsm726d9c17olaamh8mo3',
    });

    // navigation control
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // zoom to the bounding box
    map.fitBounds([
      data.bounding_box.slice(0, 2),
      data.bounding_box.slice(-2),
    ]);

    // add markers
    for (const feature of data.most_popular_dropoff_points.features) {
      const el = document.createElement('div');
      el.className = 'marker-dropoff';

      new mapboxgl.Marker(el, { anchor: "bottom" })
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);
    }
    for (const feature of data.most_popular_pickup_points.features) {
      const el = document.createElement('div');
      el.className = 'marker-pickup';

      new mapboxgl.Marker(el, { anchor: "bottom" })
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);
    }

    // clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="map-container" ref={mapContainer} />
    </div>
  );
}
