import Mapbox, { Camera, LocationPuck, MapView } from '@rnmapbox/maps';
import { useScooter } from '../providers/ScooterProvider';
import LineRoute from './LineRoute';
import ScooterMarkers from './ScooterMarkers';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

const Map = () => {
  const { directionCoordinates, setSelectedScooter } = useScooter();

  return (
    <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/satellite-streets-v12">
      <Camera followZoomLevel={14} followUserLocation />
      <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{ isEnabled: true }} />
      <ScooterMarkers />
      {directionCoordinates && <LineRoute coordinates={directionCoordinates} />}
    </MapView>
  );
};

export default Map;
