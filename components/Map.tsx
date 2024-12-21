import Mapbox, { Camera, LocationPuck, MapView } from '@rnmapbox/maps';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

const Map = () => {
  return (
    <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/satellite-streets-v12">
      <Camera followZoomLevel={16} followUserLocation />
      <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{ isEnabled: true }} />
    </MapView>
  );
};

export default Map;
