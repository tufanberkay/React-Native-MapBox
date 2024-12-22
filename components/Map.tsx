import Mapbox, {
  Camera,
  CircleLayer,
  Images,
  LocationPuck,
  MapView,
  ShapeSource,
  SymbolLayer,
} from '@rnmapbox/maps';
import { featureCollection, point } from '@turf/helpers';
import pin from '~/assets/pin.png';
import scooterData from '~/data/scooters.json';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

const Map = () => {
  const points = scooterData.map((item) => point([item.long, item.lat]));

  return (
    <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/satellite-streets-v12">
      <Camera followZoomLevel={14} followUserLocation />
      <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{ isEnabled: true }} />
      <ShapeSource
        id="scooters"
        cluster
        clusterRadius={30}
        shape={featureCollection(points)}
        onPress={(e) => console.log(JSON.stringify(e, null, 2))}>
        <SymbolLayer
          id="clusters-count"
          filter={['has', 'point_count']}
          style={{
            textField: ['get', 'point_count'],
            textSize: 16,
            textColor: 'white',
            textAnchor: 'center',
            textFont: ['Open Sans Bold'],
          }}
        />
        <CircleLayer
          id="clusters"
          filter={['has', 'point_count']}
          style={{
            circlePitchAlignment: 'map',
            circleColor: '#42E100',
            circleRadius: 20,
            circleOpacity: 1,
            circleStrokeWidth: 2,
            circleStrokeColor: 'white',
          }}
        />
        <SymbolLayer
          id="scooter-icons"
          belowLayerID="clusters-count"
          filter={['!', ['has', 'point_count']]}
          style={{ iconSize: 0.5, iconImage: 'pin', iconAllowOverlap: true, iconAnchor: 'bottom' }}
        />
        <Images images={{ pin }} />
      </ShapeSource>
    </MapView>
  );
};

export default Map;
