import Mapbox, {
  Camera,
  Images,
  LocationPuck,
  MapView,
  ShapeSource,
  SymbolLayer,
} from '@rnmapbox/maps';
import { featureCollection, point } from '@turf/helpers';
import scooterData from '~/data/scooters.json';
import pin from '~/assets/pin.png';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

const Map = () => {
  const points = scooterData.map((item) => point([item.long, item.lat]));

  return (
    <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/satellite-streets-v12">
      <Camera followZoomLevel={14} followUserLocation />
      <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{ isEnabled: true }} />
      <ShapeSource id="scooters" shape={featureCollection(points)}>
        <SymbolLayer
          id="scooter-icons"
          style={{ iconSize: 0.5, iconImage: 'pin', iconAllowOverlap: true }}
        />
        <Images images={{ pin }} />
      </ShapeSource>
    </MapView>
  );
};

export default Map;
